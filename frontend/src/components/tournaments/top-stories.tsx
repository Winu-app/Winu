import React from "react";

const TopEvents = () => {
  return (
    <div className="w-[25%]  shrink-0 h-[calc(100vh-5rem)] pb-32 pt-4 flex flex-col overflow-y-scroll overflow-x-hidden px-4 gap-2 no-scrollbar">
      <h1 className="text-xl font-semibold">Top Stories</h1>
      <div className="w-full h-96 rounded-lg border border-active shrink-0"></div>
      <div className="w-full h-96 rounded-lg border border-active shrink-0"></div>
    </div>
  );
};

export default TopEvents;
