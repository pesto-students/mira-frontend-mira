import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Iboard } from './types';
import { request } from 'app/axios';

export const fetchProject = createAsyncThunk('board/fetchProject', async () => {
  return request
    .get('/api/v1/projects/642569949ef06adb176ed64e')
    .then(({ data: { data } }) => data.data);
});

const initialState: Iboard = {
  title: 'Kanban Board',
  project: null,
  loading: true,
  error: '',
  allUsers: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchProject.pending, (state) => {
    //   state.loading = true;
    // });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      const { admins, users } = action.payload;
      state.loading = false;
      state.project = action.payload;
      state.error = '';
      state.allUsers = [...admins, ...users];
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.loading = false;
      state.project = null;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const { setTitle } = boardSlice.actions;

export default boardSlice.reducer;
