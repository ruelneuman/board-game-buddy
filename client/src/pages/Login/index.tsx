import React from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/api';
import { setCredentials, removeCredentials } from '../../reducers/authSlice';
import type { AppDispatch } from '../../store';

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          try {
            const loginResponse = await login({
              username: 'test',
              password: 'password',
            }).unwrap();

            dispatch(setCredentials(loginResponse));
            console.log('logged in');
          } catch (err) {
            console.log('error');
          }
        }}
      >
        set credentials
      </button>
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => {
          dispatch(removeCredentials());
          console.log('logged out');
        }}
      >
        remove credentials
      </button>
    </>
  );
}

export default Login;
