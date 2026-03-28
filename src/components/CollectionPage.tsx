import { useState, useEffect } from 'react'
import {
  loadEarnedBadges,
  loadCompletedCount,
  Badge,
  BADGES,
  OPERA_TRACK_IDS,
  TOTAL_TRACKS,
  playTrack,
  stopTrack,
  isTrackPlaying,
} from '../operaData'
import {
  OPERA_COLLECTION_LIBRARY,
  OperaCollectionItem,
  loadColUnlocked,
  unlockColLyric,
  loadCompletedCountFromCol,
} from '../operaCollectionLibrary'
import './CollectionPage.css'

// 开发测试开关：true 时显示「解锁下一句」按钮，false 为正式版
const TEST_MODE = false

interface Props {
  onBack: () => void
  initialTab?: 'tracks' | 'badges'
}

function TrackCard({
  item,
  isPlaying,
  onTogglePlay,
}: {
  item: OperaCollectionItem
  isPlaying: boolean
  onTogglePlay: (item: OperaCollectionItem) => void
}) {
  const [unlocked, setUnlocked] = useState<number[]>(() => loadColUnlocked(item.id))
  const [lastUnlocked, setLastUnlocked] = useState<number | null>(null)
  const complete = unlocked.length >= item.lyrics.length

  function handleUnlock() {
    const newCount = unlockColLyric(item.id)
    if (newCount > unlocked.length) {
      const newIdx = newCount - 1
      setLastUnlocked(newIdx)
      setUnlocked(Array.from({ length: newCount }, (_, i) => i))
      setTimeout(() => setLastUnlocked(null), 1200)
    }
  }

  const cardCls = [
    'tc-card',
    complete ? 'tc-card--complete' : unlocked.length > 0 ? 'tc-card--current' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cardCls}>
      {/* 顶部：标题 + 进度 */}
      <div className="tc-card-header">
        <span className="tc-title">{item.title}</span>
        <div className="tc-card-header-right">
          {complete && <span className="tc-status tc-status--complete">已完整解锁</span>}
          <span className={`tc-progress ${complete ? 'tc-progress--complete' : ''}`}>
            {unlocked.length} / {item.lyrics.length}
          </span>
        </div>
      </div>

      {/* 名家副标题 */}
      <p className="tc-performer-line">{item.performer}</p>

      {/* 唱词列表 */}
      <ul className="tc-fragments">
        {item.lyrics.map((lyric, i) => {
          const isUnlocked = unlocked.includes(i)
          const isNew = lastUnlocked === i
          return (
            <li
              key={i}
              className={[
                'tc-fragment',
                isUnlocked ? 'tc-fragment--unlocked' : 'tc-fragment--locked',
                isNew ? 'tc-fragment--new' : '',
              ].filter(Boolean).join(' ')}
            >
              {isUnlocked ? (lyric || '（唱词待补全）') : '· · · 未解锁唱词'}
            </li>
          )
        })}
      </ul>

      {/* 底部操作行 */}
      <div className="tc-action-row">
        {complete ? (
          <button
            className={`tc-play-btn ${isPlaying ? 'tc-play-btn--playing' : ''}`}
            onClick={() => onTogglePlay(item)}
          >
            {isPlaying ? '■ 停止播放' : '▶ 播放唱段'}
          </button>
        ) : TEST_MODE ? (
          <button className="tc-unlock-btn" onClick={handleUnlock}>
            解锁下一句
          </button>
        ) : null}
      </div>
    </div>
  )
}

// 徽章点亮提示
interface BadgeToast {
  name: string
  description: string
}

