import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function MobileCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#070E1E] via-[#0B1730] to-[#0B1730] text-white overflow-hidden">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: shouldReduceMotion ? 0.05 : 0.4 }}
          className="relative rounded-3xl p-6 bg-gradient-to-br from-[#8B3FF2] via-[#6C25D9] to-[#0B1730] border border-[#8B3FF2]/50 shadow-2xl text-center overflow-hidden"
        >
          {/* Ambient decorative glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-4">
              <Sparkles size={12} className="text-amber-300" />
              Batch 2026 Admissions Open
            </span>

            <h2 className="text-2xl xs:text-3xl font-black text-white leading-tight mb-3">
              Start Your Journey. <br />
              <span className="text-amber-300">Build Your Dream Career.</span>
            </h2>

            <p className="text-xs text-violet-100 leading-relaxed mb-6 max-w-xs mx-auto">
              Get full access to all curriculum modules, live mentor code reviews, real capstone deliverables, and verified certificates.
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-violet-100 font-semibold mb-6 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>20+ Tech Tracks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>QR Verified Cert</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>MNC Mentors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>Placement Support</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link
              to="/pricing"
              className="w-full py-4 px-6 rounded-2xl bg-white text-[#0B1730] font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-3"
            >
              <span>Enroll Now &amp; Start Today</span>
              <ArrowRight size={16} className="text-[#8B3FF2]" />
            </Link>

            {/* Secondary Action Link */}
            <Link
              to="/programs"
              className="text-xs font-bold text-violet-200 hover:text-white underline underline-offset-4 block py-1"
            >
              Or explore all 20 curriculum syllabi →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
