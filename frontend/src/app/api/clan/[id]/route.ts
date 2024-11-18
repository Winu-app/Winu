import { NextRequest, NextResponse } from "next/server";
import Clan from "../../../../models/clan";
import { connect } from "../../../../db/config";

connect();

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const clan = await Clan.findById(id);

  if (!clan) {
    return NextResponse.json({ message: "Clan not found" }, { status: 404 });
  }

  return NextResponse.json({ clan }, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();
  const { name, members } = body;
  const updateFields: any = {};

  if (name) updateFields.name = name;
  if (members) updateFields.members = members;

  const clan = await Clan.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!clan) {
    return NextResponse.json({ message: "Clan not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Tournament Updated", clan },
    { status: 201 }
  );
}
