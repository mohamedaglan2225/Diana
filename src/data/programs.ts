import type { ComponentType } from 'react'
import { BookIcon, BriefcaseIcon, ChatIcon, SparklesIcon } from '@/components/Icons'

export type ProgramId = 'kids' | 'teens' | 'adults' | 'business'

/** What the enquiry form's "Program" field can hold. '' = nothing chosen. */
export type ProgramChoice = ProgramId | 'unsure' | ''

export type Program = {
  id: ProgramId
  name: string
  /** Short audience label shown above the name. */
  audience: string
  /** One-line positioning statement. */
  tagline: string
  forWhom: string
  /** Practical, outcome-phrased focus areas. */
  workOn: string[]
  goal: string
  icon: ComponentType<{ size?: number; className?: string }>
  /** Visual accent for the card's badge. */
  accent: 'lavender' | 'sky' | 'sand' | 'brand'
}

/*
 * Content rule: describe realistic focus and outcomes only — no durations,
 * prices, formats or guaranteed results.
 */
export const programs: Program[] = [
  {
    id: 'kids',
    name: 'Kids English',
    audience: 'Children',
    tagline: 'Playful lessons that get children talking.',
    forWhom: 'Children who learn best through play, pictures, movement and hands-on activities.',
    workOn: [
      'Learning everyday words through games, pictures and stories',
      'Saying words and short phrases out loud from the very first lessons',
      'Understanding and following simple instructions in English',
      'Crafts, colouring and creative tasks that help new words stick',
    ],
    goal: 'To help children enjoy English and feel brave enough to use it.',
    icon: SparklesIcon,
    accent: 'lavender',
  },
  {
    id: 'teens',
    name: 'English for Teens',
    audience: 'Teenagers',
    tagline: 'Clear support for school, and more confidence speaking.',
    forWhom:
      'Teenagers who want to understand school English better and feel more comfortable speaking it.',
    workOn: [
      'Grammar explained clearly, then practised until it makes sense',
      'Vocabulary for school topics and everyday conversation',
      'Speaking and discussion on topics teens actually care about',
      'Support with school English and classwork',
    ],
    goal: 'To make English clearer at school and more natural to use outside it.',
    icon: BookIcon,
    accent: 'sky',
  },
  {
    id: 'adults',
    name: 'Adult English',
    audience: 'Adults',
    tagline: 'Practical English for everyday life.',
    forWhom:
      'Adults who want to communicate more comfortably in everyday English, for travel, social life or personal growth.',
    workOn: [
      'Responding more naturally in everyday conversations',
      'Pronunciation that is clear and easy to understand',
      'Practical grammar you can use while you speak',
      'Speaking with less hesitation, one conversation at a time',
    ],
    goal: 'To build the skills and confidence to communicate more naturally in real-life situations.',
    icon: ChatIcon,
    accent: 'sand',
  },
  {
    id: 'business',
    name: 'Business English',
    audience: 'Professionals',
    tagline: 'Clear, confident English for work.',
    forWhom: 'Adults who use English at work and want to communicate more clearly and confidently.',
    workOn: [
      'Taking part in meetings and discussions',
      'Explaining ideas and opinions clearly',
      'The vocabulary your role and workplace actually need',
      'Speaking with confidence in professional situations',
    ],
    goal: 'To communicate more clearly and confidently whenever work happens in English.',
    icon: BriefcaseIcon,
    accent: 'brand',
  },
]

/** Options for the enquiry form — labels always match the program names above. */
export const programChoices: { value: Exclude<ProgramChoice, ''>; label: string }[] = [
  ...programs.map((p) => ({ value: p.id, label: p.name })),
  { value: 'unsure', label: 'Not sure yet' },
]
