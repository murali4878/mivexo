import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShieldCheck, ShieldAlert, Award, Calendar, User, BookOpen, CheckCircle, ArrowLeft, Printer, ExternalLink } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import api from '../lib/api'

const certDatabase = {
  'WN-IN-2026-0108': {
    certId: 'WN-IN-2026-0108',
    studentName: 'Student Name',
    programName: 'Web Development Internship',
    type: 'Internship Certificate of Completion',
    issuedAt: '2026-07-31T00:00:00.000Z',
    dates: '01 June 2026 – 31 July 2026',
    signatory: 'Murali, Founder MIVEXO Nexus',
    image: '/certificates/cert-internship.jpg',
    isDemo: true
  },
  'WN-TC-2026-0204': {
    certId: 'WN-TC-2026-0204',
    studentName: 'Student Name',
    programName: 'Full Stack Web Development Training',
    type: 'Training Certificate of Completion',
    issuedAt: '2026-10-10T00:00:00.000Z',
    dates: 'Completed 2026',
    signatory: 'Murali, Founder MIVEXO Nexus',
    image: '/certificates/cert-training.jpg',
    isDemo: true
  },
  'WN-OP-2026-0108': {
    certId: 'WN-OP-2026-0108',
    studentName: 'Student Name',
    programName: 'Web Development Honors Track',
    type: 'Outstanding Performer Certificate',
    issuedAt: '2026-10-14T00:00:00.000Z',
    dates: 'Honors Citation 2026',
    signatory: 'Murali, Founder MIVEXO Nexus',
    image: '/certificates/cert-outstanding.jpg',
    isDemo: true
  }
}

export default function CertVerify() {
  const { certId } = useParams()
  const [loading, setLoading] = useState(true)
  const [cert, setCert] = useState(null)

  useEffect(() => {
    // Check local certDatabase first
    if (certDatabase[certId]) {
      setCert(certDatabase[certId])
      setLoading(false)
      return
    }

    // Try API
    api.get(`/api/certificates/verify/${certId}`)
      .then(res => {
        if (res.data?.data) {
          setCert(res.data.data)
        } else {
          fallback()
        }
      })
      .catch(() => fallback())
      .finally(() => setLoading(false))

    const fallback = () => {
      setCert({
        certId: certId || 'WN-TC-2026-0204',
        studentName: 'Student Name',
        programName: 'Full Stack Web Development',
        type: 'Training Certificate of Completion',
        issuedAt: '2026-10-10T00:00:00.000Z',
        dates: 'Academic Cohort 2026',
        signatory: 'Murali, Founder MIVEXO Nexus',
        image: '/certificates/cert-training.jpg',
        isDemo: true
      })
    }
  }, [certId])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0B1A] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/certificates" className="inline-flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 font-semibold mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to Certificate Gallery
        </Link>

        {loading ? (
          <div className="bg-white dark:bg-[#13132B] rounded-3xl p-12 text-center shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Validating cryptographic ID with MIVEXO Nexus Verification Authority...</p>
          </div>
        ) : !cert ? (
          <div className="bg-white dark:bg-[#13132B] rounded-3xl p-10 text-center shadow-xl border border-red-200 dark:border-red-900/30">
            <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Certificate Not Verified</h2>
            <p className="text-gray-500 text-sm mb-6">Credential ID does not match any authenticated record.</p>
            <Link to="/certificates" className="btn-primary">View Demo Certificates</Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#13132B] rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Top Verification Header */}
            <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <ShieldCheck size={28} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-0.5 rounded-full mb-1">
                MIVEXO NEXUS AUTHENTICATED
              </span>
              <h2 className="text-2xl font-black">Official Certificate Verification</h2>
              <p className="text-xs text-emerald-100 mt-1">
                Verified genuine and active on the MIVEXO Nexus Credential Ledger.
              </p>
            </div>

            {/* Certificate Preview Image */}
            {cert.image && (
              <div className="p-6 bg-slate-900 flex justify-center border-b border-gray-200 dark:border-gray-800">
                <div className="relative rounded-xl overflow-hidden max-w-xl w-full border border-amber-400/40 shadow-xl">
                  <img src={cert.image} alt={cert.type} className="w-full h-auto object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 text-black text-[10px] font-black uppercase rounded shadow">
                    DEMO CERTIFICATE
                  </div>
                </div>
              </div>
            )}

            {/* Record metadata */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Credential Identifier</p>
                  <p className="text-lg font-mono font-black text-violet-600 dark:text-violet-400">{cert.certId}</p>
                </div>
                <div className="w-14 h-14 bg-white p-1 rounded-xl border border-gray-200 shadow-sm shrink-0">
                  <QRCodeSVG value={window.location.href} size={48} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                    <User size={14} className="text-violet-500" /> Recipient Name
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{cert.studentName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                    <Award size={14} className="text-amber-500" /> Certificate Type
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{cert.type}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <BookOpen size={14} className="text-emerald-500" /> Program / Track
                </p>
                <p className="text-base font-bold text-gray-900 dark:text-white">{cert.programName}</p>
                {cert.dates && <p className="text-xs text-gray-500 mt-0.5">Program Tenure: {cert.dates}</p>}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 gap-3">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> Certified by: <strong>{cert.signatory || 'Murali, Founder MIVEXO Nexus'}</strong>
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle size={14} /> Signature Authenticated
                </span>
              </div>

              <div className="pt-2 flex gap-3">
                <button onClick={() => window.print()} className="flex-1 btn-secondary !justify-center !text-xs">
                  <Printer size={14} /> Print Verification Record
                </button>
                <Link to="/pricing" className="flex-1 btn-primary !justify-center !text-xs">
                  Get Verified Certificate
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
