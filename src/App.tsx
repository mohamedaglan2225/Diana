import { useHashScroll } from '@/hooks/useHashScroll'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { TrustStrip } from '@/sections/TrustStrip'
import { About } from '@/sections/About'
import { Lessons } from '@/sections/Lessons'
import { Approach } from '@/sections/Approach'
import { Gallery } from '@/sections/Gallery'
import { Experience } from '@/sections/Experience'
import { Certification } from '@/sections/Certification'
import { ClassroomFeature } from '@/sections/ClassroomFeature'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'

export default function App() {
  useHashScroll()

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Lessons />
        <Approach />
        <Gallery />
        <Experience />
        <Certification />
        <ClassroomFeature />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
