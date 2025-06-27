import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

const submittedNames: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { name, action } = await request.json();

    if (action === "submit-name") {
      submittedNames.push(name);

      await pusher.trigger("names-channel", "name-submitted", { name });

      return NextResponse.json({ success: true });
    }

    if (action === "get-names") {
      return NextResponse.json({ names: submittedNames });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in Pusher API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
