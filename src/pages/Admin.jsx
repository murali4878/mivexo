import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, CreditCard, Award, Briefcase, UserCheck, Search, Shield, RefreshCw, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import GlassCard from '../components/ui/GlassCard'
import mivexoLogo from '../assets/mivexo_logo.png'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalStudents: 148,
    totalPrograms: 10,
    completedPayments: 84,
    totalRevenue: 84000,
    totalCertificates: 26,
    totalInternships: 5,
    pendingAmbassadors: 3
  })
  const [students, setStudents] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const statsRes = await api.get('/api/admin/stats').catch(() => null)
      if (statsRes?.data?.data) {
        setStats(statsRes.data.data)
      }

      const progRes = await api.get('/api/programs').catch(() => null)
      if (progRes?.data?.data) {
        setPrograms(progRes.data.data)
      }

      const stuRes = await api.get('/api/students').catch(() => null)
      if (stuRes?.data?.data) {
        setStudents(stuRes.data.data)
      } else {
        // Fallback sample records for demonstration
        setStudents([
          { _id: '1', name: 'Aarav Sharma', email: 'aarav@example.com', college: 'BITS Pilani', domain: 'Technical', paymentStatus: 'completed', registrationId: 'WVR-88910241' },
          { _id: '2', name: 'Riya Sengupta', email: 'riya@example.com', college: 'VIT Vellore', domain: 'Analytics', paymentStatus: 'completed', registrationId: 'WVR-77320194' },
          { _id: '3', name: 'Karan Singh', email: 'karan@example.com', college: 'NIT Trichy', domain: 'Technical', paymentStatus: 'completed', registrationId: 'WVR-45129032' },
          { _id: '4', name: 'Ananya Deshmukh', email: 'ananya@example.com', college: 'SRM University', domain: 'Management', paymentStatus: 'pending', registrationId: 'WVR-33019812' }
        ])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const triggerSeed = async () => {
    try {
      await api.post('/api/admin/seed')
      toast.success('Seed data populated successfully!')
      fetchAdminData()
    } catch (err) {
      toast.error('Failed to trigger database seed.')
    }
  }

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.registrationId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0B1A]">
      {/* Top Bar */}
      <header className="bg-white dark:bg-[#13132B] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img src={mivexoLogo} alt="MIVEXO" className="h-7 w-auto object-contain dark:brightness-0 dark:invert" />
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">ADMIN</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerSeed}
              className="px-3 py-1.5 rounded-xl border border-violet-200 dark:border-violet-800 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 flex items-center gap-1.5"
            >
              <RefreshCw size={12} /> Sync Seed Data
            </button>
            <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white">
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
          {[
            { id: 'overview', label: 'Platform Metrics', icon: Shield },
            { id: 'students', label: 'Registered Students', icon: Users },
            { id: 'programs', label: 'Programs & Modules', icon: BookOpen }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white dark:bg-[#13132B] text-gray-600 dark:text-gray-400 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between text-violet-600 dark:text-violet-400 mb-2">
                  <Users size={20} />
                  <span className="text-xs font-bold text-emerald-500">+12% this week</span>
                </div>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.totalStudents}</p>
                <p className="text-xs text-gray-500 mt-1">Total Student Signups</p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between text-emerald-600 mb-2">
                  <CreditCard size={20} />
                  <span className="text-xs font-bold text-gray-400">₹1,000 / Reg</span>
                </div>
                <p className="text-3xl font-black text-gray-900 dark:text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Confirmed Registration Revenue</p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between text-indigo-600 mb-2">
                  <BookOpen size={20} />
                  <span className="text-xs font-bold text-violet-500">8 Domains</span>
                </div>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.totalPrograms}</p>
                <p className="text-xs text-gray-500 mt-1">Active Specializations</p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between text-amber-500 mb-2">
                  <Award size={20} />
                  <span className="text-xs font-bold text-amber-500">Verifiable</span>
                </div>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.totalCertificates}</p>
                <p className="text-xs text-gray-500 mt-1">Issued Certificates</p>
              </GlassCard>
            </div>

            {/* Recent Registrations Quick Table */}
            <div className="rounded-2xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Registration Activities</h3>
              <div className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {students.slice(0, 4).map((s, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.college} · {s.domain}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        s.paymentStatus === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {s.paymentStatus === 'completed' ? '₹1,000 Paid' : 'Payment Pending'}
                      </span>
                      <p className="text-[10px] font-mono text-gray-400 mt-1">{s.registrationId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Students */}
        {activeTab === 'students' && (
          <div className="rounded-2xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Registered Student Ledger</h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Filter name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] text-xs text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 dark:bg-[#1A1A36] text-gray-600 dark:text-gray-300 font-bold uppercase">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Registration ID</th>
                    <th className="p-3">College</th>
                    <th className="p-3">Domain</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredStudents.map((st, i) => (
                    <tr key={i} className="hover:bg-violet-50/20">
                      <td className="p-3 font-semibold text-gray-900 dark:text-white">{st.name}<br /><span className="text-[10px] text-gray-400">{st.email}</span></td>
                      <td className="p-3 font-mono font-bold text-violet-600 dark:text-violet-400">{st.registrationId || 'PENDING'}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{st.college || '—'}</td>
                      <td className="p-3">{st.domain || 'Technical'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${
                          st.paymentStatus === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {st.paymentStatus || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Programs */}
        {activeTab === 'programs' && (
          <div className="rounded-2xl bg-white dark:bg-[#13132B] border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Active Curriculum Programs</h3>
              <span className="text-xs text-gray-500">{programs.length} Published tracks</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {programs.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1A36] flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded">
                      {p.domain}
                    </span>
                    <h4 className="font-bold text-gray-900 dark:text-white mt-2">{p.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{p.duration} · Rating: {p.rating} ★</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900 dark:text-white">₹{p.fee?.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400">{p.enrolled} enrolled</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
