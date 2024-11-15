"use client";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

const DepositAmount = () => {
  const [depositAmount, setDepositAmount] = useQueryState(
    "deposit",
    parseAsInteger
  );
  return (
    <input
      className="px-4 font-semibold py-2 bg-transparent border rounded-lg border-active no-spinner"
      type="number"
      placeholder="0"
      value={depositAmount ? depositAmount.toString() : "0"}
      onChange={(e) => {
        setDepositAmount(Number(e.target.value));
      }}
    />
  );
};

export default DepositAmount;
