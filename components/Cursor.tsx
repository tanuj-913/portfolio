'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    // pointer-fine only — never hijack touch
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mq.matches || reduce.matches) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      setHot(!!el?.closest('a, button, input, [role="button"], canvas'))
    }

    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-300"
        style={{ boxShadow: '0 0 10px #22d3ee' }}
      />
      <div
        ref={ring}
        className="absolute rounded-full border border-cyan-400/50 transition-[width,height,margin,opacity] duration-200"
        style={{
          width: hot ? 44 : 26,
          height: hot ? 44 : 26,
          marginLeft: hot ? -22 : -13,
          marginTop: hot ? -22 : -13,
          opacity: hot ? 0.9 : 0.45,
        }}
      />
    </div>
  )
}
