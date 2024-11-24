"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTournamentById } from "../../actions/tournament/get-tournament-by-id";
import Header from "./header";
import MyTeam from "./my-team";
import HostData from "./host-data";
import Clans from "./clans";

const TournamentCard = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["tournament", id],
    queryFn: () => getTournamentById(id.toString()),
  });
  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {error.message}
      </div>
    );

  return (
    <div className="size-full px-24 py-4 flex gap-10">
      <div className="w-full min-h-screen h-fit flex flex-col gap-2 pb-60">
        <Header
          image={data?.tournament?.image}
          name={data?.tournament?.name}
          description={data?.tournament?.description}
          entryFee={data?.tournament?.entryFee}
          isActive={data?.tournament?.isActive}
        />
        <HostData
          startDate={data?.tournament?.startDate}
          host={data?.tournament?.host.username}
          endDate={data?.tournament?.endDate}
          streamLink={data?.tournament?.streamLink}
          hostImage={data?.tournament?.host.image}
        />
        <Clans tournamentId={id.toString()} />
      </div>
      <MyTeam />
    </div>
  );
};

export default TournamentCard;
