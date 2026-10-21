import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`bg-white dark:bg-[#13132B] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-violet-200 dark:hover:border-violet-800/50 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}
