"use client";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";
import "@burnt-labs/ui/dist/index.css";
import { useEffect } from "react";

export default function ConnectButton(): JSX.Element {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();

  const [, setShowModal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useModal();

  useEffect(() => {
    console.log(bech32Address);
  }, [bech32Address]);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        {bech32Address ? (
          <div className="flex items-center justify-center">
            {`${bech32Address.substring(0, 8)}... ${bech32Address.substring(
              bech32Address.length - 4
            )}`}
          </div>
        ) : (
          "CONNECT"
        )}
      </button>
      <Abstraxion
        onClose={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}
