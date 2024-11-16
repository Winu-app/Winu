// import * as anchor from "@coral-xyz/anchor";
// import { PublicKey } from "@solana/web3.js";
// const assert = require("assert");

// const anchorProvider = require("@project-serum/anchor");

// const idl = require("../target/idl/winu.json");

// const keypairPath = require("../id.json");
// const WINU_PROGRAM_ID = "BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z";

// describe("Create Clan", () => {
//   it("will accept Clan name and creates the clan", async () => {
//     anchor.setProvider(anchor.AnchorProvider.env());
//     // Initialize the program client with the program ID and IDL
//     const program = new anchorProvider.Program(
//       idl,
//       new PublicKey(WINU_PROGRAM_ID),
//       anchor.AnchorProvider.env()
//     );

//     const authority = anchor.web3.Keypair.fromSecretKey(
//       Uint8Array.from(keypairPath)
//     );

//     const clanName = "subhash";

//     const [clanPda, _bump] = await anchor.web3.PublicKey.findProgramAddress(
//       [Buffer.from("clan"), Buffer.from(clanName)],
//       program.programId
//     );

//     // Execute the RPC.
//     const tx = await program.methods
//       .createClan(clanName)
//       .accounts({
//         clan: clanPda,
//         authority: authority.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .signers([authority])
//       .rpc();

//     const clanRes = await program.account.clan.fetch(clanPda);
//     console.log("clan created with name: " + clanRes.name);

//     assert.ok(clanRes.name == clanName);
//   });
// });
