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
  useEffect(() => {
    if (!data) return;
    console.log(data);
  }, [data]);
  return (
    <div className="size-full py-3">
      <div className="size-full-full flex items-center px-10">
        <div className="size-full pb-2">
          <Image
            src="https://t4.ftcdn.net/jpg/07/96/70/85/240_F_796708506_mb31L6OZt5Spy6G9JYOQiTmiAyt9FZms.jpg"
            alt="profile"
            width={1}
            height={1}
            className="size-20 rounded-full object-cover border border-active"
          />
          <p className="font-semibold">Clan Name</p>
          <p className="text-xs text-gray-300 w-[60%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime,
            ipsa!
          </p>
        </div>
        <button className="px-4 py-1 rounded-lg bg-white font-semibold text-black active:scale-95 transition-transform">
          Join
        </button>
      </div>
      <div className="w-full h-80 overflow-y-scroll pt-2 flex gap-2 flex-wrap custom-scrollbar">
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>
    </div>
  );
};

export default MyClan;
