import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardList, Laptop2, IndianRupee, Briefcase, CheckCircle2, Sparkles } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Register & Access Training',
    desc: 'Choose your preferred domain from 20+ career tracks. Get instant LMS access to sequential video curriculum and weekly live mentor sessions.',
    gradient: 'from-[#8B3FF2] to-indigo-600',
    highlight: 'Instant LMS Unlock'
  },
  {
    step: '02',
    icon: Laptop2,
    title: 'Build Production Capstone',
    desc: 'Work on realistic industry capstones designed by senior engineers. Push code via GitHub and simulate a real-world enterprise agile workflow.',
    gradient: 'from-indigo-500 to-blue-500',
    highlight: 'Real GitHub Repo'
  },
  {
    step: '03',
    icon: IndianRupee,
    title: 'Mentor Review & Stipend',
    desc: 'Receive line-by-line pull request code feedback. Top-performing interns qualify for performance-based stipends and official merit evaluations.',
    gradient: 'from-blue-500 to-cyan-500',
    highlight: 'Merit Rewards'
  },
  {
    step: '04',
    icon: Briefcase,
    title: 'QR Certificate & Placements',
    desc: 'Receive a tamper-proof QR-verified certificate recognized by college HODs, plus ATS resume reviews, mock interviews, and hiring partner referrals.',
    gradient: 'from-emerald-500 to-teal-500',
    highlight: 'HOD Approved'
  }
]

export default function MobileHowItWorks() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#070E1E] to-[#0B1730] text-white overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B3FF2]/20 border border-[#8B3FF2]/40 text-[#A855F7] text-[11px] font-bold mb-2">
            <Sparkles size={12} className="text-amber-300" />
            4-Step Career Blueprint
          </span>
          <h2 className="text-2xl xs:text-3xl font-black text-white leading-tight mb-2">
            How The Internship <br />
            <span className="bg-gradient-to-r from-[#8B3FF2] to-cyan-400 bg-clip-text text-transparent">
              Process Works
            </span>
          </h2>
          <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
            From first login to verified certificate and campus placement referrals.
          </p>
        </div>

        {/* Vertical Timeline Roadmap */}
        <div className="relative pl-6 space-y-6">
          {/* Vertical Connecting Glowing Line */}
          <div className="absolute top-4 bottom-4 left-[27px] w-0.5 bg-gradient-to-b from-[#8B3FF2] via-cyan-400 to-emerald-400 rounded-full opacity-60" />

          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.4,
                  delay: shouldReduceMotion ? 0 : idx * 0.08
                }}
                className="relative flex items-start gap-3.5 group"
              >
                {/* Numbered Node Icon */}
                <div
                  className={`relative z-10 w-11 h-11 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-black text-xs shadow-lg shadow-[#8B3FF2]/25 shrink-0`}
                >
                  <Icon size={18} />
                </div>

                {/* Step Card */}
                <div className="flex-1 p-4 rounded-2xl bg-[#0F1C3A] border border-white/10 shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-black text-[#A855F7] tracking-wider uppercase">
                      Step {item.step}
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-400 border border-white/10">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
