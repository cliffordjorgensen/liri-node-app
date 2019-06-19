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
                        axios.get("https://api.spotify.com/v1/search?q=" + songName + "&type=track")
                            .then(function(songInfo) {
                                console.log(songInfo.data)
                            }).catch(function(error) {
                                console.log(error.config);
                            })
                    })
                    //make axios call
                    //display shit for the user
            } else if (pickedOP === 'movie-this') {
                //make axios call
                //display shit for the user
            } else if (pickedOP === 'do-what-it-says') {
                //make axios call
                //display shit for the user
            }
        });
}
main()