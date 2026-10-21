import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const faqs = [
  {
    category: 'Internship',
    q: 'Is this a real internship or just an online course?',
    a: 'MIVEXO provides a structured internship experience — not just video lectures. You are assigned real-world projects, reviewed by industry mentors, and evaluated like a working professional. Upon successful completion, you receive a verified internship certificate with a unique ID.'
  },
  {
    category: 'Stipend',
    q: 'Will I receive a stipend during or after the internship?',
    a: 'Yes. Top-performing interns who complete their projects and meet evaluation benchmarks are eligible for performance-based stipends and rewards. Stipend eligibility is assessed during the final project review stage by your assigned mentor.'
  },
  {
    category: 'Certificate',
    q: 'Is the MIVEXO certificate recognised by companies?',
    a: 'Every MIVEXO certificate carries a unique certificate ID and QR code that links to our public verification page. Recruiters and HR teams can scan or enter the certificate ID to instantly verify authenticity. The certificate covers your domain specialisation and internship completion.'
  },
  {
    category: 'Placement',
    q: 'Does MIVEXO guarantee placement after the program?',
    a: 'We provide comprehensive placement support — resume reviews, ATS optimisation, mock interviews, and direct referrals to our hiring partner network across India. While we do not guarantee a job offer (no ethical platform can), our placement preparation and referral network significantly improve your chances.'
  },
  {
    category: 'Training',
    q: 'What does the training include? Is it live or recorded?',
    a: 'Training includes a mix of structured video modules, weekly live mentor sessions, hands-on assignments, quizzes, and a capstone project. You get access to the LMS (Learning Management System) from day one, allowing you to learn at your own pace with live doubt-clearing sessions scheduled weekly.'
  },
  {
    category: 'Internship',
    q: 'What domains are available for the internship?',
    a: 'We offer 20+ trending domains including Full Stack Web Development, Data Science & ML, Artificial Intelligence, Cloud & DevOps, UI/UX Design, Cybersecurity, Digital Marketing, Business Analytics, Product Management, and many more. You select your preferred domain during registration.'
  },
  {
    category: 'General',
    q: 'Who is eligible to join MIVEXO?',
    a: 'Any student currently pursuing or who has completed a graduation degree (B.Tech, BCA, MCA, BSc, BBA, MBA, etc.) from any recognised Indian university is eligible. No prior professional experience is required — only genuine interest in your chosen domain.'
  },
  {
    category: 'General',
    q: 'How long does the program take to complete?',
    a: 'Most programs span 4 to 12 weeks depending on the domain. You can check the exact duration on the Programs page for each specialisation. The timeline covers training, project execution, evaluation, and certificate issuance.'
  },
  {
    category: 'Certificate',
    q: 'Can I verify a MIVEXO certificate issued to someone else?',
    a: 'Yes. Visit mivexo.com/verify and enter the certificate ID or scan the QR code on the physical/digital certificate. The system instantly displays the holder\'s name, program, completion date, and issuance status — fully transparent and tamper-proof.'
  },
  {
    category: 'General',
    q: 'Is there any hidden fee or extra charge after registration?',
    a: 'No hidden charges whatsoever. The registration fee is a single one-time payment that covers your full training access, mentor sessions, project evaluation, and certificate. There are no renewal fees, module unlock charges, or placement service fees.'
  }
]

const categoryColors = {
  Internship: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Stipend: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  Certificate: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  Placement: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  Training: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
  General: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
}

const categories = ['All', 'Internship', 'Stipend', 'Certificate', 'Placement', 'Training', 'General']

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  return (
    <section className="section-padding bg-gray-50 dark:bg-[#0D0D20]">
      <div className="container-max">

        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
            <HelpCircle size={14} /> Frequently Asked Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Got Questions? <span className="gradient-text">We've Got Answers.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Everything you need to know about training, internships, stipends, certificates, and placement at MIVEXO.
          </p>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:text-violet-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <AnimatePresence>
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <ScrollReveal key={`${activeCategory}-${i}`} delay={i * 0.05}>
                  <motion.div
                    layout
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white dark:bg-[#13132B] border-violet-400 dark:border-violet-600 shadow-lg shadow-violet-500/10'
                        : 'bg-white dark:bg-[#13132B] border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700'
                    }`}
                  >
                    {/* Question Row */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className={`shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full mt-0.5 ${categoryColors[faq.category]}`}>
                          {faq.category}
                        </span>
                        <span className={`text-sm md:text-base font-semibold leading-snug transition-colors ${
                          isOpen
                            ? 'text-violet-600 dark:text-violet-400'
                            : 'text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400'
                        }`}>
                          {faq.q}
                        </span>
                      </div>
                      <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
                        isOpen
                          ? 'bg-violet-600 text-white rotate-0'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </button>

                    {/* Answer Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-5 pt-0 ml-[calc(theme(spacing.3)+theme(spacing.16))]">
                            <div className="w-10 h-px bg-violet-300 dark:bg-violet-700 mb-3" />
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Contact Nudge */}
        <ScrollReveal className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <MessageCircle size={20} className="text-violet-500 shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Still have questions?{' '}
              <a
                href="mailto:mivexo.in@gmail.com"
                className="font-bold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Write to us at mivexo.in@gmail.com
              </a>{' '}
              — we reply within 24 hours.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
