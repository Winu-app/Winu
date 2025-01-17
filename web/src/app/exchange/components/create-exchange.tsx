"use client";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { STABLECOIN_ADDRESS } from "src/constants/contract";

const CreateExchange = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const [name, setName] = useState("");
  const [initialFunds, setInitialFunds] = useState("");

  async function createExchange() {
    if (!name) {
      toast.error("Invalid name");
      return;
    }
    if (!initialFunds) {
      toast.error("Invalid initial funds");
      return;
    }

    setLoading(true);
    try {
      const res = await client?.execute(
        bech32Address,
        STABLECOIN_ADDRESS,
        {
          create_new_exchange: {
            name,
            initial_funds: Number(initialFunds),
            withdrawal_limit: 1000,
          },
        },
        "auto",
        "",
        []
      );
      console.log(res);
    } catch (error) {
      toast.error(
        "Failed to create exchange, check browser console for more details"
      );
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div className="w-96 h-60 flex border border-[#333333] justify-between py-3 rounded-lg bg-[#1a1a1a] flex-col px-4">
      <h4 className="font-semibold text-xl py-2 text-center">
        Create Exchange
      </h4>
      <div className="flex flex-col items-center justify-center rounded-lg overflow-hidden w-fit">
        <input
          placeholder="Exchange name"
          className="bg-transparent outline-none px-3 py-1 border-b border-[#333333]"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="">
        <input
          placeholder="Initial Funds"
          className="bg-transparent outline-none px-3 py-1 border-b border-[#333333]"
          type="number"
          onChange={(e) => setInitialFunds(e.target.value)}
        />
      </div>
      <button
        className="px-3 py-1 bg-white rounded-md flex items-center justify-center text-black font-semibold disabled:bg-gray-300"
        disabled={loading}
        onClick={createExchange}
      >
        {loading ? <Loader className="animate-spin" /> : "Create"}
      </button>
    </div>
  );
};

export default CreateExchange;
