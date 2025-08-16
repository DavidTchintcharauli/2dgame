type LoopHandlers = {
  onUpdate: (dt: number) => void;
};

export function createGameLoop({ onUpdate }: LoopHandlers) {
  let rafId = 0;
  let last = performance.now();

  const frame = (now: number) => {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;
    onUpdate(dt);
    rafId = requestAnimationFrame(frame);
  };

  return {
    start() {
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(rafId);
    },
  };
}
