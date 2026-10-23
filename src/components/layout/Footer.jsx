import { Link, useLocation } from 'react-router-dom'
import { Mail, MapPin, Instagram } from 'lucide-react'
import mivexoLogo from '../../assets/mivexo_logo.png'

const footerLinks = {
  Platform: [
    { label: 'Programs', href: '/programs' },
    { label: 'LMS Portal', href: '/lms' },
    { label: 'Placement Prep', href: '/placement' }
  ],
  Company: [
    { label: 'About MIVEXO', href: '/about' },
    { label: 'Campus Ambassador', href: '/ambassador' },
    { label: 'Pricing', href: '/pricing' }
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: 'mailto:mivexo.in@gmail.com' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ]
}

export default function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <footer className={`bg-gray-950 text-gray-400 pt-16 pb-8 border-t border-gray-900 ${isHome ? 'hidden lg:block' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4 group">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm">
                <img
                  src={mivexoLogo}
                  alt="MIVEXO"
                  className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-gray-400">
              Empowering the next generation of professionals through hands-on learning, expert mentorship, and career-ready programs.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">Learn. Build. Achieve.</p>
            
            {/* Instagram Only */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/mivexo.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-pink-500/50 hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-pink-900/30 text-gray-300 hover:text-white transition-all duration-200 text-xs font-bold group shadow-sm"
              >
                <Instagram size={16} className="text-pink-400 group-hover:scale-110 transition-transform" />
                <span>@mivexo.in</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith('mailto:') ? (
                      <a href={link.href} className="text-sm hover:text-violet-400 transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm hover:text-violet-400 transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="mailto:mivexo.in@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors font-medium">
                <Mail size={15} className="text-violet-400" /> mivexo.in@gmail.com
              </a>
              <span className="flex items-center gap-2 text-gray-400">
                <MapPin size={15} className="text-violet-400" /> Bangalore, India
              </span>
            </div>
            <p className="text-xs text-gray-500">
              © 2026 MIVEXO. All rights reserved.
            </p>
          </div>
          <p className="mt-4 text-xs text-gray-600 text-center">
            Practice content is for educational purposes only. Company names are used for practice context and do not imply endorsement.
          </p>
        </div>
      </div>
    </footer>
  )
}
