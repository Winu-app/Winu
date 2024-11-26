import { connect } from "../../../db/config";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: JSON.stringify(e) || "Internal Server Error" },
      { status: 500 }
    );
  }
}
