import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import ProgramsPreview from '../components/home/ProgramsPreview'
import HowItWorks from '../components/home/HowItWorks'
import MentorSection from '../components/home/MentorSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FAQSection from '../components/home/FAQSection'
import CTASection from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProgramsPreview />
      <HowItWorks />
      <MentorSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
