"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { pusher } from "../pusher";
import { apiService } from "../lib/api";

export default function NameSelector() {
  const [name, setName] = useState("");
  const [submittedNames, setSubmittedNames] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const syncWithServer = async () => {
    try {
      const serverNames = await apiService.getNames();
      setSubmittedNames(serverNames);
    } catch (error) {
      console.error("Error syncing with server:", error);
    }
  };

  useEffect(() => {
    syncWithServer();

    const channel = pusher.subscribe("names-channel");

    channel.bind("name-submitted", (data: { name: string }) => {
      setSubmittedNames((prev) => [...prev, data.name]);
    });

    pusher.connection.bind("connected", () => {
      setIsConnected(true);

      syncWithServer();
    });

    pusher.connection.bind("disconnected", () => {
      setIsConnected(false);
    });

    return () => {
      pusher.unsubscribe("names-channel");
    };
  }, []);

  const handleSubmit = async () => {
    if (name.trim()) {
      try {
        await apiService.submitName(name);
        setName("");
      } catch (error) {
        console.error("Error submitting name:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p className="text-2xl">Name Selector</p>
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-64"
      />
      <Button onClick={handleSubmit}>Submit</Button>

      <p className="text-lg font-semibold mt-12">Submitted Names:</p>

      {!isConnected && (
        <p className="text-sm text-orange-500">Syncing with server...</p>
      )}
      {submittedNames.length > 0 && (
        <>
          <div className="space-y-1">
            {submittedNames.map((submittedName, index) => (
              <p key={index} className="text-lg text-chart-1">
                {submittedName}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
