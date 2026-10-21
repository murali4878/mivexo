import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'

const stats = [
  { label: 'Students Enrolled', value: 5000, suffix: '+' },
  { label: 'Expert Courses', value: 30, suffix: '+' },
  { label: 'Satisfaction Rate', value: 95, suffix: '%' },
  { label: 'Hiring Partners', value: 50, suffix: '+' }
]

export default function StatsSection() {
  return (
    <section className="py-14 bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-violet-200 text-sm font-medium">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
