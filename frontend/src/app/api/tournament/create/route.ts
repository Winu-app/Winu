import { NextRequest, NextResponse } from "next/server";
import Tournament from "../../../../models/tournament";
import { connect } from "../../../../db/config";

connect();
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    visibility,
    streamLink,
    entryFee,
    startDate,
    endDate,
    description,
    image,
    matches,
    host, //mongodb uid
    isActive,
    createdBy, // wallet address
  } = body;

  if (!name)
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  if (!streamLink)
    return NextResponse.json(
      { message: "Stream link is required" },
      { status: 400 }
    );
  if (!startDate)
    return NextResponse.json(
      { message: "Start date is required" },
      { status: 400 }
    );
  if (!endDate)
    return NextResponse.json(
      { message: "End date is required" },
      { status: 400 }
    );
  // if (!host)
  //   return NextResponse.json({ message: "Host is required" }, { status: 400 });
  if (!matches)
    return NextResponse.json(
      { message: "Matches are required" },
      { status: 400 }
    );
  if (!image)
    return NextResponse.json({ message: "Image is required" }, { status: 400 });
  if (!entryFee)
    return NextResponse.json(
      { message: "Entry Fee is required" },
      { status: 400 }
    );
  // if (!createdBy)
  //   return NextResponse.json({ message: "Wallet not found" }, { status: 400 });

  const tournament = new Tournament({
    name,
    visibility,
    streamLink,
    entryFee,
    startDate,
    endDate,
    description,
    image,
    matches: [],
    host,
    isActive,
    createdBy: "demo", //TODO::
  });

  await tournament.save();
  return NextResponse.json(
    { message: "New Tournament Created", tournament },
    { status: 201 }
  );
}
