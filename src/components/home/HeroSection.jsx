import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  Play,
  Star,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Zap,
  ShieldCheck,
  Code2,
  Cpu,
  Cloud,
  Terminal,
  CheckCircle2,
  Activity,
  Layers,
  Flame
} from 'lucide-react'
import mivexoLogo from '../../assets/mivexo_logo.png'
import MivexoIntroVideo from '../ui/MivexoIntroVideo'

const techTabs = [
  {
    id: 'fullstack',
    label: 'Full Stack',
    icon: Code2,
    color: 'text-violet-400',
    borderColor: 'border-violet-500',
    snippet: `// Next.js 14 Server Action & AI Pipeline
export async function deployModule() {
  const cluster = await initCloudCluster({
    replicas: 4,
    region: 'ap-south-1'
  });
  return { status: 'LIVE', latency: '18ms' };
}`,
    status: 'Build Passing · 100% Tests OK',
    tech: ['React 18', 'Next.js 14', 'Node.js', 'MongoDB']
  },
  {
    id: 'ai',
    label: 'AI & Neural',
    icon: Cpu,
    color: 'text-amber-400',
    borderColor: 'border-amber-500',
    snippet: `import torch
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "mivexo/llm-agent-v2",
    device_map="cuda:0"
)
# 4.9/5 Benchmark Accuracy achieved`,
    status: 'Neural Weights Loaded · 1.4B Params',
    tech: ['PyTorch', 'LLMs', 'Transformers', 'RAG']
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: Cloud,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    snippet: `resource "aws_eks_cluster" "prod" {
  name     = "mivexo-k8s-cluster"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.30"
  tags     = { Env = "Production" }
}`,
    status: 'Multi-Region Ingress · Zero Downtime',
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  }
]

