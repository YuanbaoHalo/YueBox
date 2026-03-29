import { useEffect, useState, useRef } from 'react'
import { BoardGrid, Piece, Shape } from '../types'
import { playSound } from '../sounds'
import { unlockNextFragment, FragmentReward, loadCurrentTrackIndex } from '../operaData'
import { GameProgressState } from '../gameProgress'

function createEmptyBoard(): BoardGrid {
  return Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => 0))
}

const SHAPES: { shape: Shape; colorId: number }[] = [
  { shape: [[1, 0], [1, 0], [1, 1]], colorId: 1 },
  { shape: [[0, 1], [0, 1], [1, 1]], colorId: 2 },
  { shape: [[1], [1], [1], [1]],     colorId: 3 },
  { shape: [[1, 1], [1, 1]],         colorId: 4 },
  { shape: [[1, 1, 1], [0, 1, 0]],   colorId: 5 },
]

function createNewPiece(): Piece {
  const { shape, colorId } = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  const col = Math.floor((10 - shape[0].length) / 2)
  return { shape, position: { row: 0, col }, colorId }
}

function getMergedBoard(board: BoardGrid, piece: Piece): BoardGrid {
  const merged = board.map(row => [...row])
  piece.shape.forEach((shapeRow, r) => {
    shapeRow.forEach((cell, c) => {
      if (cell === 1) {
        const boardRow = piece.position.row + r
        const boardCol = piece.position.col + c
        if (boardRow >= 0 && boardRow < 20 && boardCol >= 0 && boardCol < 10) {
          merged[boardRow][boardCol] = piece.colorId
        }
      }
    })
  })
  return merged
}

function rotateShape(shape: Shape): Shape {
  const rows = shape.length
  const cols = shape[0].length
  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => shape[rows - 1 - r][c])
  )
}

function isValidPosition(board: BoardGrid, piece: Piece): boolean {
  return piece.shape.every((shapeRow, r) =>
    shapeRow.every((cell, c) => {
      if (cell !== 1) return true
      const boardRow = piece.position.row + r
      const boardCol = piece.position.col + c
      if (boardRow < 0 || boardRow >= 20 || boardCol < 0 || boardCol >= 10) return false
      return board[boardRow][boardCol] === 0
    })
  )
}

function clearFullRows(board: BoardGrid): { newBoard: BoardGrid; linesCleared: number } {
  const remaining = board.filter(row => row.some(cell => cell === 0))
  const linesCleared = 20 - remaining.length
  const emptyRows = Array.from({ length: linesCleared }, () => Array.from({ length: 10 }, () => 0))
  return { newBoard: [...emptyRows, ...remaining], linesCleared }
}

function isOverlapping(board: BoardGrid, piece: Piece): boolean {
  return piece.shape.some((shapeRow, r) =>
    shapeRow.some((cell, c) => {
      if (cell !== 1) return false
      const boardRow = piece.position.row + r
      const boardCol = piece.position.col + c
      return board[boardRow]?.[boardCol] !== 0
    })
  )
}

function getDroppedPiece(board: BoardGrid, piece: Piece): Piece {
  let dropped = piece
  while (true) {
    const next: Piece = { ...dropped, position: { ...dropped.position, row: dropped.position.row + 1 } }
    if (!isValidPosition(board, next)) break
    dropped = next
  }
  return dropped
}

function loadBestScore(): number {
  const saved = localStorage.getItem('yuebox-best-score')
  return saved ? parseInt(saved, 10) : 0
}
function saveBestScore(score: number) {
  localStorage.setItem('yuebox-best-score', String(score))
}
function loadOperaProgress(): number {
  const saved = localStorage.getItem('yuebox-opera-progress')
  return saved ? parseInt(saved, 10) : 0
}
function saveOperaProgress(val: number) {
  localStorage.setItem('yuebox-opera-progress', String(val))
}

// ─── 测试版：每消1行解锁1个唱段碎片，消4行完整通关整段，设为 false 恢复正式规则 ───
// ─── 正式过关曲线 ───
// 根据唱段索引返回每小节目标戏韵
function getOperaTarget(trackIdx: number): number {
  if (trackIdx === 0) return 10        // 第1个唱段（试玩）
  if (trackIdx <= 14) return 20       // 第2-15个唱段（前期）
  if (trackIdx <= 34) return 25       // 第16-35个唱段（中期）
  return 30                           // 第36-40个唱段（后期）
}

// 根据连消行数返回戏韵增益
function calcOperaGain(linesCleared: number): number {
  if (linesCleared >= 3) return 8     // 连扉3行及以上
  if (linesCleared === 2) return 6    // 连扉2行
  return 2                            // 单行消除
}
// 测试模式已关闭，使用正式规则
const OPERA_TEST_QUICK_CLEAR = false

// 当前唱段目标戏韵（由 useTetris 内部动态读取）

export type GameMode = 'classic' | 'opera'

