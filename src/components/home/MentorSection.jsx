import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { Sparkles } from 'lucide-react'


const companyLogos = [
  { name: 'Google', logo: '/companies/google.svg', h: 'h-6' },
  { name: 'Microsoft', logo: '/companies/microsoft.svg', h: 'h-6' },
  { name: 'Tata Consultancy Services', logo: '/companies/tcs.svg', h: 'h-8' },
  { name: 'Amazon', logo: '/companies/amazon.svg', h: 'h-6' },
  { name: 'Wipro', logo: '/companies/wipro.svg', h: 'h-6' },
  { name: 'Accenture', logo: '/companies/accenture.svg', h: 'h-5' }
]

export default function MentorSection() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-[#0D0D20] border-t border-gray-100 dark:border-gray-800">
      <div className="container-max">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-amber-400" /> Industry Practitioner Network
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Learn from Professionals at
            <br /><span className="gradient-text">World-Class Tech Leaders</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Our mentors are active engineers, architects, and managers from leading MNCs like Google, Microsoft, and TCS — giving you direct feedback on your real-world code.
          </p>
        </ScrollReveal>

        {/* ORIGINAL MNC LOGOS MARQUEE */}
        <div className="relative overflow-hidden mb-16 py-4">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-50 dark:from-[#0D0D20] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 dark:from-[#0D0D20] to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee gap-8 items-center w-max">
            {[...companyLogos, ...companyLogos, ...companyLogos].map((co, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-8 py-4 bg-white dark:bg-[#13132B] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs shrink-0 hover:shadow-md transition-shadow min-w-[160px] h-16"
              >
                <img
                  src={co.logo}
                  alt={co.name}
                  className={`${co.h} max-w-[120px] object-contain dark:brightness-110 dark:contrast-125 filter`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mentor profile cards removed */}
      </div>
    </section>
  )
}
