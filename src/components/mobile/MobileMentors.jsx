import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'


const companyLogos = [
  { name: 'Google', logo: '/companies/google.svg', h: 'h-5' },
  { name: 'Microsoft', logo: '/companies/microsoft.svg', h: 'h-5' },
  { name: 'TCS', logo: '/companies/tcs.svg', h: 'h-6' },
  { name: 'Amazon', logo: '/companies/amazon.svg', h: 'h-5' },
  { name: 'Wipro', logo: '/companies/wipro.svg', h: 'h-5' },
  { name: 'Accenture', logo: '/companies/accenture.svg', h: 'h-4' }
]

export default function MobileMentors() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-[#0D0D20] text-gray-900 dark:text-white overflow-hidden transition-colors">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[11px] font-bold mb-2">
            <Sparkles size={12} className="text-amber-400" />
            Direct Industry Mentorship
          </span>
          <h2 className="text-2xl xs:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-2">
            Learn From Engineers at <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Top Global Tech Giants
            </span>
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
            Get personalized code reviews on your capstone projects from practitioners at leading companies.
          </p>
        </div>

        {/* Company Logos Horizontal Infinite Ticker */}
        <div className="relative overflow-hidden mb-8 py-2">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 dark:from-[#0D0D20] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-[#0D0D20] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee gap-3 items-center w-max">
            {[...companyLogos, ...companyLogos, ...companyLogos].map((co, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-4 py-2 bg-white dark:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 shrink-0 h-11 shadow-sm"
              >
                <img
                  src={co.logo}
                  alt={co.name}
                  className={`${co.h} max-w-[80px] object-contain`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mentor cards removed */}
      </div>
    </section>
  )
}
