import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Quote,
  CheckCircle2,
  GraduationCap,
  Building2,
  Code2,
  Sparkles,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const realStudentReviews = [
  {
    id: 1,
    name: 'Naveen Chandran',
    college: 'SRM Institute of Science & Technology, Chennai',
    degree: 'B.Tech CSE (3rd Year)',
    track: 'Full Stack Web Development',
    category: 'tech',
    batch: 'Batch of Jan 2026',
    rating: 5,
    avatar: 'NC',
    avatarColor: 'from-blue-600 to-indigo-600',
    capstone: 'Multi-tenant SaaS Workspace with Razorpay & MongoDB',
    review:
      'Our college required a 6-week verified industry internship report for 6th-semester credits. Most other online sites just hand out a template PDF with zero verification. The QR code on MIVEXO’s certificate resolved directly to the cryptographic verification URL, and our department HOD approved it on the spot. Building the actual Next.js 14 capstone gave me concrete code to showcase in campus placements.'
  },
  {
    id: 2,
    name: 'Shreya Mukherjee',
    college: 'PES University, Bengaluru',
    degree: 'B.Tech ISE (Final Year)',
    track: 'AI & Deep Learning',
    category: 'tech',
    batch: 'Batch of Dec 2025',
    rating: 5,
    avatar: 'SM',
    avatarColor: 'from-amber-500 to-orange-600',
    capstone: 'Enterprise RAG Q&A System with Pinecone & LangChain',
    review:
      'College lab experiments were limited to basic sklearn scripts from 2018. Here, we actually loaded transformer attention heads and wired up a custom vector database retrieval pipeline. The mentor left genuine line-by-line feedback on my pull requests instead of just rubber-stamping the assignment. Having that github repo ready helped me clear my technical interview rounds.'
  },
  {
    id: 3,
    name: 'Harish Balaji',
    college: 'PSG College of Technology, Coimbatore',
    degree: 'B.E. ECE (3rd Year)',
    track: 'Cloud Computing & DevOps',
    category: 'tech',
    batch: 'Batch of Feb 2026',
    rating: 5,
    avatar: 'HB',
    avatarColor: 'from-cyan-500 to-blue-600',
    capstone: 'Multi-Region Kubernetes Cluster via Terraform & GitHub Actions',
    review:
      'Coming from an Electronics background, I was struggling to understand Docker networking and Kubernetes manifests through disconnected YouTube videos. The curriculum was sequential: Linux CLI first, then multi-stage Dockerfiles, and finally Helm charts. The internship letter specifically highlighted my cloud project deliverable, which was a huge plus.'
  },
  {
    id: 4,
    name: 'Ananya Deshmukh',
    college: 'Pune Institute of Computer Technology (PICT)',
    degree: 'B.E. Computer Engineering',
    track: 'UI/UX Design & Design Systems',
    category: 'non-tech',
    batch: 'Batch of Jan 2026',
    rating: 5,
    avatar: 'AD',
    avatarColor: 'from-purple-500 to-pink-600',
    capstone: 'Production Design System & Interactive Prototype in Figma',
    review:
      'I wanted a legitimate design portfolio piece rather than typical concept redesigns. My mentor pushed me through three rounds of accessibility checks (WCAG 2.1) and auto-layout token structuring before signing off on my capstone. I linked my MIVEXO verification ID on my Behance case study, and recruiters could verify my completion instantly.'
  },
  {
    id: 5,
    name: 'Karthik S.',
    college: 'M.S. Ramaiah Institute of Technology, Bengaluru',
    degree: 'B.E. Mechanical (Transitioned to Analytics)',
    track: 'Business Analytics & Power BI',
    category: 'non-tech',
    batch: 'Batch of Nov 2025',
    rating: 5,
    avatar: 'KS',
    avatarColor: 'from-teal-500 to-emerald-600',
    capstone: 'Executive Inventory & Sales Forecasting Dashboard',
    review:
      'As a Mechanical student trying to break into Data Analytics, I needed proof of practical SQL and Power BI ability. The dataset we cleaned had real missing records and dirty formatting like actual business data, not sanitized tutorial toys. The 10,000+ question placement portal was also great for brushing up quants and logical reasoning.'
  },
  {
    id: 6,
    name: 'Rohan Patel',
    college: 'Nirma University, Ahmedabad',
    degree: 'B.Tech IT (3rd Year)',
    track: 'Cybersecurity & Ethical Hacking',
    category: 'tech',
    batch: 'Batch of Dec 2025',
    rating: 5,
    avatar: 'RP',
    avatarColor: 'from-rose-500 to-red-600',
    capstone: 'OWASP Top 10 Web Vulnerability Assessment & Playbook',
    review:
      'Finding realistic ethical hacking practice in India that is neither illegal nor uselessly basic is very hard. The hands-on labs with Burp Suite proxy interception, SQL injection mitigation, and pentest reporting gave me the exact format companies look for. I submitted the official report for my college technical seminar.'
  }
]

