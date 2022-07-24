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
        date: Int
        criteria: String
        description: String
        active: Boolean
        resolved: Boolean
        notifyUser: Boolean
        confirmed: Int
        denied: Int
        user: User
    }

    type Comment {
        _id: ID
        description: String
        user: User
        tag: Tag
        repliedUser: User
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        tags: [ Tag ]
        tag( _id: ID! ): Tag 
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

        removeUser( _id: ID! ): User

        login( 
            username: String! 
            password: String! 
        ): Auth
        
        addTag(
            lat: Float
            lng: Float
            date: Int
            criteria: String
            description: String
            active: Boolean
            resolved: Boolean
            notifyUser: Boolean
            confirmed: Int
            denied: Int 
        ): User

        removeTag( _id: ID! ): Tag
        
        updateTag(
            _id: ID!
            active: Boolean
            resolved: Boolean
            confirmed: Int
            denied: Int 
        ): Tag

        addComment( tag: ID!, description: String! ): Tag

        removeComment( _id: ID! ): Comment
    }
`;

module.exports = typeDefs;
