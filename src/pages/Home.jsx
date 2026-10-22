import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import ProgramsPreview from '../components/home/ProgramsPreview'
import HowItWorks from '../components/home/HowItWorks'
import MentorSection from '../components/home/MentorSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FAQSection from '../components/home/FAQSection'
import CTASection from '../components/home/CTASection'
import MobileHome from '../components/mobile/MobileHome'

export default function Home() {
  return (
    <>
      {/* Desktop Homepage: Completely separate and 100% unchanged */}
      <div className="hidden lg:block w-full">
        <HeroSection />
        <StatsSection />
        <ProgramsPreview />
        <HowItWorks />
        <MentorSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </div>

      {/* Mobile Homepage: Completely redesigned mobile-first layout with smooth animations */}
      <div className="block lg:hidden w-full">
        <MobileHome />
      </div>
    </>
  )
}
