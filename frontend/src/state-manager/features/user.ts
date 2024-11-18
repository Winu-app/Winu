import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/types";

const initialState: User = {
  email: "",
  isVerified: false,
  name: "",
  username: "",
};

const user = createSlice({
  initialState,
  name: "User",
  reducers: (reducer) => ({
    setUser: reducer.reducer<User>((state, action) => {
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
    }),
  }),
});

export const { setUser } = user.actions;
export default user.reducer;
