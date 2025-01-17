"use client";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { STABLECOIN_ADDRESS } from "src/constants/contract";

const BuyFromExchange = () => {
  const [allExchanges, setAllExchanges] = useState<
    { name: string; owner: string }[]
  >([]);
  const [exchange, setExchange] = useState<string>("NA");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [exchangeLoading, setExchangeLoading] = useState<boolean>(false);
  const {
    data: { bech32Address },
    isConnected,
  } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const getAllExchanges = async () => {
    try {
      setExchangeLoading(true);
      const exchanges = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_all_exchanges: {},
      });
      console.log("Current supply:", exchanges);
      return exchanges;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    } finally {
      setExchangeLoading(false);
    }
  };

  async function buyFromExchange() {
    try {
      setLoading(true);
      const res = await client?.execute(
        bech32Address,
        STABLECOIN_ADDRESS,
        {
          buy_from_exchange: {
            amount,
            exchange_address: exchange,
          },
        },
        "auto",
        "",
        []
      );
      toast.success("Transaction successful");
      setAmount(0);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!client || !isConnected) return;
    (async () => {
      const exchanges = await getAllExchanges();
      console.log(exchanges);
      setAllExchanges(exchanges);
    })();
  }, [isConnected, client]);
  return (
    <div className="w-96 h-60 flex border border-[#333333] justify-between py-3 rounded-lg bg-[#1a1a1a] flex-col px-4">
      <h4 className="font-semibold text-xl py-2 text-center">
        Buy stablecoins
      </h4>
      <div className="flex flex-col items-center justify-center border border-[#333333] rounded-lg overflow-hidden w-fit">
        <select
          className="bg-[#1a1a1a] text-[#ffffff] border-none py-1 outline-none px-3"
          name="buyFromExchange"
          id="buyFromExchange"
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
        >
          <option value="NA">
            {exchangeLoading ? "Loading..." : "Select Exchange"}
          </option>
          {allExchanges.map(({ name, owner }) => (
            <option value={owner} key={owner}>
              {name}
            </option>
          ))}
          {!isConnected && <option value="NA">Connect Wallet</option>}
          {isConnected && <option value="others">Other Exchange</option>}
        </select>
      </div>
      {exchange === "others" && (
        <div>
          <input
            placeholder="exchange address"
            className="bg-transparent outline-none px-3 py-1 border-b border-[#333333]"
            onChange={(e) => setExchange(e.target.value)}
          />
        </div>
      )}
      <div className="">
        <input
          placeholder="enter amount"
          className="bg-transparent outline-none px-3 py-1 border-b border-[#333333]"
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button
        className="px-3 py-1 bg-white rounded-md text-black font-semibold"
        onClick={buyFromExchange}
      >
        {loading ? "loading..." : "Buy"}
      </button>
    </div>
  );
};

export default BuyFromExchange;
