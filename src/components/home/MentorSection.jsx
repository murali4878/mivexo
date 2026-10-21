import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import GlassCard from '../ui/GlassCard'
import { Briefcase, Star, Sparkles } from 'lucide-react'

const mentors = [
  { name: 'Arjun Mehta', designation: 'Senior Software Engineer', company: 'Google', logo: '/companies/google.svg', expertise: ['React', 'Node.js', 'System Design'], rating: 4.9, students: 428 },
  { name: 'Priya Sharma', designation: 'Data Scientist', company: 'Amazon', logo: '/companies/amazon.svg', expertise: ['Python', 'ML', 'TensorFlow'], rating: 4.8, students: 312 },
  { name: 'Rohit Kumar', designation: 'Product Manager', company: 'Microsoft', logo: '/companies/microsoft.svg', expertise: ['Product Strategy', 'Agile', 'Analytics'], rating: 4.9, students: 267 },
  { name: 'Sneha Patel', designation: 'Technical Lead', company: 'TCS', logo: '/companies/tcs.svg', expertise: ['Java', 'Cloud Native', 'Microservices'], rating: 4.7, students: 350 }
]

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

        {/* Mentor profile cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, i) => (
            <GlassCard key={i} delay={i * 0.1} className="p-6 text-center flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
                  {mentor.name[0]}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{mentor.designation}</p>

                {/* Company logo pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-[#1A1A36] border border-gray-200 dark:border-gray-800 mb-4">
                  <img src={mentor.logo} alt={mentor.company} className="h-4 max-w-[70px] object-contain" />
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {mentor.expertise.map((skill, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                <span className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> {mentor.rating}
                </span>
                <span>{mentor.students}+ alumni mentored</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
