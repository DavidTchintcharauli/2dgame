import React from "react";
import type { PlayerState } from "../core/types";

type Props = { player: PlayerState };

export function PlayerView({ player }: Props) {
  const size = player.radius * 2;
  const style: React.CSSProperties = {
    width: size,
    height: size,
    transform: `translate(${player.position.x - player.radius}px, ${
      player.position.y - player.radius
    }px) rotate(${player.rotation}deg)`,
  };

  return (
    <div
      className={[
        "absolute rounded-full shadow-xl",
        "[will-change:transform]",
        "bg-[radial-gradient(circle_at_35%_35%,_#ffffff,_#c2c8ff_30%,_#7b83ff_55%,_#3941c7_75%,_#1f256b_100%)]",
      ].join(" ")}
      style={style}
    />
  );
}
