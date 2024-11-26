import Link from "next/link";
import React from "react";
import { IoMdWallet } from "react-icons/io";

const RechargeCard = () => {
  return (
    <div className="w-72 h-52 rounded-lg bg-foreground border border-active flex flex-col items-stretch justify-center p-2">
      <div className="size-full flex items-center justify-center gap-4 flex-col">
        <div className="p-2 rounded-md bg-active">
          <IoMdWallet />
        </div>
        <p className="text-sm">Deposit</p>
        <p className="text-2xl font-semibold">
          1000
          <span className="text-sm text-orange-300"> coins</span>
        </p>
      </div>
      <Link
        href="/wallet/recharge"
        className="bg-white w-full text-black py-1 rounded-lg font-semibold text-center"
      >
        Recharge
      </Link>
    </div>
  );
};

export default RechargeCard;
