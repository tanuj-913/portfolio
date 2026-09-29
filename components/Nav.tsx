'use client'

import { useEffect, useState } from 'react'
import Logo from './Logo'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'What I Do' },
  { id: 'journey', label: 'Growth' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'border-b border-white/5 bg-[#05060a]/80 backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Home">
          <Logo size={32} />
          <span
            className="font-display text-sm font-black uppercase tracking-[0.3em] text-white transition-colors group-hover:text-cyan-300"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Tanuj
          </span>
        </a>

        <div className="hidden gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition hover:text-cyan-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-[#05060a]/95 px-6 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/60"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
