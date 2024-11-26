import React from "react";
import EndTournamentButton from "./end-tournament-button";

const Header = () => {
  return (
    <div className="strick top-4 w-full h-20 flex items-center justify-between">
      <h3 className="font-semibold">End Tournament</h3>
      <EndTournamentButton />
    </div>
  );
};

export default Header;
