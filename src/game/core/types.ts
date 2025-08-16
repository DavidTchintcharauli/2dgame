export type Vector2 = { x: number; y: number };

export type PlayerState = {
  id: string;
  position: Vector2;
  prevPosition: Vector2;
  velocity: Vector2;
  radius: number;
  rotation: number;
  speed: number;
  isGrounded: boolean;
};

export type WorldConfig = {
  width: number;
  height: number;
};

export type InputState = {
  left: boolean;
  right: boolean;
  up: boolean;
  jump: boolean;
};

export type Container = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  gravityIndex?: number;
  zIndex?: number;
  kind?: "ground" | "platform" | "goal";
};

export type WorldState = {
  player: PlayerState;
  config: WorldConfig;
  gravity: number;
  containers: Container[];
  running: boolean;
  gameOverReason?: string;

  completed?: boolean;
  completionMessage?: string;
};
