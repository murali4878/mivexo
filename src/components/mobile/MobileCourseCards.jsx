import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle2,
  ChevronDown,
  Layers,
  Laptop
} from 'lucide-react'

const mobileCourses = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Development (MERN & Next.js 14)',
    category: 'tech',
    domain: 'Technical Track',
    tag: 'Trending #1',
    duration: '3 Months',
    enrolled: '420+',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    capstone: 'Multi-Tenant SaaS Workspace with Razorpay & MongoDB',
    skills: ['React 18', 'Next.js 14', 'Node.js', 'MongoDB', 'Tailwind'],
    modules: ['Module 1: Advanced Modern JavaScript & TypeScript', 'Module 2: Full Stack REST & GraphQL APIs', 'Module 3: Next.js 14 Server Actions & Auth', 'Module 4: Razorpay Gateway & Capstone Deployment'],
    gradient: 'from-[#8B3FF2] to-indigo-600'
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Deep Learning',
    category: 'ai',
    domain: 'AI & Data Track',
    tag: 'Hot In-Demand',
    duration: '4 Months',
    enrolled: '380+',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    capstone: 'Enterprise RAG Q&A System with Pinecone & LangChain',
    skills: ['Python', 'PyTorch', 'LangChain', 'Pinecone', 'Transformers'],
    modules: ['Module 1: Neural Networks & PyTorch Fundamentals', 'Module 2: Computer Vision & Natural Language Processing', 'Module 3: LLM Fine-Tuning & Prompt Engineering', 'Module 4: Production Vector DB & RAG Pipeline'],
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'data-science',
    title: 'Data Science & Machine Learning',
    category: 'ai',
    domain: 'Analytics Track',
    tag: 'High Placement',
    duration: '4 Months',
    enrolled: '310+',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    capstone: 'Executive Inventory & Predictive Sales Forecast Engine',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'SQL', 'Power BI'],
    modules: ['Module 1: Advanced Exploratory Data Analysis & SQL', 'Module 2: Supervised & Unsupervised Machine Learning', 'Module 3: Model Evaluation & Hyperparameter Tuning', 'Module 4: Power BI Executive Dashboards'],
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'devops',
    title: 'Cloud Computing & DevOps (AWS / K8s)',
    category: 'cloud',
    domain: 'Cloud Track',
    tag: 'Enterprise Need',
    duration: '3 Months',
    enrolled: '290+',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    capstone: 'Multi-Region Kubernetes Ingress with Terraform & CI/CD',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    modules: ['Module 1: Linux CLI & Containerization with Docker', 'Module 2: Kubernetes Manifests, Ingress & Helm', 'Module 3: Infrastructure as Code with Terraform', 'Module 4: Production CI/CD Pipelines on AWS'],
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'cloud',
    domain: 'Security Track',
    tag: 'Critical Skill',
    duration: '3 Months',
    enrolled: '240+',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    capstone: 'OWASP Top 10 Web Vulnerability Assessment & Pen-Test Audit',
    skills: ['Burp Suite', 'Network Security', 'OWASP Top 10', 'Linux', 'Cryptography'],
    modules: ['Module 1: Network Reconnaissance & Security Scanning', 'Module 2: Web Application Penetration Testing', 'Module 3: Cryptography & Privilege Escalation', 'Module 4: Industry Vulnerability Audit Report'],
    gradient: 'from-rose-500 to-red-600'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design & Design Systems',
    category: 'design',
    domain: 'Design Track',
    tag: 'Creative Core',
    duration: '2 Months',
    enrolled: '320+',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    capstone: 'Complete Mobile App Design System & Prototype in Figma',
    skills: ['Figma', 'User Research', 'Design Systems', 'WCAG 2.1', 'Prototyping'],
    modules: ['Module 1: UX Research, User Personas & Wireframing', 'Module 2: Figma Auto-Layout & Component Sets', 'Module 3: Interactive Micro-Animations & Design Tokens', 'Module 4: Accessible Design System & Client Handoff'],
    gradient: 'from-purple-500 to-pink-500'
  }
]

const categories = [
  { id: 'all', label: 'All (6)' },
  { id: 'tech', label: 'Full Stack' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'cloud', label: 'Cloud & Cyber' },
  { id: 'design', label: 'UI/UX' }
]

