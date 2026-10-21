import { motion } from 'framer-motion'

export default function GradientButton({ children, onClick, href, className = '', variant = 'primary', size = 'md', type = 'button' }) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
    secondary: 'border-2 border-violet-600 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
  }
  const Component = href ? 'a' : 'button'
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Component
        href={href}
        onClick={onClick}
        type={type}
        className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ${sizes[size]} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  )
}
