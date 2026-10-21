import { motion } from 'framer-motion'

export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'scale' ? 0.9 : 1
    },
    visible: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    }
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
