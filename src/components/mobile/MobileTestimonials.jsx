import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  GraduationCap,
  BadgeCheck,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'

const collegeReviews = [
  {
    id: 1,
    name: 'Karthik R.',
    branch: 'B.Tech CSE · 3rd Year',
    college: 'SRM Institute of Science & Tech, Kattankulathur',
    collegeShort: 'SRM University',
    track: 'Full Stack Web Development',
    badge: 'College VIVA Approved',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    avatarBg: 'bg-gradient-to-br from-violet-600 to-indigo-600',
    initials: 'KR',
    rating: 5,
    quote: 'Submitted our e-commerce capstone project for 6th sem internal review. Faculty accepted the QR-verified internship letter without any issues. Mentor helped fix Docker deployment errors on Sunday night!',
    keyHighlight: 'Internship letter approved for college credits'
  },
  {
    id: 2,
    name: 'Sneha Patil',
    branch: 'BE Info Science · Final Year',
    college: 'PES University, Bengaluru',
    collegeShort: 'PES University',
    track: 'Data Analytics & Power BI',
    badge: 'Campus Placement Cleared',
    badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    avatarBg: 'bg-gradient-to-br from-blue-600 to-cyan-600',
    initials: 'SP',
    rating: 5,
    quote: 'Was stressed about campus aptitude and SQL interview rounds. The placement practice bank and weekly mentor doubt sessions really gave me confidence to crack the technical round.',
    keyHighlight: 'Cleared Tier-1 company campus interview'
  },
  {
    id: 3,
    name: 'Aditya Verma',
    branch: 'B.Tech ECE · 3rd Year',
    college: 'Vellore Institute of Technology (VIT)',
    collegeShort: 'VIT Vellore',
    track: 'IoT & Embedded Systems',
    badge: 'Hardware + Cloud Project',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    avatarBg: 'bg-gradient-to-br from-amber-600 to-orange-600',
    initials: 'AV',
    rating: 5,
    quote: 'Most platforms only teach theory on PPTs. Here we configured real ESP32 MQTT broker data to an AWS dashboard. Our department HOD signed off on our semester internship report directly.',
    keyHighlight: 'Direct signoff from Department HOD'
  },
  {
    id: 4,
    name: 'Megha Nair',
    branch: 'B.Tech IT · 2025 Batch',
    college: 'Anna University (CEG Campus), Chennai',
    collegeShort: 'Anna University',
    track: 'Cloud & DevOps Engineering',
    badge: 'Hands-on Production Lab',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    avatarBg: 'bg-gradient-to-br from-purple-600 to-pink-600',
    initials: 'MN',
    rating: 5,
    quote: 'Started with zero Kubernetes and CI/CD pipeline experience. Mentor gave direct feedback on my resume ATS keywords and GitHub repos. Completely changed my portfolio.',
    keyHighlight: 'Production CI/CD & GitHub resume boost'
  },
  {
    id: 5,
    name: 'Rohan Kulkarni',
    branch: 'BCA · Final Year',
    college: 'Savitribai Phule Pune University (SPPU)',
    collegeShort: 'Pune University',
    track: 'AI & Machine Learning',
    badge: 'Live Capstone Project',
    badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20',
    avatarBg: 'bg-gradient-to-br from-teal-600 to-emerald-600',
    initials: 'RK',
    rating: 5,
    quote: 'LMS credentials were sent immediately after registration. Code repositories had step-by-step guidance. The disease prediction model became my final year major project.',
    keyHighlight: 'Final year major project selected'
  }
]

export default function MobileTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = collegeReviews[activeIdx]

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? collegeReviews.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev === collegeReviews.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-8 px-3.5 bg-slate-50/80 dark:bg-[#070E1E] text-slate-900 dark:text-white transition-colors overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/60 text-violet-700 dark:text-violet-300 text-[11px] font-bold mb-2">
            <GraduationCap size={13} className="text-violet-600 dark:text-violet-400" />
            <span>Verified Student Reviews</span>
          </div>

          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by College Students
          </h2>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
            Real internship feedback from SRM, VIT, Anna Univ, PES & Pune Univ
          </p>
        </div>

        {/* Main Review Card - Mobile-Optimized */}
        <div className="relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {/* Top Row: Student Profile + College Badge */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Initials Avatar Badge */}
                  <div
                    className={`w-11 h-11 rounded-xl ${current.avatarBg} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm`}
                  >
                    {current.initials}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {current.name}
                      </h3>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={12} />
                        <span>Verified</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {current.branch}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* College & Track Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80">
                  <GraduationCap size={12} className="text-violet-600 dark:text-violet-400 shrink-0" />
                  <span className="truncate max-w-[200px]">{current.collegeShort}</span>
                </span>

                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${current.badgeColor}`}>
                  <ShieldCheck size={11} className="shrink-0" />
                  <span>{current.badge}</span>
                </span>
              </div>

              {/* Quote Body */}
              <div className="relative pt-1">
                <Quote size={20} className="absolute -top-1 -left-1 text-slate-200 dark:text-slate-800 pointer-events-none -scale-x-100" />
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal relative z-10 pl-2">
                  "{current.quote}"
                </p>
              </div>

              {/* Footer Row: Full College Name + Outcome Highlight */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-violet-600 dark:text-violet-400 truncate max-w-[55%]">
                  Track: {current.track}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                  ✓ {current.keyHighlight}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Prev/Next & Dots */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/60">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {collegeReviews.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    i === activeIdx
                      ? 'w-5 bg-slate-900 dark:bg-white'
                      : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Quick Trust Bar - Compact Mobile */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
            <p className="text-xs font-black text-slate-900 dark:text-white">4.9/5</p>
            <p className="text-[10px] text-slate-500 font-medium">Student Rating</p>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">100%</p>
            <p className="text-[10px] text-slate-500 font-medium">Viva Approved</p>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
            <p className="text-xs font-black text-violet-600 dark:text-violet-400">50+ Colls</p>
            <p className="text-[10px] text-slate-500 font-medium">Pan India</p>
          </div>
        </div>
      </div>
    </section>
  )
}
