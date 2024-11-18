import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/types";

type UserState = User & { id: string };

const initialState: UserState = {
  email: "",
  isVerified: false,
  name: "",
  username: "",
  id: "",
};

const user = createSlice({
  initialState,
  name: "User",
  reducers: (reducer) => ({
    setUser: reducer.reducer<UserState>((state, action) => {
      state.clan = action.payload.clan;
      state.coverImage = action.payload.coverImage;
      state.email = action.payload.email;
      state.isVerified = action.payload.isVerified;
      state.location = action.payload.location;
      state.name = action.payload.name;
      state.numberOfTournamentsPlayed =
        action.payload.numberOfTournamentsPlayed;
      state.profileImage = action.payload.profileImage;
      state.rank = action.payload.rank;
      state.socialLink = action.payload.socialLink;
      state.username = action.payload.username;
      state.wallets = action.payload.wallets;
      state.id = action.payload.id;
    }),
  }),
});

export const { setUser } = user.actions;
export default user.reducer;
