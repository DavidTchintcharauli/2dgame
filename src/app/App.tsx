import React from "react";
import { GameCanvas } from "../game/components/GameCanvas";
import { MenuScreen } from "../game/components/MenuScreen";
import { LEVELS, LEVEL_NAMES } from "../game/levels";
import { startAudioSession, stopAudioSession } from "../audio"; // ⬅️ BGM start/stop

type Scene = "menu" | "playing";

export function App() {
  const [scene, setScene] = React.useState<Scene>("menu");
  const [levelIndex, setLevelIndex] = React.useState(0);
  const [session, setSession] = React.useState(0);
  const timeoutRef = React.useRef<number | null>(null);

  const startLevel = (idx: number) => {
    setLevelIndex(idx);
    setSession((s) => s + 1); 
    setScene("playing");
  };

  const handlePlay = async () => {
    clearReturnTimer();

    startAudioSession(); 

    startLevel(0);
  };

  const handleLevelComplete = () => {
    const hasNext = levelIndex < LEVELS.length - 1;
    if (hasNext) {
      startLevel(levelIndex + 1);
    } else {
      setScene("menu");
      stopAudioSession(); 
    }
  };

  const handleGameOver = () => {
    if (timeoutRef.current) return;
    timeoutRef.current = window.setTimeout(() => {
      setScene("menu");
      stopAudioSession(); 
      timeoutRef.current = null;
    }, 2000);
  };

  React.useEffect(() => () => clearReturnTimer(), []);

  function clearReturnTimer() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  return (
    <div className="min-h-dvh grid place-items-center bg-[#0f1221]">
      {scene === "menu" ? (
        <MenuScreen onPlay={handlePlay} />
      ) : (
        <div className="grid gap-2">
          <div className="text-center text-white/60 text-xs mb-1">
            {LEVEL_NAMES[levelIndex]}
          </div>
          <GameCanvas
            key={`${levelIndex}-${session}`}
            containers={LEVELS[levelIndex]}
            isLastLevel={levelIndex === LEVELS.length - 1}
            onLevelComplete={handleLevelComplete}
            onGameOver={handleGameOver}
          />
        </div>
      )}
    </div>
  );
}
