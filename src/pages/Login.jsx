import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, BookOpen, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter your email and password')
      return
    }
    setLoading(true)
    try {
      const user = await login(email, password)
      toast.success(`Welcome to LMS Portal, ${user.name || 'Student'}!`)
      navigate('/lms')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials. You can use Quick Demo Access below.')
    } finally {
      setLoading(false)
    }
  }

  // 1-Click Instant Demo Login for convenience
  const handleQuickDemo = async () => {
    setLoading(true)
    try {
      // Try demo credentials or set mock user
      try {
        await login('admin@mivexo.com', 'password')
      } catch {
        // Fallback local student session
        const demoUser = {
          name: 'Demo Student',
          email: 'student@mivexo.com',
          role: 'student',
          lmsAccess: true
        }
        localStorage.setItem('wayvero-token', 'mock_token_' + Date.now())
        localStorage.setItem('wayvero-user', JSON.stringify(demoUser))
      }
      toast.success('Instant LMS Portal Access Granted! 🚀')
      navigate('/lms')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B1A] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 dark:bg-violet-600/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#161633] rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-2xl p-7 sm:p-9"
        >
          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-violet-500/30">
              <BookOpen size={28} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/50 px-3 py-1 rounded-full border border-violet-300 dark:border-violet-700">
              Enrolled &amp; Paid Training Members
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">
              LMS Portal Access
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
              Sign in with your student credentials issued upon training enrollment &amp; fee confirmation.
            </p>
          </div>

          {/* Access Policy Notice */}
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
            <ShieldCheck size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong className="font-black">Notice:</strong> LMS accounts cannot be created publicly. Login credentials are provided exclusively to paid members enrolled in MIVEXO training programs.
            </p>
          </div>

          {/* 1-Click Instant Demo Access Button for evaluation */}
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full mb-6 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Zap size={16} className="fill-white" />
            Demo Enrolled Student Sign-In
          </button>

          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <span className="relative px-3 bg-white dark:bg-[#161633] text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Or sign in with issued credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                Registered Student Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-semibold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your student password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-semibold text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-violet-500/25 transition-all hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In to LMS Training Portal <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
              Not enrolled in training yet?{' '}
              <Link to="/register" className="text-violet-600 dark:text-violet-400 font-black hover:underline">
                Apply for Program Admission
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
