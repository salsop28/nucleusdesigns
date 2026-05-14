'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

const MAX_PLAYS = 3

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playCount = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      playCount.current += 1
      if (playCount.current < MAX_PLAYS) {
        video.play()
      }
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Background video — plays 3 times then holds on last frame */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/30 to-transparent" />

      {/* Plasma glow accent */}
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content — bottom-left third */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20 md:pb-28 max-w-4xl">
        <div data-hero className="eyebrow text-[#7B61FF]/90 mb-6">
          Central Coast, NSW · Website Design Agency
        </div>

        <h1 className="mb-6">
          <span
            data-hero
            className="block text-[#F0EFF4] font-bold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            Website design beyond
          </span>
          <span
            data-hero
            className="block drama text-[#F0EFF4] leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
          >
            ordinary.
          </span>
        </h1>

        <p
          data-hero
          className="text-[#F0EFF4]/65 text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          Nucleus Designs is a website design agency on the Central Coast of Australia — crafting
          beautiful, strategic websites from discovery to launch.
        </p>

        <div data-hero className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="btn btn-primary">
            <span className="btn-bg" />
            <span className="btn-label flex items-center gap-2">
              Book a consultation <ArrowRight size={16} />
            </span>
          </a>
          <a href="#services" className="btn btn-ghost">
            <span className="btn-bg" />
            <span className="btn-label">See our services</span>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 z-10 opacity-40">
        <span className="mono text-[#F0EFF4] text-xs tracking-widest"
          style={{ writingMode: 'vertical-rl' }}>
          scroll
        </span>
      </div>
    </section>
  )
}
