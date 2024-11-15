import { NextResponse } from "next/server";
import Tournament from "../../../models/tournament";
import User from "../../../models/user";
import { connect } from "../../../db/config";

connect();
export async function GET() {
  try {
    User; //load the model
    const tournaments = await Tournament.find().populate(
      "host",
      "name email username isVerified image"
    );
    return NextResponse.json({ tournaments }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "failed to load data, refresh the page" },
      { status: 400 }
    );
  }
}
