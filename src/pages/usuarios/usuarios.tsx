import { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Th, Thead, Tr, Td, Text, useBreakpointValue, Link as ChakraLink } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function users() {
  const [page, setPage] = useState(1);
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Lista de Usuários</Heading>
            <Link href="/usuarios/novo" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="purple"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
              >
                Criar novo usuário
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="purple"/>
                </Th>
                <Th>Usuário</Th>
                { isWideVersion && <Th>Data de Cadastro</Th> }
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="purple"/>
                </Td>
                <Td>
                  <Box>
                    <ChakraLink color="green.400" onMouseEnter={() => console.log('prefetchQuery')}>
                      <Text  fontWeight="bold">Kelvin Oliveira</Text>
                    </ChakraLink>
                    <Text fontSize="sm" color="gray.300">keelviinn@gmail.com</Text>
                  </Box>
                </Td>
                { isWideVersion && <Td>27 de Outubro, 2020</Td>}
                <Td>
                <Button 
                  as="a" 
                  size="sm" 
                  fontSize="sm" 
                  color="purple.900"
                  leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                >
                  { isWideVersion ? 'Editar' : '' }
                </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination currentPage={page} totalPages={20} totalCountOfRegister={200} setPage={setPage}/>
        </Box>
      </Flex >
    </Box>
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