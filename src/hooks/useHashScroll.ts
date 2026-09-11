import { useEffect } from 'react'

/**
 * On a cold load of a deep link such as `/#lessons`, the browser resolves the
 * hash before React has mounted the section, so nothing scrolls. Re-apply the
 * hash once after mount.
 */
export function useHashScroll() {
  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash === '#') return

    const target = document.querySelector(hash)
    if (!(target instanceof HTMLElement)) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
  }, [])
}
