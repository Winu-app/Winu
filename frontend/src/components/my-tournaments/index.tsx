"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import TournamentCard from "../tournaments/tournament-card";
import { getTournamentsByUserId } from "src/actions/tournament/get-tournaments-by-user-id";

const MyTournaments = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["my-tournament-list"],
    queryFn: () => getTournamentsByUserId("672e5565b4faf4fb87827250"),
  });

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
