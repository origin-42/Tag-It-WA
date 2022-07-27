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
  mutation updateDate(
    $_id: ID!
    $active: Boolean
    $resolved: Boolean
    $confirmed: Int
    $denied: Int 
  ) {
    updateDate(
      _id: $_id
      active: $active
      resolved: $resolved
      confirmed: $confirmed
      denied: $denied
    ) {
      Tag {
        active
      }
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