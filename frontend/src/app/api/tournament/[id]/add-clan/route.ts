import { NextRequest, NextResponse } from "next/server";
import Tournament from "src/models/tournament";
import Clan from "src/models/clan";

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();
  Clan; //load clan model

  if (!body.clan) {
    return NextResponse.json(
      { message: "clanId is required" },
      { status: 400 }
    );
  }

  try {
    const tournament = await Tournament.findById(id);

    if (!tournament) {
      return NextResponse.json(
        { message: "Tournament not found" },
        { status: 404 }
      );
    }
    if (tournament.clans.includes(body.clan)) {
      return NextResponse.json(
        { message: "Clan is already part of this tournament" },
        { status: 400 }
      );
    }
    tournament.clans.push(body.clan);
    await tournament.save();

    return NextResponse.json(
      { message: "Clan added", tournament },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add clan", error },
      { status: 400 }
    );
  }
}
