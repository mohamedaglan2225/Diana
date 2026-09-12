type IconProps = { size?: number; className?: string }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Kids English */
export const SparklesIcon = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base}>
    <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
    <path d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9z" />
    <path d="M5 14.5l.6 1.4 1.4.6-1.4.6L5 18.5l-.6-1.4L3 16.5l1.4-.6L5 14.5z" />
  </svg>
)

/** English for Teens */
export const BookIcon = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base}>
    <path d="M2 4.5h6a4 4 0 0 1 4 4V20a3 3 0 0 0-3-3H2z" />
    <path d="M22 4.5h-6a4 4 0 0 0-4 4V20a3 3 0 0 1 3-3h7z" />
  </svg>
)

/** Adult English */
export const ChatIcon = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

/** Business English */
export const BriefcaseIcon = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

export const AwardIcon = ({ size = 26, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

export const ArrowRightIcon = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowLeftIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={2}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)

export const CloseIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={2}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const PlusIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={1.8}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

/** Generic chat bubble used for WhatsApp — always paired with a visible or aria label. */
export const WhatsAppIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={1.8}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

export const MailIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={1.8}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export const InstagramIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} className={className} {...base} strokeWidth={1.8}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
