export type FaqItem = { question: string; answer: string }

/*
 * Only questions the site can answer truthfully today, answered briefly.
 * Where the page already explains something in full (the placement test,
 * formats in How It Works, audiences in Programs) the answer stays short
 * rather than repeating it. Prices are intentionally not published, and lesson
 * length, schedule and group size are not stated until the owner confirms
 * them. Visible copy avoids em / en dashes.
 */
export const faq: FaqItem[] = [
  {
    question: 'Are the lessons online?',
    answer: 'Yes. All lessons take place online, so you can learn from home or wherever you are.',
  },
  {
    question: 'Do I need to know my level before I start?',
    answer:
      'No. Every new student starts with the placement test, so lessons match your real level rather than a guess.',
  },
  {
    question: 'What levels do you teach?',
    answer: 'All levels, from complete beginner to advanced.',
  },
  {
    question: 'How do I choose the right program or format?',
    answer:
      "Choose “Not sure yet” in the enquiry form and tell me a little about the learner and their goals. I'll recommend a program and a lesson format that fits.",
  },
]
