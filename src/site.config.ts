/**
 * Single place for every real-world detail the site needs.
 *
 * Anything left as `null` is *not yet supplied*. The UI stays fully designed
 * and simply leaves that detail out instead of inventing a phone number, an
 * address, a domain or a certificate scan.
 *
 * This file is also read by `vite.config.ts` (SEO tags, structured data,
 * robots.txt / sitemap.xml), so keep it free of imports and browser-only code.
 */
export const siteConfig = {
  brandName: 'English with Diana',
  teacherName: 'Diana Rasok',
  tagline: 'Confidence starts with conversation.',

  /**
   * Public URL of the live site, including any sub-path and a trailing slash,
   * e.g. 'https://englishwithdiana.com/'. Enables the canonical link,
   * absolute social-preview image, og:url and sitemap.xml at build time.
   */
  siteUrl: null as string | null,

  /** International format, digits only — no '+', spaces or dashes. e.g. '201234567890' */
  whatsappNumber: null as string | null,
  /** e.g. 'hello@englishwithdiana.com' */
  email: null as string | null,
  /** Full profile URL, e.g. 'https://instagram.com/englishwithdiana' */
  instagramUrl: null as string | null,

  /** Countries where Diana has studied — provided by the site owner. */
  studiedIn: ['Russia', 'Vietnam', 'Egypt'],

  certificate: {
    name: '120-Hour TESOL / TEFL Certificate',
    issuer: 'World TESOL Academy',
    /**
     * Web image of the real certificate (rendered from the owner's PDF; WebP
     * variants sit next to it, see src/lib/images.ts). While null, the site
     * shows the qualification details without a "View certificate" action.
     */
    asset: 'images/tesol-certificate.jpg' as string | null,
    /** The original certificate PDF, linked from the certificate viewer. */
    pdf: 'documents/tesol-certificate.pdf' as string | null,
  },
}

const digitsOnly = siteConfig.whatsappNumber?.replace(/\D/g, '') || null

export const whatsappLink = digitsOnly ? `https://wa.me/${digitsOnly}` : null
export const emailLink = siteConfig.email ? `mailto:${siteConfig.email}` : null
export const instagramLink = siteConfig.instagramUrl
