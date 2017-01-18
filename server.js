//require doesn't need a ./ cus it will go through node modules to find folder express
//if it is built in no need for slash. If you build a code, you need it
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var songs = require('./data');

var app = express();//creates application to start working. Won't work until app.listen(3000) is called

app.use(express.static('public'));//allows our server to search the public folder
app.use(bodyParser.urlencoded({extended: true}));//bodyParser.urlencoded will convert any url encoded body into a JS object
//added to req.body
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});//handle a get request and generate a response of "hello world"

app.get('/songs', function(req, res) {
  res.send(songs);
});//only handling get request of /data and will generate an array of objects named songs

app.post('/songs', function(req, res) {
  console.log('req.body', req.body);

var titleArr = [];
//
  songs.forEach(function(song) {
    titleArr.push(song.title);
  });
var date = Date();
req.body['dateAdded'] = date;

if(titleArr.includes(req.body.title)) {
  res.sendStatus(400);
} else if(req.body.title.trim() == "" || req.body.album.trim() == "" || req.body.artist.trim() == "") {
  res.sendStatus(400);
}

 else {
  songs.push(req.body);
  res.sendStatus(200);
}

titleArr = [];

})
app.listen(3000);
//this runs the entire function
