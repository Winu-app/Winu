"use client";
// import { getBidAddress, getVenueAddress } from "/helpers/contract/program";
import { AnchorError, Idl, Program } from "@project-serum/anchor";
import {
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export const placeBid = async ({
  venueId,
  program,
  bidId,
  wallet,
}: {
  venueId: string;
  bidId: string;
  program?: Program<Idl>;
  wallet: AnchorWallet;
}) => {
  //   const venuePk = getVenueAddress(venueId);

  //   if (!venuePk) {
  //     return;
  //   }

  //   const bidPk = getBidAddress(venuePk, bidId);

  const provider = program?.provider;
  if (!provider) {
    toast.error("Failed to establish connection!");
    return;
  }

  if (!wallet) {
    toast.error("Please connect your wallet");
    return;
  }
  if (!program) {
    toast.error("Contraction connection failed😕. Please refresh the page..");
    return;
  }
  try {
    const provider = program.provider;

    // const tx: Transaction = await program.methods
    //   .placeBid(venueId, bidId)
    //   .accounts({
    //     venue: venuePk,
    //     bid: bidPk,
    //     buyer: wallet.publicKey,
    //     systemProgram: SystemProgram.programId,
    //   })
    //   .transaction();
    // if (!tx || !provider) {
    //   toast.error("transaction failed ");
    //   return;
    // }
    // tx.feePayer = wallet.publicKey;
    // tx.recentBlockhash = (
    //   await provider.connection.getLatestBlockhash()
    // ).blockhash;

    // const signedTx = await wallet.signTransaction(tx);
    // const txSignature = await sendAndConfirmRawTransaction(
    //   provider.connection,
    //   signedTx.serialize()
    // );

    // if (txSignature) {
    //   toast.success("Bid Successful(devnet)!");
    //   return txSignature;
    // }
  } catch (err) {
    if (err instanceof AnchorError) {
      toast.error(err.error.errorMessage);
    }

    console.log("🚀 ~ placeBid ~ err:", err);
    toast.error("Failed to place bid😢! Check console for detailed error!");
  }
};
