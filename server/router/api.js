// dependecies
var express = require('express');
var router= express.Router();
var models  = require('../models');

// return router
module.exports = router;

//GET all users
router.get('/users/all', function(req, res, next) {
    try {
        models.User.findAll().then(function (users) {
            res.json(users); // return all in JSON format
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

// GET one user from id
router.get('/users/:id', function(req, res, next) {
    try {
        models.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (user) {
            res.json(user);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST create user
router.post('/user', isLoggedIn, function(req,res,next){
    try{
        models.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).then(function (result) {
            models.Role.create({
                permission: req.body.permission,
                UserId: result.id
            });
            res.json(result);
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

// PUT to edit a user from id with a user object as body
router.put('/users/:id', isLoggedIn, function(req,res,next){
    try{
        models.User.findOne({ where: {id:req.params.id} }).then(function (user) {
            user.updateAttributes({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }).then(function (result) {
                res.json(result);
            });
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

// DELETE user from id
router.delete('/users/:id', isLoggedIn, function(req,res,next){
    try{
        models.User.destroy({where: {id: req.params.id} }).then(function () {
            return models.User.findAll().then(function (user) {
                res.json(user);
            })
        })
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

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