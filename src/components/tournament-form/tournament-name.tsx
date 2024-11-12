import { setName } from "@/state-manager/features/tournament-form";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TournamentName = () => {
  const { name } = useSelector((state: RootState) => state.tournamentForm);
  const dispatch = useDispatch();
  return (
    <input
      className="text-5xl bg-transparent outline-none font-semibold"
      placeholder="Tournament Name"
      value={name}
      onChange={(e) => {
        dispatch(setName(e.target.value));
      }}
    />
  );
};

export default TournamentName;
