import { createContext, ReactNode, useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { CURRENT_USER, LOGIN } from '../services/auth';

type User = { 
  email: string;
  name: string;
  role: string[];
  accesAreas?: string[];
  coverURL?: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [loginMutation, { error: loginError }] = useMutation(LOGIN);
  const [ currentUserMutation, { loading, data } ] = useLazyQuery(CURRENT_USER)
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'ecommerce.token': token } = parseCookies();
    if (token) currentUserMutation()
    else if (!token) Router.push('/')
  }, [])

  useEffect(() => data?.currentUser && setUser(data?.currentUser), [data])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await loginMutation({ variables: { loginEmail: email, loginPassword: password }});
      const { user: { role, name, coverURL }, token, refreshToken } = data?.login;
      setCookie(undefined, 'ecommerce.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      });
      setCookie(undefined, 'ecommerce.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      });

      setUser({ email, role, name, coverURL });
      Router.push('/dashboard');
    } catch {
      toast.error(JSON.stringify(loginError.message))
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}