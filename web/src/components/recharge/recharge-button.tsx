"use client";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import { useSearchParams } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import React from "react";
import { toast } from "sonner";

const RechargeButton = () => {
  const [_, setShowRechargeModal] = useQueryState(
    "recharge-modal",
    parseAsBoolean
  );
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  const searchParams = useSearchParams();
  const depositAmount = searchParams.get("deposit");

  const handleRecharge = () => {
    if (!Number(depositAmount)) {
      toast.error("Please enter valid amount");
      return;
    }
    if (!isConnected) {
      setShowRechargeModal((prev) => !prev);
    }
  };

  return (
    <>
      <button
        className="w-full py-2 bg-white text-black rounded-lg font-semibold active:scale-95 transition-transform"
        onClick={handleRecharge}
      >
        {!isConnected ? "Payment Method" : "Recharge"}
      </button>
      <p className="text-xs text-green-300">
        {isConnected &&
          `paying with ${bech32Address.substring(
            0,
            9
          )}...${bech32Address.substring(bech32Address.length - 4)}`}
      </p>
    </>
  );
};

export default RechargeButton;
