import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../customFetchBaseQuery';
import { getMethod, postMethod } from '../methods';
import { routes } from '../routes/routes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['profile'],
  endpoints: builder => ({
    logoutUser: builder.mutation({
      query: data => postMethod(routes.LOGOUT, data),
      invalidatesTags: ['profile'],
    }),
    getShipments: builder.mutation<void, void>({
      query: data => postMethod(routes.GETSHIPMENT, data),
    }),
    getShipmentStatus: builder.mutation<void, void>({
      query: data => postMethod(routes.GETSHIPMENTSTATUS, data),
    }),
  }),
});

export const {
  useLogoutUserMutation,
  useGetShipmentStatusMutation,
  useGetShipmentsMutation,
} = userApi;
