import { createContext, ReactNode, useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../services/auth';

type User = { 
  email: string;
  role: string[];
  accesAreas?: string[];
}

type SignInCredentials = { 
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [loginMutation] = useMutation(LOGIN);
  const isAuthenticated = !!user;

  useEffect(() => {
    
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await loginMutation({ variables: { loginEmail: email, loginPassword: password }});
      const { role, token, refreshToken } = data?.login;

      setCookie(undefined, 'ecommerce.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      });
      setCookie(undefined, 'ecommerce.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      });

      setUser({ email, role });
      Router.push('/dashboard');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}