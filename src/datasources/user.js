const { DataSource } = require('apollo-datasource');
var db = require('../../models');

class UserAPI extends DataSource {
    constructor({ create, fetch }) {
        super();
        this.create = create;
        this.fetch = fetch;
    }

    /**
    * This is a function that gets called by ApolloServer when being setup.
    * This function gets called with the datasource config including things
    * like caches and context. We'll assign this.context to the request context
    * here, so we can know about the user making requests
    */
    initialize(config) {
        this.context = config.context;
    }

    /**
    * User can be called with an argument that includes email, but it doesn't
    * have to be. If the user is already on the context, it will use that user
    * instead
    */

    async getAllUsers() {
        const users = await db.User.getAllUsers();
        return users;
    }
}

module.exports = UserAPI;