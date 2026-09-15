import { useEffect, useRef } from 'react'

/** Beyond this many siblings, later ones don't wait any longer. */
const MAX_ORDER = 5

let observer: IntersectionObserver | null = null

/**
 * Reveals everything that just entered the viewport. Siblings that enter in
 * the same frame (a row of cards, say) get `--order` 0, 1, 2… in reading
 * order, which the CSS turns into a stagger. An element that enters on its
 * own gets no delay, so nothing waits just because of its position in a list.
 */
function reveal(entries: IntersectionObserverEntry[]) {
  const groups = new Map<Element | null, IntersectionObserverEntry[]>()
  for (const entry of entries) {
    if (!entry.isIntersecting) continue
    const parent = entry.target.parentElement
    groups.set(parent, [...(groups.get(parent) ?? []), entry])
  }

  for (const group of groups.values()) {
    group
      .sort(
        (a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top ||
          a.boundingClientRect.left - b.boundingClientRect.left,
      )
      .forEach((entry, n) => {
        const el = entry.target as HTMLElement
        el.style.setProperty('--order', String(Math.min(n, MAX_ORDER)))
        el.classList.add('is-visible')
        observer?.unobserve(el)
      })
  }
}

/**
 * Adds `.is-visible` to the element the first time it scrolls into view,
 * driving the reveal classes in index.css (on the element itself and on its
 * descendants). One shared IntersectionObserver serves the whole page, and
 * revealed elements stay revealed. Without IntersectionObserver, elements
 * are shown straight away.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    observer ??= new IntersectionObserver(reveal, { rootMargin: '0px 0px -10% 0px' })
    observer.observe(el)
    return () => observer?.unobserve(el)
  }, [])

  return ref
}
