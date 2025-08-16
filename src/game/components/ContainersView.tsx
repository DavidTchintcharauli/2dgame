import React from "react";
import type { Container } from "../core/types";

export function ContainersView({ containers }: { containers: Container[] }) {
  return (
    <>
      {containers.map((c) => {
        const style: React.CSSProperties = {
          left: c.x,
          top: c.y,
          width: c.width,
          height: c.height,
          zIndex: c.zIndex ?? 1,
        };

        let cls = "absolute rounded-md border shadow-md ";
        if (c.kind === "ground") {
          cls += "border-black/10 dark:border-white/10 bg-gradient-to-b from-stone-300 to-stone-500 dark:from-stone-400 dark:to-stone-700";
        } else if (c.kind === "platform") {
          cls += "border-black/10 dark:border-white/10 bg-gradient-to-b from-indigo-300 to-indigo-600 dark:from-indigo-400 dark:to-indigo-700";
        } else if (c.kind === "goal") {
          cls += "border-amber-200/40 bg-gradient-to-b from-amber-300 to-amber-600";
        }

        return (
          <div key={c.id} className={cls} style={style}>
            <div className="h-1 w-full bg-black/20 dark:bg-white/10" />
            {c.kind === "goal" && (
              <div className="absolute -top-3 right-0 translate-x-[60%] h-3 w-5 rounded-sm bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400)]" />
            )}
          </div>
        );
      })}
    </>
  );
}
