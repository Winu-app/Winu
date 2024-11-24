"use client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import { IoClose } from "react-icons/io5";
import { getClansByTournamentId } from "src/actions/tournament/get-clans-by-tournament-id";
import Logo from "../ui/logo";

const ListClans = () => {
  const tournamentId = usePathname().split("/")[3];
  const { isPending, error, data } = useQuery({
    queryKey: ["tournament-clans", tournamentId],
    queryFn: () => getClansByTournamentId(tournamentId),
    enabled: !!tournamentId,
  });

  return (
    <div className="size-full flex flex-wrap gap-4">
      {data?.tournament?.clans.map(({ _id, name, uniqueName }: any) => {
        return (
          <div
            className="w-72 min-h-12 h-fit p-1 rounded-lg bg-[#202020] flex items-center justify-between px-3"
            key={_id}
          >
            <div className="size-full flex items-center gap-4">
              <div className="size-12 flex items-center justify-center border border-active rounded-full overflow-hidden">
                <Logo className="size-full" />
              </div>
              <div>
                <p>{name}</p>
                <p className="text-xs text-gray-400">{uniqueName}</p>
              </div>
            </div>
            <button className="size-10 rounded-full border border-active shrink-0 flex items-center justify-center hover:bg-active transition-colors">
              <IoClose size={24} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListClans;
