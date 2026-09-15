import { useEffect, useState } from 'react'

/**
 * Returns the id of whichever of `ids` currently crosses the middle band of
 * the viewport — used to highlight the matching navigation link. Sections not
 * in the list leave the previous value in place.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          // A section left the band: if the first tracked section now starts
          // below the middle of the screen, we are back above all of them
          // (this also covers an instant jump to the top), so clear it.
          // One layout read per observer callback, never per scroll frame.
          else if (targets[0] && targets[0].getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return active
}
