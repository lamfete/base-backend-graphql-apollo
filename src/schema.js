const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
    }
    
    type Query {
        users: [User!]!
    }

    type Mutation {
        login(email: String): String
    }
`;

module.exports = typeDefs;