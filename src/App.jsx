import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Programs from './pages/Programs'
import LMSPortal from './pages/LMSPortal'
import PlacementPrep from './pages/PlacementPrep'
import JobPortal from './pages/JobPortal'

import Ambassador from './pages/Ambassador'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'
import CertVerify from './pages/CertVerify'
import StudentOnboarding from './pages/StudentOnboarding'

const LMSLayout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-[#0B0B1A]">
    <LMSPortal />
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<><Navbar /><main className="flex-1"><Home /></main><Footer /></>} />
        <Route path="/programs" element={<><Navbar /><main className="flex-1"><Programs /></main><Footer /></>} />
        <Route path="/jobs" element={<><Navbar /><main className="flex-1"><JobPortal /></main><Footer /></>} />
        <Route path="/internships" element={<><Navbar /><main className="flex-1"><JobPortal /></main><Footer /></>} />
        <Route path="/placement" element={<><Navbar /><main className="flex-1"><PlacementPrep /></main><Footer /></>} />

        <Route path="/ambassador" element={<><Navbar /><main className="flex-1"><Ambassador /></main><Footer /></>} />
        <Route path="/about" element={<><Navbar /><main className="flex-1"><About /></main><Footer /></>} />
        <Route path="/pricing" element={<><Navbar /><main className="flex-1"><Pricing /></main><Footer /></>} />
        <Route path="/onboarding" element={<><Navbar /><main className="flex-1"><StudentOnboarding /></main><Footer /></>} />
        <Route path="/verify/:certId" element={<><Navbar /><main className="flex-1"><CertVerify /></main><Footer /></>} />
        <Route path="/login" element={<><Navbar /><main className="flex-1"><Login /></main></>} />
        <Route path="/register" element={<><Navbar /><main className="flex-1"><Register /></main></>} />
        <Route path="/lms" element={<LMSLayout />} />
        <Route path="/lms/*" element={<LMSLayout />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  )
}
