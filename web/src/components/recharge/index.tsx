"use client";
import React from "react";
import DepositAmount from "./deposit-amount";
import AddMoney from "./add-money";
import RechargeButton from "./recharge-button";
import Payments from "../payments";
import { useSearchParams } from "next/navigation";
import ConnectButton from "../soon/connect-button";

const Recharge = () => {
  const searchParams = useSearchParams();

  return (
    <div className="w-full min-h-screen flex pt-32 justify-center">
      <div className="w-[65%] flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">Deposit</h3>
        <div className="size-full flex gap-10">
          <div className="w-[35rem] shrink-0 h-fit border border-active bg-foreground rounded-lg p-4 flex flex-col gap-4 relative">
            <div className="flex flex-col gap-2 w-fit">
              <p className="text-sm"> Deposit Amount</p>
              <DepositAmount />
            </div>
            <AddMoney />
            <RechargeButton />
          </div>
          <div className="w-full h-60 border border-dashed border-active rounded-lg"></div>
        </div>
      </div>
      {searchParams.get("recharge-modal") === "true" && <Payments />}
    </div>
  );
};

export default Recharge;
