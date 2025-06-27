import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl">Multiplayer Trivia Game</h1>
        <ModeToggle />
      </div>
    </main>
  );
}
