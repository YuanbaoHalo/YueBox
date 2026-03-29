import { useState, useEffect, useRef } from 'react'
import { useTetris, GameMode } from './hooks/useTetris'
import { Board } from './components/Board'
import { CollectionPage } from './components/CollectionPage'
import { Piece } from './types'
import { unlockAudio, playSound } from './sounds'
import { loadCurrentTrackIndex, advanceToNextTrack, playTrack, stopTrack, loadCurrentTrackProgress, unlockHtmlAudio } from './operaData'
import { OPERA_COLLECTION_LIBRARY, loadColUnlocked, unlockColLyric } from './operaCollectionLibrary'
import './App.css'
import { saveGameProgress, loadGameProgress, clearGameProgress, GameProgressState } from './gameProgress'

function PiecePreview({ piece }: { piece: Piece }) {
  const grid = Array.from({ length: 4 }, () => Array(4).fill(0))
  const rowOffset = Math.floor((4 - piece.shape.length) / 2)
  const colOffset = Math.floor((4 - piece.shape[0].length) / 2)
  piece.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 1) grid[rowOffset + r][colOffset + c] = piece.colorId
    })
  })
  return (
    <div className="preview-grid">
      {grid.map((row, r) => (
        <div key={r} className="preview-row">
          {row.map((cell: number, c: number) => (
            <div key={c} className={`preview-cell ${cell === 0 ? 'preview-cell-empty' : `cell-color-${cell}`}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

function OperaProgressBar({ progress, target }: { progress: number; target: number }) {
  const pct = Math.min(100, Math.round((progress / target) * 100))
  return (
    <div className="opera-progress-box">
      <p className="score-label">戏韵</p>
      <p className="opera-progress-value">{progress} / {target}</p>
      <div className="opera-bar-track">
        <div className="opera-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}


interface HomePageProps {
  onStart: (mode?: 'classic' | 'opera') => void
  onCollection: () => void
  onBadges: () => void
  onClearProgress: (mode: 'classic' | 'opera') => void
  hasClassicSave: boolean
  hasOperaSave: boolean
}

function HomePage({ onStart, onCollection, onBadges, onClearProgress, hasClassicSave, hasOperaSave }: HomePageProps) {
  function handleClear(mode: 'classic' | 'opera') {
    const msg = mode === 'classic'
      ? '确定清空经典模式进度吗？\n当前游戏进度将被删除。'
      : '确定清空戏曲模式当前进度吗？\n已收集唱段和徽章不会受影响。'
    if (window.confirm(msg)) onClearProgress(mode)
  }
  // 初始化缩放
  const [scaleLarge, setScaleLarge] = useState(() => parseFloat(localStorage.getItem('ui-scale') || '1') > 1)
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="home-title-area">
          <h1 className="home-title">越韵方块</h1>
          <p className="home-subtitle">积韵传情，一行一曲</p>
        </div>
        <div className="home-actions">
          <button className="home-btn home-btn--primary" onClick={() => onStart()}>开始游戏</button>
          <div className="home-mode-btns">
            <div className="home-mode-group">
              <button className="home-btn home-btn--mode" onClick={() => onStart('classic')}>
                {hasClassicSave ? '继续经典' : '经典模式'}
              </button>
              {hasClassicSave && (
                <button className="home-btn--reset" onClick={() => handleClear('classic')}>清空经典进度</button>
              )}
            </div>
            <div className="home-mode-group">
              <button className="home-btn home-btn--mode" onClick={() => onStart('opera')}>
                {hasOperaSave ? '继续戏曲' : '戏曲模式'}
              </button>
              {hasOperaSave && (
                <button className="home-btn--reset" onClick={() => handleClear('opera')}>清空戏曲进度</button>
              )}
            </div>
          </div>
          <div className="home-nav-btns">
            <button className="home-btn home-btn--nav" onClick={onCollection}>♪ 唱段收藏</button>
            <button className="home-btn home-btn--nav" onClick={onBadges}>★ 我的徽章</button>
          </div>
          <div className="home-scale-btn-wrap">
            <button
              className="home-btn home-btn--scale"
              onClick={() => {
                const isLarge = document.documentElement.classList.toggle('large-mode')
                localStorage.setItem('ui-scale', isLarge ? '1.3' : '1')
                setScaleLarge(isLarge)
              }}
            >{scaleLarge ? '[ 标准模式 ]' : '[ 大字模式 ]'}</button>
          </div>
        </div>
        <p className="home-credit">Yuanbao Halo 出品</p>
      </div>
    </div>
  )
}
function App() {
  const [mode, setMode] = useState<GameMode>('classic')
  const [view, setView] = useState<'home' | 'game' | 'collection' | 'badges'>('home')
  const autoPlayedRef = useRef(false)  // 防止重复自动播放
  const [stagedColItem, setStagedColItem] = useState<typeof currentColItem | null>(null)
  const snapIdxRef = useRef<number>(0) // stageClear 触发时的唱段索引快照
  const [stagedColUnlocked, setStagedColUnlocked] = useState<number[]>([])
  const initialStateRef = useRef<GameProgressState | null>(null)
  const [hasClassicSave, setHasClassicSave] = useState(() => loadGameProgress('classic') !== null)
  const [hasOperaSave, setHasOperaSave] = useState(() => loadGameProgress('opera') !== null)

  const {
    board, nextPiece, gameOver, restart,
    score, bestScore, isPaused, togglePause,
    speed, cycleSpeed, clearingRows,
    operaProgress, sessionGain, operaTarget,
    stageClear, currentReward, setFast,
    rawBoard, rawPiece, rawNextPiece, rawScore,
    rawOperaProgress, rawLinesAccum, rawSpeed, rawIsPaused,
    moveDownOne, setCurrentReward, testFragCount, fragmentUnlocked, setFragmentUnlocked,
  } = useTetris(mode, initialStateRef.current)

  const isOpera = mode === 'opera'

  // 构造当前存档状态
  function getCurrentProgress(): GameProgressState {
    return {
      board: rawBoard,
      piece: rawPiece,
      nextPiece: rawNextPiece,
      score: rawScore,
      operaProgress: rawOperaProgress,
      linesAccum: rawLinesAccum,
      speed: rawSpeed,
      isPaused: true,  // 恢复时总是暂停
    }
  }

  // 模式切换时重置棋盘
  useEffect(() => {
    // 切换模式时加载目标模式存档，传给下次渲染
    const saved = loadGameProgress(mode)
    // operaProgress 每节从0开始，不从存档恢复
    if (saved) saved.operaProgress = 0
    initialStateRef.current = saved
    restart()
    if (initialStateRef.current) {
      setTimeout(() => togglePause(), 0)
    }
  }, [mode])

  // 当前唱段（从收藏库读取，与收藏页保持一致）
  const currentColIdx = loadCurrentTrackIndex()
  const currentColItem = OPERA_COLLECTION_LIBRARY[Math.min(currentColIdx, OPERA_COLLECTION_LIBRARY.length - 1)]
  const currentColUnlocked = loadColUnlocked(currentColItem?.id ?? '')

  // 通关结果页：每次通关后自动播放完整音频
  // stageClear 变 true 时同步记录当前唱段索引快照
  useEffect(() => {
    if (stageClear) {
      snapIdxRef.current = loadCurrentTrackIndex()
      const snapIdx = snapIdxRef.current
      const snapItem = OPERA_COLLECTION_LIBRARY[Math.min(snapIdx, OPERA_COLLECTION_LIBRARY.length - 1)]
      if (snapItem) {
        const unlockedCount = unlockColLyric(snapItem.id)
        setStagedColItem(snapItem)
        setStagedColUnlocked(loadColUnlocked(snapItem.id))
        // 已集李4个碎片才播放音频，用 stopTrack 防重复，不依赖 autoPlayedRef
        if (snapItem.audioPath && unlockedCount >= 4) {
          stopTrack()
          const t = setTimeout(() => playTrack(snapItem.audioPath), 800)
          return () => { clearTimeout(t); stopTrack() }
        }
      }
    }


  }, [stageClear])
  // 离开结果页时停止音频
  function handleRestart() {
    stopTrack()
    autoPlayedRef.current = false
    restart()
    // 重新开始后用空局覆盖存档
    saveGameProgress(mode, {
      board: Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => 0)),
      piece: rawPiece,
      nextPiece: rawNextPiece,
      score: 0,
      operaProgress: 0,
      linesAccum: 0,
      speed: rawSpeed,
      isPaused: false,
    })
  }

  function handleClearProgress(m: 'classic' | 'opera') {
    // 1. 删除 localStorage 持久化存档
    clearGameProgress(m)
    if (m === 'classic') localStorage.removeItem('yuebox-best-score')
    // 2. 清除 ref，确保下次进入不会加载旧存档
    if (mode === m) initialStateRef.current = null
    // 3. 如果当前正在对应模式的游戏页，重置游戏状态
    if (mode === m && view === 'game') restart(true)
    // 4. 立即更新首页按钮状态
    if (m === 'classic') setHasClassicSave(false)
    else setHasOperaSave(false)
  }

  // 首页
  if (view === 'home') {
    return <HomePage hasClassicSave={hasClassicSave} hasOperaSave={hasOperaSave} onClearProgress={handleClearProgress} onStart={(m) => {
      const targetMode = m ?? mode
      const saved = loadGameProgress(targetMode)
      initialStateRef.current = saved
      if (m) setMode(m)
      // 无存档时强制 restart() 确保是全新局
      if (!saved) { restart(true) }
      setView('game')
    }} onCollection={() => setView('collection')} onBadges={() => setView('badges')} />
  }

  // 收藏页视图
  if (view === 'badges') {
    return <CollectionPage onBack={() => setView('home')} initialTab="badges" />
  }

  if (view === 'collection') {
    return <CollectionPage onBack={() => { stopTrack(); setView('home') }} />
  }

  return (
    <div className="app">
      <div className="game-topbar" onPointerDown={() => { unlockAudio(); unlockHtmlAudio() }}>
        {/* 左：返回按钮 */}
        <div className="topbar-left">
          <button className="game-back-btn" onClick={() => { if (!isPaused && !gameOver && !stageClear) togglePause(); saveGameProgress(mode, getCurrentProgress()); if (mode === 'classic') setHasClassicSave(true); else setHasOperaSave(true); stopTrack(); setView('home') }}>← 返回</button>
        </div>

        {/* 中：唱段主信息条 */}
        <div className="topbar-center">
          {isOpera && currentColItem && (() => {
            const parts = currentColItem.title.split('·')
            const opera = parts[0] ?? ''
            const segment = parts.slice(1).join('·')
            return (
              <div className="topbar-track">
                <span className="topbar-opera">{opera}</span>
                {segment && <span className="topbar-segment">{segment}</span>}
                <span className="topbar-performer">{currentColItem.performer}</span>
              </div>
            )
          })()}
        </div>

        {/* 右：进度状态 */}
        <div className="topbar-right">
          {isOpera && currentColItem && (
            <div className="topbar-progress">
              <span className="topbar-progress-label">本唱段</span>
              <span className="topbar-progress-count">
                <span className="topbar-progress-num">{loadColUnlocked(currentColItem.id).length}</span>
                <span className="topbar-progress-sep">/</span>
                <span className="topbar-progress-total">{4}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      <main className="app-main">

          <aside className="info-panel">
          {isOpera ? (
            <>
              <OperaProgressBar progress={operaProgress} target={operaTarget} />
              <div className="next-box">
                <p className="score-label">下一块</p>
                <PiecePreview piece={nextPiece} />
              </div>
            </>
          ) : (
            <>
              <div className="score-box">
                <p className="score-label">得分</p>
                <p className="score-value">{score}</p>
              </div>
              <div className="score-box">
                <p className="score-label">最高分</p>
                <p className="score-value best">{bestScore}</p>
              </div>
              <div className="next-box">
                <p className="score-label">下一块</p>
                <PiecePreview piece={nextPiece} />
              </div>
            </>
          )}
        
          <div className="side-dpad side-dpad--left" style={{ marginTop: isOpera ? 116 : 47 }}>
            <button className="dpad-btn dpad-btn--side"
              onPointerDown={() => fireKey('ArrowLeft')}
            >◀</button>
            <button className="dpad-btn dpad-btn--side"
              onPointerDown={() => fireKey('ArrowUp')}
            >↻</button>
          </div>
        </aside>

        <div className="game-area">
          <div className="board-wrapper">
            <Board board={board} clearingRows={clearingRows} />

            {/* 暂停遮罩 */}
            {isPaused && !gameOver && !stageClear && (
              <div className="overlay">
                <p className="overlay-title">暂停中</p>
                <button className="ctrl-btn ctrl-btn--primary" onClick={togglePause}>继续游戏</button>
              </div>
            )}

            {/* Game Over 遮罩 */}
            {gameOver && !stageClear && (
              <div className="overlay">
                <p className="overlay-title">曲终人散</p>
                <p className="overlay-sub">GAME OVER</p>
                {isOpera ? (
                  <>
                    <p className="overlay-score">本局戏韵 +{sessionGain}</p>
                    <p className="overlay-opera-total">累计戏韵 {operaProgress} / {operaTarget}</p>
                  </>
                ) : (
                  <>
                    <p className="overlay-score">得分 {score}</p>
                    {score > 0 && score >= bestScore && <p className="overlay-best">新纪录！</p>}
                  </>
                )}
                <button className="ctrl-btn ctrl-btn--primary" onClick={handleRestart}>再来一局</button>
              </div>
            )}

            {/* 通关结果页 */}
            {fragmentUnlocked && (
              <div className="overlay fragment-unlock-overlay">
                <p className="fragment-unlock-title">唱段碎片 +1</p>
                <p className="fragment-unlock-count">{testFragCount} / 4</p>
                <button className="ctrl-btn ctrl-btn--primary" onClick={() => { setFragmentUnlocked(false); if (isPaused) togglePause() }}>继续游戏</button>
              </div>
            )}

            {stageClear && stagedColItem && (
              <div className="overlay stage-clear-overlay">
                {stagedColUnlocked.length >= 4 ? (
                  <>
                    <p className="stage-clear-title">本折完成</p>
                    <div className="stage-clear-fragment">
                      <p className="fragment-text">{stagedColItem?.lyrics[3]}</p>
                    </div>
                    <div className="stage-clear-meta">
                      <p className="fragment-opera-title">《{stagedColItem?.title}》</p>
                      <p className="fragment-performer">{stagedColItem?.performer}</p>
                    </div>
                    <div className="fragment-complete-banner">
                      <span className="fragment-complete-banner-text">完整唱段已解锁</span>
                    </div>
                    <p className="fragment-progress">
                      <span className="fragment-progress-num">4 / 4</span>
                    </p>
                    <div className="stage-clear-btns">
                      <div className="stage-clear-btns-row">
                        <button className="ctrl-btn ctrl-btn--primary" onClick={() => { advanceToNextTrack(OPERA_COLLECTION_LIBRARY.length); handleRestart() }}>进入下一折</button>
                        <button className="ctrl-btn ctrl-btn--secondary" onClick={() => {
                          if (stagedColItem) { localStorage.removeItem('yuebox-col-' + stagedColItem.id) }
                          handleRestart()
                        }}>本折重玩</button>
                      </div>
                      <div className="stage-clear-btns-row">
                        <button className="ctrl-btn ctrl-btn--play" onClick={() => { if (stagedColItem?.audioPath) playTrack(stagedColItem.audioPath) }}>播放唱段</button>
                        <button className="ctrl-btn ctrl-btn--stop" onClick={() => stopTrack()}>停止播放</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="stage-clear-title">本节完成</p>
                    <div className="stage-clear-fragment">
                      <p className="fragment-text">{stagedColItem?.lyrics[(stagedColUnlocked.length - 1) >= 0 ? stagedColUnlocked.length - 1 : 0]}</p>
                    </div>
                    <div className="stage-clear-meta">
                      <p className="fragment-opera-title">《{stagedColItem?.title}》</p>
                      <p className="fragment-performer">{stagedColItem?.performer}</p>
                    </div>
                    <p className="fragment-progress">
                      <span className="fragment-progress-num">{stagedColUnlocked.length} / 4</span>
                      <span className="fragment-progress-label"> 段已收集</span>
                    </p>
                    <div className="stage-clear-btns">
                      <button className="ctrl-btn ctrl-btn--primary" onClick={handleRestart}>进入下一节</button>
                    </div>
                  </>
                )}
              </div>
            )}
                
          </div>

        </div>

          <aside className="tool-panel">
          <button className="tool-btn" onClick={togglePause} disabled={gameOver || stageClear}>
            {isPaused && !stageClear ? '▶ 继续' : '⏸ 暂停'}
          </button>
          <button
            className={`tool-btn tool-btn--speed tool-btn--speed-${speed}`}
            onClick={cycleSpeed} disabled={gameOver || stageClear}
          >
            {speed === 'slow' ? '🐢 慢速' : speed === 'normal' ? '🐇 正常' : '⚡ 快速'}
          </button>
          <button className="tool-btn tool-btn--restart" onClick={handleRestart}>↺ 重开</button>
          {isOpera && (
            <button className="tool-btn tool-btn--collection" onClick={() => { if (!isPaused && !gameOver && !stageClear) togglePause(); setView('collection') }}>
              ♪ 收藏
            </button>
          )}

        
          <div className="side-dpad side-dpad--right" style={{ marginTop: isOpera ? 121 : 171 }}>
            <button className="dpad-btn dpad-btn--side"
              onPointerDown={() => fireKey('ArrowRight')}
            >▶</button>
            <button className="dpad-btn dpad-btn--side dpad-btn--fall"
              onPointerDown={() => {
                moveDownOne()
                const t = window.setTimeout(() => setFast(true), 180)
                ;(window as Window & { __fallTimer?: ReturnType<typeof setTimeout> }).__fallTimer = t
              }}
              onPointerUp={() => {
                const w = window as Window & { __fallTimer?: ReturnType<typeof setTimeout> }
                window.clearTimeout(w.__fallTimer)
                fireKeyUp('ArrowDown')
                setFast(false)
              }}
              onPointerLeave={() => {
                const w = window as Window & { __fallTimer?: ReturnType<typeof setTimeout> }
                window.clearTimeout(w.__fallTimer)
                setFast(false)
              }}
              onPointerCancel={() => {
                const w = window as Window & { __fallTimer?: ReturnType<typeof setTimeout> }
                window.clearTimeout(w.__fallTimer)
                setFast(false)
              }}
              title="点击下移一格，长按加速"
            >▼</button>
          </div>
        </aside>

      </main>
    </div>
  )
}

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}
function fireKeyUp(key: string) {
  window.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }))
}

export default App
