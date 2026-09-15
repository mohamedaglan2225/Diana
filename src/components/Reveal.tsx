import type { ElementType, HTMLAttributes } from 'react'
import { useReveal } from '@/hooks/useReveal'

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'li' | 'figure' | 'p'
}

/**
 * An element that watches its own entry into the viewport. Use it for list
 * items and grid cells, so each one reveals when it is actually seen rather
 * than when its list first appears (this matters on phones, where lists stack).
 */
export function Reveal({ as = 'div', ...rest }: Props) {
  const ref = useReveal<HTMLElement>()
  const Tag = as as ElementType
  return <Tag ref={ref} {...rest} />
}
