import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Users, Star, CheckCircle, Sparkles } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import ScrollReveal from '../ui/ScrollReveal'

const previewPrograms = [
  {
    title: 'Full Stack Web Development (MERN & Next.js)',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 420,
    rating: 4.9,
    tag: 'Trending #1',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    color: 'from-violet-500 to-indigo-500'
  },
  {
    title: 'Artificial Intelligence & Deep Learning',
    domain: 'Technical',
    duration: '4 months',
    enrolled: 380,
    rating: 4.9,
    tag: 'Hot Track',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    color: 'from-orange-500 to-amber-500'
  },
  {
    title: 'Data Science & Machine Learning',
    domain: 'Analytics',
    duration: '4 months',
    enrolled: 310,
    rating: 4.8,
    tag: 'High Placement',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Cloud Computing & DevOps (AWS / K8s)',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 290,
    rating: 4.8,
    tag: 'Enterprise Need',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Cybersecurity & Ethical Hacking',
    domain: 'Technical',
    duration: '3 months',
    enrolled: 240,
    rating: 4.7,
    tag: 'Critical Skill',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    color: 'from-red-500 to-rose-600'
  },
  {
    title: 'UI/UX Design & Design Systems',
    domain: 'Design',
    duration: '2 months',
    enrolled: 320,
    rating: 4.9,
    tag: 'Creative Core',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    color: 'from-purple-500 to-pink-500'
  }
]

export default function ProgramsPreview() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-[#0D0D20]">
      <div className="container-max">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" /> 20 Trending Career Domains
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Curriculum &amp; Internship Tracks
            <br /><span className="gradient-text">Top In-Demand Tech Domains</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            From Web Dev &amp; AI to DevOps, Blockchain, and Design — select any track, view the full syllabus modules, and graduate with verified proof of work.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewPrograms.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-2xl hover:border-violet-400/80 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {prog.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-bold text-amber-300">
                      {prog.domain} Track
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors mb-2 leading-snug">
                    {prog.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="flex items-center gap-1"><Clock size={12} /> {prog.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {prog.enrolled}+ enrolled</span>
                    <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {prog.rating}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles size={12} /> Industry Aligned
                  </span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider">With Live Project</span>
                </div>
                <Link to="/programs" className="btn-primary !py-2 !px-4 !text-xs shadow-md">
                  View Syllabus <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/programs" className="btn-primary !px-8 !py-3.5 shadow-xl">
            Explore All 20 Trending Domains &amp; Modules <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
