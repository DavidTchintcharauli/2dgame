import { useEffect, useRef } from "react";
import { createGameLoop } from "../core/gameLoop";

export function useGameLoop(onUpdate: (dt: number) => void) {
  const ref = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    const loop = createGameLoop({ onUpdate });
    loop.start();
    ref.current = loop;
    return () => loop.stop();
  }, [onUpdate]);

  return {
    stop() {
      ref.current?.stop();
    },
  };
}
