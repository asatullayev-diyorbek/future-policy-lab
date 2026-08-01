import { Link } from "react-router-dom"
import { Eye, Users, MessageSquare } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { DEBATE_THEMES } from "../data/debates"

export default function DebateCard({ debate }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const themeName = DEBATE_THEMES.find((t) => t.id === debate.theme)?.name ?? debate.theme

  return (
    <Link
      to={`/debates/${debate.slug}`}
      className={`group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-200 ${
        dark
          ? "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
          : "border-slate-200 bg-white hover:border-violet-200 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={debate.cover}
          alt={debate.motion}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600 text-white text-[11px] font-semibold">
          <MessageSquare size={11} /> {themeName}
        </span>
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
          debate.status === "open"
            ? "bg-emerald-500/90 text-white"
            : "bg-slate-500/90 text-white"
        }`}>
          {debate.status === "open" ? "Open" : "Closed"}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className={`font-bold text-[15px] leading-snug mb-2 transition-colors ${
          dark ? "text-white group-hover:text-violet-400" : "text-slate-900 group-hover:text-violet-700"
        }`}>
          {debate.motion}
        </h3>
        <p className={`text-[13px] leading-relaxed mb-4 flex-1 ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {debate.excerpt}
        </p>

        <div className={`flex items-center gap-3.5 text-[11.5px] pt-3 border-t ${
          dark ? "border-white/8 text-slate-500" : "border-slate-100 text-slate-400"
        }`}>
          <span className="flex items-center gap-1"><Users size={11} /> {debate.participants}</span>
          <span className="flex items-center gap-1 ml-auto"><Eye size={11} /> {debate.base_views.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}
