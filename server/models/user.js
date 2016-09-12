var bcrypt   = require('bcrypt-nodejs');
var sequelizeAttributeRoles = require('sequelize-attribute-roles');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        email: { type: DataTypes.STRING}
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Role)
            }
        }
    },
        {
        freezeTableName: true,
        instanceMethods: {
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
        }

    );
    return User;

};
