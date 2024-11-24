"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getClansByTournamentId } from "src/actions/tournament/get-clans-by-tournament-id";
import ClanCard, { ClanCardProps } from "./clan-card";

const Clans = ({ tournamentId }: { tournamentId: string }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tournament-clans", tournamentId],
    queryFn: () => getClansByTournamentId(tournamentId),
  });

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const playerId = target
      .closest("[data-player]")
      ?.getAttribute("data-player");
  };
  return (
    <div
      className="h-screen w-full flex gap-4 flex-wrap items-center justify-center mt-4"
      onClick={handleClick}
    >
      {data?.tournament?.clans.map(
        ({
          _id,
          imageUrl,
          leader,
          name,
          uniqueName,
          members,
        }: ClanCardProps) => {
          return (
            <ClanCard
              _id={_id}
              key={_id}
              imageUrl={imageUrl}
              leader={leader}
              members={members}
              name={name}
              uniqueName={uniqueName}
            />
          );
        }
      )}
    </div>
  );
};

export default Clans;
