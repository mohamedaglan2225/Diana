import { Photo } from '@/components/Photo'
import { useReveal } from '@/hooks/useReveal'
import { approachPhoto } from '@/lib/images'

const features = [
  { num: '01', title: 'Speak From Day One', desc: 'Real communication is part of every lesson.' },
  {
    num: '02',
    title: 'Learn by Doing',
    desc: 'Games, challenges, activities and practical exercises keep students engaged.',
  },
  {
    num: '03',
    title: 'Personalized Learning',
    desc: 'Activities and lesson difficulty are adapted to each learner.',
  },
  {
    num: '04',
    title: 'Confidence First',
    desc: 'A supportive environment helps students speak without fear of mistakes.',
  },
]

export function Approach() {
  const ref = useReveal()

  return (
    <section id="my-approach" className="bg-[#FAF9F6] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
              My Approach
            </p>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] leading-tight text-[#2F3A40] mb-3 text-balance">
              More Than Just English Lessons
            </h2>
            <p className="text-[#68767D] text-base lg:text-lg mb-9 lg:mb-10 leading-relaxed">
              Learning works best when students actively use the language.
            </p>

            <ol className="space-y-7">
              {features.map((f) => (
                <li key={f.num} className="flex gap-5">
                  <span className="font-serif text-[#5d8fad] text-2xl w-8 shrink-0 leading-none mt-0.5">
                    {f.num}
                  </span>
                  <div>
                    <h3 className="text-[#2F3A40] font-semibold mb-1 text-base">{f.title}</h3>
                    <p className="text-[#68767D] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -right-12 top-0 w-56 h-56 rounded-full bg-[#BFD7EA]/20 blur-3xl"
              aria-hidden="true"
            />
            <Photo
              photo={approachPhoto}
              className="relative z-10 w-full aspect-4/3 rounded-[22px] shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
