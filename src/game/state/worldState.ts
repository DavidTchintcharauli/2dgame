import { PHYSICS, PLAYER_DEFAULTS, WORLD_CONFIG } from "../core/config";
import type { WorldState, Container } from "../core/types";

export function createWorldForLevel(containers: Container[]): WorldState {
  const startSurface =
    containers.find((c) => c.id === "g1") ?? containers[0] ?? {
      y: WORLD_CONFIG.height - 60,
      x: 0,
      width: 100,
      height: 40,
    };

  const playerStartX = (startSurface.x ?? 40) + 40;
  const playerStartY = startSurface.y - PLAYER_DEFAULTS.radius;

  return {
    config: WORLD_CONFIG,
    gravity: PHYSICS.gravity,
    running: true,
    containers,
    player: {
      id: "player-1",
      position: { x: playerStartX, y: playerStartY },
      prevPosition: { x: playerStartX, y: playerStartY },
      velocity: { x: 0, y: 0 },
      radius: PLAYER_DEFAULTS.radius,
      rotation: 0,
      speed: PLAYER_DEFAULTS.speed,
      isGrounded: true,
    },
    completed: false,
    completionMessage: undefined,
  };
}
