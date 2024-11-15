import mongoose from "mongoose";

export async function connect() {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not found!");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected.");
      return;
    }
    const { connection } = await mongoose.connect(MONGO_URI);

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });
    connection.on("error", (err) => {
      console.log("Failed to connect with Mongo DB!" + err);
      throw new Error(err);
    });
  } catch (e) {
    console.log("Failed to connect with Mongo DB!" + e);
  }
}
