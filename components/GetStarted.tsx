'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function GetStarted() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cta]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 bg-[#F0EFF4]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div data-cta className="eyebrow mb-8">Ready to start?</div>

        <h2
          data-cta
          className="font-bold text-[#0A0A14] leading-tight tracking-tight mb-8"
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
        >
          Ready to build
          <br />
          <span className="drama text-[#7B61FF]">something beautiful?</span>
        </h2>

        <p
          data-cta
          className="text-[#0A0A14]/55 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Every great website starts with a conversation. Book a free consultation and let&rsquo;s
          talk about what you&rsquo;re building.
        </p>

        <div data-cta className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="mailto:hello@nucleusdesigns.com"
            className="btn btn-primary text-base py-4 px-8"
          >
            <span className="btn-bg" />
            <span className="btn-label flex items-center gap-2">
              Book a consultation <ArrowRight size={18} />
            </span>
          </a>
          <a
            href="mailto:hello@nucleusdesigns.com"
            className="mono text-sm text-[#0A0A14]/50 hover:text-[#7B61FF] transition-colors"
          >
            hello@nucleusdesigns.com
          </a>
        </div>
      </div>
    </section>
  )
}
