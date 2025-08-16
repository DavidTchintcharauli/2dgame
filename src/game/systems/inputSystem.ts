import type { WorldState, InputState } from "../core/types";
import { applyInputToPlayer } from "../entities/player";

export function inputSystem(world: WorldState, input: InputState) {
  applyInputToPlayer(world.player, input);
}
