import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { postMethod } from '../methods';
import { routes } from '../routes/routes';
import { LoginBody, LoginResp } from './authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginResp, LoginBody>({
      query: data => postMethod(routes.LOGIN, data),
    }),
  }),
});

export const { useLoginMutation } = authApi;
