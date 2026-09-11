/**
 * Single place for every real-world detail the site needs.
 *
 * Anything left as `null` is *not yet supplied*. The UI stays fully designed
 * and simply falls back to a neutral, honest state instead of inventing a
 * phone number, an address or a certificate scan.
 */
export const siteConfig = {
  brandName: 'English with Diana',
  teacherName: 'Diana Rasok',
  tagline: 'Confidence starts with conversation.',

  /** e.g. '+201234567890' — digits only, international format, no spaces. */
  whatsappNumber: null as string | null,
  /** e.g. 'hello@englishwithdiana.com' */
  email: null as string | null,
  /** e.g. 'https://instagram.com/englishwithdiana' */
  instagramUrl: null as string | null,

  /**
   * Path (inside /public) to the real 120-Hour TESOL / TEFL certificate scan,
   * once it is available — e.g. '/images/tesol-certificate.jpg'.
   * While this is null the certificate card shows a "coming soon" state
   * rather than a fabricated document.
   */
  certificateAsset: null as string | null,
} as const

export const whatsappLink = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber}`
  : null

export const emailLink = siteConfig.email ? `mailto:${siteConfig.email}` : null
