var config = require('./config.json');

var ip = require('ip');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./server/models/index.js');
var app = express();

// Start Server
// models.sequelize.sync() creates the tables if they don't exist
models.sequelize.sync().then(function () {
    var server = app.listen(config.serverPort, function(){
        var host = ip.address();
        var port = server.address().port;
        console.log('Server is listening on localhost', port);
    });
});



// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));

//Routes
app.use('/api', require('./server/router/api'));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});