import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import type { AuthUser } from '../services/api';
import type { RootState } from '../store';

const authStateSchema = z.object({
  user: z
    .object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
    })
    .nullable(),
  token: z.string().nullable(),
});

type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

function getInitialState(): AuthState {
  const defaultState = { user: null, token: null };
  const authStorage = localStorage.getItem('BoardGameBuddyAuth');

  if (authStorage === null) return defaultState;

  const parseResult = authStateSchema.safeParse(JSON.parse(authStorage));

  if (!parseResult.success) return defaultState;

  return parseResult.data;
}

const slice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectAuthState = (state: RootState) => state.auth;
