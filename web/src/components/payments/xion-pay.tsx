"use client";
import React from "react";
import XionLogo from "./xion-logo";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";

const XionPay = () => {
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const { client, logout } = useAbstraxionSigningClient();

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
  return (
    <div>
      <Abstraxion
        onClose={() => {
          setShowModal(false);
        }}
      />
      <button
        className="px-4 py-1 rounded-lg bg-active h-fit flex flex-col items-center justify-center gap-2 cursor-pointer"
        onClick={connect}
      >
        <XionLogo className="h-10" />
        {isConnected ? (
          <p className="text-xs">Connected</p>
        ) : (
          <p className="font-semibold">XION</p>
        )}
      </button>
    </div>
  );
};

export default XionPay;
