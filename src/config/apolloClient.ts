import { ApolloClient, InMemoryCache, from, fromPromise, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from 'apollo-upload-client';
import { parseCookies, destroyCookie } from 'nookies';

import { updateToken } from '../util/updateToken';

const REACT_APP_API_URL = process.env.NEXT_PUBLIC_API_URL as string; 
const REACT_APP_WS_URL = process.env.NEXT_PUBLIC_WS_URL as string;

let client: any;
const link = createUploadLink({ uri: REACT_APP_API_URL });

const defaultOptions: any = {
  watchQuery: { fetchPolicy: 'no-cache', errorPolicy: 'all' },
  query: { fetchPolicy: 'no-cache', errorPolicy: 'all' },
}

const authLink = setContext((_, { headers }) => {
  const { 'ecommerce.accessToken': accessToken } = parseCookies();
  const { 'ecommerce.refreshToken': refreshToken } = parseCookies();
  const authAccessToken = !!accessToken ? accessToken : '';
  const authAccessRefreshToken = !!refreshToken ? refreshToken : '';
	return { headers: { ...headers, accessToken: authAccessToken, refreshToken: authAccessRefreshToken }};
});

const errorLink = onError(({ graphQLErrors, operation, forward }): any => {
  if (graphQLErrors) 
    for (const { extensions, message } of graphQLErrors) {
      if ((extensions as any).code === "UNAUTHENTICATED" && message === "Context creation failed: jwt expired") {
        const oldHeaders = operation.getContext().headers;
        const refreshToken = oldHeaders.refreshToken;
        return fromPromise(updateToken({ client, refreshToken })
          .catch((err: any) => {
            destroyCookie(undefined, 'ecommerce.accessToken');
            destroyCookie(undefined, 'ecommerce.refreshToken');
          }))
          .filter(value => Boolean(value))
          .flatMap((data: any) => {
            operation.setContext({ headers: { ...oldHeaders, accessToken: data.accessToken } });      
            return forward(operation); 
          });
      } else if ((extensions as any).code === "UNAUTHENTICATED") {
        destroyCookie(undefined, 'ecommerce.accessToken');
        destroyCookie(undefined, 'ecommerce.refreshToken');
      }
    }
});

client = new ApolloClient({
  link: from([errorLink, authLink.concat(link)]),
  cache: new InMemoryCache(),
  defaultOptions,
  name: 'Dashboard',
  version: '1.0.0',
});

export default client;