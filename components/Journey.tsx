'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { journey } from '@/lib/content'

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(journey.length - 1)

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        {journey.map((j, i) => (
          <button
            key={j.label}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="block w-full text-left"
            aria-label={`${j.label} — ${j.period}`}
          >
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span
                className={`font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                  active === i ? 'text-cyan-300' : 'text-white/70'
                }`}
              >
                {j.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {j.period}
              </span>
            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
                initial={{ width: 0 }}
                animate={inView ? { width: `${j.value}%` } : { width: 0 }}
                transition={{ duration: 1.1, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  boxShadow: active === i ? '0 0 16px rgba(34,211,238,0.5)' : 'none',
                }}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="glass flex flex-col justify-center rounded-2xl p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/80">
          {journey[active].period}
        </div>
        <div
          className="mt-3 font-display text-xl font-black uppercase tracking-wide text-white"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          {journey[active].label}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{journey[active].note}</p>
      </div>
    </div>
  )
}
