import type { WorldState } from "../core/types";

export function DebugHUD({ world }: { world: WorldState }) {
  const p = world.player;
  return (
    <div className="absolute left-2 bottom-2 rounded-md bg-black/30 backdrop-blur px-2 py-1 text-xs text-white/80">
      x: {p.position.x.toFixed(1)} | velX: {p.velocity.x.toFixed(1)} | rot: {p.rotation.toFixed(1)}
    </div>
  );
}
