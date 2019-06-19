require("dotenv").config(); //set environment variables with dotenv package
var keys = require("./keys.js"); //import api keys via keys.js
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify); //access spotify key
var inquirer = require("inquirer"); //import inquirer package
var axios = require("axios"); //import axios package




// const spotifyCall = function() {
//     axios
//         .get()
// }

// inquirer
//     .prompt([{
//         type: "input",
//         message: ""
//     }])