import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, CheckCircle, Search, ZoomIn, Printer, QrCode, ShieldCheck, Download, ExternalLink, Sparkles, X, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const certificatesList = [
  {
    id: 'WN-IN-2026-0108',
    type: 'internship',
    typeName: 'Internship Certificate of Completion',
    title: 'Web Development Internship',
    recipient: 'Student Name',
    domain: 'Web Development',
    dates: '01 June 2026 – 31 July 2026',
    image: '/certificates/cert-internship.jpg',
    signatory: 'Murali, Founder MIVEXO Nexus',
    isDemo: true,
    description: 'Conferred for successfully completing the internship program in Web Development at MIVEXO Nexus, demonstrating dedication, practical skills, and valuable contributions throughout the program.',
    tags: ['React.js', 'Node.js', 'Full Stack Project', 'Mentor Evaluated']
  },
  {
    id: 'WN-TC-2026-0204',
    type: 'training',
    typeName: 'Training Certificate of Completion',
    title: 'Full Stack Web Development Training',
    recipient: 'Student Name',
    domain: 'Full Stack Web Development',
    dates: 'Verified Completion 2026',
    image: '/certificates/cert-training.jpg',
    signatory: 'Murali, Founder MIVEXO Nexus',
    badge: 'Golden Excellence Seal',
    isDemo: true,
    description: 'Awarded for successfully completing the intensive training program in Full Stack Web Development at MIVEXO Nexus, demonstrating a strong understanding of concepts, practical skills, and project work.',
    tags: ['Frontend Architecture', 'REST APIs', 'Database Schemas', 'Grade A']
  },
  {
    id: 'WN-OP-2026-0108',
    type: 'outstanding',
    typeName: 'Outstanding Performer Certificate',
    title: 'Outstanding Performer in Web Development',
    recipient: 'Student Name',
    domain: 'Web Development',
    dates: 'Honors Citation 2026',
    image: '/certificates/cert-outstanding.jpg',
    signatory: 'Murali, Founder MIVEXO Nexus',
    badge: 'Top 1% Distinction',
    isDemo: true,
    description: 'Recognized as an Outstanding Performer in Web Development for demonstrating exceptional performance, dedication, creativity, and consistent excellence throughout the program.',
    tags: ['Leadership', 'Capstone Lead', 'Top 1% Rank', 'Honor Roll']
  }
]

export default function Certificates() {
  const [filter, setFilter] = useState('all')
  const [activeModalCert, setActiveModalCert] = useState(null)
  const [searchCertId, setSearchCertId] = useState('')
  const printRef = useRef(null)

  const filteredCerts = certificatesList.filter(cert => {
    if (filter !== 'all' && cert.type !== filter) return false
    if (searchCertId && !cert.id.toLowerCase().includes(searchCertId.toLowerCase()) && !cert.typeName.toLowerCase().includes(searchCertId.toLowerCase()) && !cert.title.toLowerCase().includes(searchCertId.toLowerCase())) {
      return false
    }
    return true
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B1A]">
      {/* Header */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-950 via-indigo-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:32px_32px]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-xs md:text-sm font-semibold mb-6">
              <Award size={16} /> Official MIVEXO Nexus Credential Showcase
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Verifiable Certificates That <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Prove Real Capability
            </span>
          </motion.h1>
          <p className="text-violet-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every MIVEXO Nexus credential comes with cryptographic ID verification, QR-enabled public authentication, and verifiable project evidence.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 px-6 max-w-7xl mx-auto border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Certificates' },
              { id: 'internship', label: 'Internship Certificates' },
              { id: 'training', label: 'Training Certificates' },
              { id: 'outstanding', label: 'Outstanding Honors' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-gray-100 dark:bg-[#13132B] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by ID (e.g. WN-IN, WN-TC, WN-OP)..."
              value={searchCertId}
              onChange={(e) => setSearchCertId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#13132B] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white dark:bg-[#13132B] border-2 border-violet-100 dark:border-violet-900/40 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Certificate Visual Image with Watermark */}
                <div className="relative bg-slate-950 aspect-[1.45/1] overflow-hidden cursor-pointer" onClick={() => setActiveModalCert(cert)}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle DEMO Watermark Banner */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 text-black text-[11px] font-black uppercase tracking-widest rounded-lg shadow-md">
                    SAMPLE DEMO
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-4 py-2 bg-white/90 text-violet-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <ZoomIn size={14} /> Fullscreen Zoom
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-violet-600 dark:text-violet-400">
                      ID: {cert.id}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Verifiable
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors mb-1">
                    {cert.typeName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{cert.title} · {cert.dates}</p>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalCert(cert)}
                  className="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  <Eye size={14} /> Inspect Full
                </button>
                <Link
                  to={`/verify/${cert.id}`}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 hover:bg-violet-600 hover:text-white transition-all"
                >
                  <ExternalLink size={12} /> Test QR Verify
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN CERTIFICATE ZOOM LIGHTBOX */}
      <AnimatePresence>
        {activeModalCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-[#13132B] rounded-3xl max-w-4xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl relative my-6 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                    {activeModalCert.typeName}
                    <span className="text-[10px] bg-amber-500/20 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                      DEMO SAMPLE
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">Credential ID: {activeModalCert.id}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-xl text-xs font-semibold hover:bg-violet-700 shadow"
                  >
                    <Printer size={14} /> Print
                  </button>
                  <button
                    onClick={() => setActiveModalCert(null)}
                    className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Certificate Image Viewer with High-Res Frame */}
              <div ref={printRef} className="p-4 md:p-6 bg-slate-900 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/30 max-w-3xl w-full">
                  <img
                    src={activeModalCert.image}
                    alt={activeModalCert.title}
                    className="w-full h-auto object-contain"
                  />
                  {/* Digital Watermark overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-mono rounded border border-white/20">
                    MIVEXO Nexus Official Authenticated Format
                  </div>
                </div>
              </div>

              {/* Verification Details */}
              <div className="p-6 bg-gray-50 dark:bg-[#1A1A36] border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <div>
                  <p className="text-gray-500">Signatory: <strong className="text-gray-900 dark:text-white">{activeModalCert.signatory}</strong></p>
                  <p className="text-gray-500 mt-0.5">Verification URL: <strong className="font-mono text-violet-600 dark:text-violet-400">mivexo.com/verify/{activeModalCert.id}</strong></p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/verify/${activeModalCert.id}`}
                    className="btn-primary !py-2 !px-4 !text-xs"
                  >
                    Open Public Verification Page <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
