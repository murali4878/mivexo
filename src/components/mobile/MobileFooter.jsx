import { Link } from 'react-router-dom'
import { Instagram, Mail, Heart } from 'lucide-react'
import mivexoLogo from '../../assets/mivexo_logo.png'

const mobileFooterLinks = [
  { label: 'Programs', href: '/programs' },
  { label: 'LMS Portal', href: '/lms' },
  { label: 'Jobs & Internships', href: '/jobs' },
  { label: 'Placement Prep', href: '/placement' },
  { label: 'Campus Ambassador', href: '/ambassador' },
  { label: 'About MIVEXO', href: '/about' },
  { label: 'Pricing & Plans', href: '/pricing' }
]

export default function MobileFooter() {
  return (
    <footer className="bg-[#070E1E] text-gray-400 pt-10 pb-24 px-4 border-t border-white/10 overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Brand Bar */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm inline-block">
              <img
                src={mivexoLogo}
                alt="MIVEXO"
                className="h-7 w-auto object-contain"
              />
            </div>
          </Link>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed mb-2">
            Empowering students across India with industry-first technical training, hands-on internships, and career placements.
          </p>
          <p className="text-[11px] font-black tracking-widest uppercase text-[#8B3FF2]">
            Learn. Build. Achieve.
          </p>
        </div>

        {/* Quick Nav Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {mobileFooterLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social & Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a
            href="https://www.instagram.com/mivexo.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-bold transition-colors"
          >
            <Instagram size={15} className="text-pink-400" />
            <span>@mivexo.in on Instagram</span>
          </a>

          <a
            href="mailto:mivexo.in@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-bold transition-colors"
          >
            <Mail size={15} className="text-violet-400" />
            <span>mivexo.in@gmail.com</span>
          </a>
        </div>

        {/* Copyright & Bottom Info */}
        <div className="pt-6 border-t border-white/10 text-center text-[11px] text-gray-400 space-y-1">
          <p>© {new Date().getFullYear()} MIVEXO Technologies. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1 text-[10px]">
            <span>Crafted with precision for Indian engineering talent</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
