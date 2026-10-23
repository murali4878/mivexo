import { motion, useReducedMotion } from 'framer-motion'
import { Star, Sparkles, Building2, CheckCircle2 } from 'lucide-react'

const mentors = [
  {
    name: 'Arjun Mehta',
    designation: 'Senior Software Engineer',
    company: 'Google',
    logo: '/companies/google.svg',
    expertise: ['React', 'Node.js', 'System Design'],
    rating: 4.9,
    students: 428,
    color: 'from-violet-600 to-indigo-600'
  },
  {
    name: 'Priya Sharma',
    designation: 'Data Scientist',
    company: 'Amazon',
    logo: '/companies/amazon.svg',
    expertise: ['Python', 'ML', 'TensorFlow'],
    rating: 4.8,
    students: 312,
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'Rohit Kumar',
    designation: 'Product Manager',
    company: 'Microsoft',
    logo: '/companies/microsoft.svg',
    expertise: ['Product Strategy', 'Agile', 'Analytics'],
    rating: 4.9,
    students: 267,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Sneha Patel',
    designation: 'Technical Lead',
    company: 'TCS',
    logo: '/companies/tcs.svg',
    expertise: ['Java', 'Cloud Native', 'Microservices'],
    rating: 4.7,
    students: 350,
    color: 'from-emerald-500 to-teal-600'
  }
]

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

        {/* Stacked Mobile Mentor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mentors.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: shouldReduceMotion ? 0.05 : 0.35,
                delay: shouldReduceMotion ? 0 : idx * 0.06
              }}
              className="p-4 rounded-2xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0`}
                  >
                    {m.name[0]}
                  </div>

                  <div className="flex-1 truncate">
                    <h3 className="text-sm font-black text-gray-900 dark:text-white truncate leading-tight">
                      {m.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{m.designation}</p>
                    <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">
                      @ {m.company}
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {m.expertise.map((skill, si) => (
                    <span
                      key={si}
                      className="text-[9.5px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom rating & alumni count */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 font-bold text-amber-500 dark:text-amber-300">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> {m.rating}
                </span>
                <span className="text-[10px] text-gray-400">{m.students}+ alumni</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
