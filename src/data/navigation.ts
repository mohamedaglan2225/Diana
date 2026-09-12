/** Main navigation — keep in the same order the sections appear on the page. */
export const navLinks = [
  { label: 'Programs', id: 'programs' },
  { label: 'Your Progress', id: 'progress' },
  { label: 'About', id: 'about' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Experience', id: 'experience' },
  { label: 'FAQ', id: 'faq' },
] as const

export const navIds = navLinks.map((l) => l.id)
