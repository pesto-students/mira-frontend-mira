import { createSlice } from '@reduxjs/toolkit';
import { Ifilters } from '../types';

const initialState: Ifilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const filterSlice = createSlice({
  name: 'board/filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      console.log('action', action);
      state.searchTerm = action.payload;
    },
    setUserIds: (state, action) => {
      state.userIds = action.payload;
    },
    setMyOnly: (state, action) => {
      state.myOnly = action.payload;
    },
    setRecent: (state, action) => {
      state.recent = action.payload;
    },
    setClearAll: () => initialState,
  },
});

export const { setSearchTerm, setUserIds, setMyOnly, setRecent, setClearAll } =
  filterSlice.actions;

export default filterSlice.reducer;
