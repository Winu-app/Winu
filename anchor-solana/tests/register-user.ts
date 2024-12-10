// import * as anchor from "@coral-xyz/anchor";
// import { PublicKey } from "@solana/web3.js";
// const assert = require("assert");

// const anchorProvider = require("@project-serum/anchor");

// const idl = require("../target/idl/winu.json");

// const keypairPath = require("../id.json");
// const WINU_PROGRAM_ID = "BrTsF5GJNb4jk7jTuYFV3B8YG2cAqWUXrdsFUar5BC6z";

// describe("Register User", () => {
//   it("will accept username and registers the user", async () => {
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

//     const username = "subhash1";
//     const image = "";
//     const coverImage = "";

//     const [userPda, _bump] = await anchor.web3.PublicKey.findProgramAddress(
//       [Buffer.from("user"), Buffer.from(username)],
//       program.programId
//     );

//     // Execute the RPC.
//     const tx = await program.methods
//       .registerUser(username, image, coverImage)
//       .accounts({
//         user: userPda,
//         authority: authority.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .signers([authority])
//       .rpc();

//     // Fetch the user account details
//     const userRes = await program.account.user.fetch(userPda);
//     console.log("Registered User is: " + userRes.username);

//     // Ensure the username is properly registered
//     assert.ok(userRes.username == username);
//   });
// });