function BadgesPanel({ earnedBadges, completedCount }: { earnedBadges: Badge[]; completedCount: number }) {
  const [toast, setToast] = useState<BadgeToast | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const prevCountRef = useState(completedCount)[0]

  // 检测新达成徽章
  useEffect(() => {
    const justEarned = BADGES.filter(b => {
      const wasEarned = prevCountRef >= b.requiredCount
      const nowEarned = completedCount >= b.requiredCount
      return !wasEarned && nowEarned
    })
    if (justEarned.length > 0) {
      const b = justEarned[justEarned.length - 1]
      setToast({ name: b.name, description: b.description })
      setToastVisible(false)
      setTimeout(() => setToastVisible(true), 30)
      setTimeout(() => {
        setToastVisible(false)
        setTimeout(() => setToast(null), 600)
      }, 2500)
    }
  }, [completedCount])

  // 找到当前阶段（第一个未完成的徽章）
  const currentStageIdx = BADGES.findIndex(b => completedCount < b.requiredCount)

  return (
    <div className="badges-panel">
      {/* 顶部总进度 */}
      <p className="badges-summary">
        已解锁唱段 <span className="badges-summary-num">{completedCount}</span> / {OPERA_COLLECTION_LIBRARY.length}
      </p>

      {/* 点亮提示 */}
      {toast && (
        <div className={`badge-toast ${toastVisible ? 'ink-show' : 'ink-hidden'}`}>
          <span className="badge-toast-name">【{toast.name}】</span>
          <span className="badge-toast-desc">{toast.description}</span>
        </div>
      )}

      {/* 徽章列表 */}
      <div className="badges-grid">
        {BADGES.map((b, idx) => {
          const current = Math.min(completedCount, b.requiredCount)
          const percent = Math.round((current / b.requiredCount) * 100)
          const earned = completedCount >= b.requiredCount
          const isCurrent = idx === currentStageIdx
          const notStarted = completedCount === 0 && b.requiredCount > 1

          return (
            <div
              key={b.id}
              className={[
                'badge-card',
                earned ? 'badge-card--earned' : '',
                isCurrent ? 'badge-card--current' : '',
                !earned && !isCurrent && notStarted ? 'badge-card--locked' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="badge-card-top">
                <span className="badge-card-icon">{b.icon}</span>
                <div className="badge-card-meta">
                  <span className="badge-card-name">{b.name}</span>
                  <span className="badge-card-desc">{b.description}</span>
                </div>
                <div className="badge-card-right">
                  {earned
                    ? <span className="badge-card-check">✔</span>
                    : <span className="badge-card-count">{current} / {b.requiredCount}</span>
                  }
                </div>
              </div>
              {/* 进度条 */}
              <div className="badge-bar-track">
                <div
                  className={`badge-bar-fill ${earned ? 'badge-bar-fill--earned' : ''}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CollectionPage({ onBack, initialTab = 'tracks' }: Props) {
  const [tab, setTab] = useState<'tracks' | 'badges'>(initialTab)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const earnedBadges = loadEarnedBadges()
  const completedCount = loadCompletedCountFromCol()

  // 检测音频是否已自然停止
  useEffect(() => {
    if (!playingId) return
    const timer = setInterval(() => {
      if (!isTrackPlaying()) setPlayingId(null)
    }, 500)
    return () => clearInterval(timer)
  }, [playingId])

  function handleTogglePlay(item: OperaCollectionItem) {
    if (playingId === item.id) {
      stopTrack()
      setPlayingId(null)
      return
    }
    stopTrack()
    playTrack(item.audioPath, () => setPlayingId(p => p === item.id ? null : p))
    setPlayingId(item.id)
  }

  return (
    <div className="collection-page">
      <header className="collection-header">
        <button className="collection-back" onClick={onBack}>← 返回</button>
        <h1 className="collection-title">越音集</h1>
        <div className="collection-header-spacer" />
      </header>

      <div className="collection-tabs">
        <button
          className={`collection-tab ${tab === 'tracks' ? 'collection-tab--active' : ''}`}
          onClick={() => setTab('tracks')}
        >唱段</button>
        <button
          className={`collection-tab ${tab === 'badges' ? 'collection-tab--active' : ''}`}
          onClick={() => setTab('badges')}
        >徽章</button>
      </div>

      <main className="collection-main">
        {tab === 'tracks' && OPERA_COLLECTION_LIBRARY.map(item => (
          <TrackCard
            key={item.id}
            item={item}
            isPlaying={playingId === item.id}
            onTogglePlay={handleTogglePlay}
          />
        ))}
        {tab === 'badges' && <BadgesPanel earnedBadges={earnedBadges} completedCount={completedCount} />}
      </main>
    </div>
  )
}
