"use client";
import React from "react";
import TournamentCard from "./tournament-card";
import { useQuery } from "@tanstack/react-query";
import { getAllTournaments } from "../../actions/tournament/get-all-tournaments";

const TournamentsGrid = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["tournament-list"],
    queryFn: () => getAllTournaments(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Error loading tournaments: {error.message}
      </div>
    );
  }

  return (
    <div className="w-[75%] h-full grid [grid-template-columns:repeat(auto-fill,minmax(310px,1fr))] [grid-auto-rows:220px] px-10 py-12 gap-4 overflow-y-scroll custom-scrollbar pb-52">
      {data?.tournaments?.map((tournament: any) => (
        <TournamentCard
          type="ALL_TOURNAMENTS"
          name={tournament.name}
          host={tournament.host}
          isActive={tournament.isActive}
          image={tournament.image}
          _id={tournament._id}
          key={tournament._id}
        />
      ))}
    </div>
  );
};

export default TournamentsGrid;
