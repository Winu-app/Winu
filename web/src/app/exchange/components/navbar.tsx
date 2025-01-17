"use client";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import React, { useEffect, useState } from "react";
import { IoMdWallet } from "react-icons/io";
import { STABLECOIN_ADDRESS } from "src/constants/contract";

const Navbar = () => {
  const [winuBalance, setWinuBalance] = useState(0);
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  const { client, logout } = useAbstraxionSigningClient();
  const [loading, setLoading] = useState<boolean>(false);

  const getBalance = async () => {
    try {
      setLoading(true);
      const balance = await client?.queryContractSmart(STABLECOIN_ADDRESS, {
        get_user_balance: { address: bech32Address },
      });
      console.log(balance);
      return balance;
    } catch (error) {
      console.error("Failed to get balance:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const [, setShowModal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useModal();

  const connect = async () => {
    if (isConnected && logout) {
      logout();
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (isConnected && client) {
      getBalance().then((balance) => {
        setWinuBalance(balance);
      });
    }
  }, [isConnected, client]);
  return (
    <div className="w-full fixed top-0 h-12 flex items-center justify-between px-20">
      Winu coins
      <div
        className="flex items-center gap-2 border px-4 py-1 rounded-md bg-[#1a1a1a] border-[#333333] relative group justify-center cursor-pointer"
        onClick={connect}
      >
        <Abstraxion
          onClose={() => {
            setShowModal(false);
          }}
        />
        {isConnecting && "Connecting..."}
        {!bech32Address && !isConnecting && "Connect"}
        {bech32Address && (
          <>
            <IoMdWallet size={24} />
            {winuBalance}
            <div className="absolute top-10 bg-[#1a1a1a] px-4 py-1 invisible transition-all group-hover:visible rounded-md border-[#333333] border">
              {`${bech32Address.substring(0, 6)}...${bech32Address.substring(
                bech32Address.length - 3
              )}`}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
