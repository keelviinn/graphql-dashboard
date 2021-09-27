import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/AuthContext';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatório').min(6, 'Minimo 6 caracteres')
})

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(signInFormSchema) });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => { 
    await signIn(data);
  }

  return (
    <Flex w="100w" h="100vh" align="center" justify="center">
      <Flex 
        as="form" 
        width="100%" 
        maxWidth={360} 
        bg="gray.800" 
        p="8" 
        borderRadius={8} 
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
            <Input name="email" label="E-mail" type="email" error={formState.errors.email} {...register("email")} />
            <Input name="password" label="Senha" type="password" error={formState.errors.password} {...register("password")} />
        </Stack>

        <Button type="submit" mt="6" colorScheme="purple" size="lg" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'ecommerce.accessToken': accessToken } = parseCookies(ctx);

  if (accessToken) return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }

  return { props: {} } 
}