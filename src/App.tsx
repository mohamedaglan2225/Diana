import { useState } from 'react'
import type { ProgramChoice } from '@/data/programs'
import { useHashScroll } from '@/hooks/useHashScroll'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Experience } from '@/sections/Experience'
import { FAQ } from '@/sections/FAQ'
import { Footer } from '@/sections/Footer'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { HowItWorks } from '@/sections/HowItWorks'
import { Nav } from '@/sections/Nav'
import { PlacementTest } from '@/sections/PlacementTest'
import { Programs } from '@/sections/Programs'
import { StudentStories } from '@/sections/StudentStories'
import { TrustStrip } from '@/sections/TrustStrip'

export default function App() {
  useHashScroll()

  // The program a visitor asked about — shared by the program cards, the
  // placement-test fallback and the enquiry form's "Program" field.
  const [program, setProgram] = useState<ProgramChoice>('')

  return (
    <>
      <Nav />
      <main id="main">
        {/* What Diana offers, and why to trust her */}
        <Hero />
        <TrustStrip />
        <Programs onSelect={setProgram} />

        {/* How learning starts and grows */}
        <HowItWorks />
        <PlacementTest onEnquire={() => setProgram('unsure')} />

        {/* Who Diana is */}
        <About />
        <Experience />
        <Gallery />
        <StudentStories />

        {/* Questions, action */}
        <FAQ />
        <Contact program={program} onProgramChange={setProgram} />
      </main>
      <Footer />
    </>
  )
}
