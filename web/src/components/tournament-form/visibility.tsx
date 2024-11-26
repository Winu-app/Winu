"use client";
import { setVisibility } from "../../state-manager/features/tournament-form";
import { RootState } from "../../state-manager/store";
import React, { useState } from "react";
import { FaCheck, FaLock } from "react-icons/fa";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Visibility = () => {
  const { visibility } = useSelector(
    (state: RootState) => state.tournamentForm
  );
  const dispatch = useDispatch();
  const [visibilityCard, setVisibilityCard] = useState(false);

  return (
    <div
      className="w-fit backdrop-blur-lg bg-[rgba(255,255,255,0.2)] rounded-lg px-3 py-0.5 outline-none flex items-center justify-between gap-2 cursor-pointer relative"
      onClick={() => {
        setVisibilityCard((prev) => !prev);
      }}
    >
      {visibility === "PUBLIC" ? (
        <>
          <HiGlobeAsiaAustralia />
          Public
        </>
      ) : (
        <>
          <FaLock size={14} />
          Private
        </>
      )}
      <IoIosArrowDown />
      {visibilityCard && (
        <div className="absolute top-10 -left-5 rounded-lg w-fit min-w-60 h-32 border border-active bg-foreground flex flex-col overflow-hidden">
          <div
            className="size-full px-4 py-2 flex items-center gap-4 hover:bg-active"
            onClick={() => {
              dispatch(setVisibility("PUBLIC"));
            }}
          >
            <HiGlobeAsiaAustralia size={28} className="text-gray-300" />
            <div className="flex flex-col">
              <p>Public</p>
              <p className="text-xs text-gray-400">listed for bidding</p>
            </div>
            {visibility === "PUBLIC" && <FaCheck />}
          </div>
          <div
            className="size-full px-4 py-2 flex items-center gap-4 hover:bg-active"
            onClick={() => {
              setVisibility("PRIVATE");
            }}
          >
            <FaLock size={22} className="text-gray-300" />
            <div className="flex flex-col">
              <p>Private</p>
              <p className="text-xs text-gray-400">not listed for bidding</p>
            </div>
            {visibility === "PRIVATE" && <FaCheck />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visibility;
