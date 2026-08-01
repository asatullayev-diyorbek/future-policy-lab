import { Link } from "react-router-dom"
import { Eye, Clock, PlayCircle } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { RESEARCH_THEMES } from "../data/research"

export default function ResearchCard({ article }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const themeName = RESEARCH_THEMES.find((t) => t.id === article.theme)?.name ?? article.theme

  const formattedDate = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  })

  return (
    <Link
      to={`/research/${article.slug}`}
      className={`group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-200 ${
        dark
          ? "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {article.video_id && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircle size={40} className="text-white drop-shadow-lg" />
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-700 text-white text-[11px] font-semibold">
          {themeName}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className={`font-bold text-[15px] leading-snug mb-2 transition-colors ${
          dark ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-700"
        }`}>
          {article.title}
        </h3>
        <p className={`text-[13px] leading-relaxed mb-4 flex-1 ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {article.excerpt}
        </p>

        <div className={`flex items-center gap-3.5 text-[11.5px] pt-3 border-t ${
          dark ? "border-white/8 text-slate-500" : "border-slate-100 text-slate-400"
        }`}>
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {article.read_time} min</span>
          <span className="flex items-center gap-1 ml-auto"><Eye size={11} /> {article.base_views.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}
