"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getClansByTournamentId } from "src/actions/tournament/get-clans-by-tournament-id";
import ClanCard, { ClanCardProps } from "./clan-card";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "src/state-manager/features/my-team";
import { RootState } from "src/state-manager/store";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const Clans = () => {
  const tournamentId = usePathname().split("/")[3];
  const { isLoading, error, data } = useQuery({
    queryKey: ["tournament-clans", tournamentId],
    queryFn: () => getClansByTournamentId(tournamentId),
  });

  return (
    <div className="h-screen w-full flex gap-4 flex-wrap items-center justify-center mt-4">
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
