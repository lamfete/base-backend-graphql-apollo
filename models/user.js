// Requiring bcrypt for password hashing. Using the bcryptjs version as 
// the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

// Creating our User model
// Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
    var User  = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.getAllUsers = function() {
        // console.log(token["authentication"]);
        return User.findAll();
    };

    User.getUser = function(obj) {
        // console.log(token["authentication"]);
        return User.findOne({
            where: obj,
        });
    };

    User.getSecret = function(token) {
        return token;
    }

    // Creating a custom method for our User model. 
    // This will check if an unhashed password entered by the 
    // user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password, dbPassword) {
        return bcrypt.compareSync(password, dbPassword);
    };

    // automatic method
    // untuk hash password sebelum create user
    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(
            user.password, 
            bcrypt.genSaltSync(10), 
            null
        );
    });

    // untuk hash password sebelum update user
    User.beforeBulkUpdate(function(user){
        user.attributes.password = bcrypt.hashSync(
            user.attributes.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    return User;
}