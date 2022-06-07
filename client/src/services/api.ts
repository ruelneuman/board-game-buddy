import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedGames } from '../types';

interface GetGamesOptions {
  page: number;
  limit: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGames: builder.query<PaginatedGames, GetGamesOptions>({
      query: ({ page, limit, name }) =>
        `/games?limit=${limit}&offset=${(page - 1) * limit}&name=${name}`,
    }),
  }),
});

export const { useGetGamesQuery } = apiSlice;
