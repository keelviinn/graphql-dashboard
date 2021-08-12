import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/Form/Input';
import { ADD_USER } from "../../services/users";
import Layout from "../../components/Layout";

type AddUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const addUserFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatório').min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: Yup.string()
    .when('password', (password, field) => password ? field.required('Confirmação de senha obrigatório')
      .oneOf([Yup.ref('password')], 'Senhas devem ser iguais') : field
    )
})

export default function CreateUser() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(addUserFormSchema) })
  const [addUserMutation, { loading, error }] = useMutation(ADD_USER)

  const handleAddUser: SubmitHandler<AddUserFormData> = async (values) => {
    const { name, email, password } = values
    const { data } = await addUserMutation({ variables: { name, email, password } })
    const id = data?.addUser._id;
    router.push(`/usuarios/${id}`);
  }

  return (
    <Layout>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={["6", "8"]}
        onSubmit={handleSubmit(handleAddUser)}
      >
        <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
            <Input name="name" label="Nome Completo" error={formState.errors.name} {...register("name")} />
            <Input name="email" label="E-mail" type="email" error={formState.errors.email} {...register("email")} />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
            <Input name="password" label="Senha" type="password" error={formState.errors.password} {...register("password")} />
            <Input name="password_confirmation" label="Confirmação de Senha" type="password" error={formState.errors.password_confirmation} {...register("password_confirmation")} />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/usuarios" passHref>
              <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
            <Button type="submit" colorScheme="purple" isLoading={formState.isSubmitting}>Salvar</Button>
          </HStack>
        </Flex>
      </Box>

    </Layout>
  )
}