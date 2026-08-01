import { Link } from "react-router-dom"
import { Eye, Wrench, Database, BookMarked } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"
import { localeFor } from "../i18n/localize"

const KIND_META = {
  tool: { icon: Wrench, label: "Tool", label_uz: "Vosita" },
  dataset: { icon: Database, label: "Dataset", label_uz: "Ma'lumotlar bazasi" },
  "reading-list": { icon: BookMarked, label: "Reading List", label_uz: "O'quv ro'yxati" },
}

export default function ResourceCard({ resource }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { lang } = useTranslation()
  const meta = KIND_META[resource.kind]
  const Icon = meta.icon
  const label = lang === "uz" ? meta.label_uz : meta.label

  const formattedDate = new Date(resource.published_at).toLocaleDateString(localeFor(lang), {
    year: "numeric", month: "short", day: "numeric",
  })

  return (
    <Link
      to={`/resources/${resource.slug}`}
      className={`group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-200 ${
        dark
          ? "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
          : "border-slate-200 bg-white hover:border-pink-200 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={resource.cover}
          alt={L(resource, "title", lang)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-600 text-white text-[11px] font-semibold">
          <Icon size={11} /> {label}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className={`font-bold text-[15px] leading-snug mb-2 transition-colors ${
          dark ? "text-white group-hover:text-pink-400" : "text-slate-900 group-hover:text-pink-700"
        }`}>
          {L(resource, "title", lang)}
        </h3>
        <p className={`text-[13px] leading-relaxed mb-4 flex-1 ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {L(resource, "excerpt", lang)}
        </p>

        <div className={`flex items-center gap-3.5 text-[11.5px] pt-3 border-t ${
          dark ? "border-white/8 text-slate-500" : "border-slate-100 text-slate-400"
        }`}>
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1 ml-auto"><Eye size={11} /> {resource.base_views.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}
