import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedGames } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGames: builder.query<PaginatedGames, void>({
      query: () => `/games`,
    }),
  }),
});

export const { useGetGamesQuery } = apiSlice;
