import type { Container } from "../core/types";
import { WORLD_CONFIG } from "../core/config";

const groundH = 40;

export const level1Containers: Container[] = [
  { id: "g1", x: 60,  y: WORLD_CONFIG.height - 80,  width: 280, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },
  { id: "g2", x: 380, y: WORLD_CONFIG.height - 80,  width: 220, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },
  { id: "g3", x: 630, y: WORLD_CONFIG.height - 90,  width:  50, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },
  { id: "p1", x: 760, y: WORLD_CONFIG.height - 160, width: 180, height: 24,     kind: "platform", gravityIndex: 1, zIndex: 2 },

  { id: "goal1", x: WORLD_CONFIG.width - 160, y: WORLD_CONFIG.height - 160, width: 60, height: 120, kind: "goal", gravityIndex: 1, zIndex: 3 },
];
