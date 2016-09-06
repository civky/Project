/**
 * front end routes are handeled by angular in 'public/js/appRoutes.js'
 */

module.exports = function(app, passport) {
    app.post('/signup', passport.authenticate('local-signup', { session: false }), function(req, res) {
        res.send(req.user);
    });

    app.post('/login', passport.authenticate('local-login', { session: false }), function (req, res) {
        res.send(req.user);
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}