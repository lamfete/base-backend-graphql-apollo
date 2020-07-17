// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { APP_SECRET, setToken } = require('./utils')

module.exports = {
    Query: {
        // user: (parent, args, { db }) => db.User.getUser(args),
        user: (parent, args, { db, jwt, token }) => {
            let verified = jwt.verify(token, APP_SECRET, {expiresIn: 60});

            if(verified) { return db.User.getUser(args) }
        },
        
        users: (parent, args, { db, jwt, token }) => {
            let verified = jwt.verify(token, APP_SECRET, {expiresIn: 60});

            if(verified) { return db.User.getAllUsers() }
            /*
            if(isToken) {
                verified = true;
            }

            if(isToken === "") {
                verified = false;
            }

            if(verified) { 
                message = "token authenticated";
                users = await db.User.getAllUsers();
                
            } 
            if(!verified) {
                message = "Invalid token";
                users = [];
                console.log(verified);
            }

            return {
                message: message,
                list: users
            }*/
        }
    },

    Mutation: {
        register: async(root, args, { db, jwt }) => {
            const user = await db.User.create({
                email: args.email,
                password: args.password
            }).catch(function(err){
                throw new Error('Can not create new user');
            });
            /*
            const sevenDays = 60 * 60 * 24 * 7 * 1000;
            const fifteenMins = 60 * 15 * 1000;
            const token = jwt.sign(
                {
                    userId: user.id
                },
                APP_SECRET,
                {
                    expiresIn: fifteenMins
                }
            );*/

            const token = await setToken(user.id, APP_SECRET);

            return {
                token,
                user,
            }
        },
        
        login: async(root, args, { db, bcrypt, jwt }) => {
            const user = await db.User.getUser({'email': args.email});
            if(!user) {
                throw new Error('No such user found');
            }

            const valid = await bcrypt.compare(args.password, user.password);
            if(!valid) {
                throw new Error('Invalid password');
            }

            // const token = jwt.sign({userId: user.id}, APP_SECRET);
            const token = await setToken(user.id, APP_SECRET);

            return {
                token,
                user
            }
        },

        updateUser: async(root, args, { db, bcrypt,jwt }) => {
            console.log(args.email + " | " + args.oldPassword + " | " + args.newPassword);
            var user = await db.User.update(
                {
                    'password': args.newPassword
                },
                {
                    'where': {
                        email: args.email,
                        password: args.oldPassword
                    }
                }
            )

            // Change everyone without a last name to "Doe"
            /*await User.update({ lastName: "Doe" }, {
                where: {
                    lastName: null
                }
            });*/

            if(!user) {
                throw new Error('Update failure. No such user found.');
            }

            /*const valid = await bcrypt.compare(args.oldPassword, user.password);
            if(!valid) {
                throw new Error('Invalid password');
            }*/

            user = await db.User.getUser({'email': args.email});
            if(!user) {
                throw new Error('No such user found');
            }

            // const token = jwt.sign({userId: user.id}, APP_SECRET);
            const token = await setToken(user.id, APP_SECRET);

            return {
                token,
                user
            }
        }
    },
};