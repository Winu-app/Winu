import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tournamentForm from "./features/tournament-form";


const reducer = combineReducers({ tournamentForm });

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
