import jumpSfxUrl from "../assets/audio/jump.wav";
import gameOverUrl from "../assets/audio/game_over.wav";
import nextLevelUrl from "../assets/audio/next_level.wav";
import bgm1Url from "../assets/audio/track1_lite.wav";
import bgm2Url from "../assets/audio/track2_lite.wav";
import bgm3Url from "../assets/audio/track3_lite.wav";
import bgm4Url from "../assets/audio/track4_lite.wav";

export const SFX_URLS = {
  jump: jumpSfxUrl,
  gameover: gameOverUrl,
  nextlevel: nextLevelUrl,
} as const;

export const BGM_URLS = [bgm1Url, bgm2Url, bgm3Url, bgm4Url];