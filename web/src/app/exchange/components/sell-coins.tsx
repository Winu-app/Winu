"use client";
import React, { useState } from "react";

const SellCoins = () => {
  const [exchange, setExchange] = useState<string>("NA");
  return (
    <div className="w-96 h-60 flex border border-[#333333] justify-between py-3 rounded-lg bg-[#1a1a1a] flex-col px-4">
      <h4 className="font-semibold text-xl py-2 text-center">
        Sell stablecoins
      </h4>
      <div className="flex flex-col items-center justify-center border border-[#333333] rounded-lg overflow-hidden w-fit">
        <select
          className="bg-[#1a1a1a] text-[#ffffff] border-none py-1 outline-none px-3"
          name="buyFromExchange"
          id="buyFromExchange"
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
        >
          <option value="NA">Select Exchange</option>
          <option value="E-Sports">E-Sports</option>
          <option value="others">Other Exchange</option>
        </select>
      </div>
      {exchange === "others" && (
        <div>
          <input
            placeholder="exchange address"
            className="bg-transparent outline-none px-3 py-1 border-b border-[#333333]"
          />
        </div>
      )}
      <div className="">
        <input
          placeholder="enter amount"
          className="bg-transparent outline-none px-3 py-1 border-b border-[#333333]"
          type="number"
        />
      </div>
      <button className="px-3 py-1 bg-white rounded-md text-black font-semibold">
        Sell
      </button>
    </div>
  );
};

export default SellCoins;
