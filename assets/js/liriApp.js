require("dotenv").config(); //set environment variables with dotenv package
var fs = require("fs"); //import core file-system package
var keys = require("./keys.js"); //import api keys via keys.js
var Spotify = require('node-spotify-api'); //import spotify api package
var spotify = new Spotify(keys.spotify); //access spotify key
var inquirer = require("inquirer"); //import inquirer package
var axios = require("axios"); //import axios package
var moment = require('moment');

const main = function() {
    inquirer
        .prompt([{
            type: "list",
            message: "\n\tPlease choose a command.\n\n",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "quit"],
            name: "menuChoice"
        }]).then(function(userChoice) {
            var pickedOP = userChoice.menuChoice;
            // if (pickedOP === 'quit') { exit.main(); };
            if (pickedOP === 'concert-this') {
                inquirer
                    .prompt([{
                        type: "input",
                        message: "Please enter the name of an artist or band.",
                        name: "band"
                    }]).then(function(artist) {
                        var bandName = artist.band;
                        axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
                            .then(function(response) {
                                var event = response.data;
                                for (let i = 0; i <= event.length; i++) {
                                    var eventObj = {
                                        venue: event[i].venue.name,
                                        city: event[i].venue.city,
                                        eventDate: moment(event[i].datetime).format("MM/DD/YYYY")
                                    };
                                    console.log('\n\tDetails\n');
                                    console.log(eventObj);
                                }
                            }).catch(function(error) {
                                console.log("---------------Data---------------");
                                console.log(error.config);
                            });
                    });
            } else if (pickedOP === 'spotify-this-song') {
                inquirer
                    .prompt([{
                        type: "input",
                        message: "please enter a song to search on spotify",
                        name: "song"
                    }]).then(function(song) {
                        var songName = song.song;
                        if (songName === "") { songName = "the sign ace of base"; }
                        spotify.search({ type: 'track', query: songName, market: 'US', popularity: 100 }, function(err, data) {
                            if (err) {
                                return console.log('Error occurred: ' + err);
                            }
                            var songObj = {
                                song_name: data.tracks.items[0].name,
                                artist: data.tracks.items[0].artists[0].name,
                                link: data.tracks.items[0].external_urls.spotify,
                                album: data.tracks.items[0].album.name
                            };
                            console.log('\n\tDetails\n');
                            console.log(songObj);
                        });
                    });
            } else if (pickedOP === 'movie-this') {
                inquirer
                    .prompt([{
                        type: "input",
                        message: "\nPlease enter a movie title: ",
                        name: "userMovie"
                    }]).then(function(mov) {
                        var movie = mov.userMovie;
                        if (movie === '') { movie = 'Mr Nobody'; }
                        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=414d26ac").then(
                            function(response) {
                                var movieObj = {
                                    title: response.data.Title,
                                    year: response.data.Year,
                                    imdb_Rating: response.data.imdbRating,
                                    rotten_tomatoes_rating: response.data.Ratings[1].Value,
                                    country_produced: response.data.Country,
                                    movie_language: response.data.Language,
                                    plot: response.data.Plot,
                                    actors: response.data.Actors
                                };
                                console.log('\n\tDetails\n');
                                console.log(movieObj);
                            }
                        );
                    });
            } else if (pickedOP === 'do-what-it-says') {
                fs.readFile("random.txt", "utf8", function(error, data) {
                    if (error) {
                        return console.log(error);
                    }
                    var dataArr = data.split(",");
                    randomSong = dataArr[1];
                    spotify.search({ type: 'track', query: randomSong, limit: 1, market: 'US', popularity: 100 }, function(err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        var songObj = {
                            song_name: data.tracks.items[0].name,
                            artist: data.tracks.items[0].artists[0].name,
                            link: data.tracks.items[0].external_urls.spotify,
                            album: data.tracks.items[0].album.name
                        };
                        console.log('\n\tDetails\n');
                        console.log(songObj);
                    });
                });
            }
        });
};

main();