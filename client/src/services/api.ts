import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { PaginatedGames, Game } from '../types';

export interface GetGamesOptions {
  page: number;
  limit: number;
  name: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export interface BaseLoginRequest {
  password: string;
}

export interface UsernameLoginRequest extends BaseLoginRequest {
  username: string;
}

export interface EmailLoginRequest extends BaseLoginRequest {
  email: string;
}

export type LoginRequest =
  | UsernameLoginRequest
  | EmailLoginRequest
  | (EmailLoginRequest & UsernameLoginRequest);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGames: builder.query<PaginatedGames, GetGamesOptions>({
      query: ({ page, limit, name }) =>
        `/games?limit=${limit}&offset=${(page - 1) * limit}&name=${name}`,
    }),
    getGame: builder.query<Game, string>({
      query: (gameId) => `/games/${gameId}`,
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetGamesQuery, useGetGameQuery, useLoginMutation } = apiSlice;
