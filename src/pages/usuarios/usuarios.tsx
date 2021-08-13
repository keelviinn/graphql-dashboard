import { Box, Button, Checkbox, Icon, Table, Tbody, Th, Thead, Tr, Td, Text, useBreakpointValue, Grid, GridItem, Avatar, Center } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { format } from 'date-fns';
import { RiDeleteBackLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";
import { GET_USER, GET_USERS } from "../../services/users";
import Layout from "../../components/Layout";
import IPaginateProps from "../../config/paginateProps";
import ListHeader from "../../components/ListHeader";

export default function Users() {
  const router = useRouter();
  const pathname = router.pathname;
  const { page } = router.query;
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const [pageProps, setPageProps] = useState<IPaginateProps>();
  const setPage = useCallback((newPage = 1) => Router.push(`${pathname}?page=${newPage}`), [Router, pathname]);
  const variables = useMemo(() => ({ page: Number(page), limit: 5 }), [page]) 
  const { data, client } = useQuery(GET_USERS, { variables });
  const prefetchData = useCallback(async (_id) => await client.query({ query: GET_USER, variables: { _id } }), [client])
  
  useEffect(() => { data && setPageProps(data?.users?.paginateProps) }, [data]);
  useEffect(() => { setPage(page) }, [setPage]);

  return (
    <Layout>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <ListHeader pageNamePlural="Usuarios" pageNameSingle="usuário" />

        { pageProps && 
          <Pagination 
            currentPage={pageProps?.page} 
            totalPages={pageProps?.totalPages} 
            totalDocs={pageProps?.totalDocs}
            limit={variables?.limit} 
            setPage={setPage} 
          />
        }
      
        {[1, 2, 3].map((item) => {
          return (
            <Grid templateColumns="55px 1fr 1fr 1fr 40px 40px" gap={2} p="3" >
              <GridItem p="1" mt="auto" mb="auto">
                <Avatar size="sm" />            
              </GridItem>
              <GridItem p="1" mt="auto" mb="auto">
                <Text color="gray.500" fontSize="small">Nome</Text>
                <Text fontWeight="bold">Kelvin Oliveira</Text>
              </GridItem>
              <GridItem p="1" mt="auto" mb="auto">
                <Text color="gray.500" fontSize="small">Email</Text>
                <Text fontWeight="bold">keelviinn@gmail.com</Text>
              </GridItem>
              <GridItem p="1" mt="auto" mb="auto">
                <Text color="gray.500" fontSize="small">Permissão</Text>
                <Text fontWeight="bold">administrador</Text>
              </GridItem>
              <GridItem p="1" mt="auto" mb="auto">
                <Button
                  // onMouseOver={() => prefetchData(user._id)}
                  // onClick={() => Router.push(`/usuarios/${user._id}`)}
                  as="a"
                  size="sm"
                  fontSize="sm"
                  color="purple.900"
                >
                  <Icon as={RiPencilLine} fontSize="16" />
                </Button>
              </GridItem>
              <GridItem p="1" mt="auto" mb="auto">
                <Button
                  // onMouseOver={() => prefetchData(user._id)}
                  // onClick={() => Router.push(`/usuarios/${user._id}`)}
                  as="a"
                  size="sm"
                  fontSize="sm"
                  bgColor="gray.600"
                  color="pink.500"
                >
                  <Icon as={RiDeleteBinLine} fontSize="16" />
                </Button>
              </GridItem>
            </Grid>
          )
        })}

        <Table colorScheme="whiteAlpha" mt="6">
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

        { pageProps && 
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