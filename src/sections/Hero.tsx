import { Photo } from '@/components/Photo'
import { ChatIcon } from '@/components/Icons'
import { heroPortrait } from '@/lib/images'

const trustIndicators = [
  { value: '7+', label: 'Years Experience' },
  { value: 'Kids,', label: 'Teens & Adults' },
  { value: 'TESOL', label: '/ TEFL Certified' },
]

export function Hero() {
  return (
    <section id="top" className="bg-[#FAF9F6] pt-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Left — copy */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF7FB] border border-[#BFD7EA] text-[#3F6C88] text-xs font-medium tracking-wide mb-7 lg:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6F9FBD]" aria-hidden="true" />
            TESOL / TEFL Certified English Teacher
          </p>

          <h1 className="text-[36px] sm:text-[46px] lg:text-[44px] xl:text-[56px] leading-[1.08] text-[#2F3A40] mb-6">
            Speak <span className="text-[#5d8fad]">naturally.</span>
            <br />
            Learn practically.
            <br />
            Feel confident.
          </h1>

          <p className="text-[#68767D] text-base lg:text-lg leading-relaxed max-w-md mb-3">
            Hi, I&rsquo;m Diana &mdash; an English teacher with 7+ years of experience helping
            children, teenagers and adults communicate in English with confidence.
          </p>
          <p className="text-[#68767D] text-base lg:text-lg leading-relaxed max-w-md mb-9 lg:mb-10">
            My lessons combine real conversation, creativity and practical learning in a relaxed and
            supportive environment.
          </p>

          <div className="flex flex-wrap gap-3 mb-9 lg:mb-10">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[#4A7C9B] text-white font-medium hover:bg-[#3F6C88] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Book a Lesson
            </a>
            <a
              href="#lessons"
              className="px-6 py-3 rounded-full border border-[#BFD7EA] text-[#2F3A40] font-medium hover:bg-[#EFF7FB] transition-all duration-200"
            >
              Explore Lessons
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
            {trustIndicators.map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                <span className="text-[#3F6C88] font-semibold text-sm">{t.value}</span>
                <span className="text-[#68767D] text-sm">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — portrait */}
        <div
          className="relative flex items-center justify-center animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 w-72 h-72 rounded-full bg-[#BFD7EA]/30 blur-3xl animate-float"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-6 bottom-0 w-40 h-40 rounded-full bg-[#D7CBE8]/25 blur-2xl animate-float"
            style={{ animationDelay: '2s' }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
            <Photo
              photo={heroPortrait}
              priority
              className="w-full aspect-4/5 rounded-[28px] shadow-2xl"
            />

            <div className="animate-float absolute -bottom-5 left-3 sm:-left-6 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#EFF7FB] flex items-center gap-2.5 max-w-[220px]">
              <span
                className="w-8 h-8 rounded-full bg-[#EFF7FB] text-[#4A7C9B] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <ChatIcon size={16} />
              </span>
              <span className="text-xs text-[#2F3A40] font-medium leading-tight">
                Learning through real communication
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
