'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [scrolled, setScrolled] = useState(!isHome)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    setScrolled(false)
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome])

  const navLinks = [
    { label: 'About', href: isHome ? '#about' : '/#about' },
    { label: 'Services', href: isHome ? '#services' : '/#services' },
    { label: 'Process', href: isHome ? '#process' : '/#process' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ]

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center gap-6 px-6 py-3 rounded-full transition-all duration-500 ${scrolled
            ? 'bg-[#F0EFF4]/80 backdrop-blur-xl border border-[#0A0A14]/10 shadow-lg'
            : 'bg-transparent'
          }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-bold text-base tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#0A0A14]' : 'text-[#F0EFF4]'
            }`}
        >
          Nucleus Design
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:-translate-y-px ${scrolled
                  ? 'text-[#0A0A14]/70 hover:text-[#0A0A14]'
                  : 'text-[#F0EFF4]/70 hover:text-[#F0EFF4]'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={isHome ? '#contact' : '/#contact'}
          className="hidden md:inline-flex btn btn-primary py-2 px-5 text-sm"
        >
          <span className="btn-bg" />
          <span className="btn-label">Book a consultation</span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors duration-300 ${scrolled ? 'text-[#0A0A14]' : 'text-[#F0EFF4]'
            }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-full mt-3 left-4 right-4 bg-[#F0EFF4] rounded-[1.5rem] p-6 shadow-xl border border-[#0A0A14]/10 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#0A0A14] font-medium text-base hover:text-[#7B61FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={isHome ? '#contact' : '/#contact'}
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary text-sm text-center"
          >
            <span className="btn-bg" />
            <span className="btn-label">Book a consultation</span>
          </Link>
        </div>
      )}
    </header>
  )
}
