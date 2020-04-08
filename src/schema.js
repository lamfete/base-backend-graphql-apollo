const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
    }
    
    type Query {
        user(email: String!): User!
        users: [User!]!
    }

    type Mutation {
        register(email: String!, password: String!): User!
        login(email: String!, password: String!): String!
    }
`;

module.exports = typeDefs;