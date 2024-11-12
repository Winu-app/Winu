"use client";
import React from "react";
import { useQueryState, parseAsBoolean } from "nuqs";
import Header from "./header";
import Toggle from "./toggle";

const Clan = () => {
  const [showClan, setShowClan] = useQueryState("clan-modal", parseAsBoolean);
  return (
    <>
      {showClan && (
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-xl z-[100] fixed top-0">
          <div className="w-[80%] h-[80%] flex flex-col items-center justify-center bg-foreground border border-active rounded-lg overflow-hidden py-2 px-4">
            <Header />
            <Toggle />
            <div className="size-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Clan;
