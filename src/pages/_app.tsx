import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { AuthProvider } from '../contexts/AuthContext';
import client from '../config/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme} >
        <AuthProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
