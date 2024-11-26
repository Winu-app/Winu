"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query/build/modern/index.js";
import { getClansByTournamentId } from "src/actions/tournament/get-clans-by-tournament-id";
import ClanCard, { ClanCardProps } from "./clan-card";
import { useDispatch, useSelector } from "react-redux/dist/react-redux.js";
import { addPlayer } from "src/state-manager/features/my-team";
import { RootState } from "src/state-manager/store";
import { toast } from "sonner/dist/index.js";
import { usePathname } from "next/navigation.js";

const Clans = () => {
  const tournamentId = usePathname().split("/")[3];
  const { isLoading, error, data } = useQuery({
    queryKey: ["tournament-clans", tournamentId],
    queryFn: () => getClansByTournamentId(tournamentId),
  });

  if (isLoading)
    return (
      <div className="size-full min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="h-screen w-full flex gap-4 flex-wrap items-start justify-center mt-4">
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
