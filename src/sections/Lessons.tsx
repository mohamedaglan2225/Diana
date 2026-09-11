import { ArrowRightIcon } from '@/components/Icons'
import { lessonCards } from '@/data/lessons'
import { useReveal } from '@/hooks/useReveal'

export function Lessons() {
  const ref = useReveal()

  return (
    <section id="lessons" className="bg-[#EFF7FB] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal text-center mb-12 lg:mb-14">
          <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
            What I Teach
          </p>
          <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] text-[#2F3A40] mb-4 text-balance">
            English Lessons Made for You
          </h2>
          <p className="text-[#68767D] max-w-lg mx-auto text-base lg:text-lg leading-relaxed">
            Every learner is different. Lessons are adapted to age, level, goals and learning style.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lessonCards.map((card) => (
            <li key={card.title}>
              <a
                href="#contact"
                className="h-full bg-white rounded-[20px] p-6 flex flex-col gap-4 border border-white hover:border-[#BFD7EA] hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
              >
                <span className="w-12 h-12 rounded-xl bg-[#EFF7FB] flex items-center justify-center text-[#4A7C9B] group-hover:bg-[#BFD7EA]/40 transition-colors">
                  {card.icon}
                </span>
                <h3 className="text-lg text-[#2F3A40]">{card.title}</h3>
                <p className="text-sm text-[#68767D] leading-relaxed flex-1">{card.desc}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {card.tags.map((t) => (
                    <li
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EFF7FB] text-[#3F6C88]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1 text-xs font-medium text-[#4A7C9B] group-hover:gap-2 transition-all">
                  Ask about this lesson
                  <ArrowRightIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
