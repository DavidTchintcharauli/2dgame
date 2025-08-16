import { useEffect, useRef } from "react";
import type { InputState } from "../core/types";

export function useKeyboard() {
  const input = useRef<InputState>({
    left: false,
    right: false,
    up: false,
    jump: false,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "a") input.current.left = true;
      if (e.key === "d") input.current.right = true;
      if (e.key === "w") {
        if (!input.current.up) input.current.jump = true;
        input.current.up = true;
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "a") input.current.left = false;
      if (e.key === "d") input.current.right = false;
      if (e.key === "w") {
        input.current.up = false;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return input;
}
