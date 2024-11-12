import React from "react";
import RechargeCard from "./recharge-card";
import WithdrawCard from "./withdraw-card";
import PromotionalCard from "./promotional-card";

const Wallet = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start gap-10 pt-14">
      <div className="w-full h-32 px-60 flex flex-col gap-2">
        <p className="text-sm">Total Balance</p>
        <p className="text-4xl font-semibold">
          200 <span className="text-xl text-orange-300">coins</span>
        </p>
      </div>
      <div className="w-full flex items-center justify-center gap-10">
        <RechargeCard />
        <WithdrawCard />
        <PromotionalCard />
      </div>
    </div>
  );
};

export default Wallet;
