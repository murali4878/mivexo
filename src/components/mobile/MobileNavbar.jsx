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
  GraduationCap,
  Award,
  Users,
  Info,
  CreditCard,
  LogOut,
  ArrowRight
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import mivexoLogo from '../../assets/mivexo_logo.png'

const navItems = [
  { label: 'Programs', href: '/programs', icon: BookOpen },
  { label: 'LMS Learning Portal', href: '/lms', icon: GraduationCap },
  { label: 'Placement Prep', href: '/placement', icon: Award },
  { label: 'Campus Ambassador', href: '/ambassador', icon: Users },
  { label: 'About MIVEXO', href: '/about', icon: Info },
  { label: 'Pricing & Plans', href: '/pricing', icon: CreditCard }
]

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  // Track scroll position for subtle shadow enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Refined ease-out curve for natural drawer movement
  const easeOutCurve = [0.22, 1, 0.36, 1]

  // Stagger container animation variants
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  }

  // Individual staggered nav item animation variants (8-12px upward slide)
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.28,
        ease: easeOutCurve
      }
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -6,
      transition: { duration: 0.15 }
    }
  }

  return (
    <>
      {/* Sticky Mobile Top Header */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 w-full ${
          scrolled
            ? 'bg-white/95 dark:bg-[#080d1a]/95 backdrop-blur-xl border-b border-gray-200/90 dark:border-white/10 shadow-xs'
            : 'bg-white/95 dark:bg-[#080d1a]/95 backdrop-blur-md border-b border-gray-200/70 dark:border-white/10'
        }`}
      >
        <div className="px-3.5 sm:px-4 h-14 flex items-center justify-between gap-2">
          {/* Logo with clean white pill backing */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="MIVEXO Home">
            <img
              src={mivexoLogo}
              alt="MIVEXO"
              className="h-6 w-auto object-contain dark:brightness-0 dark:invert transition-all"
            />
          </Link>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.92 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-amber-300 transition-colors duration-150 flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-amber-300" />
              ) : (
                <Moon size={17} className="text-slate-700" />
              )}
            </motion.button>

            {/* Hamburger Button with Smooth Icon Transition */}
            <motion.button
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.92 }}
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white transition-colors duration-150 flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} strokeWidth={2.3} className="text-gray-900 dark:text-white" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer & Soft Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Soft Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.3,
                ease: 'easeOut'
              }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/45 dark:bg-black/65 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Sliding Drawer Panel from Right (300–400ms duration with easeOutCurve) */}
            <motion.div
              initial={{
                x: '100%',
                opacity: shouldReduceMotion ? 1 : 0.8
              }}
              animate={{
                x: 0,
                opacity: 1
              }}
              exit={{
                x: '100%',
                opacity: shouldReduceMotion ? 1 : 0.8
              }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.35,
                ease: easeOutCurve
              }}
              className="fixed inset-y-0 right-0 w-[min(340px,88vw)] bg-white dark:bg-[#080d1a] border-l border-gray-200/90 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Top Header */}
              <div className="h-14 px-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10 shrink-0">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <img src={mivexoLogo} alt="MIVEXO" className="h-5 w-auto object-contain dark:brightness-0 dark:invert" />
                </Link>

                <div className="flex items-center gap-2">
                  {/* Drawer Theme Toggle */}
                  <motion.button
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.92 }}
                    onClick={toggleTheme}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-amber-300 transition-colors duration-150 flex items-center justify-center cursor-pointer"
                    aria-label="Toggle Theme"
                  >
                    {theme === 'dark' ? (
                      <Sun size={15} className="text-amber-300" />
                    ) : (
                      <Moon size={15} className="text-slate-700" />
                    )}
                  </motion.button>

                  {/* Close Button with subtle rotate/fade */}
                  <motion.button
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.92 }}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-300/80 dark:border-white/15 text-gray-900 dark:text-white transition-colors duration-150 flex items-center justify-center cursor-pointer"
                    aria-label="Close Navigation Menu"
                  >
                    <motion.div
                      initial={{ rotate: shouldReduceMotion ? 0 : -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: shouldReduceMotion ? 0 : 45, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X size={18} strokeWidth={2.4} />
                    </motion.div>
                  </motion.button>
                </div>
              </div>

              {/* Scrollable Navigation Body with Staggered Items */}
              <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4">
                <motion.div
                  variants={menuContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="space-y-1.5"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href

                    return (
                      <motion.div key={item.href} variants={menuItemVariants}>
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 select-none ${
                            isActive
                              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs font-semibold'
                              : 'bg-gray-50/70 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-100/80 dark:border-white/5 font-medium'
                          }`}
                        >
                          {/* Left: Icon & Label */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-150 group-active:scale-95 group-hover:scale-105 ${
                                isActive
                                  ? 'bg-white/20 text-white dark:bg-black/10 dark:text-slate-950'
                                  : 'bg-gray-200/80 dark:bg-white/10 text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <Icon size={16} />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold truncate">
                              {item.label}
                            </span>
                          </div>

                          {/* Right: Interactive Chevron (3-4px nudge on hover/press) */}
                          <ChevronRight
                            size={15}
                            className={`shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1 group-active:translate-x-1 ${
                              isActive
                                ? 'text-white/70 dark:text-slate-950/70'
                                : 'text-gray-400 dark:text-gray-500'
                            }`}
                          />
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Bottom Actions Area */}
              <div className="p-3.5 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/2 shrink-0">
                {isAuthenticated ? (
                  /* Authenticated State */
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                        {user?.name?.[0]?.toUpperCase() || 'S'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate text-gray-900 dark:text-white">
                          {user?.name || 'Student'}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/lms"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold text-center shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
                      >
                        <BookOpen size={13} /> LMS Portal
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold text-center border border-gray-200 dark:border-white/10 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150 cursor-pointer"
                      >
                        <LogOut size={13} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Guest State */
                  <div className="space-y-2.5">
                    {/* Primary CTA: "Explore Programs →" with restrained navy shadow & arrow nudge */}
                    <Link
                      to="/programs"
                      onClick={() => setIsOpen(false)}
                      className="group w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs sm:text-sm text-center shadow-sm shadow-slate-950/15 dark:shadow-black/40 flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] hover:-translate-y-px"
                    >
                      <span>Explore Programs</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-150 ease-out group-hover:translate-x-1 group-active:translate-x-1"
                      />
                    </Link>

                    {/* Account Buttons with 150ms border/bg transition & tap feedback */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-xl bg-gray-100/90 hover:bg-gray-200/90 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-white text-xs font-semibold text-center border border-gray-200/90 dark:border-white/10 active:scale-[0.98] transition-all duration-150"
                      >
                        Student Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-xl bg-gray-100/90 hover:bg-gray-200/90 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-white text-xs font-semibold text-center border border-gray-200/90 dark:border-white/10 active:scale-[0.98] transition-all duration-150"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
