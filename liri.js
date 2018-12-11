require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var inquirer = require("inquirer");

let liriCommand = process.argv[2];
let liriInput = process.argv[3];


if (liriCommand === "spotify-this-song") {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: liriInput }, function (err, data) {

        let songArtist = data.tracks.items[0].artists[0].name;
        let songName = data.tracks.items[0].name;
        let songLink = data.tracks.items[0].preview_url;
        let songAlbum = data.tracks.items[0].album.name;
        console.log("The song artist is " + songArtist + ".\r\n");
        console.log("The song name is " + songName + ".\r\n");
        console.log("Please click the link to preview your song choice: " + songLink + ".\r\n");
        console.log("The song is from the album titled " + songAlbum + ".\r\n");

        if (err) {
            return console.log('Error occurred: ' + err);
        }
    });
}