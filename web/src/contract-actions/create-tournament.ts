"use client";
import { getVenueAddress } from "./helpers/program";
import { AnchorError, Idl, Program } from "@project-serum/anchor";
import {
  PublicKey,
  SendTransactionError,
  SystemProgram,
} from "@solana/web3.js";
import { toast } from "sonner";

export const createTournament = async ({
  venueId,
  program,
  wallet,
}: {
  venueId: string;
  program?: Program<Idl>;
  wallet?: PublicKey;
}) => {
  const venuePk = getVenueAddress(venueId);

  // await program.account.userProfile.fetch(userPublickey)
  if (!wallet) {
    toast.error("Please connect your wallet");
    return;
  }
  if (!program) {
    toast.error("Contraction connection failed😕. Please refresh the page..");
    return;
  }
  try {
    const txHash = await program.methods
      .createVenue(venueId)
      .accounts({
        venue: venuePk,
        authority: wallet,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    if (txHash) {
      toast.success("Venue created on devnet!");
    }
  } catch (err) {
    if (err instanceof AnchorError) {
      toast.error(err.error.errorMessage);
    }
    if (err instanceof SendTransactionError) {
      toast.error(err.message);
    }
    console.log("🚀 ~ createVenue ~ err:", err);
    toast.error("Failed to create venue!😢");
  }
};
