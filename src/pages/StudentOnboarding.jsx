import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, School, Calendar, BookOpen, Layers,
  CheckCircle2, AlertCircle, Laptop, Building2, ShieldCheck,
  Sparkles, ArrowRight, Check, RefreshCw, Printer, FileText,
  Clock, Award, HelpCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import mivexoLogo from '../assets/mivexo_logo.png'
import { saveStudentOnboarding, isSupabaseConfigured } from '../lib/supabase'

// Complete Domains List
const DOMAIN_OPTIONS = [
  { name: 'Data Analytics', category: 'Both', badge: 'High Placement' },
  { name: 'Web Development', category: 'Technical', badge: 'Trending' },
  { name: 'Python', category: 'Technical', badge: 'Core Stack' },
  { name: 'AI / Machine Learning', category: 'Technical', badge: 'AI Track' },
  { name: 'Business Analytics', category: 'Non-Technical', badge: 'Enterprise' },
  { name: 'Digital Marketing', category: 'Non-Technical', badge: 'Growth' },
  { name: 'Cloud Computing & DevOps', category: 'Technical', badge: 'Cloud' },
  { name: 'Cybersecurity & Ethical Hacking', category: 'Technical', badge: 'Security' },
  { name: 'UI/UX Design & Product Systems', category: 'Both', badge: 'Design' },
  { name: 'Mobile App Development (React Native & Flutter)', category: 'Technical', badge: 'Mobile' },
  { name: 'Financial Modeling & Valuation', category: 'Non-Technical', badge: 'Finance' },
  { name: 'Blockchain & Web3 Engineering', category: 'Technical', badge: 'Web3' },
  { name: 'IoT & Embedded Systems', category: 'Technical', badge: 'Hardware' },
  { name: 'Robotics & Automation', category: 'Technical', badge: 'Robotics' },
  { name: 'Game Development (Unity 3D)', category: 'Technical', badge: 'Gaming' },
  { name: 'HR Analytics & Operations', category: 'Non-Technical', badge: 'HR' },
  { name: 'Supply Chain & Logistics', category: 'Non-Technical', badge: 'Operations' },
  { name: 'Bioinformatics & Computational Genomics', category: 'Technical', badge: 'BioTech' },
  { name: 'Other', category: 'Both', badge: 'Custom Track' }
]

const ACADEMIC_YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Graduate']

const BATCH_OPTIONS = [
  {
    id: 'nov-2026',
    name: 'November 2026',
    startDate: 'November 10, 2026',
    tag: 'Admissions Open',
    activeBadge: 'Starts Nov 10, 2026'
  },
  {
    id: 'dec-2026',
    name: 'December 2026',
    startDate: null,
    tag: 'Upcoming',
    activeBadge: 'Admissions Open'
  },
  {
    id: 'jan-2027',
    name: 'January 2027',
    startDate: null,
    tag: 'Upcoming',
    activeBadge: 'Admissions Open'
  },
  {
    id: 'feb-2027',
    name: 'February 2027',
    startDate: null,
    tag: 'Upcoming',
    activeBadge: 'Admissions Open'
  }
]

