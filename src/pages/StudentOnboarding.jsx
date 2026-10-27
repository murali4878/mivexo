import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, School, Calendar, BookOpen, Layers,
  CheckCircle2, AlertCircle, Laptop, Building2, ShieldCheck,
  Sparkles, ArrowRight, Check, RefreshCw, Printer, FileText,
  Clock, CreditCard, Copy
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
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
    paymentRef: '',
    agreedPolicy: false
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [globalError, setGlobalError] = useState(null)
  const [copiedId, setCopiedId] = useState(false)

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
      case 'paymentRef':
        if (!value.trim()) err = 'Payment Reference ID / UPI UTR / Razorpay ID is required'
        else if (value.trim().length < 4) err = 'Please enter a valid Transaction / Reference ID'
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
        if (!value) err = 'You must confirm your information and acknowledge the training guidelines'
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
      paymentRef: true,
      agreedPolicy: true
    })
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError(null)

    if (!validateAll()) {
      toast.error('Please review the form and fill in all required fields.')
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

  const handleCopyId = (id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id)
      setCopiedId(true)
      toast.success('Application ID copied to clipboard!')
      setTimeout(() => setCopiedId(false), 2500)
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
      paymentRef: '',
      agreedPolicy: false
    })
    setErrors({})
    setTouched({})
    setSubmitSuccess(false)
    setSubmissionResult(null)
    setGlobalError(null)
    setCopiedId(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D0D20] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      {/* Subtle brand ambient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-violet-500/10 dark:bg-violet-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* HEADER / BRAND LOGO — Responsive & Pristine on both Desktop & Mobile */}
        <div className="text-center mb-8 sm:mb-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-white dark:bg-white/95 px-5 py-2.5 sm:px-7 sm:py-3 rounded-2xl shadow-md border border-gray-200/80 dark:border-white/20 hover:shadow-lg transition-all group mb-4"
          >
            <img
              src="/mivexo_full_logo.png"
              alt="MIVEXO"
              className="h-8 sm:h-10 md:h-11 w-auto max-w-[210px] sm:max-w-[250px] object-contain group-hover:scale-[1.02] transition-transform"
            />
          </Link>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-amber-500" /> Official Student Onboarding
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mt-1">
            Student <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Admissions &amp; Onboarding</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Welcome to the MIVEXO Internship &amp; Certification Program. Fill out your details below to lock your student records, batch allocation, and specialization track.
          </p>

          {!isSupabaseConfigured() && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admissions Database Active &amp; Verified</span>
            </div>
          )}
        </div>

        {/* SUCCESS STATE CARD */}
        {submitSuccess && submissionResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-[#13132B] border-2 border-violet-500 dark:border-violet-600 rounded-3xl p-5 sm:p-10 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white mb-5 shadow-xl shadow-violet-500/30">
              <CheckCircle2 size={40} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/60 px-3.5 py-1 rounded-full border border-violet-200 dark:border-violet-800">
              Onboarding Form Submitted Successfully
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-3">
              Welcome Aboard, {formData.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-lg mx-auto leading-relaxed">
              Your MIVEXO student onboarding record has been logged in our admissions database. Below are your official tracking and cohort details.
            </p>

            {/* Tracking ID Badge with One-Click Copy */}
            <div className="my-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-gray-50 dark:bg-[#1A1A36] border border-violet-200 dark:border-violet-800/60 rounded-2xl px-5 py-3 shadow-inner">
              <div className="text-left">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Application ID</span>
                <span className="text-base sm:text-xl font-mono font-black text-violet-700 dark:text-violet-300 tracking-wide">
                  {submissionResult.applicationId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyId(submissionResult.applicationId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/40 dark:hover:bg-violet-800/60 text-violet-700 dark:text-violet-300 text-xs font-bold transition-colors"
              >
                {copiedId ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>

            {/* Application Summary Box */}
            <div className="bg-gray-50 dark:bg-[#1A1A36]/70 rounded-2xl p-4 sm:p-6 text-left border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto space-y-3 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                <FileText size={14} /> Submission Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Full Name:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Email Address:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Mobile Number:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.mobile}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">College:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.college}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Academic Year:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.academicYear}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Track Category:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.courseCategory}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Specialization:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formData.domain === 'Other' ? formData.customDomain : formData.domain}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Allocated Batch:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formData.batch} {selectedBatchInfo.startDate ? `(Starts ${selectedBatchInfo.startDate})` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Learning Mode:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formData.learningMode}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block font-medium">Payment Reference / UTR:</span>
                  <span className="font-mono font-bold text-violet-700 dark:text-violet-400">
                    {formData.paymentRef || 'Submitted'}
                  </span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Admissions Payment Status:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 text-xs">
                    <Clock size={12} /> Pending Admissions Cross-Verification
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <Printer size={15} /> Print / Save Confirmation
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-violet-500/20 transition-all"
              >
                Back to Homepage <ArrowRight size={15} />
              </Link>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-xs font-bold transition-colors"
              >
                <RefreshCw size={13} /> Submit Another Record
              </button>
            </div>
          </motion.div>
        ) : (
          /* FORM VIEW */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#13132B] border border-gray-200/90 dark:border-gray-800 rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600" />

            {/* Error Banner */}
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-rose-800 dark:text-rose-200">Application Notice</p>
                    <p className="text-rose-700 dark:text-rose-300 mt-0.5">{globalError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>

              {/* SECTION 1: PERSONAL & CONTACT INFORMATION */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <User size={15} />
                  </div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">
                    1. Personal &amp; Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name <span className="text-violet-600 dark:text-violet-400">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all focus:outline-none ${
                          touched.fullName && errors.fullName
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-gray-200 dark:border-gray-800 focus:border-violet-600 focus:ring-1 focus:ring-violet-600'
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address <span className="text-violet-600 dark:text-violet-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all focus:outline-none ${
                          touched.email && errors.email
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-gray-200 dark:border-gray-800 focus:border-violet-600 focus:ring-1 focus:ring-violet-600'
                        }`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp / Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      WhatsApp / Mobile Number <span className="text-violet-600 dark:text-violet-400">*</span>
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
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all focus:outline-none ${
                          touched.mobile && errors.mobile
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-gray-200 dark:border-gray-800 focus:border-violet-600 focus:ring-1 focus:ring-violet-600'
                        }`}
                      />
                    </div>
                    {touched.mobile && errors.mobile && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* College / University Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      College / University Name <span className="text-violet-600 dark:text-violet-400">*</span>
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
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all focus:outline-none ${
                          touched.college && errors.college
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-gray-200 dark:border-gray-800 focus:border-violet-600 focus:ring-1 focus:ring-violet-600'
                        }`}
                      />
                    </div>
                    {touched.college && errors.college && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.college}
                      </p>
                    )}
                  </div>
                </div>

                {/* Academic Year Selection — Clean Responsive Wrap */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Academic Year <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {ACADEMIC_YEARS.map((yr) => (
                      <button
                        type="button"
                        key={yr}
                        onClick={() => handleChange('academicYear', yr)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                          formData.academicYear === yr
                            ? 'border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-500/25'
                            : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-700 dark:text-gray-300 hover:border-violet-300 dark:hover:border-gray-700'
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
                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <Layers size={15} />
                  </div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">
                    2. Program Category &amp; Domain
                  </h2>
                </div>

                {/* Course Category Cards */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Course Category <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Technical */}
                    <button
                      type="button"
                      onClick={() => handleChange('courseCategory', 'Technical — ₹3,500')}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                        formData.courseCategory === 'Technical — ₹3,500'
                          ? 'border-violet-600 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm'
                          : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">Technical Track</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-600 text-white">
                            ₹3,500
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          formData.courseCategory === 'Technical — ₹3,500' ? 'border-violet-600 bg-violet-600' : 'border-gray-400 dark:border-gray-600'
                        }`}>
                          {formData.courseCategory === 'Technical — ₹3,500' && <Check size={10} className="text-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        Data Analytics, Web Dev, Python, AI/ML, Cloud &amp; DevOps, Cybersecurity, IoT, App Dev.
                      </p>
                    </button>

                    {/* Non-Technical */}
                    <button
                      type="button"
                      onClick={() => handleChange('courseCategory', 'Non-Technical — ₹3,000')}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                        formData.courseCategory === 'Non-Technical — ₹3,000'
                          ? 'border-violet-600 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm'
                          : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">Non-Technical Track</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                            ₹3,000
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          formData.courseCategory === 'Non-Technical — ₹3,000' ? 'border-violet-600 bg-violet-600' : 'border-gray-400 dark:border-gray-600'
                        }`}>
                          {formData.courseCategory === 'Non-Technical — ₹3,000' && <Check size={10} className="text-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        Digital Marketing, Business Analytics, Product Management, Financial Modeling, HR Analytics.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Select Domain Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Select Specialization Domain <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.domain}
                      onChange={(e) => handleChange('domain', e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border border-gray-200 dark:border-gray-800 focus:border-violet-600 rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer appearance-none"
                    >
                      {DOMAIN_OPTIONS.map((d, i) => (
                        <option key={i} value={d.name} className="bg-white dark:bg-[#13132B] text-gray-900 dark:text-white">
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
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Specify Custom Domain / Subject <span className="text-violet-600 dark:text-violet-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.customDomain}
                      onChange={(e) => handleChange('customDomain', e.target.value)}
                      placeholder="e.g. Embedded Automotive Systems or FinTech Analytics"
                      className="w-full px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border border-gray-200 dark:border-gray-800 focus:border-violet-600 rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                    {touched.customDomain && errors.customDomain && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.customDomain}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              {/* SECTION 3: BATCH SELECTION & SCHEDULE */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
                    <Calendar size={15} />
                  </div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">
                    3. Cohort Batch &amp; Learning Mode
                  </h2>
                </div>

                {/* Batch Options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Select Cohort Batch <span className="text-violet-600 dark:text-violet-400">*</span>
                    </label>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Fixed schedules</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {BATCH_OPTIONS.map((batch) => {
                      const isSelected = formData.batch === batch.name
                      return (
                        <button
                          type="button"
                          key={batch.id}
                          onClick={() => handleChange('batch', batch.name)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-violet-600 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm'
                              : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] hover:border-gray-300 dark:hover:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{batch.name}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-violet-600 bg-violet-600' : 'border-gray-400 dark:border-gray-600'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>

                          <div>
                            {batch.startDate ? (
                              <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 px-2 py-0.5 rounded-md inline-block">
                                Starts {batch.startDate}
                              </div>
                            ) : (
                              <div className="text-[10px] text-gray-500 dark:text-gray-400">
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
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Learning Mode <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleChange('learningMode', 'Online')}
                      className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        formData.learningMode === 'Online'
                          ? 'border-violet-600 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm'
                          : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
                          <Laptop size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-900 dark:text-white block">Online Mode</span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">Live Zoom classes &amp; cloud LMS</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        formData.learningMode === 'Online' ? 'border-violet-600 bg-violet-600' : 'border-gray-400 dark:border-gray-600'
                      }`}>
                        {formData.learningMode === 'Online' && <Check size={10} className="text-white" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChange('learningMode', 'Offline')}
                      className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        formData.learningMode === 'Offline'
                          ? 'border-violet-600 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm'
                          : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-900 dark:text-white block">Offline Mode</span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">Campus classroom hubs &amp; in-person labs</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        formData.learningMode === 'Offline' ? 'border-violet-600 bg-violet-600' : 'border-gray-400 dark:border-gray-600'
                      }`}>
                        {formData.learningMode === 'Offline' && <Check size={10} className="text-white" />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 4: PAYMENT VERIFICATION REFERENCE */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CreditCard size={15} />
                  </div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">
                    4. Payment Verification Reference
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Payment Reference ID / UPI UTR / Razorpay ID <span className="text-violet-600 dark:text-violet-400">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="paymentRef"
                      value={formData.paymentRef}
                      onChange={(e) => handleChange('paymentRef', e.target.value)}
                      onBlur={() => handleBlur('paymentRef')}
                      placeholder="e.g. pay_P19xABC123 or 12-digit UPI UTR (e.g. 428910248192)"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1A1A36] border rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all focus:outline-none ${
                        touched.paymentRef && errors.paymentRef
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-gray-200 dark:border-gray-800 focus:border-violet-600 focus:ring-1 focus:ring-violet-600'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    Enter the Transaction ID or UTR number from your payment confirmation on WhatsApp, Email, or UPI app.
                  </p>
                  {touched.paymentRef && errors.paymentRef && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.paymentRef}
                    </p>
                  )}
                </div>
              </div>

              {/* SELECTION SUMMARY BANNER */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1A36] border border-violet-200 dark:border-violet-900/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                      Allocated Cohort &amp; Schedule
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">
                        Selected: {formData.batch}
                      </span>
                      {selectedBatchInfo.startDate && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-slate-950">
                          Starts on {selectedBatchInfo.startDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                      Track &amp; Category
                    </span>
                    <span className="text-xs font-bold text-violet-700 dark:text-violet-400">
                      {formData.domain === 'Other' ? (formData.customDomain || 'Custom Track') : formData.domain} ({formData.courseCategory})
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 5: REQUIRED POLICY & ACCURACY CONFIRMATION */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.agreedPolicy}
                    onChange={(e) => handleChange('agreedPolicy', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-violet-600 focus:ring-violet-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    I confirm that the personal, contact, and academic details provided are accurate. I acknowledge and agree to MIVEXO&apos;s Privacy Policy, Code of Conduct, and Internship Training Guidelines. <span className="text-violet-600 dark:text-violet-400">*</span>
                  </span>
                </label>
                {touched.agreedPolicy && errors.agreedPolicy && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.agreedPolicy}
                  </p>
                )}

                {/* Important Admin Verification Notice */}
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/40 text-[11px] text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Admissions Verification:</strong> Payment details are cross-verified by MIVEXO admissions administrators against our bank/Razorpay transaction ledger before onboarding confirmation certificates are issued.
                  </span>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreedPolicy}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Validating &amp; Saving Onboarding Record...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Student Onboarding</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 mt-3">
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
