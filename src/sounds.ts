// ═══════════════════════════════════════════
// 统一音效事件系统
// playSound(event, mode) 统一入口
// 内部根据模式分发到不同风格的合成函数
// ═══════════════════════════════════════════

import type { GameMode } from './hooks/useTetris'

let ctx: AudioContext | null = null
let unlocked = false

function setupAutoUnlock() {
  const unlock = () => {
    if (!ctx) ctx = new AudioContext()
    if (ctx.state === 'suspended') ctx.resume()
    unlocked = true
    document.removeEventListener('pointerdown', unlock)
    document.removeEventListener('keydown', unlock)
  }
  document.addEventListener('pointerdown', unlock)
  document.addEventListener('keydown', unlock)
}
setupAutoUnlock()

export function unlockAudio() {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  unlocked = true
}

function C(): AudioContext | null {
  if (!ctx || !unlocked) return null
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// ─── 基础合成工具 ───
function sine(c: AudioContext, freq: number, endFreq: number, vol: number, dur: number, startAt = 0) {
  const t = c.currentTime + startAt
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.connect(g); g.connect(c.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, t)
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur)
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  osc.start(t); osc.stop(t + dur + 0.01)
}

function tri(c: AudioContext, freq: number, endFreq: number, vol: number, dur: number, startAt = 0) {
  const t = c.currentTime + startAt
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.connect(g); g.connect(c.destination)
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(freq, t)
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur)
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  osc.start(t); osc.stop(t + dur + 0.01)
}

