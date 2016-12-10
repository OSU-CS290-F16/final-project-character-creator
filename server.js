/* Server Backend for Final
 * Scott Russell
 * 12/7/2016
 * CS 290 Fall 2016
 */
 // initialize requires


var path = require('path');
var http = require('http');
var fs = require('fs');
var express = require("express");
var Handlebars = require("handlebars");
var app = express();
var character = require('./character');

// default port or Command Line Port.
var port = process.env.PORT || 3000;

// initialize server

// set contents before server is run to prevent reading for each user.

var explorePageSource = fs.readFileSync(path.join(__dirname, 'templates', 'Explore.html'), 'utf8');
var explorePageTemplate = Handlebars.compile(explorePageSource);


// serve static files from public/
app.use(express.static(path.join(__dirname,'public')));



app.get('/character', function (req, res){
	var content = explorePageTemplate({character: character});
	res.send(content);

});





// If we didn't find the requested resource, send a 404 error.
app.get('*', function(req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// listen of port (either input port or 3000
app.listen(port, function(){
	console.log("== Server listening on port:",port);
	
});
