const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('../models');
const auth = require('./auth');
const { APP_SECRET, getUserId } = require('./utils')

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    /*context: { 
        db, 
        bcrypt, 
        jwt,
    }*/
    context: async ({ req }) => {
        const token = await req.headers["authentication"];
        // console.log(token);
        return {
            db,
            bcrypt,
            jwt,
            token,
        }
    },
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/public"));

db.sequelize.sync().then(function() {
    console.log("database initialize");
    // server.listen().then(({ url }) => {
    //     console.log(`🚀 Server ready at ${url}`);
    // });
});

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);