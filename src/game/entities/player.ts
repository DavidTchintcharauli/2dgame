import type { PlayerState, InputState } from "../core/types";

export function applyInputToPlayer(p: PlayerState, input: InputState) {
  const dir = (input.right ? 1 : 0) + (input.left ? -1 : 0);
  p.velocity.x = dir * p.speed;
}

export function integratePlayer(p: PlayerState, dt: number) {
  p.prevPosition.x = p.position.x;
  p.prevPosition.y = p.position.y;

  p.position.x += p.velocity.x * dt;
  p.position.y += p.velocity.y * dt;

  const circumference = 2 * Math.PI * p.radius;
  const turns = (p.velocity.x * dt) / circumference;
  p.rotation = (p.rotation + turns * 360) % 360;
}
