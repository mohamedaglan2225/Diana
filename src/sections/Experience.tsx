import { useReveal } from '@/hooks/useReveal'

const timelineItems = [
  {
    period: '2017 — Present',
    role: 'Private English Teacher',
    org: null,
    desc: 'Personalized English lessons focused on communication, speaking and individual learning goals.',
  },
  {
    period: '2019 — 2023',
    role: 'ESL Teacher & Methodologist',
    org: 'Green Card Language Institute',
    desc: 'Teaching, lesson planning, student assessment and support for teaching programs.',
  },
  {
    period: '2023 — 2024',
    role: 'English Teacher',
    org: 'Polyglot Language School',
    desc: 'English lessons for young and adult learners, speaking clubs and school activities.',
  },
  {
    period: '2024',
    role: 'English Teacher',
    org: 'International House Voronezh — Linguist School',
    desc: 'English-language activities and immersive summer learning experiences.',
  },
  {
    period: '2025 — 2026',
    role: 'English Teaching Experience in Vietnam',
    org: null,
    desc: 'ESL classes for different age groups, school programs and Business English for adults.',
  },
]

export function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" className="bg-[#EFF7FB] py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal text-center mb-12 lg:mb-14">
          <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
            My Journey
          </p>
          <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] text-[#2F3A40] mb-4">
            Teaching Experience
          </h2>
          <p className="text-[#68767D] max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
            Years of teaching in different classrooms have helped me understand that every learner
            needs a different path to confidence.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden sm:block absolute left-5 top-8 bottom-0 w-0.5 bg-linear-to-b from-[#BFD7EA] to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {timelineItems.map((item) => (
              <li key={item.period + item.role} className="relative sm:pl-16">
                <span
                  className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-[#BFD7EA] items-center justify-center shadow-sm"
                  aria-hidden="true"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6F9FBD]" />
                </span>

                <div className="bg-white rounded-2xl p-6 border border-[#EFF7FB] shadow-sm hover:shadow-md transition-shadow">
                  <p className="inline-block text-xs font-medium text-[#3F6C88] bg-[#EFF7FB] px-3 py-1 rounded-full mb-3">
                    {item.period}
                  </p>
                  <h3 className="text-lg text-[#2F3A40] mb-0.5">{item.role}</h3>
                  {item.org && <p className="text-sm font-medium text-[#3F6C88] mb-2">{item.org}</p>}
                  <p className="text-sm text-[#68767D] leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
