"use client";

import { useEffect, useState } from "react";
import { pusher } from "../pusher";

export default function IsPusherSocketConnected() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", function (data) {
      setLastMessage(JSON.stringify(data));
    });

    pusher.connection.bind("connected", () => {
      setIsConnected(true);
      console.log("Connected to Pusher");
    });

    pusher.connection.bind("disconnected", () => {
      setIsConnected(false);
      console.log("Disconnected from Pusher");
    });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);

  return (
    <div className="mt-4 p-4 border rounded">
      <p className="text-sm">
        Pusher Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </p>
      {lastMessage && (
        <p className="text-sm mt-2">Last message: {lastMessage}</p>
      )}
    </div>
  );
}
