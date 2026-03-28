// 越剧唱词片段系统 - 王文娟 5 唱段版

export interface OperaTrack {
  id: string
  title: string
  performer: string
  fragments: string[]
  audioUrl?: string
}

// ─── 唱段数据（主结构，按顺序推进）───
export const OPERA_TRACKS: Record<string, OperaTrack> = {
  liangzhu_18: {
    id: 'liangzhu_18',
    title: '梁祝·十八相送',
    performer: '王文娟',
    fragments: [
      '十八相送情绵绵',
      '同窗三载意难言',
      '此去经年人不见',
      '临别依依泪满衫',
    ],
    audioUrl: '/audio/liangzhu_18.wav',
  },
  liangzhu_lt: {
    id: 'liangzhu_lt',
    title: '梁祝·楼台会',
    performer: '王文娟',
    fragments: [
      '楼台一别恨如山',
      '纵有千言难诉尽',
      '相见时难别亦难',
      '满怀愁绪对谁言',
    ],
    audioUrl: undefined,
  },
  hlm_zanghua: {
    id: 'hlm_zanghua',
    title: '红楼梦·葬花',
    performer: '王文娟',
    fragments: [
      '花谢花飞花满天',
      '红消香断有谁怜',
      '一朝春尽红颜老',
      '花落人亡两不知',
    ],
    audioUrl: undefined,
  },
  xixiang_qinxin: {
    id: 'xixiang_qinxin',
    title: '西厢记·琴心',
    performer: '王文娟',
    fragments: [
      '春辞兰槛逐芳尘',
      '心事难言对谁诉',
      '一曲相思寄幽怀',
      '月下琴音动客心',
    ],
    audioUrl: undefined,
  },
  xixiang_ct: {
    id: 'xixiang_ct',
    title: '西厢记·长亭送别',
    performer: '王文娟',
    fragments: [
      '长亭一别情无限',
      '离愁别绪满心间',
      '此去天涯何处见',
      '泪洒西风送故人',
    ],
    audioUrl: undefined,
  },
}

// 推进顺序（固定，可扩展至 30-50 首）
export const OPERA_TRACK_IDS = [
  'liangzhu_18',
  'liangzhu_lt',
  'hlm_zanghua',
  'xixiang_qinxin',
  'xixiang_ct',
]

// ─── 全局徽章定义（按已完整解锁唱段数量）───
export interface Badge {
  id: string
  name: string
  requiredCount: number
  icon: string
  description: string
}

export const BADGES: Badge[] = [
  { id: 'badge_1',  name: '初识越音', requiredCount: 1,  icon: '🎶', description: '一曲初闻，戏梦初开' },
  { id: 'badge_5',  name: '闻音识曲', requiredCount: 5,  icon: '🎵', description: '几声入耳，渐识宫商' },
  { id: 'badge_10', name: '曲境渐深', requiredCount: 10, icon: '🎭', description: '十曲流转，渐入情长' },
  { id: 'badge_20', name: '曲入人心', requiredCount: 20, icon: '🌸', description: '半数已闻，余韵入心' },
  { id: 'badge_30', name: '戏韵流转', requiredCount: 30, icon: '🪭', description: '曲韵流转，皆是人间' },
  { id: 'badge_40', name: '越韵宗师', requiredCount: 40, icon: '👑', description: '四十曲尽，风流自成' },
]

export const TOTAL_TRACKS = 40

// ─── localStorage 键名 ───
const KEY_CURRENT_TRACK_IDX = 'yuebox-current-track-index'
const KEY_FULL_PLAYED       = 'yuebox-full-played'

function trackUnlockedKey(trackId: string)    { return `yuebox-unlocked-${trackId}` }
function trackFragmentIdxKey(trackId: string) { return `yuebox-fragment-idx-${trackId}` }

// ─── 基础读写 ───
export function loadCurrentTrackIndex(): number {
  const v = localStorage.getItem(KEY_CURRENT_TRACK_IDX)
  const idx = v ? parseInt(v, 10) : 0
  return Math.max(0, idx)  // 上限由调用方控制
}

export function loadCurrentTrackId(): string {
  return OPERA_TRACK_IDS[loadCurrentTrackIndex()]
}

export function loadUnlockedFragments(trackId?: string): number[] {
  const id = trackId ?? loadCurrentTrackId()
  const v = localStorage.getItem(trackUnlockedKey(id))
  return v ? JSON.parse(v) : []
}

export function loadFragmentIndex(trackId?: string): number {
  const id = trackId ?? loadCurrentTrackId()
  const v = localStorage.getItem(trackFragmentIdxKey(id))
  return v ? parseInt(v, 10) : 0
}

function loadFullPlayed(): string[] {
  const v = localStorage.getItem(KEY_FULL_PLAYED)
  return v ? JSON.parse(v) : []
}

export function markFullPlayed(trackId: string) {
  const list = loadFullPlayed()
  if (!list.includes(trackId)) {
    list.push(trackId)
    localStorage.setItem(KEY_FULL_PLAYED, JSON.stringify(list))
  }
}

