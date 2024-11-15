"use client";
import React from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const HostTournamentIcon = () => {
  return (
    <Link
      href="/tournament/create"
      className="rounded-full bg-foreground text-white flex items-center justify-center size-12 border border-active active:scale-95 transition-transform group"
    >
      <div className="absolute px-2 py-0.5 text-xs left-0 group-hover:left-14 transition-all bg-active rounded-full opacity-0 group-hover:opacity-100">
        <p className="text-nowrap">Host tournament</p>
      </div>
      <FiPlus size={24} />
    </Link>
  );
};

export default HostTournamentIcon;
