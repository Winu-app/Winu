"use client";
import React from "react";
import { GiFlamingTrident } from "react-icons/gi";
import { useQueryState, parseAsBoolean } from "nuqs";

const ClanIcon = () => {
  const [_, setShowClan] = useQueryState("clan-modal", parseAsBoolean);
  return (
    <button
      className="rounded-full bg-foreground text-white flex items-center justify-center size-12 border border-active active:scale-95 transition-transform group"
      onClick={() => {
        setShowClan((prev) => !prev);
      }}
    >
      <div className="absolute px-2 py-0.5 text-xs left-0 group-hover:left-14 transition-all bg-active rounded-full opacity-0 group-hover:opacity-100">
        <p className="text-nowrap">Clan</p>
      </div>
      <GiFlamingTrident size={24} />
    </button>
  );
};

export default ClanIcon;
