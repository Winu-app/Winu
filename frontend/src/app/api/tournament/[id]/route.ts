import { NextRequest, NextResponse } from "next/server";
import Tournament from "../../../../models/tournament";
import User from "../../../../models/user";
import { connect } from "../../../../db/config";

connect();
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    User; //load the model
    const tournament = await Tournament.findById(id).populate(
      "host",
      "name email username isVerified image"
    );
    return NextResponse.json({ tournament }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Failed to load the tournament" },
      { status: 400 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();

  // Construct update object by including only the provided fields
  const updateFields: Partial<{
    name: string;
    visibility: string;
    streamLink: string;
    entryFee: number;
    startDate: Date;
    endDate: Date;
    description: string;
    image: string;
    matches: string[];
    host: string;
    isActive: boolean;
  }> = {};

  if (body.name) updateFields.name = body.name;
  if (body.visibility) updateFields.visibility = body.visibility;
  if (body.streamLink) updateFields.streamLink = body.streamLink;
  if (body.entryFee) updateFields.entryFee = body.entryFee;
  if (body.startDate) updateFields.startDate = body.startDate;
  if (body.endDate) updateFields.endDate = body.endDate;
  if (body.image) updateFields.image = body.image;
  if (body.matches) updateFields.matches = body.matches;
  if (body.host) updateFields.host = body.host;
  if (typeof body.isActive === "boolean") updateFields.isActive = body.isActive;

  updateFields.description = body.description;
  // Update only provided fields
  const tournament = await Tournament.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  );

  return NextResponse.json(
    { message: "Tournament Updated", tournament },
    { status: 200 }
  );
}
