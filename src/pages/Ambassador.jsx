import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Award, Gift, TrendingUp, CheckCircle, Copy, Share2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const benefits = [
  { icon: Award, title: 'Official Certificate', desc: 'Receive an official Campus Ambassador & Leadership Certificate with verified credentials.', color: 'from-violet-500 to-indigo-500' },
  { icon: Gift, title: 'Cash Rewards & Stipend', desc: 'Earn ₹250 for every verified registration through your personal referral link.', color: 'from-emerald-500 to-teal-500' },
  { icon: Sparkles, title: 'Free LMS & Course Access', desc: 'Unlock complimentary access to advanced technical & management certification tracks.', color: 'from-amber-500 to-orange-500' },
  { icon: TrendingUp, title: 'Direct Mentor Network', desc: 'Exclusive monthly mastermind webinars with tech leaders from Google, Amazon & Microsoft.', color: 'from-pink-500 to-rose-500' }
]

const faqs = [
  { q: 'Who is eligible to apply?', a: 'Any college student currently enrolled in an undergraduate or postgraduate program across India can apply.' },
  { q: 'How do referral payouts work?', a: 'Payouts are credited directly to your UPI ID or bank account every Friday for all confirmed registrations.' },
  { q: 'What is the minimum time commitment?', a: 'Around 2 to 4 hours per week, flexibly managed around your classes and exam schedule.' },
  { q: 'When do I receive my Leadership Certificate?', a: 'Ambassadors who achieve a milestone of at least 5 active student registrations receive an official MIVEXO Leadership Certificate.' }
]

// Google Sheet URL for reference (used in Apps Script)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_FHnGyWjiVRZH1DGpwLIEo4rkeeKm50oqznK-OrGOp4/edit?usp=sharing';

// ==== Google Apps Script endpoint (replace with your deployed Web App URL) ==== //
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrhsq1kAWjQQhmtQp-9eiFUp5sjm_oNdwEwepBcPVXqjuImNt0O-Sect3NVl1yykoR/exec'

export default function Ambassador() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    college: '',
    department: '',
    year: '',
    city: '',
    experience: ''
  })
  const [loading, setLoading] = useState(false)
  const [ambassadorProfile, setAmbassadorProfile] = useState(null)

  const handleApply = async (e) => {
    e.preventDefault();
    // Basic client‑side validation
    for (const key of ['name', 'email', 'phone', 'whatsapp', 'college', 'department', 'year', 'city', 'experience']) {
      if (!formData[key]) {
        toast.error(`Please fill out the ${key} field.`);
        return;
      }
    }
    // Prevent duplicate submissions
    if (loading) return;
    setLoading(true);
    try {
      // Map form fields to required payload
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        college: formData.college,
        department: formData.department,
        academicYear: formData.year,
        cityState: formData.city,
        motivation: formData.experience,
        submissionDate: new Date().toISOString(),
        status: 'Pending Review'
      };

      // Use text/plain to avoid CORS preflight — Apps Script cannot handle OPTIONS requests.
      // JSON is still sent in the body and parsed by the script via e.postData.contents.
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      // Apps Script always returns 200; check body for actual result
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        // If response isn't JSON, treat as success if HTTP 200
        data = { success: res.ok };
      }

      if (data.result === 'success' || data.success) {
        // Clear form only after confirmed success
        const savedName = formData.name;
        setFormData({ name: '', email: '', phone: '', whatsapp: '', college: '', department: '', year: '', city: '', experience: '' });
        const mockCode = `WVR-${savedName.slice(0,3).toUpperCase()}-2026`;
        setAmbassadorProfile({ referralCode: mockCode, totalReferrals: 0, name: savedName, college: payload.college });
        toast.success('Your application was submitted successfully!');
      } else {
        toast.error(data.message || 'Failed to submit your application.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Unable to submit at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const copyReferral = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Referral link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0B1A]">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 text-sm font-semibold mb-6">
              <Users size={16} /> Campus Growth & Leadership Program
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Lead The Revolution on <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Your Campus
            </span>
          </motion.h1>
          <p className="text-violet-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Represent MIVEXO, mentor your peers, build leadership credentials, and earn stipends with real‑time referral tracking.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Why Become an Ambassador</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            Perks, Rewards & Recognition
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-lg`}>
                <b.icon size={26} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{b.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Ambassador Dashboard or Application Form */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        {ambassadorProfile ? (
          <div className="rounded-3xl bg-gradient-to-br from-violet-900 to-indigo-900 text-white p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/20">
              <div>
                <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">ACTIVE AMBASSADOR</span>
                <h3 className="text-2xl font-bold mt-2">Welcome, {ambassadorProfile.name}</h3>
                <p className="text-violet-200 text-xs mt-1">College: {ambassadorProfile.college}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-violet-200">Total Referrals</p>
                <p className="text-4xl font-black">{ambassadorProfile.totalReferrals}</p>
              </div>
            </div>
            {/* Referral Link Copy Bar */}
            <div className="my-8 bg-black/30 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-violet-300 font-semibold mb-1">Your Personal Referral Link</p>
                <p className="font-mono text-sm text-white break-all">
                  http://localhost:5173/pricing?ref={ambassadorProfile.referralCode}
                </p>
              </div>
              <button
                onClick={() => copyReferral(`http://localhost:5173/pricing?ref=${ambassadorProfile.referralCode}`)}
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
              >
                <Copy size={14} /> Copy Link
              </button>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-violet-200">Referral Code</p>
                <p className="text-base font-black font-mono mt-1">{ambassadorProfile.referralCode}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-violet-200">Reward Balance</p>
                <p className="text-base font-black mt-1">₹0</p>
              </div>
              <div className="col-span-2 md:col-span-1 bg-white/10 rounded-xl p-4 border border-white/10">
                <p className="text-xs text-violet-200">Leadership Cert</p>
                <p className="text-xs font-bold text-emerald-300 mt-2">✓ Not Eligible (5+ referrals needed)</p>
              </div>
            </div>
          </div>
        ) : (
          <GlassCard className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Apply for Campus Ambassador</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Join our nationwide student network and unlock exclusive student leadership credentials.
              </p>
            </div>
            <form onSubmit={handleApply} className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">WhatsApp / Contact *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">College / University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RV College of Engineering, Bengaluru"
                  value={formData.college}
                  onChange={e => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    placeholder="Computer Science, etc."
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="2025‑2026"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">City / State *</label>
                <input
                  type="text"
                  required
                  placeholder="Bengaluru, Karnataka"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Why do you want to represent MIVEXO? *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about student clubs you lead or your enthusiasm for technology education..."
                  value={formData.experience}
                  onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary !justify-center"
                >
                  {loading ? 'Submitting Application...' : 'Submit Ambassador Application'}
                </button>
              </div>
            </form>
          </GlassCard>
        )}
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Questions?</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-1">Frequently Asked Questions</h2>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-[#13132B] border border-gray-100 dark:border-gray-800">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <HelpCircle size={16} className="text-violet-600" /> {faq.q}
              </h4>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
