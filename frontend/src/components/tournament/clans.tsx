"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getClansByTournamentId } from "src/actions/tournament/get-clans-by-tournament-id";
import ClanCard, { ClanCardProps } from "./clan-card";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "src/state-manager/features/my-team";
import { RootState } from "src/state-manager/store";
import { toast } from "sonner";

const Clans = ({ tournamentId }: { tournamentId: string }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tournament-clans", tournamentId],
    queryFn: () => getClansByTournamentId(tournamentId),
  });
  const { players: myTeamPlayers } = useSelector(
    (state: RootState) => state.myTeam
  );

  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    const playerId = target
      ?.closest("[data-player-id]")
      ?.getAttribute("data-player-id");
    const username = target
      ?.closest("[data-player-username]")
      ?.getAttribute("data-player-username");
    const imageUrl = target
      ?.closest("[data-player-id]")
      ?.getAttribute("data-player-imageUrl");

    console.log("playerId", playerId);
    console.log("username", username);
    console.log("imageUrl", imageUrl);

    if (!playerId) return;
    if (!username) return;

    const index = myTeamPlayers.findIndex(({ _id }) => _id === playerId);
    console.log("🚀 ~ handleClick ~ index:", index);

    if (index >= 0) {
      toast.error("Player already Added!");
      return;
    }

    dispatch(
      addPlayer({
        _id: playerId,
        username,
        imageUrl: imageUrl || undefined,
      })
    );
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
