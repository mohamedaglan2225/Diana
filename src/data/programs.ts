import type { ComponentType } from 'react'
import {
  BookIcon,
  BriefcaseIcon,
  ChatIcon,
  MapPinIcon,
  MessagesIcon,
  SparklesIcon,
} from '@/components/Icons'

export type CoreProgramId = 'kids' | 'teens' | 'adults' | 'business'
export type SpecialProgramId = 'conversation' | 'travel'
export type ProgramId = CoreProgramId | SpecialProgramId

/** What the enquiry form's "Program" field can hold. '' = nothing chosen. */
export type ProgramChoice = ProgramId | 'unsure' | ''

type Icon = ComponentType<{ size?: number; className?: string }>

export type Program = {
  id: CoreProgramId
  name: string
  /** Short audience label shown above the name. */
  audience: string
  /** One-line positioning statement: who it's for and what it's for. */
  tagline: string
  /** Practical, outcome-phrased focus areas. */
  workOn: string[]
  icon: Icon
  /** Visual accent for the card's badge. */
  accent: 'lavender' | 'sky' | 'sand' | 'brand'
}

/*
 * Content rule: describe realistic focus and outcomes only — no durations,
 * prices, formats or guaranteed results. One tagline per program: a separate
 * "for whom" line only restated it.
 */
export const programs: Program[] = [
  {
    id: 'kids',
    name: 'Kids English',
    audience: 'Children',
    tagline: 'Playful, hands-on lessons that get children talking.',
    workOn: [
      'Everyday words through games, pictures and stories',
      'Saying words and short phrases out loud from the first lessons',
      'Understanding and following simple instructions',
      'Creative tasks that help new words stick',
    ],
    icon: SparklesIcon,
    accent: 'lavender',
  },
  {
    id: 'teens',
    name: 'English for Teens',
    audience: 'Teenagers',
    tagline: 'Clearer school English, and more confidence speaking it.',
    workOn: [
      'Grammar explained clearly, then practised until it makes sense',
      'Vocabulary for school topics and everyday conversation',
      'Discussion on topics teens actually care about',
      'Support with school English and classwork',
    ],
    icon: BookIcon,
    accent: 'sky',
  },
  {
    id: 'adults',
    name: 'Adult English',
    audience: 'Adults',
    tagline: 'Practical English for everyday and social life.',
    workOn: [
      'Responding more naturally in everyday conversations',
      'Pronunciation that is clear and easy to understand',
      'Practical grammar you can use while you speak',
      'Speaking with less hesitation',
    ],
    icon: ChatIcon,
    accent: 'sand',
  },
  {
    id: 'business',
    name: 'Business English',
    audience: 'Professionals',
    tagline: 'Clear, confident English for people who use it at work.',
    workOn: [
      'Taking part in meetings and discussions',
      'Explaining ideas and opinions clearly',
      'The vocabulary your role and workplace actually need',
      'Speaking with confidence in professional situations',
    ],
    icon: BriefcaseIcon,
    accent: 'brand',
  },
]

export type SpecialProgram = {
  id: SpecialProgramId
  name: string
  /** Short label shown above the name. */
  kind: string
  summary: string
  /** Heading for the topic pills. */
  topicsLabel: string
  topics: string[]
  note: string
  icon: Icon
}

/*
 * Focused programs alongside the core four. Same content rule: no prices,
 * session counts, group sizes or schedules until the owner confirms them.
 */
export const specialPrograms: SpecialProgram[] = [
  {
    id: 'conversation',
    name: 'Conversation Club',
    kind: 'Speaking practice',
    summary: 'Improve fluency, confidence and natural speaking through guided conversation sessions.',
    topicsLabel: 'What we practise',
    topics: ['Everyday and current topics', 'Listening and responding', 'Speaking without hesitation', 'Natural phrases'],
    note: 'Shaped by my experience running speaking clubs.',
    icon: MessagesIcon,
  },
  {
    id: 'travel',
    name: 'Travel English',
    kind: 'Short course',
    summary: 'Practical English for travel, designed as a focused short program for people getting ready for a trip.',
    topicsLabel: 'Situations we cover',
    topics: [
      'Airports',
      'Hotels',
      'Restaurants',
      'Shopping',
      'Asking for directions',
      'Transportation',
      'Everyday travel situations',
    ],
    note: 'The phrases and confidence you need before you go.',
    icon: MapPinIcon,
  },
]

/** Options for the enquiry form — labels always match the program names above. */
export const programChoices: { value: Exclude<ProgramChoice, ''>; label: string }[] = [
  ...programs.map((p) => ({ value: p.id, label: p.name })),
  ...specialPrograms.map((p) => ({ value: p.id, label: p.name })),
  { value: 'unsure', label: 'Not sure yet' },
]
