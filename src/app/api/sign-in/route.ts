import { connect } from "@/db/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { password, email } = body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token_secret = process.env.TOKEN_SECRET!;

    const token = jwt.sign(payload, token_secret, { expiresIn: "1d" });

    const res = NextResponse.json(
      { message: "Logged In successfully!" },
      { status: 200 }
    );
    res.cookies.set("winu-token", token, {
      httpOnly: true,
    });
    return res;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
