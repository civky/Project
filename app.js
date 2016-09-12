var config = require('./config.json');

var ip = require('ip');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./server/models/index.js');
var app = express();

var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

// Start Server
// models.sequelize.sync() creates the tables if they don't exist
models.sequelize.sync().then(function () {
    var server = app.listen(config.serverPort, function(){
        var host = ip.address();
        var port = server.address().port;
        console.log('Server is listening on localhost', port);
    });
});

// Set up middleware
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Set up passport
app.use(session({ secret: 'sessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true }));

var fileUpload = require('express-fileupload');
app.use(fileUpload());

require('./server/router/routes')(app, passport);
require('./server/passport/passport')(passport); // pass passport for configuration

//Routes
// TODO: put this in 'server/router/routes.js'
app.use('/api', require('./server/router/api'));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});