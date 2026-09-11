import { Photo } from '@/components/Photo'
import { useReveal } from '@/hooks/useReveal'
import { aboutPhoto } from '@/lib/images'

const stats = [
  { value: '7+', label: 'Years Teaching Experience' },
  { value: '120h', label: 'TESOL / TEFL Training' },
  { value: 'All', label: 'Levels Beginner–Advanced' },
]

export function About() {
  const ref = useReveal()

  return (
    <section id="about" className="bg-[#FAF9F6] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="lg:max-w-[480px]">
            <Photo
              photo={aboutPhoto}
              className="w-full aspect-4/5 rounded-[22px] shadow-xl"
            />

            <dl className="grid grid-cols-3 gap-3 mt-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-4 text-center border border-[#EFF7FB] shadow-sm"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-serif text-2xl text-[#4A7C9B] mb-1">{s.value}</span>
                    <span className="block text-xs text-[#68767D] leading-tight">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
              About Diana
            </p>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] leading-tight text-[#2F3A40] mb-6">
              Meet Diana
            </h2>
            <blockquote className="text-[#2F3A40] text-lg lg:text-xl leading-relaxed italic mb-8 border-l-4 border-[#BFD7EA] pl-5">
              &ldquo;I believe students learn best when they feel comfortable enough to speak, make
              mistakes, laugh and try again.&rdquo;
            </blockquote>
            <div className="space-y-4 text-[#68767D] text-base leading-relaxed">
              <p>
                Hi, I&rsquo;m Diana Rasok. I&rsquo;m an English teacher and ESL educator passionate
                about making English practical, engaging and enjoyable.
              </p>
              <p>
                Over the years, I have worked with learners of different ages and levels, from young
                children discovering their first English words to adults developing stronger
                communication skills.
              </p>
              <p>
                My lessons focus on speaking, confidence, interaction and creating a positive
                environment where every student feels involved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
