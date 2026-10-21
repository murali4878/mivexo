import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone, User, ArrowRight, ChevronDown, Sparkles, CheckCircle2, ShieldAlert, BookOpen, Send, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const domains = [
  'Full Stack Web Development (MERN & Next.js)',
  'Artificial Intelligence & Deep Learning',
  'Data Science & Machine Learning',
  'Cloud Computing & DevOps Engineering',
  'Cybersecurity & Ethical Hacking',
  'UI/UX Design & Product Strategy',
  'Digital Marketing & Growth Hacking',
  'Business Analytics & Power BI'
]

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    domain: domains[0]
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      toast.error('Please enter your Name and Email address')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast.success('Training Application Submitted Successfully!')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B1A] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 dark:bg-violet-600/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#161633] rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl p-7 sm:p-10"
        >
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-violet-500/30">
                  <BookOpen size={28} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/50 px-3 py-1 rounded-full border border-violet-300 dark:border-violet-700">
                  Program Admission &amp; Enrollment
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">
                  Apply for Training Program
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
                  Submit your application to secure your seat. Only paid &amp; verified students receive LMS training portal credentials.
                </p>
              </div>

              {/* Policy Banner: Can only log in, cannot create LMS directly */}
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/70">
                <div className="flex items-start gap-3">
                  <ShieldAlert size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-semibold">
                    <strong className="font-black block text-amber-800 dark:text-amber-300 mb-0.5">
                      LMS Access Policy:
                    </strong>
                    Public accounts cannot create LMS access directly. The LMS training portal is reserved exclusively for paid members. Once your application is reviewed and training enrollment is completed, your personal LMS login credentials will be issued to your email.
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-semibold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 2. Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    Email Address <span className="text-xs font-normal text-slate-500">(LMS credentials will be sent here)</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-semibold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 3. Phone */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    Contact / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-semibold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* 4. Domain Track */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    Selected Training Track
                  </label>
                  <div className="relative">
                    <select
                      value={form.domain}
                      onChange={e => update('domain', e.target.value)}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all appearance-none cursor-pointer"
                    >
                      {domains.map(d => (
                        <option key={d} value={d} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-4 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-violet-500/25 transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Submit Application for Training &amp; LMS Access <ArrowRight size={18} /></>
                  )}
                </button>
              </form>

              {/* Already have an LMS login */}
              <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Already a paid member with credentials?{' '}
                  <Link to="/login" className="text-violet-600 dark:text-violet-400 font-black hover:underline">
                    Log in to LMS Portal
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* Post-Submission Confirmation View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-5 shadow-lg">
                <Check size={36} strokeWidth={3} />
              </div>

              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                Application Received
              </span>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
                Application Submitted Successfully!
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900 dark:text-white">{form.name}</strong>. Your training application for <span className="font-bold text-violet-600 dark:text-violet-400">{form.domain}</span> has been logged.
              </p>

              {/* Process steps */}
              <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border-2 border-gray-200 dark:border-gray-700 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">Batch &amp; Profile Screening</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Admissions team reviews eligibility and batch availability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">Payment &amp; Member Verification</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Only paid members receive active student credentials.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">LMS Portal Credentials Issued</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Your student login will be dispatched to <strong className="text-slate-700 dark:text-slate-300">{form.email}</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-violet-500/25 transition-all"
                >
                  <BookOpen size={16} /> Go to LMS Portal Login (Paid Members)
                </Link>
                <Link
                  to="/"
                  className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-violet-500 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
