// Packages required
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");
let randomItem = require('random-item')


// Variables
let liriCommand = process.argv[2];
let liriInput = process.argv[3];


// console.log("====================");
// console.log("Welcome to LIRIBOT!\n\r"); 
// console.log("Please enter a one of the following commands followed by a song title, a concert artist, or a movie!\n\r  spotify-this-song 'song title'\n\r  concert-this 'artist name'\n\r  movie-this 'movie title'\n\r");




switch (liriCommand) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doWhat();
        break;

}

function concert() {
    request("https://rest.bandsintown.com/artists/" + liriInput + "/events?app_id=codingbootcamp&date=upcoming",
        function (error, response, body) {
            // Save response to a variable and parse
            let data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                console.log("------------------------");
                console.log("Venue name: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country + ".");
                console.log("Date of event: " + moment(data[i].datetime).format("MM/DD/YYYY")+ "\n\r");

            }

        }
    );

}


//TODO, return The Sign by Ace of Base if liriInput is undefined.
function song() {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: liriInput, limit: 5 }, function (err, data) {

        let songArtist = data.tracks.items[0].artists[0].name;
        let songName = data.tracks.items[0].name;
        let songLink = data.tracks.items[0].preview_url;
        let songAlbum = data.tracks.items[0].album.name;

        if (songArtist == null) {
            console.log("Sorry, no artist by that name.\r\n");
        } else {
            console.log("------------------------");
            console.log("The song artist is " + songArtist + ".");
        }

        if (songName == null) {
            console.log("Sorry, song name was not found.\r\n");
        } else {
            console.log("The song name is " + songName + ".");
        }

        if (songLink == null) {
            console.log("Sorry, no preview available.\r\n");
        } else {
            console.log("Please click the link to preview your song choice: " + songLink + ".");
        }

        if (songAlbum == null) {
            console.log("Sorry, no song album available.\r\n");
        } else {
            console.log("The song is from the album titled " + songAlbum + ".");
            console.log("------------------------");
        
        }

        if (err) {
            return console.log('Error occurred: ' + err);
        }
    });
}

function movie() {

    var movieName = liriInput;

    // Then run a request to the OMDB API with the movie specified

    //TODO - Return Mr. Nobody for undefined movie

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=a85e02f1";

    request(queryUrl, function (error, response, body) {
        let data = JSON.parse(body);

        console.log("------------------------");
        console.log("Title: " + data.Title);
        console.log("Release year: " + data.Year);
        console.log("IMBD Rating: " + data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
        console.log("Movie produced in " + data.Country);
        console.log("Plot Info: " + data.Plot);
        console.log("Starring: " + data.Actors);
        console.log("------------------------");


        if (!error && response.statusCode === 200) {
        }


    });

}

function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data

        // Then split it by commas (to make it more readable)
        var randomText = data.split("\n");
        console.log(randomText);
        let liriRandom= randomItem(randomText).split(',');

        // We will then re-display the content as an array for later use.

        if (liriRandom[0] === 'spotify-this-song') {
            liriInput = liriRandom[1];


        } else if (liriRandom[0] === 'concert-this') {
            liriInput = liriRandom[1];


        } else if (liriRandom[0] === 'movie-this') {
            liriInput = liriRandom[1];

        }

    })

}
