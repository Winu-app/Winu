import { NextRequest, NextResponse } from "next/server";
import Tournament from "src/models/tournament";
import Clan from "src/models/clan";
import User from "src/models/user";
import { connect } from "src/db/config";

connect();
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    //load the models
    Clan;
    User;
    const tournament = await Tournament.findById(id)
      .select("clans")
      .populate({
        path: "clans", // Populate the 'clans' array
        populate: [
          { path: "leader" }, // Populate the 'leader' field in each clan
          { path: "members" }, // Populate the 'members' array in each clan
        ],
      });
    return NextResponse.json({ tournament }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Failed to load the tournament" },
      { status: 400 }
    );
  }
}
