"use client";

import ModeToggle from "@/components/mode-toggle";
import NameSelector from "@/components/name-selector";
import IsPusherSocketConnected from "@/components/is-pusher-socket-connected";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex items-center gap-4 mt-10">
        <p className="text-2xl">Multiplayer Trivia Game</p>
        <ModeToggle />
      </div>
      <IsPusherSocketConnected />
      <NameSelector />
    </main>
  );
}
