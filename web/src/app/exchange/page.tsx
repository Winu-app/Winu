"use client";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import React, { useEffect, useState } from "react";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { STABLECOIN_ADDRESS } from "src/constants/contract";
import ConnectButton from "./components/connect-button";
import Navbar from "./components/navbar";
import BuyFromExchange from "./components/buy-from-exchange";
import SellCoins from "./components/sell-coins";
import CreateExchange from "./components/create-exchange";
import Exchanges from "./components/exchanges";

const ExchangePage = () => {
  const [activeSection, setActiveSection] = useState<
    "Buy" | "Sell" | "Create" | "Exchanges"
  >("Buy");

  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const { client, logout } = useAbstraxionSigningClient();
  const [loading, setLoading] = useState<boolean>(false);

  async function getSupply() {
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    try {
      const supply = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_supply: {},
      });
      console.log("Current supply:", supply);
      return supply;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    }
  }
  async function getExchange() {
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    try {
      const supply = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_exchange: { owner: bech32Address },
      });
      console.log("Current supply:", supply);
      return supply;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    }
  }
  async function getUserBalance() {
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    try {
      const supply = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_user_balance: { address: bech32Address },
      });
      console.log("Current supply:", supply);
      return supply;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    }
  }
  async function getExchangeBalance() {
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    try {
      const supply = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_exchange_balance: { address: bech32Address },
      });
      console.log("Current supply:", supply);
      return supply;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    }
  }
  async function getPegPrice() {
    if (!client) {
      throw new Error("Client is not initialized.");
    }

    try {
      const supply = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_peg_price: {},
      });
      console.log("Current supply:", supply);
      return supply;
    } catch (error) {
      console.error("Failed to query GetSupply:", error);
      throw error;
    }
  }

  async function mint() {
    setLoading(true);
    try {
      await client?.execute(
        bech32Address,
        STABLECOIN_ADDRESS,
        { mint: { amount: 10.0 } },
        "auto",
        "",
        []
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  async function deposit() {
    setLoading(true);
    try {
      const res = await client?.execute(
        bech32Address,
        STABLECOIN_ADDRESS,
        { deposit: { amount: 10.0 } },
        "auto",
        "",
        []
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  async function sellToExchange() {
    setLoading(true);
    try {
      const res = await client?.execute(
        bech32Address,
        STABLECOIN_ADDRESS,
        {
          sell_to_exchange: {
            amount: 2,
            exchange_address:
              "xion1vjaln2nwg4909sf9d9u8y3fesqjvuqltmyvrkd5hjzrnvsmfv5qqxmslkq",
          },
        },
        "auto",
        "",
        []
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function transferFunds() {
    setLoading(true);
    try {
      const res = await client?.execute(
        bech32Address,
        STABLECOIN_ADDRESS,
        {
          transfer_funds: {
            amount: [
              {
                denom: "uxion",
                amount: "100",
              },
            ],
            recipient:
              "xion1vjaln2nwg4909sf9d9u8y3fesqjvuqltmyvrkd5hjzrnvsmfv5qqxmslkq",
          },
        },
        "auto",
        "",
        [
          {
            denom: "uxion",
            amount: "100",
          },
        ]
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col relative gap-10">
      <Navbar />
      {!isConnected && (
        <p className="text-red-500 animate-pulse">Please connect your wallet</p>
      )}
      <div className="w-full h-fit flex items-center justify-center gap-10">
        <button
          className={`px-3 py-1.5 ${
            activeSection === "Buy" ? "bg-[#1a1a1a]" : ""
          } border-[#333333] border rounded-md`}
          onClick={() => setActiveSection("Buy")}
        >
          Buy coins
        </button>
        <button
          className={`px-3 py-1.5 ${
            activeSection === "Sell" ? "bg-[#1a1a1a]" : ""
          } border-[#333333] border rounded-md`}
          onClick={() => setActiveSection("Sell")}
        >
          Sell coins
        </button>
        <button
          className={`px-3 py-1.5 ${
            activeSection === "Create" ? "bg-[#1a1a1a]" : ""
          } border-[#333333] border rounded-md`}
          onClick={() => setActiveSection("Create")}
        >
          Create Exchange
        </button>
        {/* <button
          className={`px-3 py-1.5 ${
            activeSection === "Exchanges" ? "bg-[#1a1a1a]" : ""
          } border-[#333333] border rounded-md`}
          onClick={() => setActiveSection("Exchanges")}
        >
          All Exchanges
        </button> */}
      </div>
      {activeSection == "Buy" && <BuyFromExchange />}
      {activeSection == "Sell" && <SellCoins />}
      {activeSection == "Create" && <CreateExchange />}
      {/* {activeSection == "Exchanges" && <Exchanges />} */}
    </div>
  );
};

export default ExchangePage;
