import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X,
  ArrowRight,
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Award,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Code2,
  Check,
  Zap,
  GraduationCap
} from 'lucide-react'

export default function MobileSyllabusModal({ course, onClose }) {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState('modules') // 'modules' | 'capstone' | 'enrollment'
  const [expandedModule, setExpandedModule] = useState(0) // module 0 open by default

  if (!course) return null

  const modules = course.modules || []
  const skills = course.skills || []

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col justify-end">
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* ── Slide-up Mobile Syllabus Sheet ── */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
            mass: 0.8
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full h-[92vh] max-h-[92vh] rounded-t-[28px] bg-white dark:bg-[#0B0F1F] text-slate-900 dark:text-white flex flex-col overflow-hidden shadow-2xl border-t border-slate-200 dark:border-slate-800"
        >
          {/* iOS-Style Pill Handle */}
          <div className="pt-2.5 pb-1 flex justify-center shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Sticky Top Header Bar */}
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg cursor-pointer transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-2.5 py-0.5 rounded-full border border-violet-200 dark:border-violet-800">
              Syllabus &amp; Modules
            </span>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Content Stream */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
            {/* ── Course Hero Summary ── */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50/80 via-indigo-50/40 to-white dark:from-[#131936] dark:via-[#0F142A] dark:to-[#0B0F1F] border border-violet-100 dark:border-violet-900/40 shadow-xs">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-600 text-white shadow-xs">
                  {course.tag || 'Official Industry Track'}
                </span>

                <div className="flex items-center gap-1 text-amber-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                  <Star size={12} className="fill-current text-amber-400" />
                  <span>{course.rating || 4.9}</span>
                </div>
              </div>

              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1.5">
                {course.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {course.description}
              </p>

              {/* Official Cohort Enrollment Banner */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-violet-100/70 dark:bg-violet-950/60 border border-violet-200/90 dark:border-violet-800/60 text-violet-900 dark:text-violet-200 text-[11px] font-semibold mb-3">
                <Sparkles size={13} className="text-amber-500 shrink-0" />
                <span className="truncate">Admissions Open · Cohort Starts Next Monday</span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-violet-100/80 dark:border-slate-800 text-center">
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[9.5px] text-slate-400 block font-medium">Duration</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">{course.duration}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[9.5px] text-slate-400 block font-medium">Level</span>
                  <span className="text-xs font-black text-violet-600 dark:text-violet-400">{course.level}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[9.5px] text-slate-400 block font-medium">Learners</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{course.enrolled || 400}+</span>
                </div>
              </div>
            </div>

            {/* ── Segmented Navigation Tabs ── */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {[
                { id: 'modules', label: `Curriculum (${modules.length})` },
                { id: 'enrollment', label: 'Enrollment Inclusions' },
                { id: 'capstone', label: 'Capstone' }
              ].map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* ── TAB 1: Professional Animated Modules Accordion ── */}
            {activeTab === 'modules' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Layers size={14} className="text-violet-600" />
                    Structured Module Timeline
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Code Labs Included
                  </span>
                </div>

                {modules.map((mod, idx) => {
                  const isOpen = expandedModule === idx
                  return (
                    <motion.div
                      layout
                      key={idx}
                      transition={{
                        layout: { duration: 0.28, ease: [0.4, 0, 0.2, 1] }
                      }}
                      className={`relative rounded-2xl border transition-colors overflow-hidden ${
                        isOpen
                          ? 'border-violet-300 dark:border-violet-500/50 bg-gradient-to-b from-violet-50/40 via-white to-white dark:from-[#131936] dark:via-[#0F142A] dark:to-[#0B0F1F] shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs'
                      }`}
                    >
                      {/* Left animated active accent pill */}
                      <motion.div
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          scaleY: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.22 }}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-600 to-indigo-600 origin-top"
                      />

                      {/* Module Trigger Header */}
                      <button
                        onClick={() => setExpandedModule(isOpen ? -1 : idx)}
                        className="w-full p-3.5 flex items-center justify-between gap-3 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Module Number Stamp */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 transition-colors ${
                              isOpen
                                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            0{idx + 1}
                          </div>

                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 block leading-tight">
                              {mod.week}
                            </span>
                            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                              {mod.title}
                            </h4>
                          </div>
                        </div>

                        {/* Smooth Rotating Chevron */}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isOpen
                              ? 'bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300'
                              : 'text-slate-400'
                          }`}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      </button>

                      {/* Expandable Module Topics with Smooth Spring Height Animation */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: 'auto',
                              opacity: 1,
                              transition: {
                                height: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.22, delay: 0.04 }
                              }
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.15 }
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-1 border-t border-violet-100/70 dark:border-slate-800/70">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                                Core Competencies &amp; Lab Exercises:
                              </span>

                              <div className="space-y-1.5">
                                {mod.topics?.map((topic, tIdx) => (
                                  <motion.div
                                    key={tIdx}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: tIdx * 0.04 }}
                                    className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 p-2 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 shadow-xs"
                                  >
                                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                      <Check size={11} strokeWidth={3} />
                                    </span>
                                    <span className="leading-snug">{topic}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}

                {/* ── Official Mention of What You Receive Upon Enrollment ── */}
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50/60 dark:from-[#131936] dark:to-[#0F142A] border border-violet-200/90 dark:border-violet-900/50 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                      <GraduationCap size={15} />
                      Official Enrollment Pack
                    </span>
                    <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                      Included
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Enrolling in this track unlocks full sequential modules, weekly live mentor code reviews, production capstone evaluation, and the official QR-verified certificate.
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 text-[10.5px] font-bold text-slate-700 dark:text-slate-200 pt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      <span>Lifetime LMS Access</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      <span>PR Review on GitHub</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      <span>QR-Verified Cert</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      <span>Placement Referrals</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TAB 2: Professional Enrollment Inclusions ── */}
            {activeTab === 'enrollment' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

                  <span className="text-[10px] font-black uppercase tracking-widest text-violet-200 block mb-1">
                    MIVEXO INDUSTRY ADMISSIONS
                  </span>
                  <h3 className="text-base font-black mb-1.5 leading-snug">
                    What You Get Upon Enrollment
                  </h3>
                  <p className="text-xs text-violet-100 leading-relaxed">
                    Zero application fees. Secure your seat in the Batch 2026 cohort with direct LMS onboarding and dedicated mentorship.
                  </p>
                </div>

                {/* Detailed Checklist */}
                <div className="space-y-2">
                  {[
                    {
                      title: 'Sequential Video Curriculum & Code Repos',
                      desc: 'Full access to all 4 modules, architecture diagrams, and starter code repositories.',
                      icon: BookOpen,
                      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60'
                    },
                    {
                      title: 'Weekly 1-on-1 Code Reviews with MNC Mentors',
                      desc: 'Line-by-line pull request reviews from senior engineers at Google, Amazon, Microsoft.',
                      icon: Users,
                      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60'
                    },
                    {
                      title: 'Enterprise Capstone Portfolio Piece',
                      desc: 'Deploy a high-concurrency production project to demo in campus and off-campus interviews.',
                      icon: Code2,
                      color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60'
                    },
                    {
                      title: 'Cryptographic QR-Verified Certificate',
                      desc: 'Tamper-proof credential approved by college HODs and recognized by partner recruiters.',
                      icon: Award,
                      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                    },
                    {
                      title: 'Placement Assistance & ATS Resume Review',
                      desc: 'Mock technical interviews, behavioral prep, and direct referral opportunities.',
                      icon: Briefcase,
                      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60'
                    }
                  ].map((feat, idx) => {
                    const FeatIcon = feat.icon
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-3"
                      >
                        <div
                          className={`w-8 h-8 rounded-xl ${feat.color} flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          <FeatIcon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {feat.title}
                          </h4>
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ── TAB 3: Capstone & Prerequisites ── */}
            {activeTab === 'capstone' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 block mb-1">
                    PRODUCTION CAPSTONE DELIVERABLE
                  </span>
                  <h3 className="text-base font-black mb-2 leading-snug">
                    {course.title} Capstone
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {course.capstone}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Prerequisites &amp; Prior Knowledge
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {course.prerequisites || 'Basic programming fundamentals and curiosity to build.'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                    Technologies Mastered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-bold px-3 py-1 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 shadow-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Sticky Bottom Professional Action Enrollment Bar ── */}
          <div className="p-3.5 bg-white/95 dark:bg-[#0B0F1F]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800/90 flex items-center justify-between gap-3 shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Batch 2026 Enrollment
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Includes Cert + Mentorship + Labs
              </span>
            </div>

            <Link
              to="/pricing"
              className="py-2.5 px-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-violet-500/25 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Enroll</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
