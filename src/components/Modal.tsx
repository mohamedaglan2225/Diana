import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

/** Matches the `modal-out` animation in index.css. */
const EXIT_MS = 180

type Props = {
  open: boolean
  onClose: () => void
  /** Accessible name of the dialog. */
  label: string
  /** Extra key handling while open (e.g. arrow keys in the lightbox). */
  onKeyDown?: (e: KeyboardEvent<HTMLDialogElement>) => void
  className?: string
  children: ReactNode
}

/**
 * Native `<dialog>` opened with `showModal()`: the browser makes the rest of
 * the page inert and keeps Tab inside the dialog. On top of that this
 * component locks page scroll, closes on Escape or a backdrop click, and
 * returns focus to whatever opened it. Mark the element that should receive
 * focus on open with `data-autofocus` (React's autoFocus runs before
 * showModal() and would be overridden).
 *
 * Opening scales the content up from 97% while the backdrop fades in (see
 * `.modal` in index.css). Closing plays a short fade before the dialog is
 * removed; the last content stays on screen during it. With reduced motion
 * the dialog closes at once.
 */
export function Modal({ open, onClose, label, onKeyDown, className = '', children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  // Stays true through the exit animation, after `open` has gone false.
  const [present, setPresent] = useState(open)
  const lastChildren = useRef(children)

  if (open && !present) setPresent(true)

  useLayoutEffect(() => {
    if (open) lastChildren.current = children
  })

  useEffect(() => {
    const dialog = ref.current
    if (!present || !dialog) return

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const root = document.documentElement
    const { overflow } = root.style

    dialog.showModal()
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    root.style.overflow = 'hidden'

    return () => {
      if (dialog.open) dialog.close()
      root.style.overflow = overflow
      trigger?.focus()
    }
  }, [present])

  useEffect(() => {
    if (open || !present) return
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setPresent(false), instant ? 0 : EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [open, present])

  if (!present) return null

  // The backdrop colour is a literal: older browsers don't expose theme
  // custom properties inside ::backdrop.
  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-closing={open ? undefined : ''}
      className={`modal m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-[rgb(20_32_40/0.9)] ${className}`}
      onCancel={(e) => {
        // Escape — keep React in charge of closing.
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        // Clicks on the dialog itself (not its content) are backdrop clicks.
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={open ? onKeyDown : undefined}
    >
      {open ? children : lastChildren.current}
    </dialog>
  )
}
