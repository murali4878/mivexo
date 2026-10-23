import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Play,
  Layers,
  Activity,
  Users,
  Code2,
  Cloud,
  BarChart2,
  Cpu,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react'
import MivexoIntroVideo from '../ui/MivexoIntroVideo'

export default function MobileHero() {
  const shouldReduceMotion = useReducedMotion()
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-[#070E1E] dark:via-[#091124] dark:to-[#070E1E] text-slate-900 dark:text-white pt-6 pb-8 px-4 sm:px-6 transition-colors">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-400/15 dark:bg-violet-600/15 blur-[100px]" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-blue-400/15 dark:bg-cyan-500/10 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center text-center">
        {/* Top Tag: LEARN · BUILD · GROW */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-violet-600 dark:text-violet-400 uppercase">
            LEARN · BUILD · GROW
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl xs:text-4xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white mb-3"
        >
          Build Skills <br />
          For a{' '}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
            Better Tomorrow
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs xs:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 max-w-xs"
        >
          Industry-relevant programs, real-world projects and certification to help you start your tech career.
        </motion.p>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6 w-full max-w-xs"
        >
          <Link
            to="/programs"
            className="flex-1 py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md shadow-slate-900/10 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Explore Programs</span>
            <ArrowRight size={14} />
          </Link>

          <button
            onClick={() => setShowVideoModal(true)}
            className="py-2.5 px-4 rounded-full bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Play size={10} className="fill-current translate-x-0.5" />
            </span>
            <span>Play Video</span>
          </button>
        </motion.div>

        {/* Social Proof Strip: Avatars + Students Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center gap-2.5 mb-7"
        >
          <div className="flex -space-x-2">
            {[
              { letter: 'R', gradient: 'from-violet-500 to-indigo-600' },
              { letter: 'P', gradient: 'from-indigo-500 to-blue-600'   },
              { letter: 'A', gradient: 'from-emerald-500 to-teal-600'  },
              { letter: 'S', gradient: 'from-amber-500 to-orange-500'  },
            ].map((st, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${st.gradient} border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-xs`}
              >
                {st.letter}
              </div>
            ))}
          </div>
          <div className="text-left leading-tight">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
              5,000+ Students
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              200+ Colleges
            </span>
          </div>
        </motion.div>

        {/* ── 3D Tech Isometric Showcase Graphic ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full max-w-[320px] h-64 mb-6 flex items-center justify-center"
        >
          {/* Subtle Ambient Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full border border-violet-200/50 dark:border-violet-500/10" />
            <div className="w-48 h-48 rounded-full border border-dashed border-indigo-200/60 dark:border-indigo-500/15" />
          </div>

          {/* Elevated Circular Pedestal */}
          <div className="absolute bottom-4 w-52 h-14 rounded-[100%] bg-gradient-to-b from-blue-100 to-indigo-100/40 dark:from-slate-800 dark:to-slate-900/60 border border-blue-200/60 dark:border-slate-700/60 shadow-xl shadow-indigo-500/10 dark:shadow-black/40" />
          <div className="absolute bottom-6 w-44 h-11 rounded-[100%] bg-gradient-to-b from-white via-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-800 border border-blue-200/80 dark:border-slate-600 shadow-md" />

          {/* Central 3D Laptop */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col items-center -mt-4"
          >
            {/* Screen */}
            <div className="w-40 h-28 rounded-xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 p-2 shadow-2xl border-2 border-slate-700/80 relative overflow-hidden flex flex-col justify-between">
              {/* Screen Glare reflection */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />

              {/* Window dots */}
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Glowing Code Symbol */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-black text-xl tracking-wider drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
                  <span>&lt;</span>
                  <span className="text-white">/</span>
                  <span>&gt;</span>
                </div>
                <span className="text-[8.5px] font-mono text-indigo-300 font-semibold tracking-wider uppercase mt-1">
                  MIVEXO LMS · LIVE
                </span>
              </div>

              {/* Bottom activity line */}
              <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">● Running</span>
                <span>Node.js v20</span>
              </div>
            </div>

            {/* Laptop Base */}
            <div className="w-48 h-3.5 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-b-xl shadow-lg border-t border-slate-200 dark:border-slate-500 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-400 dark:bg-slate-500 rounded-full" />
            </div>
          </motion.div>

          {/* Floating 3D Badge 1: AI (Top-Left) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -8, 0], x: [0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 left-3 z-20 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-lg shadow-blue-500/10 flex items-center gap-1.5"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black shadow-xs">
              AI
            </div>
            <span className="text-[10px] font-bold text-slate-800 dark:text-white">Neural</span>
          </motion.div>

          {/* Floating 3D Badge 2: Cloud (Top-Right) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0], x: [0, -2, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-12 right-3 z-20 p-2 rounded-xl bg-white dark:bg-slate-800 border border-cyan-100 dark:border-slate-700 shadow-lg shadow-cyan-500/10 flex items-center gap-1.5"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-xs">
              <Cloud size={13} />
            </div>
            <span className="text-[10px] font-bold text-slate-800 dark:text-white">Cloud</span>
          </motion.div>

          {/* Floating 3D Badge 3: Analytics (Bottom-Right) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-12 right-2 z-20 p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-xs">
              <BarChart2 size={13} />
            </div>
            <span className="text-[10px] font-bold text-slate-800 dark:text-white">Data</span>
          </motion.div>

          {/* Floating 3D Badge 4: Code (Bottom-Left) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute bottom-10 left-4 z-20 p-2 rounded-xl bg-white dark:bg-slate-800 border border-violet-100 dark:border-slate-700 shadow-lg shadow-violet-500/10 flex items-center gap-1.5"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
              <Code2 size={13} />
            </div>
            <span className="text-[10px] font-bold text-slate-800 dark:text-white">Web</span>
          </motion.div>
        </motion.div>

        {/* ── 3 Metric Badges Row (Matches Reference Screen 1) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-3 gap-2.5 w-full"
        >
          {/* Card 1: 20+ Industry Tracks */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5 shadow-xs">
              <Layers size={18} />
            </div>
            <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
              20+
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-tight">
              Industry Tracks
            </span>
          </div>

          {/* Card 2: Live Projects */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5 shadow-xs">
              <Activity size={18} />
            </div>
            <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
              Live
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-tight">
              Projects
            </span>
          </div>

          {/* Card 3: Expert Mentorship */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-1.5 shadow-xs">
              <Users size={18} />
            </div>
            <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
              Expert
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-tight">
              Mentorship
            </span>
          </div>
        </motion.div>
      </div>

      {/* Video Modal Popup */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-lg"
            >
              <X size={15} />
            </button>

            {/* Header */}
            <div className="mb-2 px-1">
              <h3 className="text-sm font-bold text-white">MIVEXO Learning Platform</h3>
              <p className="text-[11px] text-slate-400">15+ specializations · QR-verified certificates</p>
            </div>

            {/* Video Player */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-violet-500/20">
              <MivexoIntroVideo onEnd={() => {}} />
            </div>

            {/* CTA */}
            <Link
              to="/programs"
              onClick={() => setShowVideoModal(false)}
              className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-violet-500/25 active:scale-95 transition-all"
            >
              Explore All Programs <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      )}
    </section>
  )
}
