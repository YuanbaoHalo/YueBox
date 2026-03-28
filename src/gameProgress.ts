import { BoardGrid, Piece } from './types'

export interface GameProgressState {
  board: BoardGrid
  piece: Piece
  nextPiece: Piece
  score: number
  operaProgress: number
  linesAccum: number
  speed: 'slow' | 'normal' | 'fast'
  isPaused: boolean
}

const KEYS = {
  classic: 'yueyunfangkuai_classic_progress',
  opera: 'yueyunfangkuai_opera_progress',
} as const

export function saveGameProgress(mode: 'classic' | 'opera', state: GameProgressState): void {
  try {
    localStorage.setItem(KEYS[mode], JSON.stringify(state))
  } catch {
    // ignore storage errors
  }
}

export function loadGameProgress(mode: 'classic' | 'opera'): GameProgressState | null {
  try {
    const raw = localStorage.getItem(KEYS[mode])
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<GameProgressState>
    // validate required fields
    if (
      !Array.isArray(parsed.board) ||
      !parsed.piece ||
      !parsed.nextPiece ||
      typeof parsed.score !== 'number'
    ) return null
    return {
      board: parsed.board,
      piece: parsed.piece,
      nextPiece: parsed.nextPiece,
      score: parsed.score ?? 0,
      operaProgress: parsed.operaProgress ?? 0,
      linesAccum: parsed.linesAccum ?? 0,
      speed: parsed.speed ?? 'normal',
      isPaused: parsed.isPaused ?? true,
    }
  } catch {
    return null
  }
}

export function clearGameProgress(mode: 'classic' | 'opera'): void {
  try {
    localStorage.removeItem(KEYS[mode])
    if (mode === 'opera') {
      // 清除戏韵累计进度和当前唱段索引
      localStorage.removeItem('yuebox-opera-progress')
      localStorage.removeItem('yuebox-current-track-index')
      localStorage.removeItem('yuebox-full-played')
      // 清除所有唱段的解锁记录和碎片索引（前缀匹配）
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (
          k &&
          (
            k.startsWith('yuebox-unlocked-') ||
            k.startsWith('yuebox-fragment-idx-') ||
            k.startsWith('yuebox-col-')
          )
        ) {
          keysToRemove.push(k)
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k))
    }
  } catch {
    // ignore
  }
}
