import { NextRequest, NextResponse } from "next/server";
import Clan from "src/models/clan";
import { connect } from "src/db/config";

connect();

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const clan = await Clan.findById(id)
    .populate({
      path: "leader",
      select: "username imageUrl",
    })
    .populate({
      path: "coLeaders",
      select: "username imageUrl",
    })
    .populate({
      path: "members",
      select: "username imageUrl",
    });

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
