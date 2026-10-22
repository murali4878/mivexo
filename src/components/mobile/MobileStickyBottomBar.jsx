import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react'

export default function MobileStickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-[#0B1730]/95 backdrop-blur-xl border-t border-[#8B3FF2]/30 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Live Status & Programs */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-white">Batch 2026 Live</span>
          </div>
          <Link
            to="/programs"
            className="text-[10px] text-violet-300 hover:text-white flex items-center gap-1 font-semibold"
          >
            <BookOpen size={10} /> 20+ Career Tracks
          </Link>
        </div>

        {/* Right Side: High-Impact Enroll Button */}
        <Link
          to="/pricing"
          className="flex-1 max-w-[200px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B3FF2] via-[#7C3AED] to-indigo-600 active:scale-95 text-white font-extrabold text-xs shadow-lg shadow-[#8B3FF2]/40 flex items-center justify-center gap-1.5 transition-transform"
        >
          <Sparkles size={13} className="text-amber-300" />
          <span>Enroll Now</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
