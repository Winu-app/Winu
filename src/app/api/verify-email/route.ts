import { connect } from "@/db/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { token } = body;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
