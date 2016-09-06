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
            res.json(users); // return all nerds in JSON format
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST create user
router.post('/user', function(req,res,next){
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

// DELETE user
router.delete('/users/:id', function(req,res,next){
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