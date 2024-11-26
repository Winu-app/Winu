"use client";
import { useSearchParams } from "next/navigation.js";
import { parseAsBoolean, useQueryState } from "nuqs/dist/index.js";
import React from "react";
import { toast } from "sonner/dist/index.js";

const RechargeButton = () => {
  const [_, setShowRechargeModal] = useQueryState(
    "recharge-modal",
    parseAsBoolean
  );

  const searchParams = useSearchParams();
  const depositAmount = searchParams.get("deposit");

  return (
    <button
      className="w-full py-2 bg-white text-black rounded-lg font-semibold active:scale-95 transition-transform"
      onClick={() => {
        if (!Number(depositAmount)) {
          toast.error("Please enter valid amount");
          return;
        }
        setShowRechargeModal((prev) => !prev);
      }}
    >
      Recharge
    </button>
  );
};

export default RechargeButton;
