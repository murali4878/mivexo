import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Play,
  Star,
  ShieldCheck,
  Code2,
  Cpu,
  Cloud,
  Palette,
  Terminal,
  CheckCircle2,
  Zap,
  Award,
  Users
} from 'lucide-react'

const mobileTechTabs = [
  {
    id: 'fullstack',
    label: 'Full Stack',
    icon: Code2,
    badge: 'MERN & Next.js',
    accentColor: 'text-violet-400',
    bgBadge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    snippet: `// Next.js 14 + MongoDB Pipeline
export async function createTenant() {
  const org = await db.orgs.init({
    tier: 'ENTERPRISE',
    auth: 'Supabase-JWT'
  });
  return { status: 'LIVE', code: 200 };
}`,
    tech: ['React 18', 'Next.js', 'Node', 'Mongo']
  },
  {
    id: 'ai',
    label: 'AI & Neural',
    icon: Cpu,
    badge: 'LLMs & RAG',
    accentColor: 'text-amber-400',
    bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    snippet: `# PyTorch RAG Vector Search
from langchain_community import Embed
model = Embed.load("mivexo/llm-v2")
vector_store = Pinecone.connect(
    api_key=CONFIG.PINECONE_KEY
)
# 4.9/5 Precision Achieved`,
    tech: ['PyTorch', 'LangChain', 'Pinecone', 'Transformers']
  },
  {
    id: 'cloud',
    label: 'DevOps',
    icon: Cloud,
    badge: 'AWS & K8s',
    accentColor: 'text-cyan-400',
    bgBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    snippet: `# AWS Terraform Kubernetes Cluster
resource "aws_eks_cluster" "prod" {
  name     = "mivexo-k8s-core"
  role_arn = aws_iam.cluster.arn
  version  = "1.30"
}
# Zero-Downtime Rolling Update`,
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
  {
    id: 'design',
    label: 'UI/UX & Cyber',
    icon: Palette,
    badge: 'Design & Security',
    accentColor: 'text-rose-400',
    bgBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    snippet: `// Design Token & Security Guard
export const authPolicy = {
  csrfProtection: true,
  wcagCompliance: 'AAA',
  rateLimit: '100req/min'
};`,
    tech: ['Figma', 'WCAG 2.1', 'OWASP 10', 'Burp Suite']
  }
]

export default function MobileHero() {
  const [activeTab, setActiveTab] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  // Auto-cycle tabs slowly for ambient animation
  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % mobileTechTabs.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [shouldReduceMotion])

  const curTab = mobileTechTabs[activeTab]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1730] via-[#0E1A38] to-[#070E1E] text-white pt-6 pb-12 px-4 sm:px-6">
      {/* Animated Glowing Radial Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Purple Ambient Orb */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.5, 0.35]
                }
          }
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#8B3FF2]/35 blur-[90px]"
        />

        {/* Bottom Right Cyan/Navy Ambient Orb */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.25, 0.4, 0.25]
                }
          }
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-indigo-600/30 blur-[85px]"
        />

        {/* Cyber Grid Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139, 63, 242, 0.45) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Floating Top Mini Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#8B3FF2]/40 shadow-sm shadow-[#8B3FF2]/20 text-[11px] font-bold text-violet-200"
        >
          <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>India's Leading Industry EdTech Platform</span>
        </motion.div>

        {/* Main Headline: Bold, Punchy, Mobile-Optimized */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl xs:text-5xl font-black tracking-tight leading-[1.08] mb-4 text-white"
        >
          Learn.{' '}
          <span className="bg-gradient-to-r from-[#8B3FF2] via-[#A855F7] to-cyan-400 bg-clip-text text-transparent">
            Build.
          </span>{' '}
          <br />
          Achieve.
        </motion.h1>

        {/* Short, High-Impact Value Proposition Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm xs:text-base text-gray-300 font-normal leading-relaxed mb-6 max-w-sm"
        >
          Master industry tech tracks with <span className="text-white font-semibold">real-world capstones</span>, direct mentor code reviews, and <span className="text-violet-300 font-semibold">QR-verified credentials</span>.
        </motion.p>

        {/* Floating Feature Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex items-center justify-center gap-2 mb-6 flex-wrap"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-200 shadow-sm"
          >
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>QR Verified Certs</span>
          </motion.div>

          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-200 shadow-sm"
          >
            <Zap size={14} className="text-amber-400 shrink-0" />
            <span>Top MNC Mentors</span>
          </motion.div>

          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-200 shadow-sm"
          >
            <Users size={14} className="text-cyan-400 shrink-0" />
            <span>200+ Colleges</span>
          </motion.div>
        </motion.div>

        {/* Primary & Secondary Call To Actions (Thumb Reach Optimized) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="w-full flex flex-col gap-3 mb-8"
        >
          {/* Prominent High-Converting Primary Enrollment Button */}
          <Link
            to="/pricing"
            className="relative group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8B3FF2] via-[#7C3AED] to-indigo-600 hover:from-[#7c30e3] hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-[#8B3FF2]/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden"
          >
            {/* Shimmer sweep animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <span>Enroll in Industry Tracks</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Curriculum Exploration Button */}
          <Link
            to="/programs"
            className="w-full py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Play size={15} className="text-[#8B3FF2] fill-[#8B3FF2]" />
            <span>Explore All 20+ Curriculum Tracks</span>
          </Link>
        </motion.div>

        {/* Interactive Mobile Tech Console / Code Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full rounded-2xl bg-[#070E1E]/90 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl text-left mb-6"
        >
          {/* Console Header Bar */}
          <div className="px-3.5 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[11px] font-mono text-gray-400 font-bold ml-1.5 flex items-center gap-1">
                <Terminal size={11} className="text-[#8B3FF2]" /> mivexo-core.ts
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                Live Build
              </span>
            </div>
          </div>

          {/* Interactive Mobile Tabs (Touch Switcher) */}
          <div className="p-2 border-b border-white/10 bg-black/30">
            <div className="grid grid-cols-4 gap-1">
              {mobileTechTabs.map((t, idx) => {
                const Icon = t.icon
                const isActive = activeTab === idx
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(idx)}
                    className={`py-1.5 px-1 rounded-xl text-[10px] font-extrabold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-[#8B3FF2] text-white shadow-md shadow-[#8B3FF2]/40'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={12} className={isActive ? 'text-white' : t.accentColor} />
                    <span className="truncate max-w-[65px]">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Code Window Body */}
          <div className="p-3.5 bg-black/60">
            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2 pb-1.5 border-b border-white/10">
              <span className="font-bold text-violet-300">{curTab.badge}</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 size={11} /> Mentor Reviewed
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={curTab.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <pre className="text-[10.5px] leading-relaxed font-mono text-gray-300 overflow-x-auto scrollbar-hide py-1">
                  <code>{curTab.snippet}</code>
                </pre>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-white/10">
                  {curTab.tech.map((item, i) => (
                    <span
                      key={i}
                      className="text-[9.5px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-gray-300 border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Console Action Bar */}
          <div className="px-3.5 py-2.5 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-gray-400 text-[10px]">Ready to build this project?</span>
            <Link
              to="/pricing"
              className="font-bold text-[#8B3FF2] hover:text-violet-300 flex items-center gap-1"
            >
              Enroll Track <ArrowRight size={11} />
            </Link>
          </div>
        </motion.div>

        {/* Social Proof & Trust Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-left"
        >
          {/* Avatar Stack */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['M', 'V', 'R', 'S'].map((ch, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B3FF2] via-[#7C3AED] to-indigo-600 border border-[#0B1730] flex items-center justify-center text-white text-[10px] font-black shadow-sm"
                >
                  {ch}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400" />
                ))}
                <span className="text-white text-[11px] font-extrabold ml-1">4.9 / 5</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">5,000+ Enrolled Students</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              100% Verified
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
