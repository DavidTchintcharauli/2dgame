import type { WorldState } from "../core/types";

export function boundsSystem(world: WorldState) {
  const { width } = world.config;
  const p = world.player;

  if (p.position.x < p.radius) p.position.x = p.radius;
  if (p.position.x > width - p.radius) p.position.x = width - p.radius;
}
