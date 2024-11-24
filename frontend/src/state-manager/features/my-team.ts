import { createSlice } from "@reduxjs/toolkit";

export type MyTeam = {
  userName: string;
  imageUrl?: string;
  _id: string;
};

export type TournamentForm = {
  players: MyTeam[];
};

const initialState: TournamentForm = {
  players: [],
};

const myTeam = createSlice({
  name: "my-team",
  initialState: initialState,
  reducers: (create) => ({
    addPlayer: create.reducer<MyTeam>((state, action) => {
      state.players = [...state.players, action.payload];
    }),
    removePlayer: create.reducer<{ id: string }>((state, action) => {
      const index = state.players.findIndex(
        ({ _id }) => _id === action.payload.id
      );
      state.players = state.players.splice(index, 1);
    }),
  }),
});

export const { addPlayer, removePlayer } = myTeam.actions;
export default myTeam.reducer;