export function useTetris(mode: GameMode = 'classic', initialState?: GameProgressState | null) {
  const [board, setBoard] = useState<BoardGrid>(() => initialState?.board ?? createEmptyBoard())
  const [piece, setPiece] = useState<Piece>(() => initialState?.piece ?? createNewPiece())
  const [nextPiece, setNextPiece] = useState<Piece>(() => initialState?.nextPiece ?? createNewPiece())
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(() => initialState?.score ?? 0)
  const [bestScore, setBestScore] = useState<number>(loadBestScore)
  const [isFast, setIsFast] = useState(false)
  const [isPaused, setIsPaused] = useState(() => initialState?.isPaused ?? false)
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>(() => initialState?.speed ?? 'normal')
  const [clearingRows, setClearingRows] = useState<number[]>([])
  const [operaProgress, setOperaProgress] = useState<number>(() => {
    const saved = initialState?.operaProgress ?? loadOperaProgress()
    return saved >= 10 ? 0 : saved
  })
  const [sessionGain, setSessionGain] = useState(0)
  const [linesAccum, setLinesAccum] = useState(() => initialState?.linesAccum ?? 0)
  const [stageClear, setStageClear] = useState(false)
  const [currentReward, setCurrentReward] = useState<FragmentReward | null>(null)
  const [testFragCount, setTestFragCount] = useState(0) // 测试版：当前唱段已解锁碎片数（0-4）
  const [fragmentUnlocked, setFragmentUnlocked] = useState(false) // 碎片解锁提示

  // 单步下移一格（供触屏按钮单击使用）
  function moveDownOne() {
    if (gameOver || isPaused) return
    setPiece(prev => {
      const next: Piece = { ...prev, position: { ...prev.position, row: prev.position.row + 1 } }
      if (!isValidPosition(board, next)) {
        setNextPiece(currentNext => { lockAndSpawnNext(board, prev, currentNext, false); return currentNext })
        return prev
      }
      return next
    })
  }

  function togglePause() { setIsPaused(prev => !prev) }

  function cycleSpeed() {
    setSpeed(prev => prev === 'slow' ? 'normal' : prev === 'normal' ? 'fast' : 'slow')
  }

  // 触发通关：暂停游戏，解锁片段，顺序播放音效
  // 触发通关：暂停游戏，顺序播放音效
  const stageClearRef = useRef(false)
  const isLockingRef = useRef(false)
  function triggerStageClear(_newProgress: number) {
    if (stageClearRef.current) return  // 防止重复触发
    stageClearRef.current = true
    setIsPaused(true)
    setStageClear(true)
    playSound('stageClear', mode)
    setTimeout(() => playSound('fragmentUnlock', mode), 400)
    setTimeout(() => playSound('fragmentReveal', mode), 900)
  }

  function lockAndSpawnNext(
    currentBoard: BoardGrid,
    lockedPiece: Piece,
    currentNextPiece: Piece,
    isHardDrop = false
  ) {
    if (isLockingRef.current) return
    isLockingRef.current = true
    const merged = getMergedBoard(currentBoard, lockedPiece)
    const { newBoard, linesCleared } = clearFullRows(merged)

    if (linesCleared > 0) {
      const fullRowIndices: number[] = []
      merged.forEach((row, i) => {
        if (row.every(cell => cell !== 0)) fullRowIndices.push(i)
      })
      setBoard(merged)
      setClearingRows(fullRowIndices)

      const clearEvent = (['clear1', 'clear2', 'clear3', 'clear4'] as const)[Math.min(linesCleared, 4) - 1]
      playSound(clearEvent, mode)

      let isNewRecord = false
      setScore(s => {
        const newScore = s + (linesCleared >= 3 ? 100 : linesCleared === 2 ? 60 : 20)
        setBestScore(best => {
          if (newScore > best) { saveBestScore(newScore); isNewRecord = true; return newScore }
          return best
        })
        return newScore
      })

      // 戏曲模式：测试版每消1行解锁1个碎片，集齐4个碎片才触发折末通关页
      if (mode === 'opera') {
        if (OPERA_TEST_QUICK_CLEAR) {
          // 测试版：每消1行解锁1个收藏库唱词碎片，集齐4个触发通关页
          setTestFragCount(prev => {
            const next = prev + 1
            const progress = Math.min(next * 5, 20)
            setOperaProgress(progress)
            saveOperaProgress(progress)
            if (next >= 4) {
              setTimeout(() => triggerStageClear(20), 250)
              return 0
            }
            // 静默解锁碎片，显示简短提示
            setTimeout(() => { setIsPaused(true); setFragmentUnlocked(true) }, 250)
            return next
          })
        } else {
          const target = getOperaTarget(loadCurrentTrackIndex())
          const gain = calcOperaGain(linesCleared)
          if (gain > 0) {
            setLinesAccum(prev => prev + linesCleared)
            setSessionGain(s => s + gain)
            setOperaProgress(prev => {
              const next = prev + gain
              saveOperaProgress(next)
              if (next >= target) {
                setTimeout(() => triggerStageClear(next), 250)
              }
              return next
            })
          }
        }
      }

      setTimeout(() => {
        setClearingRows([])
        isLockingRef.current = false
        setBoard(newBoard)
        if (!isOverlapping(newBoard, currentNextPiece)) {
          if (isNewRecord) setTimeout(() => playSound('newRecord', mode), 300)
          setPiece(currentNextPiece)
          setNextPiece(createNewPiece())
        } else {
          playSound('gameOver', mode)
          setGameOver(true)
        }
      }, 180)
      return
    }

    isLockingRef.current = false
    if (isHardDrop) { playSound('hardDrop', mode) } else { playSound('lock', mode) }
    setBoard(newBoard)
    if (isOverlapping(newBoard, currentNextPiece)) {
      playSound('gameOver', mode)
      setGameOver(true)
      return
    }
    setPiece(currentNextPiece)
    setNextPiece(createNewPiece())
  }

  // 自动下落
  useEffect(() => {
    if (gameOver || isPaused) return
    // 戏曲模式比经典模式快约 15%
    const slowMs = mode === 'opera' ? 1224 : 1440
    const normMs = mode === 'opera' ? 816  : 960
    const fastMs = mode === 'opera' ? 408  : 480
    const baseInterval = speed === 'slow' ? slowMs : speed === 'fast' ? fastMs : normMs
    const interval = isFast ? 80 : baseInterval
    const timer = setInterval(() => {
      setPiece(prev => {
        const next: Piece = { ...prev, position: { ...prev.position, row: prev.position.row + 1 } }
        if (!isValidPosition(board, next)) {
          setNextPiece(currentNext => { lockAndSpawnNext(board, prev, currentNext, false); return currentNext })
          return prev
        }
        return next
      })
    }, interval)
    return () => clearInterval(timer)
  }, [gameOver, isFast, speed, isPaused, board])

  // 键盘控制
  useEffect(() => {
    if (gameOver || isPaused) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPiece(prev => {
          const next = { ...prev, position: { ...prev.position, col: prev.position.col - 1 } }
          if (isValidPosition(board, next)) { playSound('move', mode); return next }
          return prev
        })
      }
      if (e.key === 'ArrowRight') {
        setPiece(prev => {
          const next = { ...prev, position: { ...prev.position, col: prev.position.col + 1 } }
          if (isValidPosition(board, next)) { playSound('move', mode); return next }
          return prev
        })
      }
      if (e.key === 'ArrowUp') {
        setPiece(prev => {
          const rotated = { ...prev, shape: rotateShape(prev.shape) }
          if (isValidPosition(board, rotated)) { playSound('rotate', mode); return rotated }
          const k1 = { ...rotated, position: { ...rotated.position, col: rotated.position.col - 1 } }
          if (isValidPosition(board, k1)) { playSound('rotate', mode); return k1 }
          const k2 = { ...rotated, position: { ...rotated.position, col: rotated.position.col - 2 } }
          if (isValidPosition(board, k2)) { playSound('rotate', mode); return k2 }
          const k3 = { ...rotated, position: { ...rotated.position, col: rotated.position.col + 1 } }
          if (isValidPosition(board, k3)) { playSound('rotate', mode); return k3 }
          return prev
        })
      }
      if (e.key === 'ArrowDown') { setIsFast(true); playSound('softDrop', mode) }
      if (e.key === ' ') {
        e.preventDefault()
        setPiece(prev => {
          const dropped = getDroppedPiece(board, prev)
          setNextPiece(currentNext => { lockAndSpawnNext(board, dropped, currentNext, true); return currentNext })
          return dropped
        })
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === 'ArrowDown') setIsFast(false) }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameOver, isPaused, board])

  // 再来一局：重置当前局，保留总进度
  function restart(fullReset = false) {
    setBoard(createEmptyBoard())
    setPiece(createNewPiece())
    setNextPiece(createNewPiece())
    setGameOver(false)
    setStageClear(false)
    setCurrentReward(null)
    setScore(0)
    setSessionGain(0)
    setLinesAccum(0)
    setIsFast(false)
    setIsPaused(false)
    setTestFragCount(0)
    setFragmentUnlocked(false)
    stageClearRef.current = false
    isLockingRef.current = false
    if (fullReset) {
      // 完全归零：清空进度时调用
      setOperaProgress(0)
      saveOperaProgress(0)
      setBestScore(0)
    } else {
      // 通关后归零，开启新一折
      setOperaProgress(0)
      saveOperaProgress(0)
    }
  }

  const mergedBoard = getMergedBoard(board, piece)

  return {
    board: mergedBoard,
    rawBoard: board,
    rawPiece: piece,
    rawNextPiece: nextPiece,
    rawScore: score,
    rawOperaProgress: operaProgress,
    rawLinesAccum: linesAccum,
    rawSpeed: speed,
    rawIsPaused: isPaused,
    clearingRows,
    nextPiece,
    gameOver,
    restart,
    score,
    bestScore,
    isPaused,
    togglePause,
    speed,
    cycleSpeed,
    operaProgress,
    sessionGain,
    operaTarget: getOperaTarget(loadCurrentTrackIndex()),
    stageClear,
    currentReward,
    setFast: setIsFast,
    moveDownOne,
    setCurrentReward,
    testFragCount,
    fragmentUnlocked,
    setFragmentUnlocked,
  }
}
