import type { WorldState } from "../core/types";
import { integratePlayer } from "../entities/player";

export function movementSystem(world: WorldState, dt: number) {
  integratePlayer(world.player, dt);
}
