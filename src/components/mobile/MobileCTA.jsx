import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Rocket } from 'lucide-react'

export default function MobileCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-10 px-4 bg-white dark:bg-[#070E1E] text-white overflow-hidden transition-colors">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: shouldReduceMotion ? 0.05 : 0.4 }}
          className="relative rounded-3xl p-6 bg-gradient-to-br from-[#1e144f] via-[#2d1b69] to-[#4c1d95] border border-violet-500/30 shadow-2xl overflow-hidden"
        >
          {/* Ambient Cosmic Orbs */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-indigo-500/25 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-fuchsia-500/20 blur-2xl pointer-events-none" />

          {/* Sparkle stars */}
          <div className="absolute top-4 left-6 text-violet-300/40 text-xs pointer-events-none">✦</div>
          <div className="absolute top-12 right-20 text-indigo-200/50 text-sm pointer-events-none">✦</div>
          <div className="absolute bottom-6 left-1/3 text-violet-300/30 text-xs pointer-events-none">✦</div>

          <div className="relative z-10 flex flex-col items-start text-left">
            {/* Tag */}
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-300 block mb-2">
              READY TO START?
            </span>

            {/* Title */}
            <h2 className="text-2xl font-black text-white leading-tight mb-2.5 max-w-xs">
              Take the First Step Towards Your Future
            </h2>

            {/* Subtitle */}
            <p className="text-xs text-violet-200/90 leading-relaxed mb-6 max-w-xs">
              Join thousands of students who are building their careers with MIVEXO.
            </p>

            {/* Action Row */}
            <div className="flex items-center gap-3 w-full">
              <Link
                to="/pricing"
                className="py-2.5 px-5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Enroll Now</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* 3D Rocket Illustration on the Right */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -8, 0], x: [0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -right-2 pointer-events-none"
          >
            {/* Smoke cloud base */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Rocket Body */}
              <div className="relative -rotate-45 flex flex-col items-center">
                {/* Flame */}
                <div className="w-4 h-6 rounded-b-full bg-gradient-to-b from-amber-400 via-orange-500 to-transparent animate-pulse" />
                {/* Rocket Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xl border border-white/20">
                  <Rocket size={26} className="text-white drop-shadow-md" />
                </div>
              </div>

              {/* Puffy Clouds around base */}
              <div className="absolute bottom-0 right-2 w-12 h-8 rounded-full bg-white/20 blur-sm" />
              <div className="absolute bottom-2 right-10 w-10 h-7 rounded-full bg-white/25 blur-xs" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
