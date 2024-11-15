import React from "react";
import TournamentDetails from "./tournament-details";

const TournamentForm = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col py-8 px-24 gap-4 items-center text-start">
      <h2 className="text-xl font-semibold w-full pl-20">Host a Tournament</h2>
      <TournamentDetails />
    </div>
  );
};

export default TournamentForm;
