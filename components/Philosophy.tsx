'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on texture image
      gsap.to('[data-parallax]', {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Word-by-word reveal
      gsap.fromTo(
        '[data-word]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )

      // Coasties tagline reveal
      gsap.fromTo(
        '[data-tagline]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-tagline]',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const neutral = 'Most agencies focus on: templates, speed, and volume.'.split(' ')
  const bold = 'We focus on craft — every pixel purposeful, every project built to perform.'.split(' ')
  const accentWords = new Set(['craft', 'purposeful,', 'perform.'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0A0A14]"
    >
      {/* Parallax texture — bioluminescence */}
      <div data-parallax className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80"
          alt="Abstract purple fluid art texture — neon biotech aesthetic"
          fill
          className="object-cover object-center opacity-[0.08]"
        />
      </div>

      {/* Plasma glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Neutral statement */}
        <p className="text-[#F0EFF4]/35 text-lg md:text-xl mb-8 leading-relaxed">
          {neutral.map((word, i) => (
            <span key={i} data-word className="inline-block mr-[0.32em]">
              {word}
            </span>
          ))}
        </p>

        {/* Bold manifesto */}
        <p
          className="font-bold leading-tight tracking-tight mb-16"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)' }}
        >
          {bold.map((word, i) => (
            <span
              key={i}
              data-word
              className={`inline-block mr-[0.2em] ${
                accentWords.has(word) ? 'text-[#7B61FF]' : 'text-[#F0EFF4]'
              }`}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Coasties tagline */}
        <div data-tagline className="border-t border-[#F0EFF4]/10 pt-14">
          <p
            className="drama text-[#7B61FF] leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            Built by coasties, for coasties.
          </p>
          <p className="mono text-[#F0EFF4]/30 text-xs tracking-widest uppercase">
            Central Coast, NSW, Australia
          </p>
        </div>
      </div>
    </section>
  )
}
