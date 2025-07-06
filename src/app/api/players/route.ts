import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Players from "@/models/players";

export async function GET() {
  await dbConnect();
  const players = await Players.find({});
  return NextResponse.json(players);
}
