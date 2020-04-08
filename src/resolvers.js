module.exports = {
    Query: {
        user: (parent, args, { db }, info) => db.User.getUser(args),
        users: (parent, args, { db }, info) => db.User.getAllUsers(),
    },

    /*Mutation: {
        async register (root, { email, password }) {
            // { email, password } this is coming from the args(arguments) that are passed down when registering 
            let user = db.User();
            user.email = email;
        },
        login: (root, args, context) => {
            // generate token for the user 

            return context.token
        }
    },*/
};