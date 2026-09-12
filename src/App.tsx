import { useState } from 'react'
import type { ProgramChoice } from '@/data/programs'
import { useHashScroll } from '@/hooks/useHashScroll'
import { About } from '@/sections/About'
import { Approach } from '@/sections/Approach'
import { Contact } from '@/sections/Contact'
import { Experience } from '@/sections/Experience'
import { FAQ } from '@/sections/FAQ'
import { Footer } from '@/sections/Footer'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { HowLessonsWork } from '@/sections/HowLessonsWork'
import { InternationalExperience } from '@/sections/InternationalExperience'
import { LearningJourney } from '@/sections/LearningJourney'
import { Nav } from '@/sections/Nav'
import { Programs } from '@/sections/Programs'
import { StudentStories } from '@/sections/StudentStories'
import { TrustStrip } from '@/sections/TrustStrip'

export default function App() {
  useHashScroll()

  // The program a visitor asked about — shared by the program cards and the
  // enquiry form's "Program" field.
  const [program, setProgram] = useState<ProgramChoice>('')

  return (
    <>
      <Nav />
      <main id="main">
        {/* Who Diana is and who she helps */}
        <Hero />
        <TrustStrip />
        <Programs onSelect={setProgram} />

        {/* How learning works */}
        <LearningJourney />
        <HowLessonsWork />

        {/* Who Diana is */}
        <About />
        <InternationalExperience />
        <Approach />
        <Gallery />
        <StudentStories />

        {/* Proof, questions, action */}
        <Experience />
        <FAQ />
        <Contact program={program} onProgramChange={setProgram} />
      </main>
      <Footer />
    </>
  )
}
