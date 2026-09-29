'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type AchievementId =
  | 'arrival'
  | 'terminal'
  | 'explorer'
  | 'inspector'
  | 'operator'
  | 'konami'
  | 'completionist'

type Achievement = { id: AchievementId; name: string; hint: string; xp: number }

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'arrival', name: 'Arrival', hint: 'Land on the site', xp: 10 },
  { id: 'terminal', name: 'Shell Access', hint: 'Open the terminal', xp: 25 },
  { id: 'explorer', name: 'Explorer', hint: 'Reach the end of the page', xp: 20 },
  { id: 'inspector', name: 'Inspector', hint: 'Open a project on GitHub', xp: 20 },
  { id: 'operator', name: 'Operator', hint: 'Run five terminal commands', xp: 25 },
  { id: 'konami', name: 'Old School', hint: 'Some codes never die', xp: 40 },
  { id: 'completionist', name: 'Completionist', hint: 'Unlock everything else', xp: 50 },
]

const TOTAL_XP = ACHIEVEMENTS.reduce((n, a) => n + a.xp, 0)

type Ctx = {
  unlocked: AchievementId[]
  unlock: (id: AchievementId) => void
  xp: number
  totalXp: number
  openTerminal: () => void
  terminalOpen: boolean
  setTerminalOpen: (v: boolean) => void
}

const GameCtx = createContext<Ctx | null>(null)

export function useGame() {
  const c = useContext(GameCtx)
  if (!c) throw new Error('useGame outside provider')
  return c
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([])
  const [toast, setToast] = useState<Achievement | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const unlock = useCallback((id: AchievementId) => {
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev
      const a = ACHIEVEMENTS.find((x) => x.id === id)
      if (a) setToast(a)
      return [...prev, id]
    })
  }, [])

  // restore progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tj-progress')
      if (raw) setUnlocked(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      if (unlocked.length) localStorage.setItem('tj-progress', JSON.stringify(unlocked))
    } catch {}
  }, [unlocked])

  // konami code
  useEffect(() => {
    const SEQ = [
      'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
      'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a',
    ]
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (k === SEQ[i]) {
        i++
        if (i === SEQ.length) {
          i = 0
          unlock('konami')
          document.documentElement.classList.add('konami')
          setTimeout(() => document.documentElement.classList.remove('konami'), 5000)
        }
      } else {
        i = k === SEQ[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [unlock])

  // arrival
  useEffect(() => {
    const t = setTimeout(() => unlock('arrival'), 1200)
    return () => clearTimeout(t)
  }, [unlock])

  // explorer — reached the bottom
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      if (h.scrollTop + h.clientHeight >= h.scrollHeight - 200) unlock('explorer')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [unlock])

  // inspector — any outbound repo link
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a')
      if (a && a.getAttribute('href')?.includes('github.com/tanuj-913/')) unlock('inspector')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [unlock])

  // completionist
  useEffect(() => {
    const others = ACHIEVEMENTS.filter((a) => a.id !== 'completionist').map((a) => a.id)
    if (others.every((id) => unlocked.includes(id))) unlock('completionist')
  }, [unlocked, unlock])

  // dismiss toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const xp = useMemo(
    () =>
      unlocked.reduce((n, id) => n + (ACHIEVEMENTS.find((a) => a.id === id)?.xp ?? 0), 0),
    [unlocked],
  )

  const openTerminal = useCallback(() => {
    setTerminalOpen(true)
    unlock('terminal')
  }, [unlock])

  return (
    <GameCtx.Provider
      value={{ unlocked, unlock, xp, totalXp: TOTAL_XP, openTerminal, terminalOpen, setTerminalOpen }}
    >
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="glass fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-xl border-cyan-400/40 px-5 py-3 text-center shadow-[0_0_40px_rgba(34,211,238,0.18)]"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-400/80">
              Achievement Unlocked
            </div>
            <div className="mt-1 font-display text-sm font-bold text-white">{toast.name}</div>
            <div className="mt-0.5 font-mono text-[10px] text-cyan-300/70">+{toast.xp} XP</div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameCtx.Provider>
  )
}

export function ProgressHud() {
  const { xp, totalXp, unlocked, openTerminal } = useGame()
  const [open, setOpen] = useState(false)
  const pct = Math.round((xp / totalXp) * 100)

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="glass w-[248px] rounded-xl p-4"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400/80">
              Achievements
            </div>
            <ul className="mt-3 space-y-2">
              {ACHIEVEMENTS.map((a) => {
                const got = unlocked.includes(a.id)
                return (
                  <li key={a.id} className="flex items-start gap-2.5">
                    <span
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                        got ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-white/20'
                      }`}
                    />
                    <span className="flex-1">
                      <span
                        className={`block text-[12px] ${got ? 'text-white' : 'text-white/35'}`}
                      >
                        {got ? a.name : '???'}
                      </span>
                      <span className="block font-mono text-[10px] text-white/30">{a.hint}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <button
              onClick={openTerminal}
              className="mt-4 w-full rounded-md border border-cyan-400/30 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/90 transition hover:bg-cyan-400/10"
            >
              Open Terminal
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Progress"
        className="glass flex items-center gap-2.5 rounded-full px-4 py-2 transition hover:border-cyan-400/40"
      >
        <span className="relative h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6 }}
          />
        </span>
        <span className="font-mono text-[10px] tracking-widest text-cyan-300/90">{pct}%</span>
      </button>
    </div>
  )
}
