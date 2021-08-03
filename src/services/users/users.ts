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