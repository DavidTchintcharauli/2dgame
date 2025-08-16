import type { WorldState } from "../core/types";
import { PHYSICS } from "../core/config";

export function physicsSystem(world: WorldState, dt: number) {
  const p = world.player;

 if (!p.isGrounded) {
    p.velocity.y += world.gravity * dt;
    if (p.velocity.y > PHYSICS.maxFallSpeed) {
      p.velocity.y = PHYSICS.maxFallSpeed;
    }
  }
}
