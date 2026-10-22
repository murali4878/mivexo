import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Users,
  Info,
  CreditCard,
  LogOut,
  User,
  ArrowRight
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import mivexoLogo from '../../assets/mivexo_logo.png'

const mobileNavLinks = [
  { label: 'Programs & Syllabus', href: '/programs', icon: BookOpen, tag: '20+ Tracks' },
  { label: 'LMS Learning Portal', href: '/lms', icon: GraduationCap, tag: 'Interactive' },
  { label: 'Job & Internship Portal', href: '/jobs', icon: Briefcase, tag: 'Active Hires' },
  { label: 'Placement Prep', href: '/placement', icon: Award, tag: 'Mock Tests' },
  { label: 'Campus Ambassador', href: '/ambassador', icon: Users },
  { label: 'About MIVEXO', href: '/about', icon: Info },
  { label: 'Pricing & Plans', href: '/pricing', icon: CreditCard, tag: 'Direct Enroll' }
]

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full overflow-hidden ${
          scrolled
            ? 'bg-[#0B1730]/95 dark:bg-[#070E1E]/95 backdrop-blur-xl border-b border-[#8B3FF2]/25 shadow-lg shadow-[#8B3FF2]/10'
            : 'bg-[#0B1730]/90 dark:bg-[#070E1E]/90 backdrop-blur-md border-b border-white/10'
        }`}
      >
        {/* Top Mini Notification Bar */}
        <div className="bg-gradient-to-r from-[#8B3FF2] via-[#6C25D9] to-[#0B1730] px-3 py-1 flex items-center justify-between text-[11px] text-white font-medium">
          <div className="flex items-center gap-1.5 truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="truncate">Batch 2026 Live · Hands-on Internships</span>
          </div>
          <Link
            to="/pricing"
            className="text-[10px] font-black uppercase tracking-wider bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors shrink-0 ml-2"
          >
            Enroll →
          </Link>
        </div>

        {/* Main Compact Navbar */}
        <div className="px-4 h-14 flex items-center justify-between">
          {/* Logo with clean white pill backing for brand clarity */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white px-2 py-1 rounded-lg shadow-sm border border-white/20 flex items-center">
              <img
                src={mivexoLogo}
                alt="MIVEXO"
                className="h-6 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="hidden xs:inline-block text-[11px] font-bold text-violet-300 bg-[#8B3FF2]/20 px-2 py-0.5 rounded-full border border-[#8B3FF2]/30">
              Mobile Hub
            </span>
          </Link>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/15 border border-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} className="text-violet-200" />}
            </motion.button>

            {/* Quick Enroll CTA Pill */}
            <Link
              to="/pricing"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8B3FF2] to-indigo-600 hover:from-[#7c30e3] hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-[#8B3FF2]/30 flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>Enroll</span>
              <ArrowRight size={12} />
            </Link>

            {/* Animated Hamburger Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} className="text-[#8B3FF2]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu with Smooth Spring Slide */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* Slide Down Sheet */}
            <motion.div
              initial={{ y: '-100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 26,
                stiffness: 280,
                duration: shouldReduceMotion ? 0.05 : 0.35
              }}
              className="fixed top-0 left-0 right-0 z-50 max-h-[88vh] overflow-y-auto bg-gradient-to-b from-[#0B1730] via-[#0F1C3A] to-[#070E1E] border-b border-[#8B3FF2]/40 rounded-b-3xl shadow-2xl text-white p-5 flex flex-col justify-between lg:hidden"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white px-2.5 py-1 rounded-xl shadow-sm">
                      <img src={mivexoLogo} alt="MIVEXO" className="h-6 w-auto object-contain" />
                    </div>
                    <span className="text-xs font-semibold text-violet-300">Quick Navigation</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav Links Stack */}
                <div className="space-y-1.5">
                  {mobileNavLinks.map((item, idx) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: shouldReduceMotion ? 0 : idx * 0.04 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                            isActive
                              ? 'bg-[#8B3FF2] text-white shadow-lg shadow-[#8B3FF2]/30 font-bold'
                              : 'bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                isActive ? 'bg-white/20 text-white' : 'bg-[#8B3FF2]/20 text-violet-300'
                              }`}
                            >
                              <Icon size={16} />
                            </div>
                            <span className="text-sm">{item.label}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.tag && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-violet-200 border border-white/10">
                                {item.tag}
                              </span>
                            )}
                            <ChevronRight size={15} className="text-gray-400" />
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Drawer Bottom Actions & User State */}
              <div className="pt-5 mt-5 border-t border-white/10 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B3FF2] to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                        {user?.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-sm font-bold truncate text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/lms"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-xl bg-[#8B3FF2] text-white text-xs font-bold text-center shadow-md flex items-center justify-center gap-1.5"
                      >
                        <BookOpen size={14} /> LMS Portal
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-red-500/20 text-red-300 text-xs font-bold text-center border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/pricing"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B3FF2] via-[#7C3AED] to-indigo-600 text-white font-extrabold text-sm text-center shadow-xl shadow-[#8B3FF2]/35 flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} className="text-amber-300" />
                      Enroll in Industry Tracks Now
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-xl bg-white/10 text-white text-xs font-semibold text-center hover:bg-white/15 border border-white/10"
                      >
                        Student Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-xl bg-white/10 text-white text-xs font-semibold text-center hover:bg-white/15 border border-white/10"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
