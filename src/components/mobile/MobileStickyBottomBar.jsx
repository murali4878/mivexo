import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react'

export default function MobileStickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-white/95 dark:bg-[#080d1a]/95 backdrop-blur-xl border-t border-gray-200 dark:border-slate-800 shadow-2xl transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Live Status & Programs */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-gray-900 dark:text-white">Batch 2026 Live</span>
          </div>
          <Link
            to="/programs"
            className="text-[10px] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 font-semibold transition-colors"
          >
            <BookOpen size={10} /> 20+ Career Tracks
          </Link>
        </div>

        {/* Right Side: Black & White Enroll Button */}
        <Link
          to="/pricing"
          className="flex-1 max-w-[190px] py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs shadow-md shadow-black/10 active:scale-95 flex items-center justify-center gap-1.5 transition-all"
        >
          <span>Enroll Now</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
