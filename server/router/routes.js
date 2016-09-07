/**
 * front end routes are handeled by angular in 'public/js/appRoutes.js'
 */

module.exports = function(app, passport) {
    app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
        res.send(req.user);
    });

    app.post('/login', passport.authenticate('local-login'), function (req, res) {
        res.send(req.user);
    });
    app.post('/logout', function(req, res){
        req.logOut();
        res.send(200);
    });

    app.get('/loggedin', function(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }
    else{
        res.send(401);
    }
}