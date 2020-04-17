var db = require("../models");

module.exports = {
    Query: {
        user: (parent, args, { db }, info) => db.User.getUser(args),
        users: (parent, args, { db }, info) => db.User.getAllUsers(),
    },

    Mutation: {
        register: (root, args) => {
            const user = {
                email: args.email,
                password: args.password
            }
            db.User.create({
                // id: 6,
                email: user.email,
                password: user.password
            });
            return user;
        }
        
        /*login: (root, args, context) => {
            // generate token for the user 

            return context.token
        }*/
    },
};