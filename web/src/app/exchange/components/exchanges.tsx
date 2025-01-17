"use client";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import React, { useState } from "react";
import { STABLECOIN_ADDRESS } from "src/constants/contract";

const Exchanges = () => {
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const { client, logout } = useAbstraxionSigningClient();
  const [loading, setLoading] = useState<boolean>(false);

  async function getAllExchanges() {
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    try {
      const exchanges = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_all_exchanges: {},
      });
      console.log("Current supply:", exchanges);
      return exchanges;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    }
  }
  return (
    <div>
      <button onClick={getAllExchanges}>Get Exchanges</button>
    </div>
  );
};

export default Exchanges;
