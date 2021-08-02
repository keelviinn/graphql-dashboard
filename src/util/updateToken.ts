import { Observable } from '@apollo/client';
import axios from 'axios';
import Router from 'next/router';
import { setCookie, destroyCookie } from 'nookies';

export const promiseToObservable = (promise) => {
  return new Observable((subscriber) => 
    promise.then(
      (value) => {
        console.log(value)
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      }, 
      (err) => subscriber.error(err))
  )
}

export const updateToken = async ({ refreshToken }): Promise<any> => {
  try {
    return axios.post('http://localhost:8080/refresh_token', { refreshToken })
      .then(res => {
        
        setCookie(undefined, 'ecommerce.token', res.data.token, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/'
        });
        setCookie(undefined, 'ecommerce.refreshToken', res.data.refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/'
        }); 

        return res.data
      })   
  } catch (error) {
    destroyCookie(undefined, 'ecommerce.token')
    destroyCookie(undefined, 'ecommerce.refreshToken')
  }
}