import { useEffect, useState } from 'react'
import { siteConfig } from '@/site.config'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'My Approach', href: '#my-approach' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="font-serif text-[16px] sm:text-[17px] text-[#2F3A40] tracking-tight whitespace-nowrap"
        >
          {siteConfig.brandName}
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-[#68767D] hover:text-[#2F3A40] transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-[#4A7C9B] text-white text-sm font-medium hover:bg-[#3F6C88] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            Book a Lesson
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-6 h-0.5 bg-[#2F3A40] transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span className={`block w-6 h-0.5 bg-[#2F3A40] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`block w-6 h-0.5 bg-[#2F3A40] transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden bg-white overflow-hidden transition-[max-height] duration-300 ${
          open ? 'max-h-96 border-t border-[#EFF7FB]' : 'max-h-0'
        }`}
      >
        <ul className="px-5 sm:px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="text-sm text-[#2F3A40] hover:text-[#4A7C9B] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="block px-5 py-2.5 rounded-full bg-[#4A7C9B] text-white text-sm font-medium w-full text-center"
            >
              Book a Lesson
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
