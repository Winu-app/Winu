import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TournamentForm from "./features/tournament-form";
import MyTeam from "src/components/tournament/my-team";

const reducer = combineReducers({ TournamentForm, MyTeam });

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
