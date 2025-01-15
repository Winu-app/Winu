"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import React from "react";
import { STABLECOIN_ADDRESS, TREASURY_ADDRESS } from "src/constants/contract";

const config = {
  treasury: TREASURY_ADDRESS,
  contracts: [STABLECOIN_ADDRESS],
  rpcUrl: "https://rpc.xion-testnet-1.burnt.com:443",
  // restUrl: "https://rpc.xion-testnet-1.burnt.com:443",
};

const XionAbstraction = ({ children }: { children: React.ReactNode }) => {
  return <AbstraxionProvider config={config}>{children}</AbstraxionProvider>;
};

export default XionAbstraction;
