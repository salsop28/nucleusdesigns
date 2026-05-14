'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Card 1: Diagnostic Shuffler ──────────────────────────────────────────────

const shufflerItems = [
  {
    label: 'Discovery & Brand Audit',
    sub: 'We map what you have before we plan what you need.',
  },
  {
    label: 'Competitive Landscape',
    sub: 'Know where you stand before we move forward.',
  },
  {
    label: 'Technical Roadmap',
    sub: 'A clear path from brief to launch.',
  },
]

function ShufflerCard() {
  const [items, setItems] = useState(shufflerItems)

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const next = [...prev]
        const last = next.pop()!
        next.unshift(last)
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="eyebrow mb-4">01 — Strategy</div>
      <h3 className="text-[#18181B] font-bold text-xl mb-2">Strategy</h3>
      <p className="text-[#0A0A14]/60 text-sm mb-8 leading-relaxed">
        Build with purpose. We map your vision before a line of code is written.
      </p>
      <div className="flex-1 relative" style={{ minHeight: 180 }}>
        {items.map((item, i) => (
          <div
            key={item.label}
            className="absolute w-full bg-white border border-[#0A0A14]/8 rounded-2xl p-4 shadow-sm transition-all duration-700"
            style={{
              top: i * 16,
              zIndex: 3 - i,
              opacity: i === 0 ? 1 : i === 1 ? 0.55 : 0.25,
              transform: `scale(${1 - i * 0.025})`,
              transformOrigin: 'top center',
            }}
          >
            <div className="font-semibold text-[#0A0A14] text-sm">{item.label}</div>
            {i === 0 && (
              <div className="text-[#0A0A14]/50 text-xs mt-1 leading-relaxed">{item.sub}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Card 2: Telemetry Typewriter ─────────────────────────────────────────────

const feedMessages = [
  '→ Initialising design system...',
  '→ Building component library...',
  '→ Running accessibility audit...',
  '→ Compiling production build...',
  '→ Performance score: 98/100',
  '→ Deploying to production...',
  '✓ Launch complete.',
]

function TypewriterCard() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const msg = feedMessages[msgIdx]
    if (charIdx < msg.length) {
      const t = setTimeout(() => {
        setCurrentLine(msg.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 38)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev.slice(-5), msg])
        setCurrentLine('')
        setCharIdx(0)
        setMsgIdx((i) => (i + 1) % feedMessages.length)
      }, 900)
      return () => clearTimeout(t)
    }
  }, [charIdx, msgIdx])

  return (
    <div className="flex flex-col h-full">
      <div className="eyebrow mb-4">02 — Execution</div>
      <h3 className="text-[#18181B] font-bold text-xl mb-2">Execution</h3>
      <p className="text-[#0A0A14]/60 text-sm mb-6 leading-relaxed">
        Pixel-perfect builds, shipped on time. Every time.
      </p>
      <div className="flex-1 bg-[#0A0A14] rounded-2xl p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#7B61FF] animate-pulse-dot" />
          <span className="mono text-[#7B61FF] text-[10px] tracking-widest uppercase">
            Live Feed
          </span>
        </div>
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <div key={i} className="mono text-[#F0EFF4]/30 text-[11px]">
              {line}
            </div>
          ))}
          {currentLine && (
            <div className="mono text-[#F0EFF4] text-[11px]">
              {currentLine}
              <span className="animate-blink text-[#7B61FF]">▋</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Card 3: Cursor Protocol Scheduler ────────────────────────────────────────

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const milestones = [
  { day: 1, label: 'Brief' },
  { day: 3, label: 'Design' },
  { day: 5, label: 'Review' },
]

function SchedulerCard() {
  const [activeDay, setActiveDay] = useState<number | null>(null)
  const [mIdx, setMIdx] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const milestone = milestones[mIdx % milestones.length]
    setActiveDay(null)
    setSaving(false)

    const t1 = setTimeout(() => setActiveDay(milestone.day), 700)
    const t2 = setTimeout(() => setSaving(true), 1600)
    const t3 = setTimeout(() => {
      setSaving(false)
      setMIdx((i) => i + 1)
    }, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [mIdx])

  return (
    <div className="flex flex-col h-full">
      <div className="eyebrow mb-4">03 — Results</div>
      <h3 className="text-[#18181B] font-bold text-xl mb-2">Results</h3>
      <p className="text-[#0A0A14]/60 text-sm mb-6 leading-relaxed">
        From first brief to final launch — on time, every time.
      </p>
      <div className="flex-1 bg-white border border-[#0A0A14]/8 rounded-2xl p-5">
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((d, i) => (
            <div key={i} className="text-center mono text-[10px] font-medium text-[#0A0A14]/35">
              {d}
            </div>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {Array.from({ length: 7 }, (_, i) => {
            const milestone = milestones.find((m) => m.day === i)
            const isActive = activeDay === i
            return (
              <div
                key={i}
                className="aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-400"
                style={{
                  backgroundColor: isActive
                    ? '#7B61FF'
                    : milestone
                    ? 'rgba(10,10,20,0.08)'
                    : 'rgba(10,10,20,0.04)',
                  transform: isActive ? 'scale(0.95)' : 'scale(1)',
                  boxShadow: isActive ? '0 4px 12px rgba(123,97,255,0.35)' : 'none',
                }}
              >
                {milestone && (
                  <span
                    className="mono text-[8px] font-medium text-center leading-tight px-0.5"
                    style={{ color: isActive ? '#F0EFF4' : 'rgba(10,10,20,0.5)' }}
                  >
                    {milestone.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        {/* Save button */}
        <button
          className="w-full py-2.5 rounded-xl mono text-xs font-medium transition-all duration-300"
          style={{
            backgroundColor: saving ? '#0A0A14' : 'rgba(10,10,20,0.08)',
            color: saving ? '#F0EFF4' : 'rgba(10,10,20,0.45)',
            transform: saving ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          {saving ? '✓ Milestone saved' : 'Save milestone'}
        </button>
      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-[#F0EFF4]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-xl">
          <div className="eyebrow mb-4">What we do</div>
          <h2
            className="font-bold text-[#0A0A14] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Three disciplines.
            <br />
            One outcome.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[<ShufflerCard key="s" />, <TypewriterCard key="t" />, <SchedulerCard key="sc" />].map(
            (card, i) => (
              <div
                key={i}
                className="feature-card bg-[#F0EFF4] border border-[#0A0A14]/8 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                style={{ minHeight: 440 }}
              >
                {card}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
