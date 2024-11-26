import { connect } from "../../../db/config";
import { getDataFromToken } from "../../../helper/get-data-from-token";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/user";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Session not found!" },
        { status: 200 }
      );
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(
      { message: "Authenticated successfully!", user },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
