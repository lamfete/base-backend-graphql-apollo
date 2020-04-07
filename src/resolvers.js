module.exports = {
    Query: {
        // user: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers()
        users: (parent, args, { db }, info) => db.User.getAllUsers(),
    },
};