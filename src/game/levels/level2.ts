import type { Container } from "../core/types";
import { WORLD_CONFIG } from "../core/config";

const groundH = 36;

export const level2Containers: Container[] = [
  { id: "g1", x: 40,  y: WORLD_CONFIG.height - 80,  width: 160, height: groundH, kind: "ground", gravityIndex: 1, zIndex: 1 },
  { id: "g2", x: 220, y: WORLD_CONFIG.height - 80,  width: 120, height: groundH, kind: "ground", gravityIndex: 1, zIndex: 1 },
  { id: "g3", x: 370, y: WORLD_CONFIG.height - 84,  width:  90, height: groundH, kind: "ground", gravityIndex: 1, zIndex: 1 },
  { id: "g4", x: 490, y: WORLD_CONFIG.height - 96,  width:  80, height: groundH, kind: "ground", gravityIndex: 1, zIndex: 1 },

  { id: "p1", x: 610, y: WORLD_CONFIG.height - 180, width: 120, height: 22,     kind: "platform", gravityIndex: 1, zIndex: 2 },
  { id: "p2", x: 760, y: WORLD_CONFIG.height - 220, width:  90, height: 20,     kind: "platform", gravityIndex: 1, zIndex: 2 },

  { id: "goal2", x: WORLD_CONFIG.width - 200, y: WORLD_CONFIG.height - 160, width: 28, height: 120, kind: "goal", gravityIndex: 1, zIndex: 3 },
];
