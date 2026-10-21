import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Star,
  Zap,
  User,
  Mail,
  Phone,
  HelpCircle,
  BadgeCheck,
  CreditCard,
  Layers,
  Code2,
  Cpu,
  BarChart3,
  Cloud,
  Shield,
  Palette,
  TrendingUp,
  Briefcase,
  DollarSign,
  Smartphone,
  Binary,
  Radio,
  Gamepad2,
  Users2,
  Truck,
  Database,
  Glasses,
  Dna,
  CheckSquare
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

const PAYMENT_LINKS = {
  foundation: 'https://rzp.io/rzp/KEDQZrF', // ₹3,000
  advanced: 'https://rzp.io/rzp/WCFgB2HX'   // ₹3,500
}

// ALL 20 TRACKS FROM PROGRAMS PAGE
const courseOptions = {
  foundation: [
    {
      id: 'dm',
      name: 'Digital Marketing & Growth Hacking',
      tag: 'Fast Scaling',
      icon: TrendingUp,
      stack: 'SEO, Google Ads, Meta Campaigns, GA4',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'bi',
      name: 'Business Analytics & Power BI',
      tag: 'Corporate Essential',
      icon: BarChart3,
      stack: 'Power BI, DAX, SQL, Advanced Excel',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'pm',
      name: 'Product Management Masterclass',
      tag: 'Leadership',
      icon: Briefcase,
      stack: 'PRD, Agile, Sprints, Metrics, GTM',
      color: 'from-indigo-500 to-violet-600'
    },
    {
      id: 'fm',
      name: 'Financial Modeling & Valuation',
      tag: 'High Finance',
      icon: DollarSign,
      stack: 'DCF, LBO, 3-Statement Modeling, Comps',
      color: 'from-sky-500 to-blue-700'
    },
    {
      id: 'ux',
      name: 'UI/UX Design & Design Systems',
      tag: 'Creative Core',
      icon: Palette,
      stack: 'Figma, Auto-layout, Tokens, User Testing',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'hr',
      name: 'HR Analytics & Talent Operations',
      tag: 'People Ops',
      icon: Users2,
      stack: 'Workforce Planning, Attrition, Metrics',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'sc',
      name: 'Supply Chain & Logistics Operations',
      tag: 'Operations',
      icon: Truck,
      stack: 'Inventory, Demand Forecasting, ERP',
      color: 'from-sky-600 to-indigo-700'
    },
    {
      id: 'bio',
      name: 'Bioinformatics & Computational Genomics',
      tag: 'BioTech',
      icon: Dna,
      stack: 'BioPython, NGS, BLAST, RNA-Seq',
      color: 'from-cyan-600 to-teal-700'
    }
  ],
  advanced: [
    {
      id: 'fs',
      name: 'Full Stack Web Development (MERN & Next.js)',
      tag: 'Trending #1',
      icon: Code2,
      stack: 'React 18, Next.js 14, Node.js, MongoDB',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence & Deep Learning',
      tag: 'Hot Track',
      icon: Cpu,
      stack: 'PyTorch, LLMs, RAG, Transformers, Vision',
      color: 'from-orange-500 to-rose-600'
    },
    {
      id: 'ds',
      name: 'Data Science & Machine Learning',
      tag: 'High Placement',
      icon: BarChart3,
      stack: 'Python, Scikit-learn, SQL, Statistics',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'cloud',
      name: 'Cloud Computing & DevOps Engineering',
      tag: 'Enterprise Need',
      icon: Cloud,
      stack: 'AWS, Docker, Kubernetes, Terraform, CI/CD',
      color: 'from-amber-600 to-yellow-500'
    },
    {
      id: 'cyber',
      name: 'Cybersecurity & Ethical Hacking',
      tag: 'Critical Skill',
      icon: Shield,
      stack: 'Kali Linux, OWASP Top 10, Burp, Pentest',
      color: 'from-red-500 to-amber-600'
    },
    {
      id: 'mobile',
      name: 'Mobile App Dev (React Native & Flutter)',
      tag: 'Cross-Platform',
      icon: Smartphone,
      stack: 'React Native, Flutter, Dart, Firebase',
      color: 'from-orange-600 to-amber-500'
    },
    {
      id: 'web3',
      name: 'Blockchain & Web3 Engineering',
      tag: 'Future Tech',
      icon: Binary,
      stack: 'Solidity, Ethereum, Hardhat, Smart Contracts',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'iot',
      name: 'IoT & Embedded Systems',
      tag: 'Hardware+Cloud',
      icon: Radio,
      stack: 'ESP32, Arduino, MQTT, Raspberry Pi, C++',
      color: 'from-amber-500 to-red-500'
    },
    {
      id: 'game',
      name: 'Game Development & 3D Interactive (Unity)',
      tag: 'Gaming Core',
      icon: Gamepad2,
      stack: 'Unity Engine, C#, 3D Physics, Shaders',
      color: 'from-rose-600 to-orange-600'
    },
    {
      id: 'bigdata',
      name: 'Big Data Engineering & Cloud Pipelines',
      tag: 'High Scale',
      icon: Database,
      stack: 'Apache Spark, Kafka, Airflow, Snowflake',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 'arvr',
      name: 'Augmented & Virtual Reality (AR / VR)',
      tag: 'Spatial Tech',
      icon: Glasses,
      stack: 'Unity XR, WebXR, ARKit, ARCore, Meta Quest',
      color: 'from-amber-600 to-rose-600'
    },
    {
      id: 'sdet',
      name: 'Software Testing & Automation (SDET)',
      tag: 'Zero Defect',
      icon: CheckSquare,
      stack: 'Cypress, Selenium, Playwright, Postman',
      color: 'from-yellow-600 to-amber-600'
    }
  ]
}

