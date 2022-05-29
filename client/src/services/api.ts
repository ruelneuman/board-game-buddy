import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedGames } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGames: builder.query<PaginatedGames, number>({
      query: (page) => {
        const limit = 24;
        return `/games?limit=${limit}&offset=${(page - 1) * limit}`;
      },
    }),
  }),
});

export const { useGetGamesQuery } = apiSlice;
