import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseSignIn } from 'firebase/firebaseConfig';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await firebaseSignIn(email, password);
      const user = userCredential.user;
      const userToken = user.accessToken;
      await localStorage.setItem('userToken', userToken);

      return { userToken };
    } catch (error) {
      return rejectWithValue(
        'Incorrect password or email does not exists! Please try again.',
      );
    }
  },
);
