import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus, Minus, HelpCircle, Mail } from 'lucide-react'

const mobileFaqs = [
  {
    category: 'Internship',
    q: 'Is this a real internship or just video tutorials?',
    a: 'MIVEXO provides a structured industry internship — not just recorded videos. You build real-world capstone projects, undergo mentor code evaluations, and receive a verified internship certificate with a cryptographic QR verification link.'
  },
  {
    category: 'Stipend',
    q: 'How does performance stipend eligibility work?',
    a: 'Top-performing interns who complete their milestones on schedule and receive high review ratings from their mentor qualify for performance-based stipends and rewards upon capstone evaluation.'
  },
  {
    category: 'Certificate',
    q: 'Is the MIVEXO certificate approved by college HODs?',
    a: 'Yes. Every certificate features a unique cryptographic verification ID and QR code linking directly to mivexo.com/verify. College HODs, universities, and corporate HR recruiters verify completion in real time.'
  },
  {
    category: 'Placement',
    q: 'What placement prep and job support is provided?',
    a: 'You get comprehensive placement prep — resume reviews, ATS optimization, technical mock interviews, access to the 10,000+ question prep portal, and direct referrals to hiring partners.'
  },
  {
    category: 'Training',
    q: 'How long does each domain track take?',
    a: 'Most tracks span 4 to 12 weeks with self-paced LMS video access plus weekly live mentor sessions for code feedback and doubt solving.'
  }
]

export default function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-12 px-4 bg-[#070E1E] text-white overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B3FF2]/20 border border-[#8B3FF2]/40 text-[#A855F7] text-[11px] font-bold mb-2">
            <HelpCircle size={12} className="text-amber-300" />
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl xs:text-3xl font-black text-white leading-tight mb-2">
            Got Questions? <br />
            <span className="bg-gradient-to-r from-[#8B3FF2] to-cyan-400 bg-clip-text text-transparent">
              We've Got Answers.
            </span>
          </h2>
          <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
            Everything you need to know about MIVEXO training, credentials, and mentorship.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {mobileFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0F1C3A] border-[#8B3FF2]/60 shadow-lg shadow-[#8B3FF2]/10'
                    : 'bg-[#0F1C3A]/60 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left cursor-pointer"
                >
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase tracking-wider text-violet-400 block mb-0.5">
                      {faq.category}
                    </span>
                    <h3 className="text-xs font-bold text-white leading-snug">
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#8B3FF2] text-white' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.05 : 0.25 }}
                    >
                      <div className="px-4 pb-4 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-8 text-center p-3 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-300 flex items-center justify-center gap-1.5">
            <Mail size={13} className="text-[#8B3FF2]" />
            <span>Have a specific query?</span>
            <a
              href="mailto:mivexo.in@gmail.com"
              className="text-violet-300 font-bold hover:underline"
            >
              mivexo.in@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
