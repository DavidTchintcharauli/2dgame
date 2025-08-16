import { AudioManager } from "./AudioManager";
import { SFX_URLS, BGM_URLS } from "./assets";

export const audio = new AudioManager();

export async function startAudioSession() {
  await audio.resume();
  await audio.loadAll(SFX_URLS, BGM_URLS);
  await audio.playRandomBgm({ fadeMs: 800 });
}

export function stopAudioSession() {
  audio.stopBgm({ fadeMs: 300 });
}

export const playJumpSfx = () => audio.playSfx("jump");
export const playGameOver = () => audio.playSfx("gameover");
export const playNextLevel = () => audio.playSfx("nextlevel");
