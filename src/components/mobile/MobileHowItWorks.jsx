import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Code2, Award, Briefcase, CheckCircle } from 'lucide-react'

const journeySteps = [
  {
    step: '01',
    title: 'Learn Skills',
    desc: 'Choose a program and learn from industry experts.',
    icon: BookOpen,
    circleColor: 'bg-violet-600 text-white',
    iconBg: 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800'
  },
  {
    step: '02',
    title: 'Build Projects',
    desc: 'Work on real-world projects and build your portfolio.',
    icon: Code2,
    circleColor: 'bg-emerald-500 text-white',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
  },
  {
    step: '03',
    title: 'Earn Certificate',
    desc: 'Get verified certification after course completion.',
    icon: Award,
    circleColor: 'bg-amber-500 text-white',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
  },
  {
    step: '04',
    title: 'Career Preparation',
    desc: 'Get interview guidance and job readiness support.',
    icon: Briefcase,
    circleColor: 'bg-teal-500 text-white',
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800'
  }
]

export default function MobileHowItWorks() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-10 px-4 bg-white dark:bg-[#070E1E] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-md mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-violet-600 dark:text-violet-400 uppercase block mb-1.5">
            YOUR LEARNING JOURNEY
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            From Learning to Career Success
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            A simple path to build the skills, experience and confidence you need.
          </p>
        </div>

        {/* Connected Step Cards with Dotted Path */}
        <div className="relative pl-3 space-y-4">
          {/* Vertical Dotted Connecting Line */}
          <div className="absolute top-4 bottom-6 left-[22px] w-0.5 border-l-2 border-dashed border-violet-300 dark:border-violet-800 pointer-events-none" />

          {journeySteps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.4,
                  delay: shouldReduceMotion ? 0 : idx * 0.07
                }}
                className="relative flex items-center gap-3.5 z-10"
              >
                {/* Step Number Circle */}
                <div
                  className={`w-7 h-7 rounded-full ${step.circleColor} flex items-center justify-center text-[10.5px] font-black shrink-0 shadow-sm`}
                >
                  {step.step}
                </div>

                {/* Step Card with Icon & Text */}
                <div className="flex-1 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${step.iconBg} border flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    <Icon size={19} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-snug mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
