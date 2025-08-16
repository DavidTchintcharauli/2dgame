type BuffersMap = Record<string, AudioBuffer>;

type AudioOptions = {
  sfxVolume: number;
  bgmVolume: number;
  masterVolume: number;
};

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain!: GainNode;
  private sfxGain!: GainNode;
  private bgmGain!: GainNode;

  private sfx: BuffersMap = {};
  private bgm: AudioBuffer[] = [];
  private bgmSource: AudioBufferSourceNode | null = null;

  private inited = false;
  private loading: Promise<void> | null = null;

  private opts: AudioOptions ;
  constructor(opts?: Partial<AudioOptions >) {
    this.opts = { sfxVolume: 0.9, bgmVolume: 0.35, masterVolume: 1, ...opts };
  }

  private async init() {
    if (this.inited) return;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    this.masterGain = this.ctx.createGain();
    this.sfxGain = this.ctx.createGain();
    this.bgmGain = this.ctx.createGain();

    this.masterGain.gain.value = this.opts.masterVolume;
    this.sfxGain.gain.value = this.opts.sfxVolume;
    this.bgmGain.gain.value = this.opts.bgmVolume;

    this.sfxGain.connect(this.masterGain);
    this.bgmGain.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.inited = true;
  }

  async resume() {
    await this.init();
    if (this.ctx!.state !== "running") {
      await this.ctx!.resume();
    }
  }

  private async decodeFromUrl(url: string): Promise<AudioBuffer> {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return await this.ctx!.decodeAudioData(buf);
  }

  async loadAll(sfxUrls: Record<string, string>, bgmUrls: string[]) {
    if (this.loading) return this.loading;
    this.loading = (async () => {
      await this.init();
      const sfxEntries = await Promise.all(
        Object.entries(sfxUrls).map(async ([name, url]) => {
          const buffer = await this.decodeFromUrl(url);
          return [name, buffer] as const;
        })
      );
      this.sfx = Object.fromEntries(sfxEntries);

      this.bgm = await Promise.all(bgmUrls.map((u) => this.decodeFromUrl(u)));
    })();
    return this.loading;
  }

  setMasterVolume(v: number) {
    if (!this.inited) return;
    this.masterGain.gain.value = v;
  }
  setSfxVolume(v: number) {
    if (!this.inited) return;
    this.sfxGain.gain.value = v;
  }
  setBgmVolume(v: number) {
    if (!this.inited) return;
    this.bgmGain.gain.value = v;
  }

  playSfx(name: string) {
    if (!this.inited) return;
    const buf = this.sfx[name];
    if (!buf) return;
    const src = this.ctx!.createBufferSource();
    src.buffer = buf;
    src.connect(this.sfxGain);
    src.start(0);
  }

  async playRandomBgm({ fadeMs = 800 }: { fadeMs?: number } = {}) {
    if (!this.inited || this.bgm.length === 0) return;
    const idx = Math.floor(Math.random() * this.bgm.length);
    await this.playBgmBuffer(this.bgm[idx], { fadeMs });
  }

  private async playBgmBuffer(buffer: AudioBuffer, { fadeMs = 800 } = {}) {
    if (!this.inited) return;
    const now = this.ctx!.currentTime;

    if (this.bgmSource) {
      this.bgmGain.gain.cancelScheduledValues(now);
      this.bgmGain.gain.setTargetAtTime(0.0001, now, fadeMs / 1000 / 5);
      this.bgmSource.stop(now + fadeMs / 1000 + 0.05);
      this.bgmSource.disconnect();
      this.bgmSource = null;
    }

    const src = this.ctx!.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.connect(this.bgmGain);

    this.bgmGain.gain.setValueAtTime(0.0001, now);
    this.bgmGain.gain.linearRampToValueAtTime(this.opts.bgmVolume, now + fadeMs / 1000);

    src.start(now + 0.01);
    this.bgmSource = src;
  }

  stopBgm({ fadeMs = 400 }: { fadeMs?: number } = {}) {
    if (!this.inited || !this.bgmSource) return;
    const now = this.ctx!.currentTime;
    this.bgmGain.gain.cancelScheduledValues(now);
    this.bgmGain.gain.setTargetAtTime(0.0001, now, fadeMs / 1000 / 5);
    this.bgmSource.stop(now + fadeMs / 1000 + 0.05);
    this.bgmSource.disconnect();
    this.bgmSource = null;
  }
}
