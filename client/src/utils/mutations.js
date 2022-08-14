import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TAG = gql`
  mutation addTag(
    $lat: Float
    $lng: Float
    $date: String
    $image: String
    $criteria: String
    $description: String
    $active: Boolean
    $resolved: Boolean
    $notifyUser: Boolean
    $confirmed: Int
    $denied: Int
  ) {
    addTag(
      lat: $lat
      lng: $lng
      date: $date
      image: $image
      criteria: $criteria
      description: $description
      active: $active
      resolved: $resolved
      notifyUser: $notifyUser
      confirmed: $confirmed
      denied: $denied
    ) {
      _id
      criteria
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation updateTag(
    $_id: ID!
    $active: Boolean
    $resolved: Boolean
    $confirmed: Int
    $denied: Int 
  ) {
    updateTag(
      _id: $_id
      active: $active
      resolved: $resolved
      confirmed: $confirmed
      denied: $denied
    ) {
      active
      confirmed
      denied
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($_id: ID!, $description: String!, $user: ID!, $repliedUser: ID) {
    addComment(_id: $_id, description: $description, user: $user, repliedUser: $repliedUser) {
      _id
      lat
      lng
      date
      criteria
      description
      active
      resolved
      notifyUser
      confirmed
      denied
      comments {
          _id
          description
          user {
              _id
              username
          }
          date
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      username
    }
  }
`