const plans = [
  {
    key: 'foundation',
    label: 'Foundation',
    badge: 'Non-Technical Specializations',
    price: '₹3,000',
    amountNum: 3000,
    paymentUrl: PAYMENT_LINKS.foundation,
    popular: false,
    theme: {
      accentText: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
      gradientBtn: 'from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500',
      cardGlow: 'hover:border-cyan-500/60 shadow-cyan-500/10',
      activeRing: 'ring-cyan-500 border-cyan-500 shadow-cyan-500/20',
      priceColor: 'from-cyan-300 via-blue-300 to-indigo-300'
    },
    description: '8 Industry specializations across Business, Analytics, Design, Growth & Operations.',
    features: [
      'Complete LMS Access across all curriculum modules',
      'Verified Internship Experience Letter',
      'Cryptographic QR-Verified Certificate',
      'Placement Question Bank (10,000+ MCQs)',
      'Live weekly mentor review webinars',
      'Permanent lifetime alumni community access'
    ]
  },
  {
    key: 'advanced',
    label: 'Advanced',
    badge: 'Technical & Engineering Specializations',
    price: '₹3,500',
    amountNum: 3500,
    paymentUrl: PAYMENT_LINKS.advanced,
    popular: true,
    theme: {
      accentText: 'text-amber-400',
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      gradientBtn: 'from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950',
      cardGlow: 'hover:border-amber-500/60 shadow-amber-500/15',
      activeRing: 'ring-amber-500 border-amber-400 shadow-amber-500/25',
      priceColor: 'from-amber-300 via-orange-300 to-rose-300'
    },
    description: '12 Production-level engineering tracks with live code reviews and deployment.',
    features: [
      'Complete LMS Access with source code repositories',
      '1-on-1 Code Reviews & Architect Guidance',
      'Verified Internship Experience Letter',
      'Cryptographic QR-Verified Engineering Credential',
      'Placement Question Bank (10,000+ MCQs)',
      'Permanent lifetime alumni community access'
    ]
  }
]

const faqs = [
  {
    q: 'How does enrollment work?',
    a: 'Simply enter your name, email, and phone number, choose any of our 20 tracks, and click ENROLL NOW. You will instantly be redirected to our secure Razorpay checkout page to complete payment via UPI, Card, or Net Banking.'
  },
  {
    q: 'Are all 20 tracks included under these two prices?',
    a: 'Yes! Every technical track is ₹3,500 and non-technical track is ₹3,000. There are zero extra examination, registration, or certificate release charges.'
  },
  {
    q: 'When do I get my verified Internship Letter and Certificate?',
    a: 'Upon completing your hands-on capstone project within your track, your official verified internship letter and QR-cryptographic certificate are generated.'
  }
]

