import { connect } from "../../../db/config";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../../helper/mailer";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { username, email, password, name } = body;
    const emailExist = await User.findOne({ email });
    if (emailExist)
      return NextResponse.json(
        { message: "Email already in use!" },
        { status: 400 }
      );
    const usernameExist = await User.findOne({ username });
    if (usernameExist)
      return NextResponse.json(
        { message: "username already in use!" },
        { status: 400 }
      );
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
    });
    const savedUser = await newUser.save();
    // send verification email
    await sendEmail({
      emailType: "VERIFY",
      to: email,
      userId: savedUser._id,
    });
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;
    return NextResponse.json(
      { message: "User Registered!", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
