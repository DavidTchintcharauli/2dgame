import type { WorldState, InputState } from "../core/types";
import { PHYSICS } from "../core/config";
import { playJumpSfx } from "../../audio"; 

export function jumpSystem(world: WorldState, input: InputState) {
  const p = world.player;

  if (input.jump && p.isGrounded) {
    p.velocity.y = -PHYSICS.jumpSpeed;
    p.isGrounded = false;

    playJumpSfx();
  }

  input.jump = false;
}
