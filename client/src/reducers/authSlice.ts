import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '../services/api';
import type { RootState } from '../store';

type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

const initialState: AuthState = { user: null, token: null };

const slice = createSlice({
  name: 'auth',
  initialState,
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
