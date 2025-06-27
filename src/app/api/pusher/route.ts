import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    await pusher.trigger("names-channel", "name-submitted", { name });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error broadcasting name:", error);
    return NextResponse.json(
      { error: "Failed to broadcast name" },
      { status: 500 }
    );
  }
}
