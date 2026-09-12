import { useEffect } from 'react'

/** Anchors that were renamed in the redesign, so old links still land well. */
const legacyHashes: Record<string, string> = {
  '#lessons': '#programs',
}

/**
 * On a cold load of a deep link such as `/#programs`, the browser resolves the
 * hash before React has mounted the section, so nothing scrolls. Re-apply the
 * hash once after mount.
 */
export function useHashScroll() {
  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash === '#') return

    let target: Element | null = null
    try {
      target = document.querySelector(legacyHashes[hash] ?? hash)
    } catch {
      return // not a valid selector, so nothing to scroll to
    }
    if (!(target instanceof HTMLElement)) return
    const el = target

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
  }, [])
}
