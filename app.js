var config = require('./config.json');

var ip = require('ip');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//Start Server
var server = app.listen(config.port, function(){
    var host = ip.address();
    var port = server.address().port;
    console.log('Server is listening on localhost', port);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});