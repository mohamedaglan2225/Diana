export type FaqItem = { question: string; answer: string }

/*
 * Only questions the site can answer truthfully today, and only where the
 * page doesn't already answer them in place (formats live in How It Works,
 * audiences in Programs). Prices are intentionally not published, and lesson
 * length, schedule and group size are not stated until the owner confirms
 * them. Visible copy avoids em / en dashes.
 */
export const faq: FaqItem[] = [
  {
    question: 'Are the lessons online?',
    answer: 'Yes. All lessons take place online, so you can learn from home or wherever you are.',
  },
  {
    question: 'Do I need to take a placement test?',
    answer:
      'Yes. Every new student starts with one, so lessons match your real level rather than a guess. The result is an estimated English level, which I review with you before recommending a program, because speaking is best judged in conversation.',
  },
  {
    question: 'What levels do you teach?',
    answer:
      "All levels, from beginner to advanced. You don't need to know your level in advance. That's exactly what the placement test and a short review with me are for.",
  },
  {
    question: 'How do I choose the right program or format?',
    answer:
      "Start with the placement test, or choose “Not sure yet” in the enquiry form and tell me a little about the learner and their goals. I'll recommend a program and a lesson format that fits.",
  },
]
