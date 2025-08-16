import type { WorldState } from "../core/types";

export function gameOverSystem(world: WorldState) {
  const p = world.player;
  if (p.position.y + p.radius >= world.config.height) {
    world.running = false;
    world.gameOverReason = "Fell out of the world";
  }
}
