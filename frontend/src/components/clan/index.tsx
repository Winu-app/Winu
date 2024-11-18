"use client";
import React from "react";
import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";
import Header from "./header";
import MyClan from "./my-clan";
import CreateClan from "./create-clan";

const Clan = () => {
  const [showClan] = useQueryState("clan-modal", parseAsBoolean);
  const [clanOption] = useQueryState("clan-option", parseAsString);
  return (
    <>
      {showClan && (
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-xl z-[100] fixed top-0">
          <div className="w-[80%] h-fit max-h-[80%]  flex flex-col items-center justify-center bg-foreground border border-active rounded-lg overflow-hidden py-2 px-4">
            <Header />
            <div className="w-full h-[30rem]">
              {clanOption === "my-clan" && <MyClan />}
              {clanOption === "create-clan" && <CreateClan />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Clan;
