import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    link: {
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
    numberOfTournamentsPlayed: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    clan: { type: Schema.Types.ObjectId },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
