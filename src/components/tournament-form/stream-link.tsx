"use client";
import { setStreamLink } from "@/state-manager/features/tournament-form";
import { RootState } from "@/state-manager/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const StreamLink = () => {
  const { streamLink } = useSelector(
    (state: RootState) => state.tournamentForm
  );
  const dispatch = useDispatch();
  return (
    <input
      className="bg-transparent outline-none px-2"
      placeholder="Live stream link"
      value={streamLink}
      onChange={(e) => {
        dispatch(setStreamLink(e.target.value));
      }}
    />
  );
};

export default StreamLink;
