import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import {
  Code2, Cpu, Cloud, BarChart2, Shield, Globe, Smartphone,
  Layers, Database, Zap, Lock, TrendingUp, Activity, Wifi,
  CheckCircle2, QrCode, Award, Star, Scan
} from 'lucide-react'

// ── Scene durations (total ≈ 35s) ──────────────────────────
const SCENES = [
  { type: 'intro',    duration: 6000  },  // MIVEXO brand reveal
  { type: 'domains',  duration: 9000  },  // "15+ Domains We Provide"
  { type: 'slogan',   duration: 9000  },  // Learn · Grow · Achieve slow-motion
  { type: 'scan',     duration: 8000  },  // Certificate scanning
  { type: 'verified', duration: 5000  },  // Verified stamp finale
]
const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0)

const DOMAIN_WORDS = [
  'Full Stack Web Dev',   'AI & Machine Learning',
  'Cloud & DevOps',       'Data Science',
  'Cybersecurity',        'UI/UX Design',
  'React Native',         'Python Programming',
  'Database Engineering', 'IoT & Embedded',
  'Blockchain & Web3',    'Digital Marketing',
  'Networking & Linux',   'Flutter & Dart',
  'Java Spring Boot',     'Data Analytics',
]

const DOMAIN_ICONS = [
  Code2, Cpu, Cloud, BarChart2, Shield, Globe,
  Smartphone, Layers, Database, Zap, Lock, TrendingUp,
  Activity, Wifi, Code2, BarChart2,
]

const DOMAIN_COLORS = [
  '#8B5CF6','#F59E0B','#06B6D4','#10B981',
  '#EF4444','#EC4899','#3B82F6','#A78BFA',
  '#F97316','#FCD34D','#6EE7B7','#F472B6',
  '#67E8F9','#A5F3FC','#FCA5A5','#34D399',
]

const SLOGANS = ['LEARN', 'GROW', 'ACHIEVE']

// Simplified QR grid SVG
function QRGrid({ size = 90, color = '#fff' }) {
  const cell = size / 21
  const p = [
    [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,0,1,1,0,0,1,0,0,1,1,0,1,0,1,0,1],
    [0,1,0,0,1,1,0,0,1,1,0,1,1,0,0,1,0,1,0,1,0],
    [1,0,1,0,1,0,1,1,0,1,1,1,0,0,1,0,1,0,1,0,1],
    [0,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,0],
    [1,1,0,1,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  ]
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {p.map((row, ri) => row.map((val, ci) =>
        val ? (
          <rect key={`${ri}-${ci}`}
            x={ci * cell} y={ri * cell}
            width={cell - 0.4} height={cell - 0.4}
            fill={color} rx={0.5}
          />
        ) : null
      ))}
    </svg>
  )
}

