import { Photo } from '@/components/Photo'
import { QuoteIcon } from '@/components/Icons'
import { useReveal } from '@/hooks/useReveal'
import { activeLearningPhoto } from '@/lib/images'

export function ClassroomFeature() {
  const ref = useReveal()

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative sm:pb-8 lg:pb-0">
            <Photo
              photo={activeLearningPhoto}
              className="w-full aspect-4/3 rounded-[24px] shadow-xl"
            />
            <figure className="mt-4 sm:mt-0 sm:absolute sm:-bottom-1 lg:-bottom-5 sm:right-3 lg:right-4 bg-[#4A7C9B] text-white rounded-2xl px-5 py-4 sm:max-w-[280px] shadow-lg sm:animate-float">
              <QuoteIcon className="mb-2 opacity-70" />
              <blockquote className="text-sm leading-relaxed font-medium">
                Practice builds confidence. Confidence builds communication.
              </blockquote>
            </figure>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
              How I Teach
            </p>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] leading-tight text-[#2F3A40] mb-6 text-balance">
              Learning Should Feel Active
            </h2>
            <p className="text-[#68767D] text-base lg:text-lg leading-relaxed mb-5">
              My classes are designed around participation — not passive memorization.
            </p>
            <p className="text-[#68767D] text-base lg:text-lg leading-relaxed">
              Students speak, match, move, solve, create and communicate so that English becomes
              something they <em>use</em>, not simply something they study.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
