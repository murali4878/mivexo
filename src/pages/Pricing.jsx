import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  CheckSquare,
  ExternalLink,
  BookOpen
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import MobilePricing from '../components/mobile/MobilePricing'

const PAYMENT_LINKS = {
  lms: 'https://rzp.io/rzp/ypB0OAJ',         // ₹1,000 pre-register
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

// LMS pre-register shows all 20 tracks merged
courseOptions.lms = [...courseOptions.foundation, ...courseOptions.advanced]

const plans = [
  {
    key: 'lms',
    label: 'LMS Pre-Register',
    badge: 'Early Access',
    price: '₹1,000',
    amountNum: 1000,
    paymentUrl: PAYMENT_LINKS.lms,
    popular: false,
    isPreRegister: true,
    theme: {
      accentText: 'text-gray-900 dark:text-white',
      badgeBg: 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white',
      gradientBtn: 'from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600',
      cardGlow: 'hover:border-gray-400 dark:hover:border-white/20 shadow-sm',
      activeRing: 'ring-slate-950 dark:ring-white border-slate-950 dark:border-white shadow-xl',
      priceColor: 'from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-slate-200 dark:to-slate-400'
    },
    description: 'Secure your LMS seat early at a lower price. Pay the balance when your cohort launches.',
    features: [
      'Reserved LMS seat — guaranteed access',
      'Early bird discount on full program price',
      'Email confirmation & seat number assigned',
      'Full enrollment on cohort launch date'
    ]
  },
  {
    key: 'foundation',
    label: 'Foundation',
    badge: '8 Specialization Tracks',
    price: '₹3,000',
    amountNum: 3000,
    paymentUrl: PAYMENT_LINKS.foundation,
    popular: false,
    theme: {
      accentText: 'text-gray-900 dark:text-white',
      badgeBg: 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white',
      gradientBtn: 'from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800',
      cardGlow: 'hover:border-gray-400 dark:hover:border-white/20 shadow-sm',
      activeRing: 'ring-slate-950 dark:ring-white border-slate-950 dark:border-white shadow-xl',
      priceColor: 'from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-slate-200 dark:to-slate-400'
    },
    description: 'Business, Analytics, Design, Growth & Operations — 8 industry tracks.',
    features: [
      'Complete LMS Access across all modules',
      'Verified Internship Experience Letter',
      'QR-Verified Certificate',
      'Placement Question Bank (10,000+ MCQs)',
      'Live weekly mentor webinars',
      'Lifetime alumni community access'
    ]
  },
  {
    key: 'advanced',
    label: 'Advanced',
    badge: '12 Engineering Tracks',
    price: '₹3,500',
    amountNum: 3500,
    paymentUrl: PAYMENT_LINKS.advanced,
    popular: true,
    theme: {
      accentText: 'text-gray-900 dark:text-white',
      badgeBg: 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-800 dark:text-white',
      gradientBtn: 'from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800',
      cardGlow: 'hover:border-gray-400 dark:hover:border-white/20 shadow-sm',
      activeRing: 'ring-slate-950 dark:ring-white border-slate-950 dark:border-white shadow-xl',
      priceColor: 'from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-slate-200 dark:to-slate-400'
    },
    description: '12 production-level engineering tracks with live code reviews & deployment.',
    features: [
      'Complete LMS Access with source code repos',
      '1-on-1 Code Reviews & Architect Guidance',
      'Verified Internship Experience Letter',
      'QR-Verified Engineering Credential',
      'Placement Question Bank (10,000+ MCQs)',
      'Lifetime alumni community access'
    ]
  }
]

const faqs = [
  {
    q: 'What is LMS Pre-Register?',
    a: 'Pay ₹1,000 now to secure your seat before the cohort opens. You get a guaranteed LMS slot and pay the balance (₹2,000 or ₹2,500) when the batch launches. No extra charges beyond the full program price.'
  },
  {
    q: 'How does enrollment work?',
    a: 'Enter your name, email, and phone, select a plan, and click Enroll Now. You are redirected to our secure Razorpay checkout to pay via UPI, Card, or Net Banking.'
  },
  {
    q: 'Are all 20 tracks under these prices?',
    a: 'Yes — Foundation (₹3,000) covers 8 tracks and Advanced (₹3,500) covers 12 engineering tracks. Zero extra examination, registration, or certificate charges.'
  },
  {
    q: 'When do I get my Internship Letter and Certificate?',
    a: 'After completing your capstone project, your QR-verified internship letter and credential are issued instantly through the LMS.'
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
  const availableCourses = courseOptions[selectedPlanKey] || courseOptions.advanced

  const handlePlanSelect = (key) => {
    setSelectedPlanKey(key)
    if (courseOptions[key]) {
      setSelectedCourse(courseOptions[key][0])
    }
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
          domain: selectedCourse?.name || `${currentPlan.label} Specialization Track`,
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
    <>
      {/* Desktop Pricing: Clean, spacious layout for large screens */}
      <div className="hidden lg:block w-full">
        <div className="min-h-screen bg-white dark:bg-[#070913] text-gray-900 dark:text-slate-100 selection:bg-violet-600 selection:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[700px] h-[600px] bg-gradient-to-br from-violet-500/8 dark:from-violet-600/20 via-indigo-500/5 dark:via-indigo-500/15 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-400/6 dark:from-amber-500/12 via-orange-400/4 dark:via-rose-500/8 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-cyan-500/4 dark:bg-indigo-600/12 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(109,40,217,0.04)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <section className="pt-20 pb-6 px-4 sm:pt-24 sm:pb-12 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/60 text-[11px] font-semibold mb-4 sm:mb-6"
            >
              <BadgeCheck size={12} className="text-violet-500" />
              <span className="text-violet-700 dark:text-violet-300">20 Certified Tracks · Verified Credentials</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-3 sm:mb-5 text-gray-900 dark:text-white"
            >
              Simple,{' '}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Transparent
              </span>{' '}
              Pricing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="hidden sm:block text-gray-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6"
            >
              Select Foundation (₹3,000) or Advanced (₹3,500), pick your track, and enroll in minutes.
            </motion.p>

            <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <BadgeCheck size={14} className="text-violet-500" /> 20 Certified Tracks
              </span>
              <span className="w-px h-3 bg-gray-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-400 fill-amber-400" /> 4.9/5 Rating
              </span>
              <span className="w-px h-3 bg-gray-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-indigo-500" /> Instant LMS Access
              </span>
            </div>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-4 px-4 sm:py-6 sm:px-6 max-w-5xl mx-auto">
          {/* Plan Selector Toggle */}
          <div className="flex justify-center mb-6 sm:mb-10">
            <div className="p-1 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl flex items-center gap-1 w-full max-w-sm sm:max-w-lg shadow-sm">
              {plans.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handlePlanSelect(p.key)}
                  className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer text-center ${
                    selectedPlanKey === p.key
                      ? p.key === 'advanced'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25'
                        : p.key === 'foundation'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="sm:hidden block">{p.label.replace(' Pre-Register', '')}</span>
                  <span className="hidden sm:block">{p.label} · {p.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 items-stretch">
            {plans.map((p) => {
              const isSelected = selectedPlanKey === p.key
              const trackCount = p.isPreRegister ? null : courseOptions[p.key]?.length
              return (
                <motion.div
                  key={p.key}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handlePlanSelect(p.key)}
                  className={`relative rounded-2xl p-5 sm:p-7 cursor-pointer flex flex-col justify-between transition-all duration-200 border overflow-hidden ${
                    isSelected
                      ? p.key === 'advanced'
                        ? 'bg-gradient-to-b from-[#1a1040] to-[#0d0b1e] dark:from-[#1a1040] dark:to-[#070913] border-violet-500/50 shadow-2xl shadow-violet-500/20 ring-1 ring-violet-500/40'
                        : p.key === 'foundation'
                          ? 'bg-gradient-to-b from-[#0a1e2e] to-[#080f1c] dark:to-[#070913] border-cyan-500/40 shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                          : 'bg-gradient-to-b from-slate-900 to-[#080d18] dark:to-[#070913] border-slate-500/40 shadow-2xl ring-1 ring-slate-400/20'
                      : 'bg-white dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-violet-200 dark:hover:border-slate-600'
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 right-5 sm:right-7">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center gap-1 shadow-md shadow-violet-500/30">
                        <Sparkles size={9} /> Most Popular
                      </span>
                    </div>
                  )}

                  {p.isPreRegister && (
                    <div className="absolute -top-3 left-5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-600/50 text-amber-700 dark:text-amber-300">
                        Early Bird
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border inline-block mb-2.5 ${
                          isSelected
                            ? p.key === 'advanced'
                              ? 'bg-violet-500/20 border-violet-500/40 text-violet-200'
                              : p.key === 'foundation'
                                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
                                : 'bg-white/10 border-white/20 text-slate-300'
                            : 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300'
                        }`}>
                          {p.badge}
                        </span>
                        <h3 className={`text-xl sm:text-2xl font-black ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{p.label}</h3>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-1 ${
                          isSelected
                            ? p.key === 'advanced'
                              ? 'border-violet-400 bg-violet-500 text-white shadow-sm shadow-violet-500/50'
                              : p.key === 'foundation'
                                ? 'border-cyan-400 bg-cyan-500 text-white shadow-sm shadow-cyan-500/50'
                                : 'border-white bg-white text-slate-900'
                            : 'border-gray-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </div>
                    </div>

                    <p className={`text-xs mb-4 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-gray-500 dark:text-slate-400'}`}>
                      {p.description}
                    </p>

                    <div className={`flex items-baseline gap-1.5 pb-4 border-b mb-4 ${isSelected ? 'border-white/10' : 'border-gray-200 dark:border-slate-800/60'}`}>
                      <span className={`text-3xl sm:text-4xl font-black tracking-tight ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {p.price}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-slate-400' : 'text-gray-400 dark:text-slate-500'}`}>{p.isPreRegister ? '/ reservation' : '/ one-time'}</span>
                    </div>

                    <div className="space-y-2 mb-5 sm:mb-6">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className={`flex items-start gap-2 text-xs ${isSelected ? 'text-slate-200' : 'text-gray-600 dark:text-slate-300'}`}>
                          <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                            isSelected
                              ? p.key === 'advanced'
                                ? 'bg-violet-500/30 text-violet-200'
                                : p.key === 'foundation'
                                  ? 'bg-cyan-500/30 text-cyan-200'
                                  : 'bg-white/20 text-white'
                              : 'bg-violet-100 dark:bg-slate-800 text-violet-600 dark:text-slate-400'
                          }`}>
                            <Check size={9} strokeWidth={3} />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlanSelect(p.key)
                      }}
                      className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? p.key === 'advanced'
                            ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30 border-violet-500/50'
                            : p.key === 'foundation'
                              ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border-cyan-500/50'
                              : 'bg-white text-slate-950 hover:bg-slate-100 shadow-md border-white/50'
                          : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-slate-500'
                      }`}
                    >
                      {isSelected ? (
                        <><Check size={14} /> Selected</>
                      ) : (
                        <>{p.isPreRegister ? 'Pre-Register' : `Select ${p.label}`} · {p.price}</>
                      )}
                    </button>

                    {/* LMS Login shortcut on the card */}
                    {p.isPreRegister && (
                      <Link
                        to="/lms"
                        onClick={(e) => e.stopPropagation()}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
                        isSelected
                          ? 'border-white/20 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                          : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-violet-300 dark:hover:border-slate-500 hover:text-violet-700 dark:hover:text-slate-200'
                      }`}
                      >
                        <BookOpen size={14} /> Already enrolled? Login to LMS
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* REGISTRATION STUDIO */}
          <div ref={formRef} className="max-w-3xl mx-auto scroll-mt-20">
            <div className="relative rounded-2xl bg-white dark:bg-slate-900/95 border border-gray-200 dark:border-slate-800 p-4 sm:p-8 md:p-10 overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600" />

              {/* Studio Header */}
              <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-gray-200 dark:border-slate-800">
                <div>
                  <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">Complete Enrollment</h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 dark:text-slate-500 mt-0.5">
                    {currentPlan.isPreRegister
                      ? 'Reserve your LMS seat — pay ₹1,000 now'
                      : 'Enter your details and proceed to payment'}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 dark:text-slate-500 block">Total</span>
                    <span className={`text-lg font-bold ${currentPlan.theme.accentText}`}>{currentPlan.price}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* 1. COURSE SELECTION — desktop shows tiles for all plans; LMS shows a compact list on mobile too */}
                <div className={currentPlan.isPreRegister ? 'block' : 'hidden lg:block'}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Layers size={12} />
                      {currentPlan.isPreRegister
                        ? `Preferred Track (all ${availableCourses.length} available)`
                        : `Select Track (${availableCourses.length} available)`}
                    </label>
                    {!currentPlan.isPreRegister && (
                      <span className="text-[11px] text-gray-500 dark:text-slate-500">Click to choose</span>
                    )}
                  </div>

                  {/* LMS: compact scrollable list on mobile, tiles on desktop */}
                  {currentPlan.isPreRegister ? (
                    <>
                      {/* Mobile: native select dropdown */}
                      <div className="lg:hidden">
                        <div className="relative">
                          <select
                            value={selectedCourse.id}
                            onChange={(e) => {
                              const found = availableCourses.find(c => c.id === e.target.value)
                              if (found) setSelectedCourse(found)
                            }}
                            className="w-full appearance-none pl-3 pr-8 py-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-slate-900 dark:focus:border-slate-600 transition-colors cursor-pointer"
                          >
                            {availableCourses.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                          <ArrowRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 rotate-90 pointer-events-none" />
                        </div>
                        {selectedCourse && (
                          <p className="text-[11px] text-gray-500 dark:text-slate-500 mt-1.5 pl-1">{selectedCourse.stack}</p>
                        )}
                      </div>

                      {/* Desktop: tile grid */}
                      <div className="hidden lg:grid lg:grid-cols-4 gap-2.5">
                        {availableCourses.map((c) => {
                          const isChosen = selectedCourse.id === c.id
                          const IconComponent = c.icon
                          return (
                            <motion.div
                              key={c.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => setSelectedCourse(c)}
                              className={`p-3 rounded-xl cursor-pointer border transition-all duration-150 flex flex-col gap-1.5 ${
                                isChosen
                                  ? 'bg-gray-100 dark:bg-slate-800 border-slate-950 dark:border-slate-600 ring-1 ring-slate-950 dark:ring-slate-500/60'
                                  : 'bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white bg-gradient-to-br ${c.color}`}>
                                  <IconComponent size={12} />
                                </div>
                                {isChosen && <Check size={11} className="text-gray-900 dark:text-slate-300" strokeWidth={2.5} />}
                              </div>
                              <p className="text-[10px] font-medium text-gray-800 dark:text-slate-300 leading-snug">{c.name}</p>
                            </motion.div>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    // Foundation / Advanced: full tile grid (desktop only)
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableCourses.map((c) => {
                        const isChosen = selectedCourse.id === c.id
                        const IconComponent = c.icon
                        return (
                          <motion.div
                            key={c.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => setSelectedCourse(c)}
                            className={`p-3.5 rounded-xl cursor-pointer border transition-all duration-150 flex flex-col justify-between ${
                              isChosen
                                ? 'bg-gray-100 dark:bg-slate-800 border-slate-950 dark:border-white ring-1 ring-slate-950 dark:ring-white'
                                : 'bg-gray-50 dark:bg-slate-950/60 border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${c.color}`}>
                                  <IconComponent size={14} />
                                </div>
                                <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-400">
                                  {c.tag}
                                </span>
                              </div>
                              <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-1 leading-snug">{c.name}</h4>
                              <p className="text-[10px] text-gray-500 dark:text-slate-500 leading-tight">{c.stack}</p>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-gray-200 dark:border-slate-800/60 flex items-center justify-between">
                              <span className="text-[10px] text-gray-500 dark:text-slate-500">Verified Credential</span>
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isChosen
                                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white'
                                  : 'border-gray-300 dark:border-slate-600'
                              }`}>
                                {isChosen && <Check size={8} strokeWidth={3} />}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* 2. STUDENT CONTACT FIELDS */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-slate-400 flex items-center gap-1.5 mb-3">
                    <User size={12} /> Contact Details
                  </label>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 dark:text-slate-400 mb-1">Full Name *</label>
                      <div className="relative">
                        <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600" />
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-slate-900 dark:focus:border-slate-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 dark:text-slate-400 mb-1">Email *</label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-slate-900 dark:focus:border-slate-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 dark:text-slate-400 mb-1">Phone *</label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-slate-900 dark:focus:border-slate-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. ORDER SUMMARY */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400">
                    <span>Plan</span>
                    <span className="text-gray-900 dark:text-slate-200 font-medium">{currentPlan.label} · {currentPlan.badge}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400">
                    <span>Track</span>
                    <span className="text-gray-900 dark:text-slate-200 font-medium text-right max-w-[65%] leading-tight">{selectedCourse.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400">
                    <span>Includes</span>
                    <span className="text-gray-700 dark:text-slate-400 font-medium">
                      {currentPlan.isPreRegister ? 'Reserved LMS seat' : 'LMS + Certificate + Internship'}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-slate-800" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{currentPlan.price}</span>
                  </div>
                </div>

                {/* 4. ACTION BUTTONS */}
                <div className="space-y-3">
                  {/* Primary enroll / reserve button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 active:scale-[0.99]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock size={15} />
                        {currentPlan.isPreRegister ? 'Reserve My Seat · ₹1,000' : 'Enroll Now · ' + currentPlan.price}
                        <ArrowRight size={15} />
                      </span>
                    )}
                  </button>

                  {/* LMS Login — large, prominent secondary button */}
                  {currentPlan.isPreRegister && (
                    <Link
                      to="/lms"
                      className="w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                    >
                      <BookOpen size={16} />
                      Login to LMS Portal
                      <ExternalLink size={13} className="text-gray-400 dark:text-slate-500" />
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-gray-500 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={11} /> Secure Checkout
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <CreditCard size={11} /> UPI · Cards · Net Banking
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-gray-100 dark:border-slate-800/60">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/50 text-[11px] font-semibold text-violet-700 dark:text-violet-300 mb-3">
              <HelpCircle size={11} /> FAQ
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 shadow-xs hover:border-violet-200 dark:hover:border-slate-700 transition-colors">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shrink-0">
                    <HelpCircle size={11} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  {f.q}
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed pl-7">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>

  {/* Mobile Pricing: Dedicated mobile-first layout with Homepage CSS & compact small pricing */}
  <div className="block lg:hidden w-full">
    <MobilePricing
      plans={plans}
      currentPlan={currentPlan}
      selectedPlanKey={selectedPlanKey}
      onSelectPlan={handlePlanSelect}
      selectedCourse={selectedCourse}
      onSelectCourse={setSelectedCourse}
      availableCourses={availableCourses}
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      loading={loading}
      faqs={faqs}
    />
  </div>
</>
  )
}
