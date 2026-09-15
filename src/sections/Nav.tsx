import { useEffect, useRef, useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { navIds, navLinks } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(navIds)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // One underline that slides between links as the active section changes.
  // Measured only when the section changes or the list resizes, never per scroll frame.
  useEffect(() => {
    const list = listRef.current
    const bar = indicatorRef.current
    if (!list || !bar) return

    const place = () => {
      const link = active ? list.querySelector<HTMLElement>(`a[href="#${active}"]`) : null
      if (!link || link.offsetWidth === 0) {
        bar.removeAttribute('data-visible')
        return
      }
      const appearing = !bar.hasAttribute('data-visible')
      bar.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop + link.offsetHeight + 2}px) scaleX(${link.offsetWidth})`
      if (appearing) {
        // Appear in place, rather than sliding in from wherever it last was.
        void bar.offsetWidth
        bar.setAttribute('data-visible', '')
      }
    }

    place()
    const resize = new ResizeObserver(place)
    resize.observe(list)
    return () => resize.disconnect()
  }, [active])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    // Close if the viewport grows into the desktop layout.
    const desktop = window.matchMedia('(width >= 64rem)')
    const onResize = () => {
      if (desktop.matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-soft ${
        solid ? 'border-line bg-canvas/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      {/* Reading progress: a hairline driven by the page scroll itself (CSS scroll timeline, no JavaScript). */}
      <span className="scroll-progress" aria-hidden="true" />

      <nav
        aria-label="Main"
        className="mx-auto flex h-[4.5rem] w-full max-w-[76rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
      >
        <a href="#top" className="font-serif text-xl tracking-tight whitespace-nowrap text-ink">
          English <em className="text-brand">with</em> Diana
        </a>

        <div ref={listRef} className="relative hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navLinks.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  {/* Hover previews a faint underline; the active link gets the sliding indicator. */}
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-2 text-[15px] whitespace-nowrap transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:opacity-30 after:transition-transform after:duration-300 after:ease-soft ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink hover:after:scale-x-100'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <span ref={indicatorRef} className="nav-indicator text-ink" aria-hidden="true" />
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="#contact" size="sm">
            Book a Lesson
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* `inert` removes the collapsed menu from the tab order and the accessibility tree. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mx-auto flex max-w-[76rem] flex-col px-5 pt-2 pb-6 sm:px-8">
            {navLinks.map((l) => (
              <li key={l.id} className="border-b border-line">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-2xl text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <ButtonLink href="#contact" onClick={() => setOpen(false)} className="w-full">
                Book a Lesson
              </ButtonLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
