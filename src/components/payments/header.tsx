"use client";
import { parseAsBoolean, useQueryState } from "nuqs";
import React from "react";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [_, setShowRechargeModal] = useQueryState(
    "recharge-modal",
    parseAsBoolean
  );
  return (
    <div className="w-full h-10 flex items-center justify-between">
      <p> Payment Method</p>
      <button
        className="p-2 rounded-full hover:bg-active"
        onClick={() => setShowRechargeModal(false)}
      >
        <IoClose />
      </button>
    </div>
  );
};

export default Header;
