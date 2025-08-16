import React, { useMemo, useRef, useState, useEffect } from "react";
import { useGameLoop } from "../hooks/useGameLoop";
import { useKeyboard } from "../hooks/useKeyboard";
import { createWorldForLevel } from "../state/worldState";
import { inputSystem } from "../systems/inputSystem";
import { jumpSystem } from "../systems/jumpSystem";
import { physicsSystem } from "../systems/physicsSystem";
import { movementSystem } from "../systems/movementSystem";
import { collisionSystem } from "../systems/collisionSystem";
import { boundsSystem } from "../systems/boundsSystem";
import { gameOverSystem } from "../systems/gameOverSystem";
import { PlayerView } from "./PlayerView";
import { ContainersView } from "./ContainersView";
import type { Container } from "../core/types";
import { playGameOver, playNextLevel } from "../../audio";

export function GameCanvas({
  containers,
  isLastLevel = false,
  onLevelComplete,
  onGameOver,
}: {
  containers: Container[];
  isLastLevel?: boolean;
  onLevelComplete?: () => void;
  onGameOver?: () => void;
}) {
  const world = useMemo(() => createWorldForLevel(containers), [containers]);
  const inputRef = useKeyboard();
  const rerender = useForceRender();
  const [isOver, setIsOver] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const notifiedRef = useRef(false);

  const loop = useGameLoop((dt) => {
    if (!world.running) return;

    inputSystem(world, inputRef.current);
    jumpSystem(world, inputRef.current);
    physicsSystem(world, dt);
    movementSystem(world, dt);
    collisionSystem(world);
    boundsSystem(world);
    gameOverSystem(world);

    if (world.completed) {
      playNextLevel();

      setIsComplete(true);
      world.running = false;
      loop.stop();
      return;
    }

    if (!world.running && !world.completed) {
      setIsOver(true);
      loop.stop();

      if (!notifiedRef.current) {
        playGameOver();
        notifiedRef.current = true;
        onGameOver?.();
      }
      return;
    }

    rerender();
  });

  useEffect(() => {
    if (isComplete && !isLastLevel && onLevelComplete) {
      const t = window.setTimeout(() => onLevelComplete(), 1200);
      return () => window.clearTimeout(t);
    }
  }, [isComplete, isLastLevel, onLevelComplete]);

  const style: React.CSSProperties = {
    width: world.config.width,
    height: world.config.height,
  };

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl",
        "bg-gradient-to-b from-[#121630] to-[#0b0e1f]",
      ].join(" ")}
      style={style}
    >
      <ContainersView containers={world.containers} />
      <PlayerView player={world.player} />

      {isComplete && (
        <div className="absolute inset-0 grid place-items-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-xl border border-white/20 bg-white/10 px-6 py-5 text-center">
            <div className="text-2xl font-semibold text-white">
              {world.completionMessage ?? "Level Complete"}
            </div>
            <div className="text-white/70 text-xs mt-1">
              {isLastLevel ? "ყველა ტური დასრულებულია." : "გადავდივართ შემდეგ ტურზე…"}
            </div>
            {!isLastLevel && (
              <button
                onClick={onLevelComplete}
                className="mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white border border-white/10 shadow-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 active:scale-[0.98] transition"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}

      {isOver && (
        <div className="absolute inset-0 grid place-items-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-center">
            <div className="text-2xl font-semibold text-white">Game Over</div>
            <div className="text-white/80 text-sm mt-1">
              {world.gameOverReason ?? "Stopped"}
            </div>
            <div className="text-white/60 text-xs mt-3">Returning to menu…</div>
          </div>
        </div>
      )}
    </div>
  );
}

function useForceRender() {
  const r = useRef(0);
  const [, set] = React.useState(0);
  return () => set(++r.current);
}
