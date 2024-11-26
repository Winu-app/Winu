import mongoose, { Schema } from "mongoose";
import { User } from "src/types";

const userSchema = new Schema<
  User & {
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: string;
    verifyToken: string;
    verifyTokenExpiry: string;
  }
>(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    socialLink: {
      type: String,
    },
    location: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    depositAmount: {
      type: Number,
      default: 0,
    },
    winningAmount: {
      type: Number,
      default: 0,
    },
    numberOfTournamentsPlayed: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    clan: { type: Schema.Types.ObjectId },
    wallets: [String],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
