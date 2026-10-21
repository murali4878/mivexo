import { useInView } from 'framer-motion'
import { useRef } from 'react'
import CountUp from 'react-countup'

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2.5, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <span ref={ref} className={className}>
      {isInView && (
        <CountUp start={0} end={end} duration={duration} prefix={prefix} suffix={suffix} separator="," />
      )}
    </span>
  )
}
