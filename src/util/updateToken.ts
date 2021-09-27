import { setCookie } from 'nookies';

import { REFRESH_TOKEN } from '../services/auth/auth';

export async function updateToken({ client, refreshToken }: any) {
  return client.query({ query: REFRESH_TOKEN, variables: { refreshToken } })
    .then(({ data }: any) => {
      const { refreshToken } = data;
      setCookie(undefined, 'ecommerce.accessToken', refreshToken.accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      });
      setCookie(undefined, 'ecommerce.refreshToken', refreshToken.refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      }); 
      
      return { accessToken: refreshToken.accessToken, refreshToken: refreshToken.accessToken };
  });
}