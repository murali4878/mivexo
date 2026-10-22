import { motion, useReducedMotion } from 'framer-motion'
import { Users, BookOpen, Award, Building2, TrendingUp } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'

const mobileStats = [
  {
    icon: Users,
    label: 'Students Enrolled',
    value: 5000,
    suffix: '+',
    color: 'from-violet-500 to-[#8B3FF2]',
    borderColor: 'border-violet-500/30'
  },
  {
    icon: BookOpen,
    label: 'Industry Tracks',
    value: 20,
    suffix: '+',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30'
  },
  {
    icon: TrendingUp,
    label: 'Satisfaction Rate',
    value: 95,
    suffix: '%',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30'
  },
  {
    icon: Building2,
    label: 'Hiring Partners',
    value: 50,
    suffix: '+',
    color: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30'
  }
]

export default function MobileStats() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-6 px-4 bg-gradient-to-r from-[#0B1730] to-[#070E1E] border-y border-[#8B3FF2]/20">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {mobileStats.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.4,
                  delay: shouldReduceMotion ? 0 : idx * 0.08
                }}
                className={`p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border ${item.borderColor} shadow-md flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                    MIVEXO
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    <AnimatedCounter end={item.value} suffix={item.suffix} />
                  </div>
                  <p className="text-[11px] font-semibold text-gray-300 mt-0.5 leading-tight">
                    {item.label}
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
