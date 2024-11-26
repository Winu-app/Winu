import mongoose, { Schema } from "mongoose";
import { Clan } from "src/types";

const clanSchema = new Schema<
  Omit<Clan, "leader" | "coLeaders" | "members"> & {
    leader: Schema.Types.ObjectId;
    coLeaders: Schema.Types.ObjectId[];
    members: Schema.Types.ObjectId[];
  }
>(
  {
    name: { type: String, required: true },
    imageUrl: { type: String },
    uniqueName: { type: String, required: true, unique: true },
    leader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coLeaders: { type: [Schema.Types.ObjectId], ref: "User" },
    members: { type: [Schema.Types.ObjectId], ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Clan || mongoose.model("Clan", clanSchema);
