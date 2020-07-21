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
        updateUser(email: String!, oldPassword: String!, newPassword: String!): AuthPayload
        deleteUser(email: String!, password: String!): deleteMessage
    }

    type AuthPayload {
        token: String
        user: User
    }

    type deleteMessage {
        message: String
    }
`;

module.exports = typeDefs;