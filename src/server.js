const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

var db = require('../models');


const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: { db }
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