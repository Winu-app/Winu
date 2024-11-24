import { NextRequest, NextResponse } from "next/server";
import Tournament from "src/models/tournament";
import Clan from "src/models/clan";
import { connect } from "src/db/config";

connect();
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    Clan; //load the model
    const tournament = await Tournament.findById(id)
      .select("clans")
      .populate("clans");
    return NextResponse.json({ tournament }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Failed to load the tournament" },
      { status: 400 }
    );
  }
}
