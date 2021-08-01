import { gql } from '@apollo/client';

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
    login(refreshToken: $refreshToken) {
      token
      role
      refreshToken
    }
  }
`;