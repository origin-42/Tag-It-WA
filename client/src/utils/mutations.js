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
    $lat: Float!
    $lng: Float!
    $date: Int!
    $criteria: String!
    $description: String!
    $active: Boolean!
    $resolved: Boolean!
    $notifyUser: Boolean!
    $confirmed: Int!
    $denied: Int!
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
      tag
    }
  }
`;