"use client";
import React, { useEffect } from "react";
import Visibility from "./visibility";
import Schedule from "./schedule";
import TournamentName from "./tournament-name";
import TournamentDescription from "./tournament-description";
import CreateButton from "./create-button";
import EntryFee from "./entry-fee";
import TournamentImage from "./tournament-image";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTournamentById } from "../../actions/tournament/get-tournament-by-id";
import { useDispatch } from "react-redux";
import StreamLink from "./stream-link";
import { setTournament } from "../../state-manager/features/tournament-form";
import UpdateButton from "./update-button";

const TournamentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { isPending, error, data } = useQuery({
    queryKey: ["tournament-data", id],
    queryFn: () => getTournamentById(id.toString()),
    enabled: pathname !== "/tournament/create",
  });

  useEffect(() => {
    if (!data) return;
    dispatch(setTournament(data.tournament));
  }, [data]);

  if (id && error) {
    return <div>Failed to load! refresh the page again.</div>;
  }

  if (id && isPending)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex gap-10">
      <TournamentImage />
      <div className="size-full flex flex-col gap-2">
        <Visibility />
        <TournamentName />
        <StreamLink />
        <EntryFee />
        <Schedule />
        <TournamentDescription />
        {/* TODO:: add Matches */}
        {pathname === "/tournament/create" ? (
          <CreateButton />
        ) : (
          <UpdateButton />
        )}
      </div>
    </div>
  );
};

export default TournamentDetails;
