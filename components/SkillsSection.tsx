'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { skills } from '@/lib/content'
import { Reveal } from './ui'

const SkillGraph = dynamic(() => import('./SkillGraph'), {
  loading: () => (
    <div className="flex h-[520px] w-full items-center justify-center sm:h-[640px]">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25">
        Loading skill map…
      </span>
    </div>
  ),
})

export default function SkillsSection() {
  const [selected, setSelected] = useState<number | null>(null)
  const [inView, setInView] = useState(false)
  const holder = useRef<HTMLDivElement>(null)

  // only pull in three.js once the section is close — keeps first paint fast
  useEffect(() => {
    const el = holder.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={holder}>
        {inView ? (
          <SkillGraph selected={selected} setSelected={setSelected} />
        ) : (
          <div className="h-[520px] w-full sm:h-[640px]" />
        )}
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => {
          const on = selected === i
          const off = selected !== null && !on
          return (
            <Reveal key={s.tier} delay={(i % 3) * 0.08}>
              <div
                onClick={() => setSelected(on ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(on ? null : i)
                  }
                }}
                className={`glass h-full cursor-pointer rounded-2xl p-6 transition-all duration-500 ${
                  on
                    ? 'scale-[1.035] border-cyan-400/70 shadow-[0_0_60px_rgba(34,211,238,0.3)]'
                    : off
                      ? 'opacity-40 hover:opacity-70'
                      : 'hover:border-cyan-400/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                      on ? 'text-cyan-300' : 'text-cyan-400/80'
                    }`}
                  >
                    {s.tier}
                  </span>
                  {on && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((t) => (
                    <span
                      key={t}
                      className={`rounded-md border px-2.5 py-1 text-[13px] transition-all duration-300 ${
                        on
                          ? 'border-cyan-400/40 bg-cyan-400/10 text-white'
                          : 'border-white/10 bg-white/[0.03] text-white/70'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
