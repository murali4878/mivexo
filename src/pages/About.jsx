import { motion } from 'framer-motion'
import { Target, Compass, Award, Users, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'
import AnimatedCounter from '../components/ui/AnimatedCounter'

const coreValues = [
  { icon: Target, title: 'Learn by Doing', desc: 'Theory without practical execution is fleeting. Every concept at MIVEXO is anchored by production-grade projects.' },
  { icon: ShieldCheck, title: 'Authenticity First', desc: 'No fabricated placements, no inflated statistics. We stand for genuine student transformation and verifiable proof.' },
  { icon: Compass, title: 'Industry-Relevant Mentorship', desc: 'Learn directly from engineers and product specialists actively building world-class platforms.' },
  { icon: HeartHandshake, title: 'Lifelong Community', desc: 'Education does not end with certification. Our alumni network supports your entire professional trajectory.' }
]

const leadershipTeam = [
  { name: 'Murali V.', role: 'Founder & CEO', bio: 'Former senior engineer & product leader passionate about democratizing project-based EdTech for engineers across India.', initial: 'M' }
]

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B1A]">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-violet-950 via-slate-900 to-[#0B0B1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-sm font-semibold mb-6">
              Our Story & Purpose
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight"
          >
            Empowering Careers Through <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Authentic Mastery
            </span>
          </motion.h1>
          <p className="text-violet-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            MIVEXO was founded on a simple truth: the most reliable path from college to a high-impact tech career is building real software under expert guidance.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Our North Star</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2 mb-6">
              Closing the Industry Skill Gap Transparently
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-base">
              Traditional higher education equips students with theoretical frameworks, but modern tech enterprises look for production-ready engineering instincts.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-6">
              MIVEXO bridges this divide with verified internships, 10+ technology and management disciplines, continuous code critiques, and mock assessments that prepare students for day-one productivity.
            </p>
            <div className="space-y-3">
              {[
                'Honest pricing with transparent fee structure',
                '100% verifiable digital credentials with QR validation',
                'Comprehensive placement prep across TCS, Wipro, Accenture, and top MNCs'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="relative">
            <div className="rounded-3xl p-8 bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <h3 className="text-2xl font-black mb-4">The MIVEXO Promise</h3>
              <p className="text-violet-100 text-sm leading-relaxed mb-6">
                "We promise zero false claims. We do not sell degrees; we cultivate real engineering capabilities, demonstrable project portfolios, and career confidence."
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                <div>
                  <p className="text-3xl font-black"><AnimatedCounter end={5000} suffix="+" /></p>
                  <p className="text-xs text-violet-200 mt-1">Learners Empowered</p>
                </div>
                <div>
                  <p className="text-3xl font-black"><AnimatedCounter end={95} suffix="%" /></p>
                  <p className="text-xs text-violet-200 mt-1">Course Satisfaction</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-[#0D0D20]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Guiding Pillars</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-1">Our Core Values</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, i) => (
              <GlassCard key={i} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
                  <val.icon size={22} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-2">{val.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{val.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>


      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-violet-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-black mb-4">Ready to accelerate your journey?</h3>
          <p className="text-violet-100 text-sm mb-8">
            Join the MIVEXO ecosystem today with complete LMS access, project mentoring, and career support.
          </p>
          <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-all shadow-lg">
            Register Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
