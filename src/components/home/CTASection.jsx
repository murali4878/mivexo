import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

export default function CTASection() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-[#0D0D20]">
      <div className="container-max">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 p-12 md:p-16 text-center shadow-2xl">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                <Sparkles size={14} className="text-amber-300" />
                20+ Trending Industry Specializations · All Career Tracks Included
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Start Your Learning Journey
                <br /><span className="text-amber-300">Launch Your Dream Career</span>
              </h2>
              <p className="text-violet-200 text-lg mb-10 max-w-xl mx-auto">
                Access all curriculum modules, live mentor sessions, real-world industry projects, and verified certificates to accelerate your career.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold rounded-xl text-base shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Enroll Now <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  View Curriculum & Modules
                </Link>
              </div>
              <p className="mt-6 text-violet-300 text-sm flex flex-wrap justify-center gap-4">
                <span>✓ All 10 Domains</span>
                <span>✓ Verified Certificate</span>
                <span>✓ Internship Track</span>
                <span>✓ Zero Extra Charges</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
