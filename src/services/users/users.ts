import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query users {
    users {
      list {
        _id
        name
        email
        role
        coverURL
        createdAt
      }
    }
  }
`;

export const GET_USER = gql`
  query user($_id: String) {
    user(_id: $_id) {
      _id
      name
      email
      role
      coverURL
      createdAt
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String
    $email: String
    $password: String
    $coverURL: String
    $role: String
  ) { addUser(
    name: $name
    email: $email
    password: $password
    coverURL: $coverURL
    role: $role
    ) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String
    $name: String
    $email: String
    $password: String
    $coverURL: String
    $role: String
  ) { updateUser(
    _id: $_id
    name: $name
    email: $email
    password: $password
    coverURL: $coverURL
    role: $role
    ) {
      _id
    }
  }
`;