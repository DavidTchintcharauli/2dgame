import type { Container } from "../core/types";
import { WORLD_CONFIG } from "../core/config";

const groundH = 30;
const H = WORLD_CONFIG.height;
const baseY = H - 90;

export const level3Containers: Container[] = [
  { id: "g1", x: 40,  y: baseY,        width: 110, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },
  { id: "g2", x: 200, y: baseY,        width:  90, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },
  { id: "g3", x: 340, y: baseY - 20,   width:  80, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },
  { id: "g4", x: 500, y: baseY - 10,   width:  70, height: groundH, kind: "ground",   gravityIndex: 1, zIndex: 1 },

  { id: "p1", x: 430, y: H - 200,      width:  80, height: 20,      kind: "platform", gravityIndex: 1, zIndex: 2 },
  { id: "p2", x: 620, y: H - 210,      width:  70, height: 18,      kind: "platform", gravityIndex: 1, zIndex: 2 },
  { id: "p3", x: 740, y: H - 190,      width:  60, height: 18,      kind: "platform", gravityIndex: 1, zIndex: 2 },

  { id: "goal3", x: WORLD_CONFIG.width - 36, y: H - 160, width: 24, height: 120, kind: "goal", gravityIndex: 1, zIndex: 3 },
];
