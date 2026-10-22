import MobileNavbar from './MobileNavbar'
import MobileHero from './MobileHero'
import MobileStats from './MobileStats'
import MobileCourseCards from './MobileCourseCards'
import MobileHowItWorks from './MobileHowItWorks'
import MobileMentors from './MobileMentors'
import MobileTestimonials from './MobileTestimonials'
import MobileFAQ from './MobileFAQ'
import MobileCTA from './MobileCTA'
import MobileFooter from './MobileFooter'
import MobileStickyBottomBar from './MobileStickyBottomBar'

export default function MobileHome() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#070E1E] text-white flex flex-col font-sans">
      {/* Compact Animated Mobile Navbar */}
      <MobileNavbar />

      {/* Main Content Stream */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Bold Mobile Hero with Floating Elements & Tech Switcher */}
        <MobileHero />

        {/* Live Metrics / 2x2 Stats Grid */}
        <MobileStats />

        {/* Stacked Course Cards with Interactive Previews */}
        <MobileCourseCards />

        {/* Step-by-Step Vertical Roadmap */}
        <MobileHowItWorks />

        {/* Industry Mentors from Google, Microsoft, Amazon, TCS */}
        <MobileMentors />

        {/* Real Student Capstone Testimonials with QR Verification */}
        <MobileTestimonials />

        {/* Smooth Accordion FAQs */}
        <MobileFAQ />

        {/* High-Converting Final Enrollment CTA Banner */}
        <MobileCTA />
      </main>

      {/* Mobile-Optimized Footer */}
      <MobileFooter />

      {/* Sticky Bottom Floating Quick Action Bar */}
      <MobileStickyBottomBar />
    </div>
  )
}
