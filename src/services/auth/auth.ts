import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      _id
      name
      email
      role
      coverURL
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginEmail: String, $loginPassword: String) {
    login(email: $loginEmail, password: $loginPassword) {
      token
      role
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String) {
    refreshToken(refreshToken: $refreshToken) {
      token
      role
      refreshToken
    }
  }
`;