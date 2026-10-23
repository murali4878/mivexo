import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  ChevronDown,
  BookOpen,
  Plus,
  Minus
} from 'lucide-react'

export default function MobilePricing({
  plans,
  currentPlan,
  selectedPlanKey,
  onSelectPlan,
  selectedCourse,
  onSelectCourse,
  availableCourses,
  formData,
  onInputChange,
  onSubmit,
  loading,
  faqs
}) {
  const [openFaq, setOpenFaq] = useState(null)
  const formSectionRef = useRef(null)

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#070E1E] text-slate-900 dark:text-white pb-24 overflow-x-hidden font-sans transition-colors">
      {/* Soft Ambient Background Glow (matching homepage mobile hero) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-400/15 dark:bg-violet-600/15 blur-[90px]" />
        <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full bg-blue-400/15 dark:bg-cyan-500/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 pt-6">
        {/* Mobile Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[11px] font-bold mb-2">
            <BadgeCheck size={13} className="text-violet-600 dark:text-violet-400" />
            <span>20 Industry Tracks · Verified Credentials</span>
          </div>

          <h1 className="text-2xl xs:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-1.5">
            Simple,{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Affordable
            </span>{' '}
            Pricing
          </h1>

          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            One-time payment. Zero hidden fees. Includes full LMS access, verified internship certificate & code reviews.
          </p>

          {/* Quick Micro-Trust Chips */}
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" /> 4.9/5
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-violet-500" /> Instant LMS
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-500" /> College Approved
            </span>
          </div>
        </div>

        {/* 1. COMPACT 3-TAB SEGMENTED PLAN SWITCHER ("mobile fit small pricing") */}
        <div className="mb-4">
          <div className="p-1 rounded-xl bg-gray-100 dark:bg-[#0d1628] border border-gray-200 dark:border-white/10 grid grid-cols-3 gap-1 shadow-2xs">
            {plans.map((p) => {
              const isSelected = selectedPlanKey === p.key
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => onSelectPlan(p.key)}
                  className={`py-2 px-1 rounded-lg text-center transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider leading-none mb-1 font-bold">
                    {p.key === 'lms' ? 'Pre-Reg' : p.label}
                  </div>
                  <div className="text-xs font-black tracking-tight">{p.price}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. COMPACT ACTIVE PLAN CARD */}
        <div className="relative rounded-2xl bg-white dark:bg-[#0d1628] border border-gray-200 dark:border-white/15 p-4 shadow-sm mb-5 transition-all">
          {/* Top Row: Badge & Popular tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              {currentPlan.badge}
            </span>

            {currentPlan.popular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs">
                <Sparkles size={10} /> Popular
              </span>
            )}

            {currentPlan.isPreRegister && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Early Bird
              </span>
            )}
          </div>

          {/* Plan Name & Price Row */}
          <div className="flex items-baseline justify-between gap-2 mb-2 pb-2.5 border-b border-gray-100 dark:border-white/10">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {currentPlan.label}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {currentPlan.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentPlan.price}
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">
                {currentPlan.isPreRegister ? '/ reservation' : '/ all-inclusive'}
              </span>
            </div>
          </div>

          {/* Features List (Compact 4-bullets) */}
          <div className="space-y-1.5 mb-3.5">
            {currentPlan.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-[11px] font-medium leading-snug">{feat}</span>
              </div>
            ))}
          </div>

          {/* Fast Enroll CTA (Jumps smoothly to Form) */}
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>
              {currentPlan.isPreRegister
                ? 'Pre-Register for ₹1,000'
                : `Enroll in ${currentPlan.label} (${currentPlan.price})`}
            </span>
            <ArrowRight size={13} />
          </button>

          {currentPlan.isPreRegister && (
            <Link
              to="/lms"
              className="mt-2 w-full py-2 rounded-xl text-center text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 flex items-center justify-center gap-1 border border-gray-200 dark:border-white/10"
            >
              <BookOpen size={12} /> Already enrolled? Student Login
            </Link>
          )}
        </div>

        {/* 3. QUICK 3-PLAN OVERVIEW MINI COMPARISON */}
        <div className="mb-6 p-3 rounded-2xl bg-gray-50 dark:bg-[#0d1628]/60 border border-gray-200 dark:border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2 px-1">
            Compare All Plans At a Glance:
          </p>

          <div className="space-y-1.5">
            {plans.map((p) => {
              const isSelected = selectedPlanKey === p.key
              return (
                <div
                  key={p.key}
                  onClick={() => onSelectPlan(p.key)}
                  className={`p-2 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-[#070E1E] border-violet-500 shadow-2xs'
                      : 'bg-white/60 dark:bg-white/5 border-transparent hover:border-gray-200 dark:hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-violet-600 bg-violet-600 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && <Check size={8} strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {p.label}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {p.badge}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-black text-slate-900 dark:text-white shrink-0">
                    {p.price}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. COMPACT MOBILE REGISTRATION STUDIO */}
        <div ref={formSectionRef} className="scroll-mt-16 mb-6">
          <div className="rounded-2xl bg-white dark:bg-[#0d1628] border border-gray-200 dark:border-white/15 p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-white/10">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Complete Enrollment
                </h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {currentPlan.isPreRegister
                    ? 'Reserve your seat · Pay ₹1,000 now'
                    : `Direct admission for ${currentPlan.label}`}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Total</span>
                <span className="text-sm font-black text-violet-600 dark:text-violet-400">
                  {currentPlan.price}
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              {/* Specialization Track Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Layers size={11} className="text-violet-500" />
                  <span>Choose Specialization Track *</span>
                </label>

                <div className="relative">
                  <select
                    value={selectedCourse?.id || ''}
                    onChange={(e) => {
                      const found = availableCourses.find((c) => c.id === e.target.value)
                      if (found) onSelectCourse(found)
                    }}
                    className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-[#070E1E] border border-gray-200 dark:border-white/15 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-violet-500 cursor-pointer"
                  >
                    {availableCourses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>

                {selectedCourse?.stack && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-1 line-clamp-1">
                    Tech: {selectedCourse.stack}
                  </p>
                )}
              </div>

              {/* Student Contact Fields */}
              <div className="space-y-2.5 pt-1">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Student full name"
                      value={formData.name}
                      onChange={onInputChange}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-[#070E1E] border border-gray-200 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@college.edu / gmail.com"
                      value={formData.email}
                      onChange={onInputChange}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-[#070E1E] border border-gray-200 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={onInputChange}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-[#070E1E] border border-gray-200 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Strip */}
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#070E1E] border border-gray-100 dark:border-white/10 text-[11px] flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {currentPlan.label}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[190px] block">
                    {selectedCourse?.name || 'Selected Specialization'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {currentPlan.price}
                  </span>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    Zero Taxes Extra
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Lock size={13} />
                    <span>
                      {currentPlan.isPreRegister
                        ? 'Reserve Seat · Pay ₹1,000'
                        : `Proceed to Pay · ${currentPlan.price}`}
                    </span>
                    <ArrowRight size={13} />
                  </span>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-500" /> Secure Checkout
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <CreditCard size={11} /> UPI / GPay / Cards
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* 5. MOBILE ACCORDION FAQS (Matching homepage MobileFAQ CSS) */}
        <div className="mb-6">
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[10px] font-bold">
              <HelpCircle size={11} /> Got Questions?
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
              Pricing & Admission FAQ
            </h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-violet-50/70 dark:bg-[#0d1628] border-violet-400/60 dark:border-violet-600/60 shadow-xs'
                      : 'bg-white dark:bg-[#0d1628]/60 border-gray-200 dark:border-white/10'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 p-3 text-left cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {isOpen ? <Minus size={11} /> : <Plus size={11} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div className="px-3 pb-3 pt-0 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed border-t border-violet-100 dark:border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Sticky Mobile Quick Enroll Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#070E1E]/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10 px-4 py-2.5 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">
              Selected: {currentPlan.label}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {currentPlan.price}
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="py-2 px-4 rounded-xl bg-slate-950 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <span>Complete Enrollment</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
