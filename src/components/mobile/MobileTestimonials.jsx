import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, CheckCircle2, Building2, GraduationCap, Sparkles, Quote } from 'lucide-react'

const mobileReviews = [
  {
    id: 1,
    name: 'Naveen Chandran',
    college: 'SRM Institute, Chennai',
    degree: 'B.Tech CSE (3rd Year)',
    track: 'Full Stack Web Development',
    category: 'tech',
    rating: 5,
    avatar: 'NC',
    avatarColor: 'from-blue-600 to-indigo-600',
    capstone: 'Multi-Tenant SaaS with Razorpay & MongoDB',
    review:
      'Our college required a verified 6-week industry internship report for 6th-sem credits. The QR code on MIVEXO’s certificate resolved directly to the cryptographic verification URL, and our department HOD approved it immediately. Building the Next.js 14 capstone gave me concrete code to demo in campus interviews.'
  },
  {
    id: 2,
    name: 'Shreya Mukherjee',
    college: 'PES University, Bengaluru',
    degree: 'B.Tech ISE (Final Year)',
    track: 'AI & Deep Learning',
    category: 'tech',
    rating: 5,
    avatar: 'SM',
    avatarColor: 'from-amber-500 to-orange-600',
    capstone: 'Enterprise RAG Q&A System with Pinecone & LangChain',
    review:
      'College lab experiments were limited to basic sklearn scripts. Here, we actually loaded transformer attention heads and wired up a custom vector database retrieval pipeline. The mentor left line-by-line feedback on my pull requests instead of just rubber-stamping the project.'
  },
  {
    id: 3,
    name: 'Harish Balaji',
    college: 'PSG College of Technology, Coimbatore',
    degree: 'B.E. ECE (3rd Year)',
    track: 'Cloud Computing & DevOps',
    category: 'tech',
    rating: 5,
    avatar: 'HB',
    avatarColor: 'from-cyan-500 to-blue-600',
    capstone: 'Multi-Region Kubernetes Cluster via Terraform',
    review:
      'Coming from an Electronics background, I was struggling to understand Docker networking and Kubernetes manifests through disconnected videos. The sequential modules and practical Terraform labs gave me exactly what I needed to clear technical rounds.'
  },
  {
    id: 4,
    name: 'Ananya Deshmukh',
    college: 'PICT, Pune',
    degree: 'B.E. Computer Engineering',
    track: 'UI/UX Design & Design Systems',
    category: 'non-tech',
    rating: 5,
    avatar: 'AD',
    avatarColor: 'from-purple-500 to-pink-600',
    capstone: 'Production Design System & Prototype in Figma',
    review:
      'I wanted a legitimate design portfolio piece rather than concept redesigns. My mentor pushed me through three rounds of accessibility checks (WCAG 2.1) and auto-layout token structuring before signing off on my capstone. Recruiters verified my completion instantly!'
  }
]

export default function MobileTestimonials() {
  const [filter, setFilter] = useState('all') // 'all' | 'tech' | 'non-tech'
  const shouldReduceMotion = useReducedMotion()

  const filtered =
    filter === 'all'
      ? mobileReviews
      : mobileReviews.filter((r) => r.category === filter)

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#0B1730] to-[#070E1E] text-white overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B3FF2]/20 border border-[#8B3FF2]/40 text-[#A855F7] text-[11px] font-bold mb-2">
            <Sparkles size={12} className="text-amber-300" />
            Verified Student Outcomes
          </span>
          <h2 className="text-2xl xs:text-3xl font-black text-white leading-tight mb-2">
            Real Students. <br />
            <span className="bg-gradient-to-r from-[#8B3FF2] to-cyan-400 bg-clip-text text-transparent">
              Real Capstone Projects.
            </span>
          </h2>
          <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
            See how engineering students from premier colleges cracked placements with MIVEXO credentials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-1.5 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#8B3FF2] text-white shadow-md shadow-[#8B3FF2]/40'
                : 'bg-white/5 text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'tech'
                ? 'bg-[#8B3FF2] text-white shadow-md shadow-[#8B3FF2]/40'
                : 'bg-white/5 text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            Tech &amp; AI Tracks
          </button>
          <button
            onClick={() => setFilter('non-tech')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'non-tech'
                ? 'bg-[#8B3FF2] text-white shadow-md shadow-[#8B3FF2]/40'
                : 'bg-white/5 text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            Design &amp; Analytics
          </button>
        </div>

        {/* Reviews Stacked List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.05
                }}
                className="p-4 rounded-3xl bg-[#0F1C3A] border border-white/10 shadow-lg"
              >
                {/* Student Info Top */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.avatarColor} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-violet-300 flex items-center gap-1 mt-0.5 font-medium">
                        <GraduationCap size={11} /> {item.degree}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                </div>

                {/* College & Track Info */}
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 mb-3 text-[10.5px]">
                  <p className="text-gray-300 flex items-center gap-1.5 leading-snug">
                    <Building2 size={11} className="text-gray-400 shrink-0" />
                    <span className="truncate">{item.college}</span>
                  </p>
                  <p className="text-[#A855F7] font-semibold mt-1">
                    Track: {item.track}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-gray-300 ml-1">5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-gray-200 leading-relaxed mb-3">
                  "{item.review}"
                </p>

                {/* Capstone Deliverable Footer */}
                <div className="pt-2 border-t border-white/10 text-[10.5px]">
                  <span className="text-gray-400 uppercase text-[9px] tracking-wider block font-bold">
                    Verified Capstone:
                  </span>
                  <span className="text-violet-200 font-semibold">
                    {item.capstone}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
