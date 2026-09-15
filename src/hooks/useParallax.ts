import { useEffect, useRef } from 'react'

/**
 * Lets an element drift down by up to `max` px over the first part of the
 * page, so it scrolls away slightly slower than the content around it.
 *
 * Desktop only, and off for reduced motion. One passive scroll listener,
 * at most one transform write per animation frame, and no layout reads:
 * only `window.scrollY` is consulted.
 */
export function useParallax<T extends HTMLElement>(max = 16, rate = 0.05) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const query = window.matchMedia('(width >= 64rem) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let last = -1
    let listening = false

    const apply = () => {
      frame = 0
      const y = Math.round(Math.min(window.scrollY * rate, max) * 10) / 10
      if (y === last) return
      last = y
      el.style.transform = `translate3d(0, ${y}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const stop = () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      frame = 0
      last = -1
      listening = false
      el.style.transform = ''
    }
    const sync = () => {
      if (query.matches && !listening) {
        listening = true
        window.addEventListener('scroll', onScroll, { passive: true })
        apply()
      } else if (!query.matches && listening) {
        stop()
      }
    }

    sync()
    query.addEventListener('change', sync)
    return () => {
      query.removeEventListener('change', sync)
      stop()
    }
  }, [max, rate])

  return ref
}
