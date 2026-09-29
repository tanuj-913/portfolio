'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-8 bg-cyan-400/60" />
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400/80">
        {children}
      </span>
    </div>
  )
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display text-3xl font-black uppercase tracking-[0.12em] text-white sm:text-4xl"
      style={{ fontFamily: 'var(--font-orbitron)' }}
    >
      {children}
    </h2>
  )
}

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 1400, bounce: 0 })

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
      }),
    [spring, suffix],
  )

  return <span ref={ref}>0{suffix}</span>
}

export function ScrollBar() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 to-sky-500"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}


/** Button that leans toward the cursor — small thing, makes the page feel alive. */
export function Magnetic({
  children,
  className,
  href,
  ...rest
}: {
  children: ReactNode
  className?: string
  href: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`
    }
    const reset = () => {
      el.style.transform = 'translate(0px, 0px)'
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <a ref={ref} href={href} className={className} style={{ transition: 'transform 0.25s ease-out' }} {...rest}>
      {children}
    </a>
  )
}
