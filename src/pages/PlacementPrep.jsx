import { motion } from 'framer-motion'
import { Target, Brain, FileText, MessageSquare, TrendingUp, CheckCircle, ArrowRight, Zap, ExternalLink, Code2, Sparkles, Trophy, Building2, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const PRACTICE_PORTAL_URL = 'https://www.antintern.com/dashboard'

const features = [
  { icon: Brain, title: 'AI Mock Interviews & Assessments', desc: 'Simulate live technical & behavioral interviews. Instant automated scoring on syntax, logic, and response depth.', color: 'from-violet-500 to-indigo-500' },
  { icon: Code2, title: 'Live Coding Playground', desc: 'Solve 500+ algorithmic and data structure problems with multi-language compiler support and test suites.', color: 'from-blue-500 to-cyan-500' },
  { icon: FileText, title: 'Aptitude & Reasoning Bank', desc: '10,000+ curated questions across Quantitative Aptitude, Logical Reasoning, and Verbal Ability.', color: 'from-emerald-500 to-teal-500' },
  { icon: Target, title: 'Resume ATS Optimizer', desc: 'AI-guided bullet point suggestions, keyword alignment for target job descriptions, and ATS scorecard.', color: 'from-orange-500 to-amber-500' },
  { icon: MessageSquare, title: 'HR Behavioral Rounds (STAR)', desc: 'Master leadership, conflict resolution, and situational questions using the proven STAR framework.', color: 'from-pink-500 to-rose-500' },
  { icon: Zap, title: 'Live Mock Contests', desc: 'Compete in weekly timed placement contests with leaderboard rankings and detailed solution walk-throughs.', color: 'from-purple-500 to-pink-500' }
]

const companies = [
  { name: 'Google', logo: '/companies/google.svg', role: 'Software Engineer Apprentice', rounds: 'Advanced Algorithms, Concurrency & Problem Solving', color: 'from-blue-500 to-green-500' },
  { name: 'Microsoft', logo: '/companies/microsoft.svg', role: 'Software Engineer & Support', rounds: 'Data Structures, System Design & Problem Solving', color: 'from-blue-600 to-indigo-600' },
  { name: 'TCS', logo: '/companies/tcs.svg', role: 'Ninja / Digital / Prime', rounds: 'Aptitude, Coding, Technical & HR', color: 'from-blue-600 to-indigo-700' },
  { name: 'Wipro', logo: '/companies/wipro.svg', role: 'Elite & Turbo NTH', rounds: 'Quants, Verbal, Coding & Business English', color: 'from-purple-600 to-indigo-800' },
  { name: 'Accenture', logo: '/companies/accenture.svg', role: 'Associate Software Engineer', rounds: 'Cognitive, Technical Assessment & Coding', color: 'from-violet-600 to-purple-800' },
  { name: 'Amazon', logo: '/companies/amazon.svg', role: 'SDE-1 & Cloud Support Associate', rounds: 'DSA, System Design & Leadership Principles', color: 'from-amber-600 to-orange-700' },
  { name: 'Cognizant', logo: '/companies/google.svg', role: 'GenC, GenC Elevate & Next', rounds: 'Skill-based Coding & Scenario Interview', color: 'from-emerald-600 to-teal-800' }
]

export default function PlacementPrep() {
  const openPracticePortal = () => {
    window.open(PRACTICE_PORTAL_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B1A]">
      {/* Hero with animated background */}
      <div className="bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950 py-24 px-6 text-center relative overflow-hidden text-white">
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-3xl animate-pulse" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:32px_32px]" />

        <div className="relative max-w-5xl mx-auto z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-xs md:text-sm font-semibold mb-6">
              <Sparkles size={14} className="text-amber-400" /> Interactive Placement & Diagnostic Simulator
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            Master Technical Interviews & <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Placement Coding Rounds
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-violet-200 text-base md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Practice company-specific aptitude tests, SQL assessments, coding challenges, and mock HR rounds directly on our integrated portal.
          </motion.p>

          {/* Interactive Action Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={openPracticePortal}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-violet-500/30 hover:scale-105 transition-all text-base group cursor-pointer"
            >
              <Play size={18} className="fill-white" />
              Launch Placement Practice Lab
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl transition-all text-base"
            >
              Enroll &amp; Start Practice
            </Link>
          </motion.div>

          <p className="mt-4 text-xs text-violet-300 flex items-center justify-center gap-2">
            <CheckCircle size={14} className="text-emerald-400" /> Included for all registered students · Click above to practice live
          </p>
        </div>
      </div>

      {/* Prominent Clickable Simulator Banner */}
      <section className="py-8 px-6 max-w-7xl mx-auto -mt-10 relative z-20">
        <motion.div
          whileHover={{ y: -4 }}
          onClick={openPracticePortal}
          className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white shadow-2xl border-2 border-violet-400/40 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer group"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:bg-violet-600 transition-all">
              <Brain size={32} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full">
                LIVE INTERVIEW LAB
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1 group-hover:text-amber-300 transition-colors">
                Real-Time Technical &amp; Aptitude Practice Lab
              </h3>
              <p className="text-xs md:text-sm text-violet-200 mt-1">
                Click here to jump straight into active placement simulations, timed tests &amp; automated coding environments.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-900 font-bold text-sm shadow-lg group-hover:bg-amber-300 group-hover:text-gray-900 transition-all">
            <span>Practice Now</span>
            <ExternalLink size={16} />
          </div>
        </motion.div>
      </section>

      {/* Placement Features */}
      <section className="section-padding">
        <div className="container-max">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Preparation Suite</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-1 mb-4">
              Everything You Need to <span className="gradient-text">Crack Your Dream Offer</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              End-to-end guidance from preliminary aptitude tests to company technical rounds.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GlassCard key={i} delay={i * 0.08} className="p-6 flex flex-col justify-between group border hover:border-violet-400">
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md`}>
                    <f.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={openPracticePortal}
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer"
                  >
                    Start Practice Module <ExternalLink size={12} />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Company Specific Tracks with Clickable Practice */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-[#0D0D20] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Company Modules</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-1 mb-3">
              Target Company <span className="gradient-text">Practice Tracks</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
              Simulate actual assessment patterns for India's leading MNCs. Click any company card to practice questions.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.map((co, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={openPracticePortal}
                className="p-6 rounded-2xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-violet-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-9 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <img src={co.logo} alt={co.name} className="h-5 max-w-[80px] object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Active Pack
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors">
                    {co.name}
                  </h3>
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-0.5 mb-2">{co.role}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                    Rounds: {co.rounds}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-violet-600">
                  <span>Practice Questions</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-gray-400 max-w-2xl mx-auto">
            * Note: Practice content is curated based on historical memory patterns for student skill building and interview simulation.
          </p>
        </div>
      </section>
    </div>
  )
}
