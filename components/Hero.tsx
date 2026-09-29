'use client'

import dynamic from 'next/dynamic'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '@/lib/content'

const Logo3D = dynamic(() => import('./Logo3D'), { ssr: false })

export default function Hero() {
  const [role, setRole] = useState(0)
  const { scrollY } = useScroll()

  // parallax — layers drift at different rates as you scroll away
  const gridY = useTransform(scrollY, [0, 800], [0, 180])
  const copyY = useTransform(scrollY, [0, 800], [0, 60])
  const orbY = useTransform(scrollY, [0, 800], [0, 130])
  const fade = useTransform(scrollY, [0, 520], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % profile.roles.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-10">
      <motion.div className="absolute inset-0 grid-bg" style={{ y: gridY }} />
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute right-0 top-1/2 h-[520px] w-full max-w-[620px] -translate-y-1/2 opacity-90 lg:right-[5%]"
      >
        <Logo3D />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: copyY }}
          className="max-w-2xl"
        >
          <h1
            className="font-display text-4xl font-black uppercase leading-[1.05] tracking-[0.04em] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            <span className="name-gradient">{profile.name}</span>
          </h1>

          <div className="mt-4 h-7 overflow-hidden">
            <motion.p
              key={role}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-400/90"
            >
              {profile.roles[role]}
            </motion.p>
          </div>

          <p className="mt-7 max-w-xl text-xl leading-snug text-white/90 sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55">{profile.sub}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 transition hover:bg-cyan-400/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ opacity: fade }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">Scroll</span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-white/30">
          press{' '}
          <kbd className="rounded border border-cyan-400/30 bg-cyan-400/5 px-1.5 py-0.5 text-cyan-300/80">
            `
          </kbd>{' '}
          for the shell
        </span>
      </motion.div>
    </section>
  )
}
