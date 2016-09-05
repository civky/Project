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