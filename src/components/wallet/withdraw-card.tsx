import Link from "next/link";
import React from "react";
import { FaTrophy } from "react-icons/fa";

const WithdrawCard = () => {
  return (
    <div className="w-72 h-52 rounded-lg bg-foreground border border-active flex flex-col items-stretch justify-center p-2">
      <div className="size-full flex items-center justify-center gap-4 flex-col">
        <div className="p-2 rounded-md bg-active">
          <FaTrophy />
        </div>
        <p className="text-sm">Winnings</p>
        <p className="text-2xl font-semibold">
          600
          <span className="text-sm text-orange-300"> coins</span>
        </p>
      </div>
      <Link
        href="wallet/withdraw"
        className="bg-white w-full text-black py-1 rounded-lg font-semibold text-center"
      >
        Withdraw
      </Link>
    </div>
  );
};

export default WithdrawCard;
