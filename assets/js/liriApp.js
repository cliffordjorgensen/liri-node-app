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
                //make axios call
                //display shit for the user
            } else if (pickedOP === 'spotify-this-song') {
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

// const spotifyCall = function() {
//     axios
//         .get()
// }

// inquirer
//     .prompt([{
//         type: "input",
//         message: ""
//     }])