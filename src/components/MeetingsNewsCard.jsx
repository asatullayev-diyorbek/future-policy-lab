import { Link } from "react-router-dom"
import { Eye, CalendarDays, MapPin, Megaphone } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"

export default function MeetingsNewsCard({ item }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()
  const isEvent = item.type === "event"

  const locale = lang === "uz" ? "uz-UZ" : "en-US"
  const formattedDate = new Date((isEvent ? item.date : item.published_at)).toLocaleDateString(locale, {
    year: "numeric", month: "short", day: "numeric",
    ...(isEvent ? { hour: "numeric", minute: "2-digit" } : {}),
  })

  const isPast = isEvent && new Date(item.date) < new Date()

  return (
    <Link
      to={`/meetings-news/${item.slug}`}
      className={`group flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-200 ${
        dark
          ? "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
          : "border-slate-200 bg-white hover:border-orange-200 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.cover}
          alt={L(item, "title", lang)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[11px] font-semibold ${
          isEvent ? "bg-orange-600" : "bg-slate-700"
        }`}>
          {isEvent ? <CalendarDays size={11} /> : <Megaphone size={11} />}
          {isEvent ? t("meetingsNews.eventBadge") : t("meetingsNews.newsBadge")}
        </span>
        {isEvent && isPast && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-semibold">
            {t("events.past")}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className={`font-bold text-[15px] leading-snug mb-2 transition-colors ${
          dark ? "text-white group-hover:text-orange-400" : "text-slate-900 group-hover:text-orange-700"
        }`}>
          {L(item, "title", lang)}
        </h3>
        <p className={`text-[13px] leading-relaxed mb-4 flex-1 ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {L(item, "excerpt", lang)}
        </p>

        <div className={`flex flex-col gap-1.5 text-[11.5px] pt-3 border-t ${
          dark ? "border-white/8 text-slate-500" : "border-slate-100 text-slate-400"
        }`}>
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1"><CalendarDays size={11} /> {formattedDate}</span>
            <span className="flex items-center gap-1 ml-auto"><Eye size={11} /> {item.base_views.toLocaleString()}</span>
          </div>
          {isEvent && item.location && (
            <span className="flex items-center gap-1 truncate"><MapPin size={11} className="shrink-0" /> {L(item, "location", lang)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
