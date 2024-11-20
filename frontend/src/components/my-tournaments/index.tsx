"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import TournamentCard from "../tournaments/tournament-card";
import { getTournamentsByUserId } from "src/actions/tournament/get-tournaments-by-user-id";
import { getUserWithAuthToken } from "src/actions/user/get-user-with-auth-token";
import Link from "next/link";
import SignIn from "../ui/auth";

const MyTournaments = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryFn: () => getUserWithAuthToken(),
    queryKey: ["current-user"],
  });
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["my-tournament-list"],
    queryFn: () => getTournamentsByUserId(user.user._id),
    enabled: !!user?.user?._id,
  });

  if (!userLoading && !user?.user?._id) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <SignIn />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  console.log(data);
  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Error loading tournaments: {error.message}
      </div>
    );
  }

  return (
    <div className="size-full">
      <h1 className="pl-10 pt-10 font-semibold text-2xl">My Tournaments</h1>
      {data?.tournaments.length <= 0 && (
        <div className="w-full min-h-[26rem] flex items-center justify-center flex-col gap-4">
          <p className="font-semibold text-2xl">No Tournaments found!</p>
          <Link
            href="/tournament/create"
            className="px-4 py-2 bg-active rounded-lg"
          >
            Host a tournament
          </Link>
        </div>
      )}
      <div className="w-full h-full grid [grid-template-columns:repeat(auto-fill,minmax(310px,1fr))] [grid-auto-rows:220px] px-10 gap-4 pt-4 overflow-y-scroll custom-scrollbar pb-52">
        {data?.tournaments?.map((tournament: any) => (
          <TournamentCard
            name={tournament.name}
            host={tournament.host}
            isActive={tournament.isActive}
            image={tournament.image}
            _id={tournament._id}
            key={tournament._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTournaments;
