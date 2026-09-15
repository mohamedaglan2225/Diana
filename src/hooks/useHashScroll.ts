import { useEffect } from 'react'

/** Anchors that were renamed or merged in a redesign, so old links still land well. */
const legacyHashes: Record<string, string> = {
  '#lessons': '#programs',
  '#progress': '#how-it-works',
  '#how-lessons-work': '#how-it-works',
  '#international': '#about',
  '#my-approach': '#about',
}

function scrollToHash(hash: string) {
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
}

/**
 * On a cold load of a deep link such as `/#programs`, the browser resolves the
 * hash before React has mounted the section, so nothing scrolls. Re-apply the
 * hash once after mount. Legacy anchors that no longer exist on the page are
 * also redirected when the hash changes while the page is open.
 */
export function useHashScroll() {
  useEffect(() => {
    scrollToHash(window.location.hash)

    const onHashChange = () => {
      const { hash } = window.location
      if (hash in legacyHashes && !document.getElementById(hash.slice(1))) scrollToHash(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
}
