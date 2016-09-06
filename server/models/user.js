"use strict";
var bcrypt   = require('bcrypt-nodejs');


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Role)
            }
        }
    });
    return User;

};
