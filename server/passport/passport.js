var config = require('../../config.json');

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load the models
var models  = require('../models');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : config.host,
    user     : config.DBUser,
    password : config.DBPassword
});

connection.query('USE ' + config.schema);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // TODO: Do this using the model and serealize in stead of sql query.
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("select * from User where id = "+id,function(err,rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from User where email = '"+email+"'",function(err,rows){
                if (err)
                    return done(err);
                if (rows.length) {
                    // FIXME: req.flash?
                    return done(null, false, { message: 'Email taken.' });
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUserMysql = new Object();

                    newUserMysql.email    = email;
                    //newUserMysql.password = newUserMysql.generateHash(password);
                    newUserMysql.password = password;
                    newUserMysql.admin = 0;
                    // FIXME: use the generateHash function in our user model

                    models.User.create({
                        username: req.body.username,
                        password: password,
                        admin: 0,
                        email: email
                    }).then(function (result) {
                        console.log(result);
                        newUserMysql.id = result.id;

                        return done(null, newUserMysql);
                    });
                }
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM `User` WHERE `email` = '" + email + "'",function(err,rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, { message: 'Incorrect username.' }); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, { message: 'Wrong password.' }); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);

            });
        }));

};