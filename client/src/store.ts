import {
  configureStore,
  ThunkAction,
  Action,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { apiSlice } from './services/api';
import authReducer, {
  setCredentials,
  removeCredentials,
  selectAuthState,
} from './reducers/authSlice';

const authLocalStorageMiddleware = createListenerMiddleware();

authLocalStorageMiddleware.startListening({
  matcher: isAnyOf(setCredentials, removeCredentials),
  effect: (action, listenerApi) => {
    const authState = selectAuthState(listenerApi.getState() as RootState);
    localStorage.setItem('BoardGameBuddyAuth', JSON.stringify(authState));
  },
});

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authLocalStorageMiddleware.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
