import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Th, Thead, Tr, Td, Text, useBreakpointValue, VStack, SimpleGrid } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { format } from 'date-fns';
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";
import { GET_USER, GET_USERS } from "../../services/users";
import Layout from "../../components/Layout";
import IPaginateProps from "../../config/paginateProps";

export default function users() {
  const router = useRouter();
  const pathname = router.pathname;
  const { page } = router.query;
  const [pageProps, setPageProps] = useState<IPaginateProps>();
  const setPage = useCallback((newPage = 1) => Router.push(`${pathname}?page=${newPage}`), [Router, pathname]);
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const variables = { page: Number(page), limit: 5 }
  const { data, client } = useQuery(GET_USERS, { variables });
  const prefetchData = useCallback(async (_id) => await client.query({ query: GET_USER, variables: { _id } }), [])
  
  useEffect(() => { data && setPageProps(data?.users?.paginateProps) }, [data]);
  useEffect(() => { setPage(page) }, [setPage]);

  return (
    <Layout>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">Lista de Usuários</Heading>
          <Link href="/usuarios/novo" passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="purple"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo usuário
            </Button>
          </Link>
        </Flex>

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">

          </SimpleGrid>
        </VStack>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={["4", "4", "6"]} color="gray.300" width="8">
                <Checkbox colorScheme="purple" />
              </Th>
              <Th>Usuário</Th>
              {isWideVersion && <Th>Data de Cadastro</Th>}
              <Th width="8"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data?.users?.docs.map((user) =>
              <Tr key={user._id}>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="purple" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{user.name}</Text>
                    <Text fontSize="sm" color="gray.300">{user.email}</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>{format(Number(user.createdAt), "dd/MM/yyyy")}</Td>}
                <Td>
                  <Button
                    onMouseOver={() => prefetchData(user._id)}
                    onClick={() => Router.push(`/usuarios/${user._id}`)}
                    as="a"
                    size="sm"
                    fontSize="sm"
                    color="purple.900"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    {isWideVersion ? 'Editar' : ''}
                  </Button>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        { 
          pageProps && 
          <Pagination 
            currentPage={pageProps?.page} 
            totalPages={pageProps?.totalPages} 
            totalDocs={pageProps?.totalDocs}
            limit={variables?.limit} 
            setPage={setPage} 
          />
        }
      </Box>

    </Layout>
  )
}