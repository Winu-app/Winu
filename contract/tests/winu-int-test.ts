import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
const assert = require("assert");

const anchorProvider = require("@project-serum/anchor");

const idl = require("../target/idl/winu.json");

const keypairPath = require("../id.json");
const WINU_PROGRAM_ID = "BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z";

describe("Init Master", () => {
  it("Initialize Master Account!", async () => {
    anchor.setProvider(anchor.AnchorProvider.env());

    // Initialize the program client with the program ID and IDL
    const program = new anchorProvider.Program(
      idl,
      new PublicKey(WINU_PROGRAM_ID),
      anchor.AnchorProvider.env()
    );

    const MASTER_SEED = process.env.MASTER || "master";
    const authority = anchor.web3.Keypair.fromSecretKey(
      Uint8Array.from(keypairPath)
    );

    const [masterPda, _bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(MASTER_SEED)],
      program.programId
    );

    try {
      let transactionSignature = await program.methods
        .initMaster()
        .accounts({
          master: masterPda,
          authority: authority.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([authority])
        .rpc();
      console.log("🚀 ~ it ~ transactionSignature:", transactionSignature);
    } catch (e) {
      console.log(e);
    }

    const masterRes = await program.account.master.fetch(masterPda);
    if (masterRes) {
      assert.ok(true);
    } else {
      assert.ok(false);
    }
  });
});



describe("Register User", () => {
  it("will accept username and registers the user", async () => {
    anchor.setProvider(anchor.AnchorProvider.env());

    // Initialize the program client with the program ID and IDL
    const program = new anchorProvider.Program(
      idl,
      new PublicKey(WINU_PROGRAM_ID),
      anchor.AnchorProvider.env()
    );

    const authority = anchor.web3.Keypair.fromSecretKey(
      Uint8Array.from(keypairPath)
    );

    const inputName = "subhash4";

    const [userPda, _bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(inputName)], // username as bytes
      program.programId
    );

    // Execute the RPC.
    const tx = await program.methods
      .registerUser(inputName)
      .accounts({
        user: userPda,
        authority: authority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([authority]) // Only authority signs here
      .rpc();

    // Fetch the user account details
    const userRes = await program.account.user.fetch(userPda);
    console.log("Registered User is: " + userRes.username);

    // Ensure the username is properly registered
    assert.ok(userRes.username == inputName);
  });
});
