import type { ReactNode } from 'react'
import { BriefcaseIcon, ChatIcon, ScreenIcon, SparklesIcon } from '@/components/Icons'

export type LessonCard = {
  icon: ReactNode
  title: string
  desc: string
  tags: string[]
}

export const lessonCards: LessonCard[] = [
  {
    icon: <SparklesIcon />,
    title: 'Kids English',
    desc: 'Fun, interactive English lessons using games, pictures, movement and creative activities.',
    tags: ['Vocabulary', 'Speaking', 'Games', 'Confidence'],
  },
  {
    icon: <ScreenIcon />,
    title: 'English for Teens',
    desc: 'Support for school English, grammar, speaking, vocabulary and real communication.',
    tags: ['Grammar', 'School Support', 'Speaking', 'Vocabulary'],
  },
  {
    icon: <ChatIcon />,
    title: 'Adult English',
    desc: 'Practical English for everyday conversations, travel, confidence and personal development.',
    tags: ['Conversation', 'Everyday English', 'Pronunciation'],
  },
  {
    icon: <BriefcaseIcon />,
    title: 'Business English',
    desc: 'Professional English for adults who want to communicate more confidently at work.',
    tags: ['Workplace English', 'Communication', 'Speaking'],
  },
]
