const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String 
        tags: [ Tag ]
        comments: [ Comment ]
    }

    type Tag {
        _id: ID
        lat: Float 
        lng: Float 
        date: String
        Image: String
        criteria: String!
        description: String
        active: Boolean
        resolved: Boolean
        notifyUser: Boolean
        confirmed: Int
        denied: Int
        user: User
        comments: [ Comment ]
    }

    type Comment {
        _id: ID
        description: String
        user: User
        tag: Tag
        repliedUser: User
        date: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        queryAUser: User
        tags: [ Tag ]
        getAllTags: [ User ]
        tag( _id: ID ): Tag 
        getCriteria( criteria: String! ): [ Tag ]
        comments: [ Comment ]
        comment( _id: ID! ): Comment 
    }

    type Mutation {
        addUser( 
            username: String! 
            email: String 
            password: String! 
        ): Auth

        updateUser( 
            _id: ID!
            username: String
            email: String  
        ): User

        removeUser( username: String! ): User

        login( 
            username: String! 
            password: String! 
        ): Auth
        
        addTag(
            lat: Float
            lng: Float
            date: String
            image: String
            criteria: String
            description: String
            active: Boolean
            resolved: Boolean
            notifyUser: Boolean
            confirmed: Int
            denied: Int 
        ): Tag

        removeTag( _id: ID! ): Tag
        
        updateTag(
            _id: ID!
            active: Boolean
            resolved: Boolean
            confirmed: Int
            denied: Int 
        ): Tag

        addComment( _id: ID!, description: String!, user: ID!, repliedUser: ID ): Tag

        removeComment( _id: ID! ): Comment
    }
`;

module.exports = typeDefs;
