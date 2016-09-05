"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define("Role", {
        permission: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Role.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Role;
};
