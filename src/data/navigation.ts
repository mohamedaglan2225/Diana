/** Main navigation — keep in the same order the sections appear on the page. */
export const navLinks = [
  { label: 'Programs', id: 'programs' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Placement Test', id: 'placement-test' },
  { label: 'About', id: 'about' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'FAQ', id: 'faq' },
] as const

export const navIds = navLinks.map((l) => l.id)
