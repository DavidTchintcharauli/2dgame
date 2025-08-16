import React from "react";
import { WORLD_CONFIG } from "../../game/core/config";

export function MenuScreen({ onPlay }: { onPlay: () => void }) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPlay();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPlay]);

  const style: React.CSSProperties = {
    width: WORLD_CONFIG.width,
    height: WORLD_CONFIG.height,
  };

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl",
        "bg-gradient-to-b from-[#0f132d] via-[#0b1030] to-[#080c22]",
      ].join(" ")}
      style={style}
    >
      <Orb className="left-[-60px] top-[-60px] w-[220px] h-[220px] from-indigo-500/40 to-cyan-300/30" />
      <Orb className="right-[-80px] top-[20%] w-[260px] h-[260px] from-fuchsia-500/30 to-rose-400/20" />
      <Orb className="left-[30%] bottom-[-90px] w-[320px] h-[320px] from-emerald-400/20 to-sky-300/20" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 h-full grid grid-rows-[auto_1fr_auto]">
        <div className="flex items-center justify-between px-5 pt-4">
          <Badge>Mini Platformer</Badge>
          <span className="text-white/40 text-xs">v0.1</span>
        </div>

        <div className="px-6 py-2 grid place-items-center">
          <div className="text-center max-w-[720px]">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-indigo-200 via-sky-300 to-emerald-200 bg-clip-text text-transparent">
                Leap, Roll & Explore
              </span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-white/75">
              Move across platforms, jump over gaps, and don’t fall off the edge.
              Simple controls. Crisp physics. One more try?
            </p>

            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <Control label="Move">
                <Kbd>←</Kbd>
                <span className="text-white/40">/</span>
                <Kbd>→</Kbd>
              </Control>
              <Dot />
              <Control label="Jump">
                <Kbd>↑</Kbd>
              </Control>
              <Dot />
              <Control label="Longer leap">
                <span className="text-white/80">Hold</span>
                <Kbd>←</Kbd>
                <span className="text-white/40">or</span>
                <Kbd>→</Kbd>
                <span className="text-white/80">while jumping</span>
              </Control>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <ShimmerButton onClick={onPlay} ariaLabel="Play Game">
                Play Game
                <span className="hidden md:inline text-white/60 text-xs ml-2">
                  (Enter / Space)
                </span>
              </ShimmerButton>

              <GhostButton
                onClick={() => alert("Tip: keep momentum for farther jumps!")}
                ariaLabel="How to play"
              >
                How to play
              </GhostButton>
            </div>

            <p className="mt-4 text-xs text-white/50">
              Pro tip: run first, then press <Kbd inline>↑</Kbd> to jump farther.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 pb-4">
          <span className="text-[11px] text-white/40">
            Made with React + Tailwind
          </span>
          <span className="text-[11px] text-white/40">
            © {new Date().getFullYear()} Your Studio
          </span>
        </div>
      </div>
    </div>
  );
}

function Orb({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={[
        "absolute rounded-full blur-2xl",
        "bg-gradient-to-br",
        "opacity-60 animate-pulse motion-reduce:animate-none",
        className,
      ].join(" ")}
    />
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1">
      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)]" />
      <span className="text-xs font-medium tracking-wide text-white/80">
        {children}
      </span>
    </div>
  );
}

function Kbd({
  children,
  inline,
}: {
  children: React.ReactNode;
  inline?: boolean;
}) {
  const cls =
    "inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-md " +
    "border border-white/20 bg-white/10 text-white/90 text-xs font-semibold " +
    "shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]";
  if (inline) return <span className={cls}>{children}</span>;
  return <span className={cls}>{children}</span>;
}

function Control({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <span className="text-xs">{label}:</span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

function Dot() {
  return <span className="text-white/25">•</span>;
}

function ShimmerButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "group relative inline-flex items-center justify-center",
        "rounded-xl px-6 py-3 font-semibold text-white",
        "bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500",
        "shadow-lg shadow-indigo-900/30 border border-white/10",
        "transition-transform active:scale-[0.98]",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60 transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      </span>
      {children}
    </button>
  );
}

function GhostButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "inline-flex items-center justify-center rounded-xl",
        "px-4 py-3 text-white/80 font-semibold",
        "border border-white/15 bg-white/5 hover:bg-white/10",
        "transition-colors",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
