import type { WorldState, Container } from "../core/types";

export function collisionSystem(world: WorldState) {
  const p = world.player;
  p.isGrounded = false;

  let best: { yTop: number; surface: Container } | null = null;

  for (const s of world.containers) {
    const top = s.y;
    const left = s.x;
    const right = s.x + s.width;

    const prevBottom = p.prevPosition.y + p.radius;
    const nextBottom = p.position.y + p.radius;

    const crossedTop = prevBottom <= top && nextBottom >= top;
    const withinX = p.position.x >= left - p.radius && p.position.x <= right + p.radius;

    if (crossedTop && withinX) {
      if (!best || top < best.yTop) {
        best = { yTop: top, surface: s };
      }
    }
  }

  if (best) {
    p.position.y = best.yTop - p.radius;
    p.velocity.y = 0;
    p.isGrounded = true;

    if (best.surface.kind === "goal") {
      world.running = false;
      world.completed = true;
      world.completionMessage = "Next level unlocked. You’re on fire!";
    }
  }
}
