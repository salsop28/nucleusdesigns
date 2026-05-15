export default function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-[#0A0A14] rounded-t-[4rem] px-8 md:px-16 pt-20 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="text-[#F0EFF4] font-bold text-2xl tracking-tight mb-3">
              Nucleus Design
            </div>
            <p className="drama text-[#7B61FF] text-lg mb-4">Build beautiful websites.</p>
            <p className="mono text-[#F0EFF4]/30 text-xs tracking-wider uppercase">
              Central Coast, NSW, Australia
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="eyebrow mb-6">Navigation</div>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#F0EFF4]/50 hover:text-[#F0EFF4] text-sm transition-all duration-200 hover:-translate-y-px inline-block w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow mb-6">Contact</div>
            <a
              href="mailto:hello@nucleusdesign.com.au"
              className="mono text-[#F0EFF4]/50 hover:text-[#F0EFF4] text-sm transition-colors block mb-4"
            >
              hello@nucleusdesign.com.au
            </a>
            <a
              href="#contact"
              className="text-[#7B61FF] hover:text-[#7B61FF]/70 text-sm font-medium transition-colors"
            >
              Book a consultation →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F0EFF4]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="mono text-[#F0EFF4]/30 text-xs tracking-widest">
              System Operational
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#F0EFF4]/25 text-xs">
              © {new Date().getFullYear()} Nucleus Design
            </span>
            <a
              href="/privacy"
              className="text-[#F0EFF4]/25 hover:text-[#F0EFF4]/60 text-xs transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[#F0EFF4]/25 hover:text-[#F0EFF4]/60 text-xs transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
