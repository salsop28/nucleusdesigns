'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Deep-dive discovery. We learn your goals, your audience, and your competitive landscape before we touch a design tool.',
    visual: 'circles',
    bg: '#0A0A14',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Brand-aligned design systems, wireframes, and pixel-perfect mockups — built for your approval before development begins.',
    visual: 'grid',
    bg: '#12102a',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Production-grade development, rigorous QA, and a launch that performs — with the metrics to prove it.',
    visual: 'ekg',
    bg: '#0d0d20',
  },
]

// ── Visual 1: Rotating concentric circles ─────────────────────────────────

function RotatingCircles() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? 'rgba(240,239,244,0.2)' : '#7B61FF'}
          strokeWidth={i % 2 === 0 ? 1 : 1.5}
          strokeDasharray={i % 2 === 0 ? '4 8' : '2 14'}
          className="animate-spin-slow"
          style={{
            transformOrigin: '100px 100px',
            animationDuration: `${10 + i * 4}s`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
          }}
        />
      ))}
      <circle cx="100" cy="100" r="5" fill="#7B61FF" opacity="0.9" />
      <circle cx="100" cy="100" r="2" fill="#F0EFF4" />
    </svg>
  )
}

// ── Visual 2: Scanning grid of dots ──────────────────────────────────────

function ScanGrid() {
  const COLS = 8
  const ROWS = 6
  const [activeCol, setActiveCol] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveCol((c) => (c + 1) % COLS), 300)
    return () => clearInterval(id)
  }, [])

  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {Array.from({ length: ROWS }, (_, row) =>
        Array.from({ length: COLS }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={14 + col * 25}
            cy={14 + row * 27}
            r={col === activeCol ? 3.5 : 2}
            fill={col === activeCol ? '#7B61FF' : 'rgba(240,239,244,0.2)'}
            style={{ transition: 'all 0.2s ease' }}
          />
        ))
      )}
    </svg>
  )
}

// ── Visual 3: EKG waveform ────────────────────────────────────────────────

function EKGWave() {
  const path =
    'M 10 80 L 30 80 L 38 40 L 48 120 L 58 80 L 76 80 L 84 20 L 100 140 L 110 80 L 128 80 L 136 55 L 148 105 L 158 80 L 190 80'

  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* ghost path */}
      <path d={path} fill="none" stroke="rgba(240,239,244,0.1)" strokeWidth="2" />
      {/* animated path */}
      <path
        d={path}
        fill="none"
        stroke="#7B61FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-ekg"
        style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
      />
    </svg>
  )
}

function StepVisual({ type }: { type: string }) {
  if (type === 'circles') return <RotatingCircles />
  if (type === 'grid') return <ScanGrid />
  return <EKGWave />
}

// ── Section ───────────────────────────────────────────────────────────────

export default function Protocol() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

      cards.forEach((card, i) => {
        if (i === 0) return
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(cards[i - 1], {
              scale: 0.9,
              filter: 'blur(4px)',
              opacity: 0.45,
              duration: 0.55,
              ease: 'power2.inOut',
            })
          },
          onLeaveBack: () => {
            gsap.to(cards[i - 1], {
              scale: 1,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 0.4,
              ease: 'power2.inOut',
            })
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="bg-[#F0EFF4] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-xl">
          <div className="eyebrow mb-4">How we work</div>
          <h2
            className="font-bold text-[#0A0A14] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Three phases.
            <br />
            Zero guesswork.
          </h2>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[i] = el }}
              className="sticky rounded-[2.5rem] p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center"
              style={{ top: 96 + i * 16, backgroundColor: step.bg, minHeight: 360 }}
            >
              <div>
                <div className="mono text-[#7B61FF] text-sm tracking-widest mb-6">
                  {step.number}
                </div>
                <h3
                  className="text-[#F0EFF4] font-bold mb-6 tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  {step.title}
                </h3>
                <p className="text-[#F0EFF4]/55 text-base md:text-lg leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              <div className="h-48 md:h-56 flex items-center justify-center">
                <StepVisual type={step.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
