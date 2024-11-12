import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connect } from "@/db/config";

connect();
export async function GET(
  req: NextRequest,
  { params: { username } }: { params: { username: string } }
) {
  const user = await User.findOne({ username });
  return NextResponse.json({ user }, { status: 200 });
}