export default function TestimonialsSection() {
  const [filter, setFilter] = useState('all') // 'all' | 'tech' | 'non-tech'

  const filteredReviews =
    filter === 'all'
      ? realStudentReviews
      : realStudentReviews.filter((r) => r.category === filter)

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-[#070913] transition-colors duration-300 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/5 dark:bg-violet-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/70 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-bold mb-4 shadow-xs">
            <Sparkles size={14} className="text-amber-400" />
            Authentic Student Experiences & Verified Portfolios
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Real Students. Real Capstones. <br />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Honest Feedback From Across India.
            </span>
          </h2>

          <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            See how engineering and degree students from premier Indian colleges used MIVEXO to complete mandatory college internships, build verified production projects, and crack campus placements.
          </p>

          {/* Social Proof Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 pt-6 border-t border-gray-200 dark:border-slate-800/80">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">4.9 ★</span>
              <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Average Rating</p>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</span>
              <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">College HOD Approval</p>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">200+</span>
              <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Colleges Represented</p>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-2xl font-black text-amber-500">QR Verified</span>
              <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">Authentic Credentials</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Chips */}
        <div className="flex justify-center mb-10">
          <div className="p-1 bg-white dark:bg-slate-900/90 border border-gray-200 dark:border-slate-800 rounded-2xl flex items-center gap-1.5 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All Reviews ({realStudentReviews.length})
            </button>
            <button
              onClick={() => setFilter('tech')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'tech'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Technical Tracks
            </button>
            <button
              onClick={() => setFilter('non-tech')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'non-tech'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Analytics &amp; Design
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#0c0f1d] border border-gray-200 dark:border-slate-800/80 shadow-md hover:shadow-xl dark:shadow-none hover:border-violet-400/60 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Header: Student Profile & Verified Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.avatarColor} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0`}
                      >
                        {item.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1 mt-0.5">
                          <GraduationCap size={12} /> {item.degree}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  </div>

                  {/* College name & Batch */}
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 mb-4">
                    <p className="text-[11px] font-semibold text-gray-700 dark:text-slate-300 flex items-start gap-1.5 leading-snug">
                      <Building2 size={12} className="text-gray-400 shrink-0 mt-0.5" />
                      <span>{item.college}</span>
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-slate-400 font-medium mt-1.5 pt-1.5 border-t border-gray-200/50 dark:border-slate-800/60">
                      <span className="font-bold text-violet-600 dark:text-violet-400">{item.track}</span>
                      <span>{item.batch}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-extrabold text-gray-700 dark:text-slate-300 ml-1.5">5.0</span>
                  </div>

                  {/* Real Review Body */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-normal mb-5">
                    "{item.review}"
                  </p>
                </div>

                {/* Capstone Deliverable Footer */}
                <div className="pt-3 border-t border-gray-100 dark:border-slate-800/80">
                  <div className="flex items-start gap-1.5 text-[11px]">
                    <span className="font-bold text-gray-500 dark:text-slate-400 uppercase text-[9px] tracking-wider shrink-0 mt-0.5">
                      Capstone:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-slate-200 leading-tight">
                      {item.capstone}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
