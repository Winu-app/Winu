import React from "react";
import Search from "./search";
import TopEvents from "./top-stories";
import TournamentsGrid from "./tournaments-grid";

const Tournaments = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center ">
      <Search />
      <div className="w-full h-[calc(100vh-5rem)] flex gap-2 overflow-hidden">
        <TournamentsGrid />
        <TopEvents />
      </div>
    </div>
  );
};

export default Tournaments;
