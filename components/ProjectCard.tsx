'use client'

import { useRef, useState } from 'react'
import type { Project } from '@/lib/content'

const statusStyles: Record<string, string> = {
  flagship: 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300',
  work: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
  public: 'border-white/15 bg-white/5 text-white/60',
  academic: 'border-white/15 bg-white/5 text-white/60',
  personal: 'border-white/15 bg-white/5 text-white/60',
}

const statusLabel: Record<string, string> = {
  flagship: 'Flagship',
  work: 'Work',
  public: 'Open Source',
  academic: 'Academic',
  personal: 'Personal',
}

export default function ProjectCard({ p }: { p: Project }) {
  const [flipped, setFlipped] = useState(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const peeking = useRef(false)

  // press-and-hold peeks at the back; a quick tap toggles it and stays.
  const onPointerDown = () => {
    holdTimer.current = setTimeout(() => {
      peeking.current = true
      setFlipped(true)
    }, 180)
  }

  const endHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
    if (peeking.current) {
      peeking.current = false
      setFlipped(false)
    }
  }

  return (
    <div className="group relative h-[340px] [perspective:1400px]">
      <button
        onClick={() => {
          // a hold already handled it — don't toggle on the trailing click
          if (peeking.current) return
          setFlipped((f) => !f)
        }}
        onPointerDown={onPointerDown}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        aria-pressed={flipped}
        aria-label={`${flipped ? 'Hide' : 'Show'} preview of ${p.title}`}
        className="absolute inset-0 h-full w-full text-left [transform-style:preserve-3d] transition-transform duration-700"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT */}
        <div className="glass absolute inset-0 flex flex-col rounded-2xl p-6 [backface-visibility:hidden]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className="font-display text-lg font-bold uppercase tracking-wide text-white"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                {p.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan-400/70">
                {p.tag}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${statusStyles[p.status]}`}
            >
              {statusLabel[p.status]}
            </span>
          </div>

          <p className="mt-4 flex-1 overflow-hidden text-sm leading-relaxed text-white/65">
            {p.desc}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/50">
            {flipped ? 'Tap to go back' : 'Tap or hold to preview →'}
          </span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-cyan-400/35 bg-[#060a12] [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* window chrome */}
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0b1220] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 flex-1 truncate font-mono text-[10px] text-white/40">
              {p.title.toLowerCase().replace(/\s+/g, '-')}
            </span>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
              tap to close
            </span>
          </div>

          {p.shot ? (
            <img src={p.shot} alt={`${p.title} screenshot`} className="h-full w-full object-cover" />
          ) : (
            <div className="relative flex h-[calc(100%-33px)] flex-col p-5">
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div className="relative flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/70">
                  What it does
                </div>
                <ul className="mt-3 space-y-2.5">
                  {(p.highlights ?? []).slice(0, 3).map((h) => (
                    <li key={h} className="flex gap-3 text-[13px] leading-snug text-white/80">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-auto">
                <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="font-mono text-[10px] text-cyan-400/50">
                      {t}
                    </span>
                  ))}
                </div>

                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/[0.07] px-3 py-2 transition hover:border-cyan-400/70 hover:bg-cyan-400/15"
                  >
                    <span className="truncate font-mono text-[11px] text-cyan-300/90">
                      {p.href.replace('https://', '')}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-cyan-300">↗</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                    <span className="font-mono text-[11px] text-white/35">
                      {p.note ?? 'Private'} · no public repo
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-white/25">✕</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  )
}
