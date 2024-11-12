import { connect } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const res = NextResponse.json(
      { message: "Logged out successfully!" },
      { status: 200 }
    );
    res.cookies.delete("winu-token");
    return res;
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
