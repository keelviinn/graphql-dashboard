import { ReactNode } from 'react';
import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface LayoutProps {
  children: ReactNode; 
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'ecommerce.token': token } = parseCookies(ctx);

  if (!token) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  return { props: {} }
}