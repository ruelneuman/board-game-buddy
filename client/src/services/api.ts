import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedGames, Game } from '../types';

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
    getGame: builder.query<Game, string>({
      query: (gameId) => `/games/${gameId}`,
    }),
  }),
});

export const { useGetGamesQuery, useGetGameQuery } = apiSlice;
