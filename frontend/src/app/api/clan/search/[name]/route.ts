import { NextRequest, NextResponse } from "next/server";
import Clan from "src/models/clan";
import { connect } from "src/db/config";

connect();

export async function GET(
  req: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  try {
    // Find clans where 'name' or 'uniqueName' matches the search string
    const clan = await Clan.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { uniqueName: { $regex: name, $options: "i" } },
      ],
    });

    if (!clan || clan.length === 0) {
      return NextResponse.json({ message: "Clan not found" }, { status: 404 });
    }

    return NextResponse.json({ clan }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
