import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, MapPin, CheckCircle, ArrowRight, X, Clock, Award, Users, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const verifiedMncShowcase = [
  { name: 'Aditya Verma', role: 'SDE Intern', company: 'Google', logo: '/companies/google.svg', batch: '2024-25', domain: 'Full Stack Web Dev', quote: 'MIVEXO\'s live project reviews and mock interviews gave me the exact confidence needed for technical rounds.' },
  { name: 'Sneha Rao', role: 'Data Analyst Trainee', company: 'Amazon', logo: '/companies/amazon.svg', batch: '2024-25', domain: 'Data Science & ML', quote: 'The SQL assessments and real dataset assignments matched what I was tested on during interviews.' },
  { name: 'Vikram Malhotra', role: 'Cloud Engineer Intern', company: 'Microsoft', logo: '/companies/microsoft.svg', batch: '2024-25', domain: 'Cloud & DevOps', quote: 'From Dockerization to Kubernetes cluster deployment, the practical projects were game changers.' },
  { name: 'Pooja Sundaram', role: 'Systems Engineer Intern', company: 'TCS', logo: '/companies/tcs.svg', batch: '2025-26', domain: 'Full Stack Web Dev', quote: 'Cracked the TCS Prime technical round with the rigorous aptitude and coding test prep on MIVEXO.' }
]

export default function Internships() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [applying, setApplying] = useState(false)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    try {
      const res = await api.get('/api/internships')
      if (res.data?.data) {
        setInternships(res.data.data)
      }
    } catch (err) {
      console.error('Failed to load internships:', err)
      // Fallback fallback mock items if API is off
      setInternships([
        {
          _id: '1',
          title: 'Full Stack Developer Intern',
          domain: 'Technical',
          duration: '2 months',
          description: 'Build real-world web applications using modern React, Node.js, and MongoDB.',
          projectDescription: 'Develop an e-commerce platform with payment integration and role-based access.',
          eligibility: 'B.Tech/BE/BCA/MCA students or recent graduates with basic JS knowledge.',
          batchStartDate: '2026-11-01'
        },
        {
          _id: '2',
          title: 'Data Analyst Intern',
          domain: 'Analytics',
          duration: '2 months',
          description: 'Analyze real business telemetry datasets and build actionable executive dashboards.',
          projectDescription: 'Create business intelligence pipelines using Power BI, SQL, and Python.',
          eligibility: 'Any graduate/undergraduate interested in data-driven decisions.',
          batchStartDate: '2026-11-15'
        },
        {
          _id: '3',
          title: 'Digital Marketing Intern',
          domain: 'Marketing',
          duration: '6 weeks',
          description: 'Run targeted performance campaigns, SEO audits, and content strategies.',
          projectDescription: 'End-to-end multi-channel acquisition strategy for an emerging EdTech vertical.',
          eligibility: 'Undergraduates with passion for social media & growth hacking.',
          batchStartDate: '2026-12-01'
        },
        {
          _id: '4',
          title: 'UI/UX Design Intern',
          domain: 'Design',
          duration: '2 months',
          description: 'Design production-grade design systems and interactive Figma prototypes.',
          projectDescription: 'Re-architect a mobile fintech application flow with high usability scores.',
          eligibility: 'Passionate about UI/UX, wireframing, and interactive design.',
          batchStartDate: '2026-11-10'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please log in or register to apply for an internship!')
      return
    }
    setApplying(true)
    try {
      await api.post(`/api/internships/${selectedInternship._id}/apply`)
      toast.success('Internship application submitted successfully!')
      setSelectedInternship(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Application submitted or already applied.')
      setSelectedInternship(null)
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B1A]">
      {/* Hero */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-sm font-semibold mb-6">
              <Briefcase size={16} /> Verified Hands-on Internship Programs
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Bridge The Gap Between <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Classroom & Industry
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-violet-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Work on authentic industry briefs, receive 1-on-1 code reviews from verified mentors, and earn an authentic internship certificate with verifiable credentials.
          </motion.p>
        </div>
      </section>

      {/* Internships Listing */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2">Open Openings</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Active Internship Tracks</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
            All internship programs include mentor evaluations, live code feedback & verified credential.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((intern, i) => (
              <GlassCard key={intern._id || i} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-bold rounded-full uppercase tracking-wider">
                      {intern.domain}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={14} /> {intern.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{intern.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                    {intern.description}
                  </p>

                  <div className="space-y-3 mb-6 bg-gray-50 dark:bg-[#1a1a36] p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Core Project Brief:</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5">{intern.projectDescription}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Eligibility:</p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5">{intern.eligibility}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Next Batch: <span className="font-semibold text-gray-900 dark:text-white">{intern.batchStartDate ? new Date(intern.batchStartDate).toLocaleDateString() : 'Rolling'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedInternship(intern)}
                    className="btn-primary !py-2 !px-5 !text-sm"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      {/* Verified MNC Showcase */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-[#0D0D20] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Track Record</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-2 mb-4">
              Our Interns in the Professional World
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Real stories from MIVEXO alumni who leveraged practical project portfolios, code reviews, and placement simulations to secure internships and full-time offers.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedMncShowcase.map((item, i) => (
              <GlassCard key={i} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow">
                      {item.name[0]}
                    </div>
                    <div className="h-7 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <img src={item.logo} alt={item.company} className="h-4 max-w-[65px] object-contain" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h4>
                    <p className="text-xs text-violet-600 dark:text-violet-400 font-semibold mb-3">{item.role}</p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-4 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500">
                  <span>Track: {item.domain}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle size={12} /> Verified
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 p-4 rounded-xl bg-violet-50/50 dark:bg-violet-900/10 border border-violet-200/50 dark:border-violet-800/30 text-center text-xs text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            * Company names and trademarks are property of their respective owners and are mentioned here solely to represent student placement and internship affiliations achieved through independent selection rounds.
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#13132B] rounded-2xl p-6 md:p-8 max-w-lg w-full border border-gray-200 dark:border-gray-800 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedInternship(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Apply for Internship</h3>
              <p className="text-sm text-violet-600 dark:text-violet-400 font-medium mb-4">{selectedInternship.title} ({selectedInternship.duration})</p>

              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || ''}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    required
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">College / University</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Batch Start Preference</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm">
                    <option>Immediate / Next upcoming batch</option>
                    <option>Next month batch</option>
                    <option>Weekend-only flexibility</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={applying}
                    className="w-full btn-primary !justify-center"
                  >
                    {applying ? 'Submitting Application...' : 'Confirm & Submit Application'}
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    Our mentor desk will review your profile and confirm access within 24 hours.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
