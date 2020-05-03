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
        register(email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }

    type AuthPayload {
        token: String
        user: User
    }
`;

module.exports = typeDefs;