export default function Pricing() {
  const [selectedPlanKey, setSelectedPlanKey] = useState('advanced')
  const [selectedCourse, setSelectedCourse] = useState(courseOptions.advanced[0])
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)
  const { user } = useAuth()

  // Simplified: Only Name, Email, Phone
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const currentPlan = plans.find((p) => p.key === selectedPlanKey)
  const availableCourses = courseOptions[selectedPlanKey]

  const handlePlanSelect = (key) => {
    setSelectedPlanKey(key)
    setSelectedCourse(courseOptions[key][0])
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please enter your Name, Email, and Phone Number.')
      return
    }

    setLoading(true)

    try {
      try {
        await api.post('/api/auth/register', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: 'Password@123',
          domain: selectedCourse.name,
          plan: currentPlan.key,
          amount: currentPlan.amountNum
        })
      } catch (_) {
        // Safe fallback
      }

      toast.success(`Redirecting to secure checkout (${currentPlan.price})...`, {
        duration: 3000,
        icon: '🔒'
      })

      setTimeout(() => {
        window.location.href = currentPlan.paymentUrl
      }, 600)
    } catch (err) {
      window.location.href = currentPlan.paymentUrl
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      {/* Radiant Glow Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-blue-600/20 via-cyan-500/15 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/15 via-rose-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[650px] h-[450px] bg-indigo-600/15 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <section className="pt-24 pb-12 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm font-semibold mb-6 shadow-xl"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent font-bold">
                20 Certified Specialization Tracks · Verified Internship Credentials
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5"
            >
              Choose Your Track. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-amber-300 bg-clip-text text-transparent">
                One All-Inclusive Pass.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-normal"
            >
              All 20 programs available. Select between <strong className="text-cyan-300">Foundation (₹3,000)</strong> or <strong className="text-amber-300">Advanced (₹3,500)</strong>, pick your track, and complete enrollment.
            </motion.p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-slate-200">
                <BadgeCheck size={16} className="text-cyan-400" /> 20 Certified Tracks
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Star size={16} className="text-amber-400 fill-amber-400" /> 4.9/5 Rating
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Zap size={16} className="text-rose-400" /> Instant LMS Access
              </span>
            </div>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-6 px-6 max-w-5xl mx-auto">
          {/* Plan Selector Toggle */}
          <div className="flex justify-center mb-10">
            <div className="p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center gap-2 backdrop-blur-md shadow-2xl">
              <button
                type="button"
                onClick={() => handlePlanSelect('foundation')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedPlanKey === 'foundation'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Foundation · ₹3,000 (8 Tracks)
              </button>
              <button
                type="button"
                onClick={() => handlePlanSelect('advanced')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedPlanKey === 'advanced'
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black shadow-lg shadow-amber-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles size={14} /> Advanced · ₹3,500 (12 Tracks)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
            {plans.map((p) => {
              const isSelected = selectedPlanKey === p.key
              const trackCount = courseOptions[p.key].length
              return (
                <motion.div
                  key={p.key}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => handlePlanSelect(p.key)}
                  className={`relative rounded-3xl p-8 sm:p-10 cursor-pointer flex flex-col justify-between transition-all duration-300 border backdrop-blur-xl ${
                    isSelected
                      ? `bg-slate-900/90 ${p.theme.activeRing} shadow-2xl ring-2 ring-offset-2 ring-offset-slate-950`
                      : `bg-slate-900/40 border-slate-800 ${p.theme.cardGlow}`
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 right-8">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 shadow-md shadow-amber-500/30 flex items-center gap-1">
                        <Sparkles size={12} /> Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${p.theme.badgeBg} inline-block mb-3`}>
                          {p.badge} ({trackCount} Tracks)
                        </span>
                        <h3 className="text-3xl font-black text-white">{p.label}</h3>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? p.key === 'advanced'
                              ? 'border-amber-400 bg-amber-400 text-slate-950'
                              : 'border-cyan-400 bg-cyan-400 text-slate-950'
                            : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3.5} />}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="flex items-baseline gap-2 pb-6 border-b border-slate-800/80 mb-6">
                      <span className={`text-5xl font-black tracking-tight bg-gradient-to-r ${p.theme.priceColor} bg-clip-text text-transparent`}>
                        {p.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">/ one-time · all inclusive</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        Included in this pass:
                      </p>
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check size={16} className={`${p.theme.accentText} shrink-0 mt-0.5`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlanSelect(p.key)
                      }}
                      className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
                        isSelected
                          ? `bg-gradient-to-r ${p.theme.gradientBtn} shadow-lg`
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {isSelected ? '✓ Selected Track' : `Select ${p.label} (${p.price})`}
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* REGISTRATION STUDIO WITH ALL 20 TRACKS */}
          <div ref={formRef} className="max-w-4xl mx-auto scroll-mt-20">
            <div className="relative rounded-3xl bg-slate-900/95 border border-slate-800 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                  currentPlan.key === 'advanced'
                    ? 'from-amber-400 via-orange-500 to-rose-500'
                    : 'from-cyan-400 via-blue-500 to-indigo-600'
                }`}
              />

              {/* Studio Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 mb-2">
                    <Lock size={12} className={currentPlan.theme.accentText} />
                    Instant Enrollment Desk
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Enrollment Details</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Select your program track from the cards below and enter your contact details.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4 shrink-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Tier</span>
                    <span className="text-sm font-black text-white">{currentPlan.label}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Due</span>
                    <span className={`text-xl font-black ${currentPlan.theme.accentText}`}>{currentPlan.price}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. VISUAL COURSE SELECTION TILES - ALL AVAILABLE TRACKS */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Layers size={16} className={currentPlan.theme.accentText} />
                      1. Select Your Track ({availableCourses.length} Available in {currentPlan.label}):
                    </label>
                    <span className="text-xs text-slate-400 font-medium">Click tile to choose</span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {availableCourses.map((c) => {
                      const isChosen = selectedCourse.id === c.id
                      const IconComponent = c.icon
                      return (
                        <motion.div
                          key={c.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCourse(c)}
                          className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                            isChosen
                              ? currentPlan.key === 'advanced'
                                ? 'bg-amber-950/20 border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400'
                                : 'bg-cyan-950/20 border-cyan-400/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${c.color}`}
                              >
                                <IconComponent size={16} />
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                {c.tag}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-snug">
                              {c.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              {c.stack}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-semibold">Verified Credential</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                isChosen
                                  ? currentPlan.key === 'advanced'
                                    ? 'bg-amber-400 border-amber-400 text-slate-950'
                                    : 'bg-cyan-400 border-cyan-400 text-slate-950'
                                  : 'border-slate-600'
                              }`}
                            >
                              {isChosen && <Check size={10} strokeWidth={3} />}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* 2. STUDENT CONTACT FIELDS */}
                <div>
                  <div className="mb-4">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <User size={16} className={currentPlan.theme.accentText} />
                      2. Student Contact Details:
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Murali V."
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="murali@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">WhatsApp / Phone *</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. ORDER SUMMARY */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
                    <span>Selected Program:</span>
                    <span className="font-bold text-slate-100">{selectedCourse.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
                    <span>Plan Category:</span>
                    <span className="font-semibold text-slate-300">{currentPlan.label} ({currentPlan.badge})</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
                    <span>LMS Activation &amp; Credentials:</span>
                    <span className="font-semibold text-emerald-400">Instant Access (Included)</span>
                  </div>
                  <div className="h-px bg-slate-800 my-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-white block">Total Investment:</span>
                      <span className="text-xs text-slate-400">All modules, mentorship & certificate included</span>
                    </div>
                    <span className={`text-3xl font-black ${currentPlan.theme.accentText}`}>
                      {currentPlan.price}
                    </span>
                  </div>
                </div>

                {/* 4. ENROLL NOW BUTTON (DELETED 'PROCEED TO PAY ON RAZORPAY') */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-2xl transition-all cursor-pointer ${
                      currentPlan.key === 'advanced'
                        ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 shadow-amber-500/25'
                        : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white shadow-cyan-500/25'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Lock size={18} className="animate-spin" /> Processing Enrollment...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 tracking-wide font-black uppercase text-base">
                        <Lock size={18} /> ENROLL NOW <ArrowRight size={18} />
                      </span>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400" /> 256-Bit Encrypted Secure Checkout
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <CreditCard size={14} className="text-slate-400" /> UPI · GPay · PhonePe · Cards · Net Banking
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-900">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <h3 className="text-base font-bold text-white flex items-center gap-2.5 mb-2">
                  <HelpCircle size={18} className="text-cyan-400 shrink-0" />
                  {f.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
