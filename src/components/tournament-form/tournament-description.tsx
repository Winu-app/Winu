import { setDescription } from "@/state-manager/features/tournament-form";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TournamentDescription = () => {
  const { description } = useSelector(
    (state: RootState) => state.tournamentForm
  );
  const dispatch = useDispatch();

  return (
    <textarea
      className="text-sm bg-transparent outline-none border rounded-lg border-active p-4 resize-none h-32 no-scrollbar"
      placeholder="Description"
      value={description}
      onChange={(e) => {
        dispatch(setDescription(e.target.value));
      }}
    />
  );
};

export default TournamentDescription;
