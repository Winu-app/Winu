"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import React from "react";

const treasuryConfig = {
  treasury: "xion17ah4x9te3sttpy2vj5x6hv4xvc0td526nu0msf7mt3kydqj4qs2s9jhe90",
  // Optional params to activate mainnet config
  // rpcUrl: "https://rpc.xion-mainnet-1.burnt.com:443",
  // restUrl: "https://api.xion-mainnet-1.burnt.com:443",
};

const XionAbstraction = ({ children }: { children: React.ReactNode }) => {
  return (
    <AbstraxionProvider config={treasuryConfig}>{children}</AbstraxionProvider>
  );
};

export default XionAbstraction;
