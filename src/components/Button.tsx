import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRightIcon } from './Icons'

type Variant = 'primary' | 'secondary' | 'light'
type Size = 'sm' | 'md'

/*
 * One interaction language for every button: a small lift on hover, a
 * return towards neutral when pressed, and an arrow that nudges forward.
 * Tailwind's `hover:` only applies on devices that can hover, so touch
 * screens never get a stuck hover state.
 */
const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,translate] duration-250 ease-out active:translate-y-0 active:duration-100'

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[15px]',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-button hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-button-hover active:shadow-button',
  secondary: 'border border-ink/15 text-ink hover:border-ink/35 hover:bg-surface',
  /** For dark (night) sections. */
  light: 'bg-white text-ink shadow-button hover:-translate-y-0.5 hover:bg-sky hover:shadow-button-hover active:shadow-button',
}

const classes = (variant: Variant, size: Size, className = '') =>
  `${base} ${sizes[size]} ${variants[variant]} ${className}`

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode }

/** Nudged by `.link-arrow` in index.css, on its own hover or a whole card's. */
const Arrow = () => <ArrowRightIcon className="link-arrow" />

/** A link styled as a button — for in-page anchors and, once configured, the placement test link. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
  children,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}

/** Quiet text link with an arrow — for secondary actions inside content. */
export function TextLink({
  tone = 'light',
  className = '',
  children,
  ...rest
}: { tone?: 'light' | 'dark'; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const colour =
    tone === 'dark'
      ? 'text-white decoration-white/40 hover:decoration-white'
      : 'text-brand decoration-brand/30 hover:decoration-brand'
  return (
    <a
      className={`group inline-flex items-center gap-2 text-[15px] font-medium underline decoration-1 underline-offset-[6px] transition-colors duration-200 ${colour} ${className}`}
      {...rest}
    >
      {children}
      <Arrow />
    </a>
  )
}
