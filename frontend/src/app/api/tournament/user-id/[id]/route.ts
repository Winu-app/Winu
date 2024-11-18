import { NextRequest, NextResponse } from "next/server";
import Tournament from "../../../../../models/tournament";
import { connect } from "../../../../../db/config";

connect();
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const tournaments = await Tournament.find({ host: id });
  return NextResponse.json({ tournaments }, { status: 200 });
}
