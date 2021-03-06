import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      name
      email
      role
      coverURL
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      accessToken
      refreshToken
      name
      email
      coverURL
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: ID!) {
    refreshToken(refreshToken: $refreshToken) {
      role
      accessToken
      refreshToken
    }
  }
`