"use client";
import {
  AnchorProvider,
  BN,
  Program,
  Wallet,
  Idl,
} from "@project-serum/anchor";
import { PublicKey, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";

import IDL from "./idl.json";

import { BID_SEED, MASTER_SEED, VENUE_SEED, PROGRAM_ID } from "./constants";

// How to fetch our Program
export const getProgram = (connection: Connection, wallet: Wallet) => {
  if (!PROGRAM_ID) {
    return { msg: "PROGRAM_ID not found!" };
  }
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = new Program(IDL as Idl, PROGRAM_ID, provider);
  return program;
};

export const getVenueAddress = (id: string) => {
  if (!VENUE_SEED) {
    console.log("VENUE_SEED is missing");
    return;
  }
  if (!PROGRAM_ID) {
    console.log("PROGRAM_ID is missing");
    return;
  }
  return PublicKey.findProgramAddressSync(
    [Buffer.from(VENUE_SEED), Buffer.from(id)],
    new PublicKey(PROGRAM_ID)
  )[0];
};

export const getBidAddress = (venuePk: PublicKey, id: string) => {
  if (!BID_SEED) {
    return { msg: "BID_SEED not found!" };
  }
  if (!PROGRAM_ID) {
    return { msg: "Program id not found!" };
  }
  return PublicKey.findProgramAddressSync(
    [Buffer.from(BID_SEED), venuePk.toBuffer(), Buffer.from(id)],
    new PublicKey(PROGRAM_ID)
  )[0];
};
export const getMasterAddress = () => {
  if (!MASTER_SEED) {
    return { msg: "MASTER_SEED not found!" };
  }
  if (!PROGRAM_ID) {
    return { msg: "Program id not found!" };
  }
  return PublicKey.findProgramAddressSync(
    [Buffer.from(MASTER_SEED)],
    new PublicKey(PROGRAM_ID)
  )[0];
};

export const getTotalPrize = (venue: { lastBidId: BN; bidPrice: BN }) => {
  return new BN(venue.lastBidId)
    .mul(venue.bidPrice)
    .div(new BN(LAMPORTS_PER_SOL))
    .toString();
};
