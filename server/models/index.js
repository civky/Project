
var fs        = require("fs");
var path      = require("path");
var Sequelize = require('sequelize');

var config = require('../../config.json');

var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}

var sequelize = new Sequelize(config.schema, config.DBUser, config.DBPassword,opts);
var db        = {};

// don't understand what this is. Comes from ayudantia2
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;