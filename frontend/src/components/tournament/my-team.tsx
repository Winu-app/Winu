"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/state-manager/store";
import Logo from "../ui/logo";

const MyTeam = () => {
  const { players } = useSelector((state: RootState) => state.myTeam);

  return (
    <div className="w-80 min-h-96 h-fit rounded-lg bg-foreground border-active border shrink-0 sticky top-4 gap-4 flex flex-col py-2 justify-between">
      <div className="w-full flex items-center justify-center text-xl font-semibold">
        My Team
      </div>
      <div className="size-full flex gap-4 flex-wrap px-2 items-center justify-center max-h-[32rem] overflow-y-scroll custom-scrollbar">
        {players.length <= 0 && (
          <div className="size-full flex items-center justify-center">
            Add Players!
          </div>
        )}
        {players.map(({ _id, username, imageUrl }) => {
          return (
            <div
              className="flex gap-2 flex-col items-center cursor-pointer"
              data-player-id={_id}
              key={`my-team-${_id}`}
            >
              <div className="size-12 rounded-full overflow-hidden border border-active flex items-center justify-center">
                <Logo className="size-full" />
              </div>
              <div className="text-xs text-center">
                <p>{username}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full px-4">
        <button
          className="w-full bg-white rounded-lg text-black font-semibold py-2 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95 transition-transform"
          disabled={players.length <= 0}
        >
          Join Pool
        </button>
      </div>
    </div>
  );
};

export default MyTeam;
