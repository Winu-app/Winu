"use client";
import React from "react";
import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";
import Header from "./header";
import MyClan from "./my-clan";
import CreateClan from "./create-clan";
import { useQuery } from "@tanstack/react-query";
import { getUserWithAuthToken } from "src/actions/user/get-user-with-auth-token";
import Auth from "../ui/auth";
import { IoClose } from "react-icons/io5";

const Clan = () => {
  const [showClan, setShowClan] = useQueryState("clan-modal", parseAsBoolean);
  const [clanOption] = useQueryState("clan-option", parseAsString);
  const { data: user, isLoading: userLoading } = useQuery({
    queryFn: () => getUserWithAuthToken(),
    queryKey: ["current-user"],
  });

  return (
    <>
      {showClan && (
        <div className="w-full h-screen flex items-center justify-center backdrop-blur-xl z-[100] fixed top-0">
          <div className="w-[80%] h-fit max-h-[80%]  flex flex-col items-center justify-center bg-foreground border border-active rounded-lg overflow-hidden py-2 px-4">
            {!user?.user ? (
              <div className="w-full h-[30rem] flex items-center justify-center flex-col">
                <div className="w-full flex justify-between items-center">
                  <div className="size-full" />
                  <button
                    className="rounded-full hover:bg-active flex items-center justify-between p-2"
                    onClick={() => setShowClan(false)}
                  >
                    <IoClose size={20} />
                  </button>
                </div>
                <Auth />
              </div>
            ) : (
              <>
                <Header />
                <div className="w-full h-[30rem]">
                  {clanOption === "my-clan" && <MyClan />}
                  {clanOption === "create-clan" && <CreateClan />}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Clan;
