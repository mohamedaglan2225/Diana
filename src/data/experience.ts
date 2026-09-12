export type Role = {
  period: string
  role: string
  org: string | null
  desc: string
}

/**
 * Teaching experience, taken from the original site. Ongoing private
 * teaching first, then most recent to oldest. Visible copy avoids em / en
 * dashes: ranges read "2019 to 2023".
 */
export const roles: Role[] = [
  {
    period: '2017 to present',
    role: 'Private English Teacher',
    org: null,
    desc: 'Personalised English lessons focused on communication, speaking and individual learning goals.',
  },
  {
    period: '2025 to 2026',
    role: 'English Teaching Experience in Vietnam',
    org: null,
    desc: 'ESL classes for different age groups, school programs and Business English for adults.',
  },
  {
    period: '2024',
    role: 'English Teacher',
    org: 'International House Voronezh, Linguist School',
    desc: 'English-language activities and immersive summer learning experiences.',
  },
  {
    period: '2023 to 2024',
    role: 'English Teacher',
    org: 'Polyglot Language School',
    desc: 'English lessons for young and adult learners, speaking clubs and school activities.',
  },
  {
    period: '2019 to 2023',
    role: 'ESL Teacher & Methodologist',
    org: 'Green Card Language Institute',
    desc: 'Teaching, lesson planning, student assessment and support for teaching programs.',
  },
]
