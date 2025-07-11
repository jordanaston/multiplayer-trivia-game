"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { pusher } from "../pusher";
import { submitName, getNames } from "../lib/api/pusher";
import { getPlayers } from "../lib/api/players";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function NameSelector() {
  const [name, setName] = useState("");
  const [submittedNames, setSubmittedNames] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: submitName,
    onSuccess: () => {
      setName("");
    },
    onError: (error) => {
      console.error("Error submitting name:", error);
    },
  });

  const syncWithServer = async () => {
    try {
      const serverNames = await getNames();
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

  const handleSubmit = () => {
    if (name) {
      mutate(name.trim());
    }
  };

  const { data: players } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p className="text-2xl">Name Selector</p>
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-64"
        disabled={isPending}
      />
      <Button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>

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

      <p className="text-lg font-semibold mt-12">Players:</p>

      <div className="space-y-1">
        {players?.map((player: { name: string }, index: number) => (
          <p key={index} className="text-lg text-chart-1">
            {player.name}
          </p>
        ))}
      </div>
    </div>
  );
}
