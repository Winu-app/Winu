import { NextRequest, NextResponse } from "next/server";
import Clan from "../../../models/clan";
import { connect } from "../../../db/config";

connect();
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, uniqueName, leader, coLeaders, members } = body;

  if (!name)
    return NextResponse.json({ message: "Name is required" }, { status: 400 });

  if (!uniqueName)
    return NextResponse.json(
      { message: "Unique Name Fee is required" },
      { status: 400 }
    );
  if (!leader)
    return NextResponse.json(
      { message: "Leader is required" },
      { status: 400 }
    );

  const tournament = new Clan({
    name,
    uniqueName,
    leader,
    coLeaders: coLeaders || [],
    members: members || [],
  });
  await tournament.save();
  return NextResponse.json(
    { message: "New Tournament Created", tournament },
    { status: 201 }
  );
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { name, uniqueName, leader, coLeaders, members } = body;

  if (!name)
    return NextResponse.json({ message: "Name is required" }, { status: 400 });

  if (!uniqueName)
    return NextResponse.json(
      { message: "Unique Name Fee is required" },
      { status: 400 }
    );
  if (!leader)
    return NextResponse.json(
      { message: "Leader is required" },
      { status: 400 }
    );

  const tournament = new Clan({
    name,
    uniqueName,
    leader,
    coLeaders: coLeaders || [],
    members: members || [],
  });
  await tournament.save();
  return NextResponse.json(
    { message: "New Tournament Created", tournament },
    { status: 201 }
  );
}