const floatingPills = [
  {
    title: '20+ Industry Tracks',
    sub: 'Full Stack, AI, Cloud, UX',
    icon: BookOpen,
    gradient: 'from-violet-500 to-indigo-600',
    pos: '-top-6 -left-6',
    float: { y: [0, -10, 0], x: [0, 4, 0] },
    duration: 4.5
  },
  {
    title: '5,000+ Students',
    sub: '200+ Colleges Active',
    icon: Users,
    gradient: 'from-emerald-500 to-teal-600',
    pos: '-top-6 -right-6',
    float: { y: [0, -12, 0], x: [0, -4, 0] },
    duration: 5.2
  },
  {
    title: 'QR Verified Certs',
    sub: 'Cryptographic Hash Stamp',
    icon: Award,
    gradient: 'from-amber-500 to-orange-600',
    pos: '-bottom-6 -left-6',
    float: { y: [0, 10, 0], x: [0, -5, 0] },
    duration: 4.8
  },
  {
    title: '95% Placement Rate',
    sub: 'Top MNC & Startup Hires',
    icon: TrendingUp,
    gradient: 'from-pink-500 to-rose-600',
    pos: '-bottom-6 -right-6',
    float: { y: [0, 12, 0], x: [0, 5, 0] },
    duration: 5.5
  }
]

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Auto-cycle through tech tabs every 6 seconds for continuous animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % techTabs.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentTech = techTabs[activeTab]

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white dark:bg-[#070913] transition-colors duration-300">
      {/* Radiant Glowing Background & Cyber Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/15 dark:bg-violet-600/20 blur-[130px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-[550px] h-[550px] rounded-full bg-indigo-600/15 dark:bg-cyan-600/15 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fuchsia-500/5 dark:bg-amber-500/5 blur-[140px]" />
        
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.25) 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles size={14} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                Join 5,000+ Students Building Production Careers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.05]"
            >
              Learn. <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                Build.
              </span> <br />
              Achieve.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-lg leading-relaxed font-normal"
            >
              Master in-demand technologies through hands-on capstone projects, direct mentor code reviews, verified internship credentials, and comprehensive placement prep.
            </motion.p>

            {/* CTAs — ZERO ₹1000 mentions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                to="/pricing"
                className="btn-primary shadow-xl shadow-violet-500/25 group cursor-pointer"
              >
                Enroll Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/programs"
                className="btn-secondary cursor-pointer"
              >
                <Play size={16} className="text-violet-600 dark:text-violet-400" /> Explore 20 Tracks
              </Link>
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-indigo-300/60 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 font-semibold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <Play size={11} className="text-violet-600 dark:text-violet-400 fill-current translate-x-0.5" />
                </span>
                Watch Intro
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-5 pt-2 border-t border-gray-100 dark:border-slate-800/80"
            >
              <div className="flex -space-x-2.5">
                {['M', 'V', 'R', 'S', 'A'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 via-indigo-600 to-purple-600 border-2 border-white dark:border-[#070913] flex items-center justify-center text-white text-xs font-black shadow-sm"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-white">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                  Verified reviews across 200+ engineering colleges
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: NEW INTERACTIVE CYBER TECH CONSOLE ANIMATION */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-4 sm:p-8"
            >
              {/* Outer Orbiting Gyroscope Tech Ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[520px] h-[520px] rounded-full border border-violet-500/15 dark:border-violet-500/25 animate-spin"
                  style={{ animationDuration: '50s' }}
                />
                <div
                  className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-indigo-400/20 dark:border-indigo-400/30 animate-spin"
                  style={{ animationDuration: '35s', animationDirection: 'reverse' }}
                />
              </div>

              {/* Central Futuristic Tech Console Window */}
              <div className="relative mx-auto w-full max-w-[460px] z-10">
                {/* Glowing ambient backing */}
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/30 via-indigo-600/25 to-cyan-500/30 rounded-3xl blur-2xl opacity-75 dark:opacity-90 animate-pulse-slow" />

                <div className="relative rounded-3xl bg-white/95 dark:bg-[#0c0f1d]/95 backdrop-blur-2xl border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                  {/* Console Header Bar */}
                  <div className="px-5 py-3.5 bg-gray-50/90 dark:bg-[#0f1426]/90 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs" />
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-xs" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs" />
                      <span className="text-xs font-mono text-gray-500 dark:text-slate-400 ml-2 font-bold flex items-center gap-1.5">
                        <Terminal size={12} className="text-violet-500" /> mivexo-lms-engine.ts
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        Active Hub
                      </span>
                    </div>
                  </div>

                  {/* Brand Display Bar */}
                  <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                    <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-xs">
                      <img src={mivexoLogo} alt="MIVEXO" className="h-7 w-auto object-contain" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                      Batch 2026 Live
                    </span>
                  </div>

                  {/* Interactive Tech Tab Switcher */}
                  <div className="px-6 pt-1">
                    <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-slate-900/90 rounded-xl border border-gray-200 dark:border-slate-800">
                      {techTabs.map((t, idx) => {
                        const Icon = t.icon
                        const isTabActive = activeTab === idx
                        return (
                          <button
                            key={t.id}
                            onClick={() => setActiveTab(idx)}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isTabActive
                                ? 'bg-white dark:bg-slate-800 text-violet-700 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            <Icon size={13} className={isTabActive ? t.color : 'text-gray-400'} />
                            <span>{t.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Animated Code Terminal Screen */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTech.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-2xl bg-gray-950 p-4 font-mono text-xs text-slate-300 border border-slate-800 shadow-inner relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 mb-2 border-b border-slate-800/80">
                          <span className="flex items-center gap-1">
                            <Activity size={11} className="text-cyan-400" /> Real-Time Architecture Preview
                          </span>
                          <span className="text-emerald-400 font-bold">● Live Build</span>
                        </div>

                        <pre className="text-[11px] leading-relaxed text-slate-300 overflow-x-auto scrollbar-hide py-1">
                          <code>{currentTech.snippet}</code>
                        </pre>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-slate-800/80">
                          {currentTech.tech.map((tk, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300"
                            >
                              {tk}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Console Live Telemetry Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 size={13} />
                        <span>{currentTech.status}</span>
                      </div>
                      <Link
                        to="/pricing"
                        className="text-violet-600 dark:text-violet-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Enroll Track <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Floating Feature Badges with 3D Motion */}
              {floatingPills.map((pill, idx) => {
                const Icon = pill.icon
                return (
                  <motion.div
                    key={idx}
                    animate={pill.float}
                    transition={{
                      duration: pill.duration,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    whileHover={{ scale: 1.06, y: -4 }}
                    className={`absolute ${pill.pos} z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#12162a]/95 backdrop-blur-xl border border-gray-200 dark:border-slate-800 shadow-xl cursor-default`}
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${pill.gradient} flex items-center justify-center text-white shadow-md shrink-0`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-900 dark:text-white leading-tight">
                        {pill.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">
                        {pill.sub}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            key="desktop-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute -top-4 -right-4 z-20 w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-colors"
              >
                <span className="text-lg leading-none">×</span>
              </button>

              {/* Label */}
              <div className="mb-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <Play size={13} className="text-white fill-white translate-x-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">MIVEXO Platform Intro</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">15+ domains · QR-verified certificates · 20 sec preview</p>
                </div>
              </div>

              {/* Video */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-violet-500/20">
                <MivexoIntroVideo onEnd={() => {}} />
              </div>

              {/* Bottom CTA */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <Link
                  to="/programs"
                  onClick={() => setShowVideoModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all"
                >
                  Explore All Programs <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 text-sm font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
