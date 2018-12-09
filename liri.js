require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });