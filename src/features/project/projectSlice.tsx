import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  currentProject: null,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, { payload }) => {
      state.currentProject = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
