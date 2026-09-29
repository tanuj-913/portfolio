'use client'

import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { projects } from '@/lib/content'

/** Counted from the tech listed on each project — not hand-set numbers. */
export default function TechChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const rows = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach((p) => p.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
    const max = sorted[0]?.[1] ?? 1
    return sorted.map(([name, n]) => ({ name, n, pct: (n / max) * 100 }))
  }, [])

  return (
    <div ref={ref} className="glass rounded-2xl p-6">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/80">
          Most Used
        </span>
        <span className="font-mono text-[10px] tracking-widest text-white/30">
          across {projects.length} projects
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate font-mono text-[11px] text-white/60">
              {r.name}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400/80 to-sky-500/80"
                initial={{ width: 0 }}
                animate={inView ? { width: `${r.pct}%` } : { width: 0 }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="w-5 shrink-0 text-right font-mono text-[10px] text-cyan-400/60">
              {r.n}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
