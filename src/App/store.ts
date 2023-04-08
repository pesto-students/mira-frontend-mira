import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import filterReducer from 'features/Board/Filters/FilterSlice';
import boardReducer from 'features/Board/BoardSlice';
import listReducer from 'features/Board/Lists/ListsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    filterBar: filterReducer,
    board: boardReducer,
    card: listReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
