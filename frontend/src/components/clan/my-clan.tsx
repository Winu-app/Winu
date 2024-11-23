"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import PlayerCard from "./player-card";
import { useQuery } from "@tanstack/react-query";
import { getClanById } from "src/actions/clan/get-clan-by-id";
import { getUserWithAuthToken } from "src/actions/user/get-user-with-auth-token";

const MyClan = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryFn: () => getUserWithAuthToken(),
    queryKey: ["current-user"],
  });
  const { data, isLoading } = useQuery({
    queryKey: ["my-clan"],
    queryFn: () => getClanById(user?.user?.clan),
    enabled: !!user?.user,
  });

  return (
    <div className="size-full py-3">
      {isLoading && (
        <div className="size-full flex items-center justify-center">
          Loading..
        </div>
      )}
      {!isLoading && !data?.clan && (
        <div className="size-full flex items-center justify-center">
          You have not joined any clan!
        </div>
      )}
      {data?.clan && (
        <>
          <div className="size-full-full flex items-center px-10">
            <div className="size-full pb-2">
              <Image
                src={data.clan.imageUrl}
                alt={data.clan.name}
                width={1}
                height={1}
                className="size-20 rounded-full object-contain border border-active"
              />
              <p className="font-semibold">{data.clan.name}</p>
              <p className="text-xs text-gray-300 w-[60%]">
                {data.clan.description}
              </p>
            </div>
            <button className="px-4 py-1 rounded-lg bg-white font-semibold text-black active:scale-95 transition-transform">
              Join
            </button>
          </div>
          <div className="w-full h-80 overflow-y-scroll pt-2 flex gap-2 flex-wrap custom-scrollbar">
            {data.clan.leader && (
              <PlayerCard
                name={data.clan.leader.username}
                position="Leader"
                image={data.clan.leader.imageUrl}
                key=""
              />
            )}
            {data?.clan?.coLeaders.map(
              ({
                imageUrl,
                username,
              }: {
                username: string;
                imageUrl: string;
              }) => {
                return (
                  <PlayerCard
                    name={username}
                    position="Leader"
                    image={imageUrl}
                    key={username + "co-leader"}
                  />
                );
              }
            )}
            {data?.clan?.members.map(
              ({
                imageUrl,
                username,
              }: {
                username: string;
                imageUrl: string;
              }) => {
                return (
                  <PlayerCard
                    name={username}
                    position="Leader"
                    image={imageUrl}
                    key={username + "member"}
                  />
                );
              }
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyClan;
