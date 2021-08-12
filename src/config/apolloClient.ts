import { ApolloClient, createHttpLink, InMemoryCache, from, fromPromise } from "@apollo/client";
import { parseCookies, destroyCookie } from 'nookies';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { updateToken } from "../util/updateToken";

const httpLink = createHttpLink({ 
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'same-origin',
});

const errorLink = onError(({ graphQLErrors, operation, forward  }) => {
  if (graphQLErrors) 
    for (const { extensions, message } of graphQLErrors) {
      if (extensions.code === "UNAUTHENTICATED" && message === "TokenExpiredError: jwt expired") {
        const oldHeaders = operation.getContext().headers;
        const { 'ecommerce.refreshToken': refreshToken } = parseCookies();
        return fromPromise(updateToken({ refreshToken }).catch(err => console.log(err)))
          .filter(value => Boolean(value))
          .flatMap(data => {
            operation.setContext({ headers: { ...oldHeaders, authorization: data.token } });      
            return forward(operation); 
          });
      } else if (extensions.code === "UNAUTHENTICATED") {
        destroyCookie(undefined, 'ecommerce.token')
        destroyCookie(undefined, 'ecommerce.refreshToken')
      }
    }
});

const authLink = setContext((_, { headers }) => {
  let authToken: string = '';
  const { 'ecommerce.token': token } = parseCookies();
  authToken = !!token ? token : '';
	return { headers: { ...headers, authorization: authToken }};
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;