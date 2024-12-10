"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { toast } from "sonner";
import { startTransition } from "react";
import {
  MASTER_SEED,
  PROGRAM_ID,
} from "src/contract-actions/helpers/constants";

export default function Hero() {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection("https://rpc.testnet.soo.network/rpc");

  const createNewTournament = async () => {
    if (!publicKey || !MASTER_SEED || !PROGRAM_ID) {
      toast.error("Please connect your wallet and ensure PROGRAM_ID is set.");
      return;
    }
    const venue_id = "subhash1";

    const [venueAddress, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("venue"), Buffer.from(venue_id)],
      new PublicKey(PROGRAM_ID)
    ); //DUhdpC3dysxJrdnXwoRkkGQv7iA9Ts9eU4kCTXpQVpcX
    console.log(
      "🚀 ~ createNewTournament ~ venueAddress:",
      venueAddress.toString()
    );

    // const venueAddress = getVenueAddress("subhash");
    const lamports = await connection.getMinimumBalanceForRentExemption(128);

    const instruction = new TransactionInstruction({
      programId: new PublicKey(PROGRAM_ID),
      keys: [
        { pubkey: venueAddress, isSigner: false, isWritable: true },
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      data: Buffer.from(
        JSON.stringify({
          venueId: venue_id,
        })
      ),
    });

    const transaction = new Transaction().add(instruction);
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "processed");

    toast.success("Account created successfully!");
  };

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={createNewTournament}
          >
            Work in Progress
          </button>
        </div>
      </div>
    </div>
  );
}