export default function StudentOnboarding() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    college: '',
    academicYear: 'Final Year',
    courseCategory: 'Technical — ₹3,500',
    domain: 'Data Analytics',
    customDomain: '',
    batch: 'November 2026',
    learningMode: 'Online',
    agreedPolicy: false
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [globalError, setGlobalError] = useState(null)

  // Find details for current selected batch
  const selectedBatchInfo = useMemo(() => {
    return BATCH_OPTIONS.find(b => b.name === formData.batch) || BATCH_OPTIONS[0]
  }, [formData.batch])

  // Field validation rules
  const validateField = (name, value) => {
    let err = null
    switch (name) {
      case 'fullName':
        if (!value.trim()) err = 'Full name is required'
        else if (value.trim().length < 3) err = 'Name must be at least 3 characters'
        break
      case 'email':
        if (!value.trim()) err = 'Email address is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) err = 'Please enter a valid email address'
        break
      case 'mobile':
        const cleanPhone = value.replace(/[^0-9]/g, '')
        if (!value.trim()) err = 'Mobile / WhatsApp number is required'
        else if (cleanPhone.length < 10) err = 'Please enter a valid 10-digit mobile number'
        break
      case 'college':
        if (!value.trim()) err = 'College / University name is required'
        break
      case 'domain':
        if (!value) err = 'Please select a specialization domain'
        break
      case 'customDomain':
        if (formData.domain === 'Other' && !value.trim()) {
          err = 'Please specify your track or domain'
        }
        break
      case 'agreedPolicy':
        if (!value) err = 'You must confirm your information and acknowledge the privacy policy'
        break
      default:
        break
    }
    return err
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const err = validateField(field, formData[field])
    setErrors(prev => ({ ...prev, [field]: err }))
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const err = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: err }))
    }
  }

  const validateAll = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key])
      if (err) newErrors[key] = err
    })
    setErrors(newErrors)
    setTouched({
      fullName: true,
      email: true,
      mobile: true,
      college: true,
      academicYear: true,
      courseCategory: true,
      domain: true,
      customDomain: true,
      batch: true,
      learningMode: true,
      agreedPolicy: true
    })
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError(null)

    if (!validateAll()) {
      toast.error('Please review the form and correct the highlighted errors.')
      return
    }

    setIsSubmitting(true)
    const toastId = toast.loading('Submitting your MIVEXO onboarding application...')

    try {
      const result = await saveStudentOnboarding(formData)
      toast.dismiss(toastId)
      toast.success('Onboarding application submitted successfully! 🎉')
      setSubmissionResult(result)
      setSubmitSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      toast.dismiss(toastId)
      const message = err.message || 'Submission failed. Please check your details and try again.'
      setGlobalError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      college: '',
      academicYear: 'Final Year',
      courseCategory: 'Technical — ₹3,500',
      domain: 'Data Analytics',
      customDomain: '',
      batch: 'November 2026',
      learningMode: 'Online',
      agreedPolicy: false
    })
    setErrors({})
    setTouched({})
    setSubmitSuccess(false)
    setSubmissionResult(null)
    setGlobalError(null)
  }

  return (
    <div className="min-h-screen bg-[#0B1730] text-white selection:bg-[#8B3FF2] selection:text-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Radiant Background Accents with MIVEXO purple & dark navy */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-[#8B3FF2]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,63,242,0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER / BRANDING */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-4">
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-xl shadow-[#8B3FF2]/20 group-hover:scale-105 transition-transform">
              <img src={mivexoLogo} alt="MIVEXO" className="h-8 sm:h-9 w-auto object-contain" />
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B3FF2]/15 border border-[#8B3FF2]/30 text-[#8B3FF2] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-amber-400" /> Official Student Onboarding
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            MIVEXO <span className="bg-gradient-to-r from-[#8B3FF2] via-purple-400 to-indigo-300 bg-clip-text text-transparent">Student Onboarding</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-xl mx-auto leading-relaxed">
            Welcome to the MIVEXO Internship &amp; Certification Program. Complete this onboarding application to lock your academic records, cohort batch, and learning track.
          </p>

          {!isSupabaseConfigured() && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Secure Local Mirror Active (Supabase Cloud Sync Ready)</span>
            </div>
          )}
        </div>

        {/* SUCCESS STATE CARD */}
        {submitSuccess && submissionResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0e1d3e] border-2 border-[#8B3FF2] rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#8B3FF2]/20 text-center relative overflow-hidden"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#8B3FF2] to-indigo-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-[#8B3FF2]/40">
              <CheckCircle2 size={44} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#8B3FF2] bg-[#8B3FF2]/15 px-3.5 py-1 rounded-full border border-[#8B3FF2]/30">
              Application Successfully Saved
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
              Welcome Aboard, {formData.fullName}!
            </h2>
            <p className="text-sm text-gray-300 mt-2 max-w-lg mx-auto">
              Your MIVEXO student onboarding record has been logged in our admissions database. Below are your official tracking details.
            </p>

            {/* Tracking ID Badge */}
            <div className="my-6 inline-block bg-[#070e20] border border-[#8B3FF2]/40 rounded-2xl px-6 py-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Application ID</span>
              <span className="text-lg sm:text-xl font-mono font-black text-white tracking-wide">
                {submissionResult.applicationId}
              </span>
            </div>

            {/* Application Summary Box */}
            <div className="bg-[#070e20]/80 rounded-2xl p-5 text-left border border-white/10 max-w-2xl mx-auto space-y-3 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B3FF2] border-b border-white/10 pb-2 flex items-center gap-2">
                <FileText size={14} /> Submission Summary
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block">Full Name:</span>
                  <span className="font-semibold text-white">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Email Address:</span>
                  <span className="font-semibold text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Mobile Number:</span>
                  <span className="font-semibold text-white">{formData.mobile}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">College / University:</span>
                  <span className="font-semibold text-white">{formData.college}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Academic Year:</span>
                  <span className="font-semibold text-white">{formData.academicYear}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Course Category &amp; Fee:</span>
                  <span className="font-semibold text-white">{formData.courseCategory}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Specialization Domain:</span>
                  <span className="font-semibold text-[#8B3FF2]">
                    {formData.domain === 'Other' ? formData.customDomain : formData.domain}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Allocated Batch:</span>
                  <span className="font-semibold text-white">
                    {formData.batch} {selectedBatchInfo.startDate ? `(Starts ${selectedBatchInfo.startDate})` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Preferred Learning Mode:</span>
                  <span className="font-semibold text-white">{formData.learningMode}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Admissions Payment Status:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                    <Clock size={12} /> Pending Verification by Admissions Team
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all duration-200"
              >
                <Printer size={16} /> Print / Save Confirmation
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-violet-500/20 hover:shadow-lg transition-all duration-200"
              >
                Back to Homepage <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-gray-400 hover:text-white text-xs font-bold transition-colors"
              >
                <RefreshCw size={14} /> Submit Another Record
              </button>
            </div>
          </motion.div>
        ) : (
          /* FORM VIEW */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0e1d3e]/95 backdrop-blur-2xl border border-[#8B3FF2]/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#8B3FF2]/20 relative overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B3FF2] via-purple-400 to-indigo-500" />

            {/* Error Banner */}
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-rose-200">Application Notice</p>
                    <p className="text-rose-300 mt-0.5">{globalError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>

              {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <User size={16} className="text-[#8B3FF2]" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    1. Personal &amp; Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                      Full Name <span className="text-[#8B3FF2]">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="e.g. Murali Krishna"
                        className={`w-full pl-10 pr-4 py-3 bg-[#070e20] border rounded-xl text-sm text-white placeholder-gray-500 transition-all focus:outline-none ${
                          touched.fullName && errors.fullName
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/15 focus:border-[#8B3FF2] focus:ring-1 focus:ring-[#8B3FF2]'
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                      Email Address <span className="text-[#8B3FF2]">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="e.g. student@gmail.com"
                        className={`w-full pl-10 pr-4 py-3 bg-[#070e20] border rounded-xl text-sm text-white placeholder-gray-500 transition-all focus:outline-none ${
                          touched.email && errors.email
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/15 focus:border-[#8B3FF2] focus:ring-1 focus:ring-[#8B3FF2]'
                        }`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mobile / WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                      Mobile / WhatsApp Number <span className="text-[#8B3FF2]">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => handleChange('mobile', e.target.value)}
                        onBlur={() => handleBlur('mobile')}
                        placeholder="e.g. 9876543210"
                        maxLength={13}
                        className={`w-full pl-10 pr-4 py-3 bg-[#070e20] border rounded-xl text-sm text-white placeholder-gray-500 transition-all focus:outline-none ${
                          touched.mobile && errors.mobile
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/15 focus:border-[#8B3FF2] focus:ring-1 focus:ring-[#8B3FF2]'
                        }`}
                      />
                    </div>
                    {touched.mobile && errors.mobile ? (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.mobile}
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-400 mt-1">Official batch notifications will be delivered to this WhatsApp.</p>
                    )}
                  </div>

                  {/* College / University Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                      College / University Name <span className="text-[#8B3FF2]">*</span>
                    </label>
                    <div className="relative">
                      <School size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={(e) => handleChange('college', e.target.value)}
                        onBlur={() => handleBlur('college')}
                        placeholder="e.g. Anna University / VIT / SRM"
                        className={`w-full pl-10 pr-4 py-3 bg-[#070e20] border rounded-xl text-sm text-white placeholder-gray-500 transition-all focus:outline-none ${
                          touched.college && errors.college
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/15 focus:border-[#8B3FF2] focus:ring-1 focus:ring-[#8B3FF2]'
                        }`}
                      />
                    </div>
                    {touched.college && errors.college && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.college}
                      </p>
                    )}
                  </div>
                </div>

                {/* Academic Year Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Academic Year <span className="text-[#8B3FF2]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {ACADEMIC_YEARS.map((yr) => (
                      <button
                        type="button"
                        key={yr}
                        onClick={() => handleChange('academicYear', yr)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                          formData.academicYear === yr
                            ? 'border-[#8B3FF2] bg-[#8B3FF2] text-white shadow-lg shadow-[#8B3FF2]/30'
                            : 'border-white/10 bg-[#070e20] text-gray-300 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: COURSE CATEGORY & DOMAIN */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Layers size={16} className="text-[#8B3FF2]" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    2. Program Category &amp; Specialization Domain
                  </h2>
                </div>

                {/* Course Category Cards */}
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Course Category <span className="text-[#8B3FF2]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Technical */}
                    <button
                      type="button"
                      onClick={() => handleChange('courseCategory', 'Technical — ₹3,500')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                        formData.courseCategory === 'Technical — ₹3,500'
                          ? 'border-[#8B3FF2] bg-[#8B3FF2]/20 shadow-lg shadow-[#8B3FF2]/30'
                          : 'border-white/10 bg-[#070e20] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">Technical</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B3FF2] text-white">
                            ₹3,500
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          formData.courseCategory === 'Technical — ₹3,500' ? 'border-[#8B3FF2] bg-[#8B3FF2]' : 'border-gray-500'
                        }`}>
                          {formData.courseCategory === 'Technical — ₹3,500' && <Check size={10} className="text-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Software Engineering, Full Stack, AI/ML, Python, Cloud &amp; DevOps, Cyber Security, etc.
                      </p>
                    </button>

                    {/* Non-Technical */}
                    <button
                      type="button"
                      onClick={() => handleChange('courseCategory', 'Non-Technical — ₹3,000')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                        formData.courseCategory === 'Non-Technical — ₹3,000'
                          ? 'border-[#8B3FF2] bg-[#8B3FF2]/20 shadow-lg shadow-[#8B3FF2]/30'
                          : 'border-white/10 bg-[#070e20] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">Non-Technical</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white">
                            ₹3,000
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          formData.courseCategory === 'Non-Technical — ₹3,000' ? 'border-[#8B3FF2] bg-[#8B3FF2]' : 'border-gray-500'
                        }`}>
                          {formData.courseCategory === 'Non-Technical — ₹3,000' && <Check size={10} className="text-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Digital Marketing, Business Analytics, UI/UX, Product Management, HR Operations, Finance.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Select Domain Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                    Select Specialization Domain <span className="text-[#8B3FF2]">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.domain}
                      onChange={(e) => handleChange('domain', e.target.value)}
                      className="w-full pl-10 pr-8 py-3 bg-[#070e20] border border-white/15 focus:border-[#8B3FF2] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8B3FF2] cursor-pointer appearance-none"
                    >
                      {DOMAIN_OPTIONS.map((d, i) => (
                        <option key={i} value={d.name} className="bg-[#0B1730] text-white py-1">
                          {d.name} {d.badge ? `(${d.badge})` : ''}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Conditional Custom Domain if 'Other' is chosen */}
                {formData.domain === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-1"
                  >
                    <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                      Specify Custom Domain / Subject <span className="text-[#8B3FF2]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.customDomain}
                      onChange={(e) => handleChange('customDomain', e.target.value)}
                      placeholder="e.g. Embedded Automotive Systems or FinTech Analytics"
                      className="w-full px-4 py-3 bg-[#070e20] border border-white/15 focus:border-[#8B3FF2] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#8B3FF2]"
                    />
                    {touched.customDomain && errors.customDomain && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.customDomain}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              {/* SECTION 3: BATCH SELECTION & SCHEDULE */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Calendar size={16} className="text-[#8B3FF2]" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    3. Cohort Batch &amp; Learning Mode
                  </h2>
                </div>

                {/* Batch Options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-200">
                      Select Cohort Batch <span className="text-[#8B3FF2]">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400">Fixed schedules</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {BATCH_OPTIONS.map((batch) => {
                      const isSelected = formData.batch === batch.name
                      return (
                        <button
                          type="button"
                          key={batch.id}
                          onClick={() => handleChange('batch', batch.name)}
                          className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#8B3FF2] bg-[#8B3FF2]/20 shadow-md shadow-[#8B3FF2]/30'
                              : 'border-white/10 bg-[#070e20] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white">{batch.name}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#8B3FF2] bg-[#8B3FF2]' : 'border-gray-500'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>

                          <div>
                            {batch.startDate ? (
                              <div className="text-[11px] font-bold text-amber-300 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-md inline-block">
                                Starts {batch.startDate}
                              </div>
                            ) : (
                              <div className="text-[10px] text-gray-400">
                                {batch.tag}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Learning Mode */}
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Preferred Learning Mode <span className="text-[#8B3FF2]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleChange('learningMode', 'Online')}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        formData.learningMode === 'Online'
                          ? 'border-[#8B3FF2] bg-[#8B3FF2]/20 shadow-md shadow-[#8B3FF2]/30'
                          : 'border-white/10 bg-[#070e20] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#8B3FF2]/30 flex items-center justify-center text-[#8B3FF2]">
                          <Laptop size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Online Mode</span>
                          <span className="text-[10px] text-gray-300">Live Zoom mentor classes &amp; cloud LMS</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        formData.learningMode === 'Online' ? 'border-[#8B3FF2] bg-[#8B3FF2]' : 'border-gray-500'
                      }`}>
                        {formData.learningMode === 'Online' && <Check size={10} className="text-white" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChange('learningMode', 'Offline')}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        formData.learningMode === 'Offline'
                          ? 'border-[#8B3FF2] bg-[#8B3FF2]/20 shadow-md shadow-[#8B3FF2]/30'
                          : 'border-white/10 bg-[#070e20] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Offline Mode</span>
                          <span className="text-[10px] text-gray-300">Campus classroom hubs &amp; in-person labs</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        formData.learningMode === 'Offline' ? 'border-[#8B3FF2] bg-[#8B3FF2]' : 'border-gray-500'
                      }`}>
                        {formData.learningMode === 'Offline' && <Check size={10} className="text-white" />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* CLEAR BATCH & SELECTION BANNER BEFORE SUBMISSION */}
              <div className="p-4 rounded-2xl bg-[#070e20] border border-[#8B3FF2]/40 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Allocated Cohort &amp; Schedule
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-black text-white">
                        Selected Batch: {formData.batch}
                      </span>
                      {selectedBatchInfo.startDate && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950">
                          Batch starts on {selectedBatchInfo.startDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Track &amp; Category
                    </span>
                    <span className="text-xs font-bold text-[#8B3FF2]">
                      {formData.domain === 'Other' ? (formData.customDomain || 'Custom Track') : formData.domain} ({formData.courseCategory})
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: REQUIRED POLICY & ACCURACY CONFIRMATION */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.agreedPolicy}
                    onChange={(e) => handleChange('agreedPolicy', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded bg-[#070e20] border-white/20 text-[#8B3FF2] focus:ring-[#8B3FF2] cursor-pointer"
                  />
                  <span className="text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    I confirm that the personal, contact, and academic details provided are accurate. I acknowledge and agree to MIVEXO&apos;s Privacy Policy, Code of Conduct, and Internship Training Guidelines. <span className="text-[#8B3FF2]">*</span>
                  </span>
                </label>
                {touched.agreedPolicy && errors.agreedPolicy && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.agreedPolicy}
                  </p>
                )}

                {/* Important Admin Verification Notice */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 flex items-start gap-2">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Security Notice:</strong> Payment statuses are strictly verified by MIVEXO admissions administrators against payment gateway ledger ID. Self-confirmation of payment is restricted to preserve academic record integrity.
                  </span>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreedPolicy}
                  className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 hover:-translate-y-px active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Validating &amp; Saving Onboarding Record...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Student Onboarding ↗</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400 mt-3">
                  Protected by 256-bit SSL encryption · Authorized MIVEXO Admissions Database
                </p>
              </div>

            </form>
          </motion.div>
        )}

      </div>
    </div>
  )
}
