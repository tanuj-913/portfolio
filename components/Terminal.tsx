'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile, projects, skills } from '@/lib/content'
import { useGame } from './Game'

type Line = { kind: 'in' | 'out' | 'sys'; text: string }

const BANNER: Line[] = [
  { kind: 'sys', text: '  ████████╗     ██╗' },
  { kind: 'sys', text: '  ╚══██╔══╝     ██║' },
  { kind: 'sys', text: '     ██║        ██║' },
  { kind: 'sys', text: '     ██║   ██   ██║' },
  { kind: 'sys', text: '     ██║   ╚█████╔╝' },
  { kind: 'sys', text: '     ╚═╝    ╚════╝ ' },
  { kind: 'out', text: '' },
  { kind: 'out', text: "TJ-OS v1.0 — type 'help' to begin" },
  { kind: 'out', text: '↑ ↓ history · Tab completes · Esc closes' },
  { kind: 'out', text: '' },
]

export default function Terminal() {
  const { terminalOpen, setTerminalOpen, openTerminal, unlock } = useGame()
  const [lines, setLines] = useState<Line[]>(BANNER)
  const [value, setValue] = useState('')
  const [ran, setRan] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ` toggles, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      const typing = t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA'
      if (e.key === '`' && !typing) {
        e.preventDefault()
        terminalOpen ? setTerminalOpen(false) : openTerminal()
      }
      if (e.key === 'Escape') setTerminalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [terminalOpen, setTerminalOpen, openTerminal])

  useEffect(() => {
    if (terminalOpen) setTimeout(() => inputRef.current?.focus(), 80)
  }, [terminalOpen])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  useEffect(() => {
    if (ran >= 5) unlock('operator')
  }, [ran, unlock])

  const go = (id: string) => {
    setTerminalOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
  }

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    const out: Line[] = [{ kind: 'in', text: raw }]
    const say = (t: string) => out.push({ kind: 'out', text: t })

    switch (cmd) {
      case 'help':
        say('help       this list')
        say('whoami     who I am')
        say('skills     the stack')
        say('projects   what I have built')
        say('work       jump to capabilities')
        say('contact    how to reach me')
        say('github     open GitHub')
        say('linkedin   open LinkedIn')
        say('instagram  open Instagram (DMs open)')
        say('resume     download CV')
        say('clear      wipe the screen')
        break
      case 'whoami':
        say(`${profile.name} — AI-Native Developer & Full-Stack Engineer.`)
        say(profile.headline)
        break
      case 'skills':
        skills.forEach((s) => say(`${s.tier.padEnd(24)} ${s.items.slice(0, 6).join(', ')}`))
        say('')
        say("→ 'skills' section has the full list")
        break
      case 'projects':
        projects.slice(0, 8).forEach((p) => say(`${p.title.padEnd(30)} ${p.tag}`))
        say('')
        say(`${projects.length} total — scrolling you there.`)
        go('projects')
        break
      case 'work':
        say('Jumping to capabilities…')
        go('work')
        break
      case 'contact':
        say(profile.email)
        go('contact')
        break
      case 'github':
        say('Opening GitHub…')
        window.open(profile.github, '_blank', 'noreferrer')
        break
      case 'linkedin':
        say('Opening LinkedIn…')
        window.open(profile.linkedin, '_blank', 'noreferrer')
        break
      case 'instagram':
      case 'dm':
        say('Opening Instagram — DMs are open.')
        window.open(profile.instagram, '_blank', 'noreferrer')
        break
      case 'resume':
        say('No CV uploaded yet — email me and I will send it.')
        break
      case 'clear':
        setLines(BANNER)
        setValue('')
        setRan((n) => n + 1)
        return
      case 'sudo':
        say('Nice try.')
        break
      case 'exit':
        say('Bye.')
        setTerminalOpen(false)
        break
      default:
        say(`command not found: ${cmd}`)
        say("try 'help'")
    }

    setLines((l) => [...l, ...out])
    setHistory((h) => [raw, ...h])
    setHIdx(-1)
    setValue('')
    setRan((n) => n + 1)
  }

  const COMMANDS = [
    'help','whoami','skills','projects','work','contact',
    'github','linkedin','instagram','dm','resume','clear','exit',
  ]

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(hIdx + 1, history.length - 1)
      if (next >= 0) {
        setHIdx(next)
        setValue(history[next])
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = hIdx - 1
      setHIdx(next)
      setValue(next >= 0 ? history[next] : '')
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const m = COMMANDS.filter((c) => c.startsWith(value.trim().toLowerCase()))
      if (m.length === 1) setValue(m[0])
      else if (m.length > 1) {
        setLines((l) => [...l, { kind: 'out', text: m.join('   ') }])
      }
    }
  }

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-20 right-5 z-[70] flex h-[420px] w-[min(94vw,540px)] flex-col overflow-hidden rounded-xl border border-cyan-400/40 bg-[#04070d] shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_24px_70px_-10px_rgba(0,0,0,0.9),0_0_60px_-15px_rgba(34,211,238,0.45)]"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-cyan-400/25 bg-[#080d17] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">
                TJ-OS · shell
              </span>
            </div>
            <button
              onClick={() => setTerminalOpen(false)}
              aria-label="Close terminal"
              className="font-mono text-[13px] text-white/50 transition hover:text-white"
            >
              ✕
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 overflow-y-auto bg-[#04070d] px-4 py-3 font-mono text-[13px] leading-[1.7]">
            {lines.map((l, i) => (
              <div
                key={i}
                className={
                  l.kind === 'in'
                    ? 'text-white'
                    : l.kind === 'sys'
                      ? 'text-cyan-300'
                      : 'text-[#c8d6e5]'
                }
              >
                {l.kind === 'in' ? <span className="text-emerald-400">tanuj@portfolio ~ $ </span> : null}
                <span className="whitespace-pre-wrap break-words">{l.text}</span>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              run(value)
            }}
            className="flex shrink-0 items-center gap-2 border-t border-cyan-400/25 bg-[#080d17] px-4 py-2.5 font-mono text-[13px]"
          >
            <span className="shrink-0 text-emerald-400">tanuj@portfolio ~ $</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              placeholder="type help"
              className="flex-1 bg-transparent text-white caret-cyan-300 outline-none placeholder:text-white/25"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