// 已完整解锁的唱段数量
export function loadCompletedCount(): number {
  return OPERA_TRACK_IDS.filter(id => {
    const track = OPERA_TRACKS[id]
    return loadUnlockedFragments(id).length >= track.fragments.length
  }).length
}

// 当前已获得的徽章列表
export function loadEarnedBadges(): Badge[] {
  const count = loadCompletedCount()
  return BADGES.filter(b => count >= b.requiredCount)
}

// ─── 解锁逻辑 ───
export interface FragmentReward {
  fragment: string
  title: string
  performer: string
  trackId: string
  fragmentIndex: number
  totalFragments: number
  unlockedCount: number
  isTrackComplete: boolean
  isJustCompleted: boolean
  audioUrl?: string
}

export function unlockNextFragment(): FragmentReward {
  const trackIdx = loadCurrentTrackIndex()
  const trackId  = OPERA_TRACK_IDS[trackIdx]
  const track    = OPERA_TRACKS[trackId]

  const prevUnlocked = loadUnlockedFragments(trackId)
  const wasComplete  = prevUnlocked.length >= track.fragments.length

  let unlocked = [...prevUnlocked]
  let fragIdx  = loadFragmentIndex(trackId)
  if (fragIdx >= track.fragments.length) fragIdx = track.fragments.length - 1

  const fragment = track.fragments[fragIdx]

  if (!unlocked.includes(fragIdx)) {
    unlocked.push(fragIdx)
    localStorage.setItem(trackUnlockedKey(trackId), JSON.stringify(unlocked))
  }

  const isTrackComplete = unlocked.length >= track.fragments.length
  const nextFragIdx = isTrackComplete ? track.fragments.length : fragIdx + 1
  localStorage.setItem(trackFragmentIdxKey(trackId), String(nextFragIdx))

  const isJustCompleted = !wasComplete && isTrackComplete

  // 唱段推进由用户点击「进入下一折」时手动调用 advanceToNextTrack()，不在此自动推进

  return {
    fragment,
    title: track.title,
    performer: track.performer,
    trackId,
    fragmentIndex: fragIdx,
    totalFragments: track.fragments.length,
    unlockedCount: unlocked.length,
    isTrackComplete,
    isJustCompleted,
    audioUrl: track.audioUrl,
  }
}

// 当前唱段实时进度
export function loadCurrentTrackProgress(): {
  title: string
  performer: string
  unlockedCount: number
  totalFragments: number
} {
  const trackId = loadCurrentTrackId()
  const track   = OPERA_TRACKS[trackId]
  const unlocked = loadUnlockedFragments(trackId)
  return {
    title: track.title,
    performer: track.performer,
    unlockedCount: Math.min(unlocked.length, track.fragments.length),
    totalFragments: track.fragments.length,
  }
}

// ─── 音频播放（单例）───
let _audio: HTMLAudioElement | null = null

export function playTrack(url: string, onEnd?: () => void): void {
  stopTrack()
  _audio = new Audio(url)
  _audio.onended = () => { _audio = null; onEnd?.() }
  _audio.play().catch(() => { _audio = null })
}

export function stopTrack(): void {
  if (_audio) { _audio.pause(); _audio = null }
}

export function isTrackPlaying(): boolean {
  return _audio !== null && !_audio.paused
}

// ─── 收藏页数据（按唱段平铺，不按名家分组）───
export interface FragmentEntry {
  index: number
  text: string
  unlocked: boolean
}

export interface TrackCollection {
  track: OperaTrack
  fragments: FragmentEntry[]
  unlockedCount: number
  isComplete: boolean
  isCurrent: boolean
}

export function loadCollectionTracks(): TrackCollection[] {
  const currentId = loadCurrentTrackId()
  return OPERA_TRACK_IDS.map(trackId => {
    const track = OPERA_TRACKS[trackId]
    const unlockedIndices = loadUnlockedFragments(trackId)
    const fragments: FragmentEntry[] = track.fragments.map((text, i) => ({
      index: i, text, unlocked: unlockedIndices.includes(i),
    }))
    const unlockedCount = fragments.filter(f => f.unlocked).length
    const isComplete = unlockedCount >= track.fragments.length
    return { track, fragments, unlockedCount, isComplete, isCurrent: trackId === currentId }
  })
}

// 兼容旧收藏页（暂保留，CollectionPage 已不再使用）
export interface PerformerCollection {
  performer: string
  tracks: TrackCollection[]
}

// 手动推进到下一唱段（通关后点「下一折」时调用）
export function advanceToNextTrack(totalTracks: number): boolean {
  const trackIdx = loadCurrentTrackIndex()
  if (trackIdx < totalTracks - 1) {
    const nextIdx = trackIdx + 1
    localStorage.setItem(KEY_CURRENT_TRACK_IDX, String(nextIdx))
    return true
  }
  return false  // 已是最后一段
}
