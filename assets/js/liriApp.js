require("dotenv").config(); //set environment variables with dotenv package
var keys = require("./keys.js"); //import api keys via keys.js
var Spotify = require('node-spotify-api'); //import spotify api package
var spotify = new Spotify(keys.spotify); //access spotify key
var inquirer = require("inquirer"); //import inquirer package
var axios = require("axios"); //import axios package

const main = function() {
    inquirer
        .prompt([{
            type: "list",
            message: "\n\tPlease choose a command.\n\n",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "menuChoice"
        }]).then(function(userChoice) {
            var pickedOP = userChoice.menuChoice
            if (pickedOP === 'concert-this') {
                inquirer
                    .prompt([{
                        type: "input",
                        message: "Please enter the name of an artist or band.",
                        name: "band"
                    }]).then(function(artist) {
                        var bandName = artist.band
                        axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
                            .then(function(response) {
                                var event = response.data;
                                for (let i = 0; i <= event.length; i++) {
                                    var venue = event[i].venue.name;
                                    console.log("\nName of the Venue: " + venue)
                                    var city = event[i].venue.city;
                                    console.log("\nVenue Location: " + city)
                                    var eventDate = event[i].datetime;
                                    console.log("\n The date of the event is: " + eventDate)
                                }
                            }).catch(function(error) {
                                console.log("---------------Data---------------");
                                console.log(error.config);
                            });
                    })
            } else if (pickedOP === 'spotify-this-song') {
                inquirer
                    .prompt([{
                        type: "input",
                        message: "please enter a song to search on spotify",
                        name: "song"
                    }]).then(function(song) {
                        var songName = song.song;

                        spotify.search({ type: 'track', query: songName, limit: 1, market: 'US', popularity: 100 }, function(err, data) {
                            if (err) {
                                return console.log('Error occurred: ' + err);
                            }
                            var songObj = {
                                song_name: data.tracks.items[0].name,
                                artist: data.tracks.items[0].artists[0].name,
                                link: data.tracks.items[0].external_urls.spotify,
                                album: data.tracks.items[0].album.name
                            }
                            console.log('\nDetails\n')
                            console.log(songObj);

                        });

                    })
                    //make axios call
                    //display shit for the user
            } else if (pickedOP === 'movie-this') {
                inquirer
                    .prompt([{
                        type: "input",
                        message: "\nPlease enter a movie title: ",
                        name: "userMovie"
                    }]).then(function(mov) {
                        var movie = mov.userMovie

                        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=414d26ac").then(
                            function(response) {
                                // Then we print out the imdbRating
                                var movieObj = {
                                    title: response.data.Title,
                                    year: response.data.Year,
                                    imdb_Rating: response.data.imdbRating,
                                    rotten_tomatoes_rating: response.data.Ratings[1].Value,
                                    country_produced: response.data.Country,
                                    movie_language: response.data.Language,
                                    plot: response.data.Plot,
                                    actors: response.data.Actors
                                }
                                console.log('\nDetails\n')
                                console.log(movieObj)
                            }
                        );
                    })
                    //make axios call
                    //display shit for the user
            } else if (pickedOP === 'do-what-it-says') {
                //make axios call
                //display shit for the user
            }
        });
}
main()