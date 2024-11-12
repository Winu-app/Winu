import mongoose, { Schema } from "mongoose";

const clanSchema = new Schema(
  {
    name: { type: String, required: true },
    uniqueName: { type: String, required: true, unique: true },
    leader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coLeaders: { type: [Schema.Types.ObjectId], ref: "User" },
    members: { type: [Schema.Types.ObjectId], ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Clan || mongoose.model("Clan", clanSchema);
