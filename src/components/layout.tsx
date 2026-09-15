import type { ReactNode } from 'react'

const tones = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  sky: 'bg-sky',
  mist: 'bg-mist',
  sand: 'bg-sand',
  night: 'tone-dark bg-night text-white',
  brand: 'tone-dark bg-brand text-white',
} as const

export type SectionTone = keyof typeof tones

type SectionProps = {
  id?: string
  /** id of the section's heading, for `aria-labelledby`. */
  labelledBy?: string
  tone?: SectionTone
  className?: string
  children: ReactNode
}

/** Full-width page band with consistent vertical rhythm. */
export function Section({ id, labelledBy, tone = 'canvas', className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  )
}

const widths = {
  wide: 'max-w-[76rem]',
  narrow: 'max-w-[64rem]',
} as const

type ContainerProps = {
  size?: keyof typeof widths
  className?: string
  children: ReactNode
}

/** Centred content column with the site's side gutters. */
export function Container({ size = 'wide', className = '', children }: ContainerProps) {
  return <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${widths[size]} ${className}`}>{children}</div>
}