function noise(c: AudioContext, vol: number, dur: number, hipass = 0, startAt = 0) {
  const t = c.currentTime + startAt
  const size = Math.ceil(c.sampleRate * dur)
  const buf = c.createBuffer(1, size, c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < size; i++) d[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buf
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  if (hipass > 0) {
    const f = c.createBiquadFilter()
    f.type = 'highpass'; f.frequency.value = hipass
    src.connect(f); f.connect(g)
  } else {
    src.connect(g)
  }
  g.connect(c.destination)
  src.start(t)
}

// ═══════════════════════════════════════════
// 经典模式音效
// ═══════════════════════════════════════════
const classic = {
  move:       (c: AudioContext) => { sine(c, 440, 330, 0.05, 0.04) },
  rotate:     (c: AudioContext) => { sine(c, 520, 420, 0.06, 0.05) },
  softDrop:   (c: AudioContext) => { sine(c, 300, 200, 0.04, 0.03) },
  hardDrop:   (c: AudioContext) => { sine(c, 200, 60, 0.4, 0.1); noise(c, 0.2, 0.06, 800) },
  lock:       (c: AudioContext) => { sine(c, 180, 80, 0.3, 0.1); noise(c, 0.1, 0.04) },
  clear1: (c: AudioContext) => {
    sine(c, 600, 800, 0.25, 0.12)
    sine(c, 800, 1000, 0.15, 0.1, 0.04)
  },
  clear2: (c: AudioContext) => {
    sine(c, 600, 900, 0.3, 0.15)
    sine(c, 900, 1200, 0.2, 0.12, 0.05)
    sine(c, 1200, 1500, 0.12, 0.1, 0.1)
  },
  clear3: (c: AudioContext) => {
    sine(c, 500, 900, 0.35, 0.18)
    sine(c, 900, 1400, 0.22, 0.15, 0.06)
    sine(c, 1400, 1800, 0.15, 0.12, 0.12)
    noise(c, 0.08, 0.05, 1000)
  },
  clear4: (c: AudioContext) => {
    sine(c, 400, 1000, 0.4, 0.2)
    sine(c, 800, 1600, 0.25, 0.18, 0.05)
    sine(c, 1200, 2000, 0.18, 0.15, 0.1)
    sine(c, 1600, 2400, 0.12, 0.12, 0.15)
    noise(c, 0.12, 0.06, 1200)
  },
  gameOver: (c: AudioContext) => {
    sine(c, 400, 200, 0.3, 0.15)
    sine(c, 300, 150, 0.25, 0.2, 0.1)
    sine(c, 200, 80, 0.2, 0.3, 0.2)
    sine(c, 120, 60, 0.15, 0.4, 0.4)
  },
  stageClear: (c: AudioContext) => {
    sine(c, 600, 800, 0.25, 0.08)
    sine(c, 800, 1000, 0.2, 0.08, 0.1)
    sine(c, 1000, 1200, 0.2, 0.08, 0.2)
    sine(c, 1200, 1500, 0.25, 0.15, 0.3)
  },
  newRecord: (c: AudioContext) => {
    sine(c, 800, 1000, 0.2, 0.06)
    sine(c, 1000, 1200, 0.2, 0.06, 0.08)
    sine(c, 1200, 1500, 0.25, 0.1, 0.16)
    sine(c, 1500, 1800, 0.3, 0.15, 0.28)
    noise(c, 0.08, 0.04, 1500, 0.28)
  },
  fragmentUnlock: (c: AudioContext) => {
    sine(c, 900, 1100, 0.18, 0.08)
    sine(c, 1100, 1400, 0.2, 0.1, 0.1)
    sine(c, 1400, 1700, 0.22, 0.12, 0.22)
  },
  fragmentReveal: (c: AudioContext) => {
    sine(c, 500, 600, 0.12, 0.25)
    sine(c, 600, 700, 0.1, 0.22, 0.08)
    sine(c, 250, 200, 0.07, 0.35, 0.05)
  },
}

// ═══════════════════════════════════════════
// 戏曲模式音效
// ═══════════════════════════════════════════
const opera = {
  move:       (c: AudioContext) => { sine(c, 800, 500, 0.06, 0.04) },
  rotate:     (c: AudioContext) => { tri(c, 700, 500, 0.07, 0.05) },
  softDrop:   (c: AudioContext) => { sine(c, 200, 100, 0.06, 0.05) },
  hardDrop:   (c: AudioContext) => {
    sine(c, 160, 40, 0.7, 0.12)
    tri(c, 240, 80, 0.35, 0.18)
    noise(c, 0.2, 0.06)
  },
  lock:       (c: AudioContext) => {
    sine(c, 120, 40, 0.5, 0.12)
    tri(c, 200, 80, 0.3, 0.18)
    noise(c, 0.15, 0.05)
  },
  clear1: (c: AudioContext) => {
    tri(c, 900, 500, 0.3, 0.35)
    sine(c, 200, 100, 0.12, 0.25, 0.05)
  },
  clear2: (c: AudioContext) => {
    tri(c, 1100, 600, 0.38, 0.45)
    sine(c, 550, 300, 0.18, 0.4, 0.05)
    sine(c, 180, 90, 0.12, 0.35, 0.08)
    noise(c, 0.15, 0.03, 2000)
  },
  clear3: (c: AudioContext) => {
    tri(c, 1300, 650, 0.45, 0.55)
    sine(c, 650, 320, 0.22, 0.5, 0.04)
    sine(c, 160, 80, 0.18, 0.6, 0.06)
    noise(c, 0.18, 0.04, 1800)
  },
  clear4: (c: AudioContext) => {
    tri(c, 1500, 700, 0.55, 0.65)
    sine(c, 750, 350, 0.28, 0.6, 0.03)
    sine(c, 350, 160, 0.2, 0.7, 0.05)
    sine(c, 140, 70, 0.15, 0.8, 0.1)
    noise(c, 0.22, 0.05, 1600)
  },
  gameOver: (c: AudioContext) => {
    tri(c, 600, 300, 0.3, 0.3)
    sine(c, 300, 150, 0.25, 0.4, 0.15)
    sine(c, 150, 80, 0.2, 0.5, 0.3)
    sine(c, 80, 40, 0.12, 0.6, 0.5)
  },
  stageClear: (c: AudioContext) => {
    tri(c, 800, 900, 0.2, 0.1)
    tri(c, 1000, 1100, 0.25, 0.1, 0.14)
    tri(c, 1200, 1400, 0.35, 0.2, 0.28)
    sine(c, 300, 200, 0.15, 0.25, 0.28)
    noise(c, 0.12, 0.04, 1500, 0.28)
  },
  newRecord: (c: AudioContext) => {
    tri(c, 900, 1000, 0.25, 0.1)
    tri(c, 1100, 1200, 0.3, 0.1, 0.12)
    tri(c, 1300, 1500, 0.4, 0.2, 0.24)
    sine(c, 250, 180, 0.2, 0.35, 0.24)
    sine(c, 180, 100, 0.15, 0.45, 0.35)
    noise(c, 0.15, 0.05, 1400, 0.24)
  },
  fragmentUnlock: (c: AudioContext) => {
    // 片段解锁：清亮三音上扬，仿丝竹引入
    tri(c, 1000, 1200, 0.2, 0.08)
    tri(c, 1200, 1500, 0.22, 0.1, 0.1)
    tri(c, 1500, 1800, 0.28, 0.14, 0.22)
    sine(c, 300, 200, 0.1, 0.2, 0.22)
  },
  fragmentReveal: (c: AudioContext) => {
    // 唱词显现：轻柔正弦，如丝竹余韵
    sine(c, 500, 600, 0.15, 0.3)
    sine(c, 600, 700, 0.12, 0.28, 0.1)
    sine(c, 250, 200, 0.08, 0.4, 0.05)
  },
}

// ═══════════════════════════════════════════
// 音效事件类型
// ═══════════════════════════════════════════
export type SoundEvent =
  | 'move' | 'rotate' | 'softDrop' | 'hardDrop'
  | 'lock'
  | 'clear1' | 'clear2' | 'clear3' | 'clear4'
  | 'gameOver' | 'stageClear' | 'newRecord'
  | 'fragmentUnlock' | 'fragmentReveal'

// ═══════════════════════════════════════════
// 统一入口：playSound(event, mode)
// ═══════════════════════════════════════════
// 落地音效节流：300ms 内同类音效只播一次
const _lastPlayed: Partial<Record<SoundEvent, number>> = {}
const THROTTLE_MS: Partial<Record<SoundEvent, number>> = { lock: 300, hardDrop: 300 }

export function playSound(event: SoundEvent, mode: GameMode) {
  const throttleMs = THROTTLE_MS[event]
  if (throttleMs) {
    const now = Date.now()
    if (now - (_lastPlayed[event] ?? 0) < throttleMs) return
    _lastPlayed[event] = now
  }
  const c = C()
  if (!c) return
  try {
    const map = mode === 'opera' ? opera : classic
    map[event](c)
  } catch (_) { /* 静默失败 */ }
}

// 向后兼容
export function playLand() {}
export function playClear() {}
export function playMove() {}
