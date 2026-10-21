import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown, BookOpen, LogOut, User } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import mivexoLogo from '../../assets/mivexo_logo.png'

const navLinks = [
  { label: 'Programs', href: '/programs' },
  { label: 'LMS Portal', href: '/lms' },
  { label: 'Job Portal', href: '/jobs' },
  { label: 'Placement Prep', href: '/placement' },
  // Certificate page removed per request
  { label: 'Ambassador', href: '/ambassador' },
  { label: 'About', href: '/about' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [location])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-[#0B0B1A]/90 backdrop-blur-xl shadow-sm shadow-violet-500/10 border-b border-gray-100 dark:border-gray-800/50' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group py-1">
          <div className="dark:bg-white dark:px-2.5 dark:py-1 dark:rounded-xl transition-all">
            <img
              src={mivexoLogo}
              alt="MIVEXO"
              className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-700 hover:border-violet-400 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white hidden md:block max-w-28 truncate">{user?.name}</span>
                <ChevronDown size={14} className="text-gray-500 dark:text-gray-300" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#1A1A3A] border border-gray-200 dark:border-gray-700 shadow-2xl py-1.5 z-50"
                  >
                    <Link to="/lms" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-white hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors">
                      <BookOpen size={16} className="text-violet-500" /> LMS Learning Portal
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-white hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors">
                        <User size={16} className="text-violet-500" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); navigate('/'); setUserMenuOpen(false) }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/20 hover:scale-105 transition-all"
              >
                Enroll Now
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#0B0B1A] border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-1.5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-800 dark:text-white hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2.5">
                {isAuthenticated ? (
                  <>
                    <Link to="/lms" className="btn-primary !justify-center font-bold">Open LMS Portal</Link>
                    <button onClick={logout} className="btn-secondary !justify-center font-bold">Logout</button>
                  </>
                ) : (
                  <Link to="/pricing" className="btn-primary !justify-center font-bold">
                    Enroll Now
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
