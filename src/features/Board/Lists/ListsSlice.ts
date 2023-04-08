import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Icard } from 'app/types';
import { request } from 'app/axios';

export const fetchCards = createAsyncThunk('Lists/fetchCards', async () => {
  const id = '6412ea879a7101f9f0017bad';
  return request
    .get(`/api/v1/projects/${id}/cards`)
    .then(({ data: { data } }) => data.data);
});

interface IinitialState {
  cards: Icard[];
  loading: boolean;
  error: string;
}

const initialState: IinitialState = { cards: [], loading: false, error: '' };

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // setTitle: (state, action) => {
    //   state.title = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.loading = false;
      state.cards = action.payload;
      state.error = '';
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.loading = false;
      state.cards = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

// export const { setTitle } = listSlice.actions;

export default listSlice.reducer;
