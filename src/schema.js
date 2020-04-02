const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        user: User
    }

    type Mutation {
        login(email: String): String
    }

    type User {
        id: ID!
        email: String!
    }
`;

module.exports = typeDefs;