export default function MobileCourseCards() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [expandedCard, setExpandedCard] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const filtered =
    selectedCat === 'all'
      ? mobileCourses
      : mobileCourses.filter((c) => c.category === selectedCat)

  return (
    <section className="py-12 px-4 bg-[#0B1730] text-white overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B3FF2]/20 border border-[#8B3FF2]/40 text-[#A855F7] text-[11px] font-bold mb-2">
            <Sparkles size={12} className="text-amber-300" />
            Curriculum &amp; Internship Tracks
          </span>
          <h2 className="text-2xl xs:text-3xl font-black text-white leading-tight mb-2">
            Master In-Demand <br />
            <span className="bg-gradient-to-r from-[#8B3FF2] to-cyan-400 bg-clip-text text-transparent">
              Industry Domains
            </span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
            Choose your specialization, build production capstones, and graduate with verified portfolio proof.
          </p>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-4 mb-4">
          {categories.map((cat) => {
            const isActive = selectedCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#8B3FF2] text-white shadow-md shadow-[#8B3FF2]/40'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Stacked Mobile Course Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, idx) => {
              const isExpanded = expandedCard === course.id
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.05 : 0.35,
                    delay: shouldReduceMotion ? 0 : idx * 0.05
                  }}
                  className="rounded-3xl bg-[#0F1C3A] border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between hover:border-[#8B3FF2]/50 transition-colors"
                >
                  {/* Card Cover Image with Overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C3A] via-[#0F1C3A]/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-[#8B3FF2] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                        {course.tag}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-white/15 flex items-center gap-1">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                    </div>

                    {/* Bottom Image Domain Tag */}
                    <div className="absolute bottom-2 left-3">
                      <span className="text-[11px] font-bold text-violet-300">
                        {course.domain}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Course Title */}
                    <h3 className="text-base font-black text-white leading-snug mb-2">
                      {course.title}
                    </h3>

                    {/* Quick Course Metrics */}
                    <div className="flex items-center gap-3 text-[11px] text-gray-300 pb-3 mb-3 border-b border-white/10">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock size={12} className="text-violet-400" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Users size={12} className="text-cyan-400" /> {course.enrolled} Enrolled
                      </span>
                    </div>

                    {/* Capstone Box */}
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-3">
                      <span className="text-[9px] uppercase tracking-wider text-violet-300 font-extrabold block mb-0.5">
                        Capstone Deliverable:
                      </span>
                      <p className="text-xs font-semibold text-gray-200 leading-tight">
                        {course.capstone}
                      </p>
                    </div>

                    {/* Key Skills Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.skills.map((sk, i) => (
                        <span
                          key={i}
                          className="text-[9.5px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-gray-300 border border-white/5"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Syllabus Accordion Preview */}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : course.id)}
                        className="w-full flex items-center justify-between text-xs font-bold text-violet-300 hover:text-white py-1"
                      >
                        <span className="flex items-center gap-1">
                          <Layers size={13} />
                          {isExpanded ? 'Hide Modules' : 'View Module Syllabus'}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 space-y-1 overflow-hidden"
                          >
                            {course.modules.map((mod, mi) => (
                              <div
                                key={mi}
                                className="text-[11px] text-gray-300 flex items-start gap-1.5 py-0.5"
                              >
                                <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span>{mod}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 pt-0 space-y-2">
                    {/* Prominent Enrollment Button */}
                    <Link
                      to="/pricing"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8B3FF2] to-indigo-600 hover:from-[#7c30e3] hover:to-indigo-700 active:scale-[0.98] text-white font-extrabold text-xs shadow-lg shadow-[#8B3FF2]/35 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Enroll in This Track</span>
                      <ArrowRight size={14} />
                    </Link>

                    {/* Secondary Link to /programs */}
                    <Link
                      to="/programs"
                      className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-[11px] text-center block transition-colors border border-white/5"
                    >
                      View Detailed Syllabus Modules
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA to browse all 20 tracks */}
        <div className="mt-8 text-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs shadow-md transition-all"
          >
            <span>Explore All 20 Industry Tracks</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
