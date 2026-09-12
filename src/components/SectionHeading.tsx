import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

const step = (i: number) => ({ '--i': i }) as CSSProperties

type Props = {
  eyebrow: string
  title: ReactNode
  /** Rendered as the `<h2>` id — pair it with `Section labelledBy`. */
  id: string
  intro?: ReactNode
  /** 'dark' = night background, 'brand' = blue background. */
  tone?: 'light' | 'dark' | 'brand'
  className?: string
}

/**
 * Eyebrow + serif h2 + optional intro. On scroll they arrive in that order,
 * a beat apart, while the eyebrow's hairline draws in.
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
  intro,
  tone = 'light',
  className = '',
}: Props) {
  const ref = useReveal()
  const dark = tone !== 'light'

  return (
    <div ref={ref} className={`max-w-2xl ${className}`}>
      <p
        className={`reveal flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase [--distance:10px] ${
          tone === 'brand' ? 'text-white' : dark ? 'text-brand-soft' : 'text-brand'
        }`}
      >
        <span className="draw-x h-px w-8 bg-current opacity-60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`reveal mt-5 text-h2 text-balance ${dark ? 'text-white' : 'text-ink'}`} style={step(1)}>
        {title}
      </h2>
      {intro && (
        <p
          className={`reveal mt-5 text-base leading-relaxed text-pretty sm:text-lg ${
            tone === 'brand' ? 'text-white/90' : dark ? 'text-white/75' : 'text-muted'
          }`}
          style={step(2)}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
