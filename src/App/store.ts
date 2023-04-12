import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'api/apiSlice';
import authReducer from 'features/auth/authSlice';
import projectReducer from 'features/project/projectSlice';
import filterReducer from 'features/Board/Filters/FilterSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    filterBar: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
