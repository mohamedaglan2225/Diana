export type FaqItem = { question: string; answer: string }

/*
 * Only questions the site can answer truthfully today. Prices are
 * intentionally not published, and lesson length, schedule and group size
 * are not stated until the owner confirms them. Visible copy avoids em / en
 * dashes.
 */
export const faq: FaqItem[] = [
  {
    question: 'Are the lessons online?',
    answer: 'Yes. All lessons take place online, so you can learn from home or wherever you are.',
  },
  {
    question: 'Do you offer private lessons or group lessons?',
    answer:
      'Both. Private 1-to-1 lessons are built entirely around one learner. Group lessons give students more chances to communicate and practise with others. The right option depends on your goals and current availability.',
  },
  {
    question: 'Who are the lessons for?',
    answer:
      'Children, teenagers, adults and professionals. There are four programs: Kids English, English for Teens, Adult English and Business English.',
  },
  {
    question: 'What levels do you teach?',
    answer:
      "All levels, from beginner to advanced. If you're not sure what your level is, that's completely fine. We'll work it out together at the start.",
  },
  {
    question: 'How do I choose the right program or format?',
    answer:
      "Pick the options that sound closest, or choose “Not sure yet” in the enquiry form. Tell me a little about the learner and their goals, and I'll suggest where to start.",
  },
  {
    question: 'What happens before we start?',
    answer:
      'You send a short enquiry about who the lessons are for and what you’d like to improve. From there, we look at the current level and goals together, so the first lessons start in the right place.',
  },
]