export default function MivexoIntroVideo({ onEnd }) {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())
  const rafRef   = useRef(null)

  // Compute active scene
  let sceneStart = 0, currentScene = SCENES[0], sceneElapsed = 0
  for (const sc of SCENES) {
    if (elapsed < sceneStart + sc.duration) {
      currentScene = sc; sceneElapsed = elapsed - sceneStart; break
    }
    sceneStart += sc.duration
  }
  const sceneProgress = sceneElapsed / currentScene.duration

  useEffect(() => {
    startRef.current = Date.now()
    const tick = () => {
      const t = Date.now() - startRef.current
      setElapsed(Math.min(t, TOTAL))
      if (t < TOTAL) rafRef.current = requestAnimationFrame(tick)
      else if (onEnd) setTimeout(onEnd, 500)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const totalProgress = elapsed / TOTAL

  return (
    <div className="relative w-full h-full min-h-[200px] bg-[#03030f] overflow-hidden flex flex-col select-none font-sans">

      {/* ── Progress Bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
          style={{ width: `${totalProgress * 100}%` }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          SCENE 1 — MIVEXO BRAND INTRO (0–6s)
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
      {currentScene.type === 'intro' && (
        <motion.div key="intro"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-violet-700/30 blur-[70px]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-500/30 blur-[50px]"
            />
          </div>
          {/* Cyber grid */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)',
            backgroundSize: '32px 32px'
          }} />

          {/* Logo + M icon */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Hexagon icon */}
            <div className="relative mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-dashed border-violet-500/30"
              />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-violet-500/50">
                <span className="text-2xl font-black text-white tracking-tight">M</span>
              </div>
            </div>

            {/* MIVEXO word — letter-by-letter */}
            <div className="flex items-center gap-0.5 mb-2">
              {'MIVEXO'.split('').map((ch, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                  className="text-3xl font-black text-white tracking-widest"
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-[11px] tracking-[0.3em] text-violet-300/80 uppercase font-semibold"
            >
              Learning Platform
            </motion.p>

            {/* Glowing line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
              className="mt-4 w-32 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent origin-center"
            />
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SCENE 2 — 15+ DOMAINS (6–15s)
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
      {currentScene.type === 'domains' && (
        <motion.div key="domains"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-5"
        >
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-60 rounded-full bg-indigo-700/20 blur-[80px]" />
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-5 relative z-10"
          >
            <span className="text-[10px] tracking-[0.3em] text-violet-400 uppercase font-bold">Explore Our</span>
            <h2 className="text-2xl font-black text-white mt-0.5 leading-tight">
              15+ Domains<br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                We Provide
              </span>
            </h2>
          </motion.div>

          {/* Domain word cloud — staggered */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 max-w-xs">
            {DOMAIN_WORDS.map((name, i) => {
              const delay = (i / DOMAIN_WORDS.length) * 4
              const Icon = DOMAIN_ICONS[i]
              const col  = DOMAIN_COLORS[i]
              return (
                <motion.div key={name}
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay, ease: 'backOut' }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-bold"
                  style={{
                    background: `${col}18`,
                    borderColor: `${col}45`,
                    color: col,
                  }}
                >
                  <Icon size={9} />
                  {name}
                </motion.div>
              )
            })}
          </div>

          {/* Counter badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 5, duration: 0.6, ease: 'backOut' }}
            className="mt-5 relative z-10 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30"
          >
            <span className="text-xs font-black text-white tracking-wide">
              20+ Specialization Tracks Available
            </span>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SCENE 3 — SLOGAN SLOW-MOTION (15–24s)
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
      {currentScene.type === 'slogan' && (
        <motion.div key="slogan"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          {/* Shifting gradient bg */}
          <motion.div
            animate={{ background: [
              'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.25) 0%, transparent 70%)',
              'radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.25) 0%, transparent 70%)',
              'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.20) 0%, transparent 70%)',
            ]}}
            transition={{ duration: 9, times: [0, 0.5, 1], ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
          />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
            backgroundSize: '36px 36px'
          }} />

          <div className="relative z-10 text-center px-6">
            {/* "Your Journey" prefix */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="text-[11px] tracking-[0.35em] text-slate-400 uppercase mb-5"
            >
              Your Journey Starts Here
            </motion.p>

            {/* LEARN */}
            <motion.div
              initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="text-5xl font-black tracking-widest text-white drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                LEARN
              </span>
            </motion.div>

            {/* Divider dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="flex items-center justify-center gap-3 my-2"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-violet-500/40" />
            </motion.div>

            {/* GROW */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="text-5xl font-black tracking-widest bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                GROW
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 5.0 }}
              className="flex items-center justify-center gap-3 my-2"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-emerald-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-emerald-500/40" />
            </motion.div>

            {/* ACHIEVE */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.5, delay: 5.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-5xl font-black tracking-widest bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                ACHIEVE
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 8.0 }}
              className="mt-5 text-[10px] text-slate-500 tracking-[0.2em] uppercase"
            >
              With MIVEXO Learning Platform
            </motion.p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SCENE 4 — CERTIFICATE SCANNING (24–32s)
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
      {currentScene.type === 'scan' && (
        <motion.div key="scan"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
        >
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-48 rounded-full bg-emerald-600/15 blur-[60px]" />
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.3em] text-emerald-400 uppercase font-bold mb-4 relative z-10"
          >
            Certificate Verification
          </motion.p>

          {/* Certificate card with scan beam */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'backOut', delay: 0.2 }}
            className="relative z-10 w-full max-w-[260px]"
          >
            <div className="relative bg-gradient-to-br from-[#0a1a12] via-[#071510] to-[#050f0a] rounded-2xl border border-emerald-700/40 p-4 shadow-2xl shadow-emerald-500/10 overflow-hidden">
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[8px] tracking-[0.2em] text-emerald-500 font-black uppercase">
                    MIVEXO · CERTIFICATE
                  </span>
                  <h4 className="text-[13px] font-black text-white mt-0.5 leading-tight">
                    Full Stack Development
                  </h4>
                  <p className="text-[9px] text-white/40 mt-0.5">Internship Programme · Batch 2026</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Award size={16} className="text-white" />
                </div>
              </div>

              {/* QR + Details row */}
              <div className="flex gap-3 items-center">
                {/* QR block */}
                <div className="relative shrink-0 p-1.5 bg-white rounded-xl shadow-inner overflow-hidden">
                  <QRGrid size={68} color="#111" />
                  {/* Scan beam */}
                  <motion.div
                    animate={{ y: [-4, 68, -4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-90 shadow-[0_0_6px_2px_rgba(16,185,129,0.5)]"
                    style={{ top: 6 }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1.5">
                  {[
                    { l: 'Student',       v: 'Rahul Sharma'      },
                    { l: 'Credential ID', v: 'MVX-2026-7841'     },
                    { l: 'Track',         v: 'Full Stack (MERN)' },
                    { l: 'Verify At',     v: 'mivexo.com/verify' },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <p className="text-[7px] text-white/35 uppercase tracking-wider font-semibold">{l}</p>
                      <p className="text-[9px] font-bold text-white/85 leading-none mt-0.5 truncate">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scan indicator */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center gap-1"
                >
                  <Scan size={11} className="text-emerald-400" />
                  <span className="text-[9px] font-bold text-emerald-400">Scanning QR Code…</span>
                </motion.div>
                <div className="flex items-center gap-0.5">
                  {[0,1,2,3,4].map(i => (
                    <Star key={i} size={8} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Corner scan brackets */}
              {['top-1 left-1','top-1 right-1','bottom-1 left-1','bottom-1 right-1'].map((pos, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className={`absolute ${pos} w-4 h-4 border-emerald-400/70`}
                  style={{
                    borderTopWidth:    pos.includes('top')    ? 2 : 0,
                    borderBottomWidth: pos.includes('bottom') ? 2 : 0,
                    borderLeftWidth:   pos.includes('left')   ? 2 : 0,
                    borderRightWidth:  pos.includes('right')  ? 2 : 0,
                    borderColor: 'rgba(52,211,153,0.7)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SCENE 5 — VERIFIED FINALE (32–37s)
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
      {currentScene.type === 'verified' && (
        <motion.div key="verified"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-5"
        >
          {/* Burst glow */}
          <motion.div
            animate={{ scale: [0.8, 1.4, 1], opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-emerald-500/30 blur-[40px] pointer-events-none"
          />

          {/* Tick icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40 mb-4"
          >
            <CheckCircle2 size={32} className="text-white" />
          </motion.div>

          {/* VERIFIED stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 1.4, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-black tracking-[0.15em] text-emerald-400 uppercase mb-1">
              Verified
            </h2>
            <p className="text-xs text-white/60 font-semibold">
              Certificate Authenticated · Blockchain Secured
            </p>
          </motion.div>

          {/* Credential chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="relative z-10 mt-4 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center gap-2"
          >
            <QrCode size={14} className="text-emerald-400" />
            <span className="text-[11px] font-bold text-emerald-300 font-mono">MVX-2026-7841</span>
          </motion.div>

          {/* MIVEXO footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="relative z-10 mt-6 flex flex-col items-center gap-1"
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-[11px] font-black tracking-[0.3em] text-white/50 mt-2 uppercase">
              MIVEXO
            </span>
            <span className="text-[9px] text-white/25 tracking-widest">mivexo.com</span>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)' }}
      />
    </div>
  )
}
