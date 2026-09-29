import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import { Reveal, SectionLabel, Heading, Counter, ScrollBar } from '@/components/ui'
import { GameProvider, ProgressHud } from '@/components/Game'
import Terminal from '@/components/Terminal'
import Cursor from '@/components/Cursor'
import ProjectCard from '@/components/ProjectCard'
import SkillsSection from '@/components/SkillsSection'
import Journey from '@/components/Journey'
import TechChart from '@/components/TechChart'
import dynamic from 'next/dynamic'

import { about, awards, profile, projects, services, skills, stats, whatIDo } from '@/lib/content'

export default function Page() {
  return (
    <GameProvider>
      <main className="relative">
        <Cursor />
        <ScrollBar />
        <Nav />
        <Hero />
        <Terminal />
        <ProgressHud />

      {/* STATS */}
      <section className="border-y border-white/5 px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div
                  className="font-display text-3xl font-black text-cyan-300 sm:text-4xl"
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <Heading>Who I Am</Heading>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-[auto_1fr_320px] md:items-start">
            <Reveal delay={0.05}>
              <div className="group relative mx-auto w-[210px] shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-sky-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25">
                  <img
                    src="/avatar.jpg"
                    alt="Tanuj Jenna"
                    width={420}
                    height={420}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-transparent opacity-70" />
                  <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cyan-400/70" />
                  <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan-400/70" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                {about.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/80">
                  How I Work
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  I use AI across the whole cycle — writing code, reviewing it, and getting it
                  deployed. What I bring is the architecture and the judgement about what to build.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section id="work" className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Capabilities</SectionLabel>
            <Heading>What I Do</Heading>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whatIDo.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-6 transition hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                  <h3
                    className="font-display text-sm font-bold uppercase tracking-wide text-white"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    {w.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {w.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-snug text-white/60">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Progression</SectionLabel>
            <Heading>Growth</Heading>
            <p className="mt-4 max-w-xl text-sm text-white/50">
              Where the work has gone — hover a stage to read it.
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal delay={0.1}>
              <Journey />
            </Reveal>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Reveal delay={0.15}>
              <TechChart />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Selected Work</SectionLabel>
            <Heading>Projects</Heading>
            <p className="mt-4 max-w-xl text-sm text-white/50">
              A mix of production work and personal builds.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Stack</SectionLabel>
            <Heading>Skills</Heading>
          </Reveal>

          <SkillsSection />
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      {awards.length > 0 && (
        <section id="awards" className="px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionLabel>Recognition</SectionLabel>
              <Heading>Achievements</Heading>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((a, i) => (
                <Reveal key={a.title} delay={(i % 3) * 0.08}>
                  <div className="glass h-full rounded-2xl p-6 transition hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-300">
                        {a.tag}
                      </span>
                      {a.year && (
                        <span className="font-mono text-[10px] tracking-widest text-white/30">
                          {a.year}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-[15px] font-bold leading-snug text-white">
                      {a.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-cyan-400/60">{a.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className="border-y border-white/5 px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Freelance</SectionLabel>
            <Heading>Work With Me</Heading>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>
              <span className="mx-auto">Contact</span>
            </SectionLabel>
            <Heading>Let&apos;s Build Something</Heading>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60">
              Open to full-time roles, freelance and contract work. Web apps, mobile, backend,
              AI, automation — or a problem that doesn&apos;t fit a neat category. If you&apos;re
              building something, I&apos;d like to hear about it. Email, or just DM me.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 transition hover:bg-cyan-400/20"
              >
                Email Me
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
            {profile.name} · Built from scratch
          </span>
          <div className="flex gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 transition hover:text-cyan-300"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 transition hover:text-cyan-300"
            >
              LinkedIn
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 transition hover:text-cyan-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
      </main>
    </GameProvider>
  )
}
