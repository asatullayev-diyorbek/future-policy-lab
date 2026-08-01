import { Link } from "react-router-dom"
import { Eye, Clock, FileText } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { BRIEF_THEMES } from "../data/policyBriefs"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"

export default function PolicyBriefCard({ brief }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()
  const bt = BRIEF_THEMES.find((b) => b.id === brief.theme)
  const themeName = bt ? L(bt, "name", lang) : brief.theme

  const formattedDate = new Date(brief.published_at).toLocaleDateString(lang === "uz" ? "uz-UZ" : "en-US", {
    year: "numeric", month: "short", day: "numeric",
  })

  return (
    <Link
      to={`/policy-briefs/${brief.slug}`}
      className={`group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-200 ${
        dark
          ? "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
          : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={brief.cover}
          alt={L(brief, "title", lang)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-semibold">
          <FileText size={11} /> {themeName}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className={`font-bold text-[15px] leading-snug mb-2 transition-colors ${
          dark ? "text-white group-hover:text-emerald-400" : "text-slate-900 group-hover:text-emerald-700"
        }`}>
          {L(brief, "title", lang)}
        </h3>
        <p className={`text-[13px] leading-relaxed mb-4 flex-1 ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {L(brief, "excerpt", lang)}
        </p>

        <div className={`flex items-center gap-3.5 text-[11.5px] pt-3 border-t ${
          dark ? "border-white/8 text-slate-500" : "border-slate-100 text-slate-400"
        }`}>
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {brief.read_time} {t("common.min")}</span>
          <span className="flex items-center gap-1 ml-auto"><Eye size={11} /> {brief.base_views.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}
