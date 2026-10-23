import MobileNavbar from './MobileNavbar'
import MobileHero from './MobileHero'
import MobileStats from './MobileStats'
import MobileCourseCards from './MobileCourseCards'
import MobileHowItWorks from './MobileHowItWorks'
import MobileMentors from './MobileMentors'
import MobileTestimonials from './MobileTestimonials'
import CertificateQuickVerifier from '../home/CertificateQuickVerifier'
import MobileFAQ from './MobileFAQ'
import MobileCTA from './MobileCTA'
import MobileFooter from './MobileFooter'
import MobileStickyBottomBar from './MobileStickyBottomBar'

export default function MobileHome() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white dark:bg-[#070E1E] text-gray-900 dark:text-white flex flex-col font-sans">
      {/* Compact Animated Mobile Navbar */}
      <MobileNavbar />

      {/* Main Content Stream */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Mobile Hero with 3D Tech Showcase & 3 Metric Badges */}
        <MobileHero />

        {/* Your Learning Journey 4-Step Vertical Roadmap */}
        <MobileHowItWorks />

        {/* Explore Programs 6-Card Grid, Live Projects Banner & Why Choose MIVEXO */}
        <MobileCourseCards />

        {/* Industry Mentors from Google, Microsoft, Amazon, TCS */}
        <MobileMentors />

        {/* Real Student Reviews: What Our Students Say */}
        <MobileTestimonials />

        {/* Live Interactive Certificate Verifier */}
        <CertificateQuickVerifier />

        {/* Ready to Start? Cosmic Rocket CTA Banner */}
        <MobileCTA />

        {/* Smooth Accordion FAQs */}
        <MobileFAQ />
      </main>

      {/* Mobile-Optimized Footer */}
      <MobileFooter />

      {/* Sticky Bottom Floating Quick Action Bar */}
      <MobileStickyBottomBar />
    </div>
  )
}
