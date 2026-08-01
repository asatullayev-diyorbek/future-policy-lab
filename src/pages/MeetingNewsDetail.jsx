import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Eye, ArrowLeft, Calendar, Clock, MapPin, Users, MessageCircle, Send, Tag, Check, CalendarCheck, Megaphone, X } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { getMeetingsNewsBySlug, getRelatedMeetingsNews } from "../data/meetingsNews"
import { recordView, getComments, addComment, isAttending, getRSVP, submitRSVP, cancelRSVP, getAttendeeCount } from "../utils/engagement"
import MeetingsNewsCard from "../components/MeetingsNewsCard"
import RSVPModal from "../components/RSVPModal"
import NotFound from "./NotFound"
import { useTranslation } from "../i18n/useTranslation"
import { L, localeFor } from "../i18n/localize"
import { tagLabel } from "../i18n/tagLabels"

export default function MeetingNewsDetail() {
  const { slug } = useParams()
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()

  const item = getMeetingsNewsBySlug(slug)
  const isEvent = item?.type === "event"

  const [views, setViews] = useState(item?.base_views ?? 0)
  const [comments, setComments] = useState([])
  const [attending, setAttending] = useState(false)
  const [rsvp, setRsvp] = useState(null)
  const [attendeeCount, setAttendeeCount] = useState(item?.base_attendees ?? 0)
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false)
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false)
  const [form, setForm] = useState({ name: "", content: "" })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (!item) return
    recordView("meeting-news", item.slug, item.base_views).then(setViews)
    getComments("meeting-news", item.slug).then(setComments)
    setSubmitted(false)
    if (isEvent) {
      setAttending(isAttending(item.slug))
      setRsvp(getRSVP(item.slug))
      getAttendeeCount(item.slug, item.base_attendees).then(setAttendeeCount)
    }
    window.scrollTo(0, 0)
  }, [item, isEvent])

  if (!item) return <NotFound />

  const related = getRelatedMeetingsNews(item)
  const isPast = isEvent && new Date(item.date) < new Date()

  const locale = localeFor(lang)
  const displayDate = new Date(isEvent ? item.date : item.published_at)
  const formattedDate = displayDate.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })
  const formattedTime = isEvent ? displayDate.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" }) : null

  const handleRSVPSubmit = async (fields) => {
    try {
      const result = await submitRSVP(item.slug, fields, item.base_attendees)
      setAttending(result.attending)
      setAttendeeCount(result.count)
      setRsvp(getRSVP(item.slug))
      setRsvpModalOpen(false)
      setRsvpConfirmed(true)
      setTimeout(() => setRsvpConfirmed(false), 3500)
    } catch {
      // leave modal open so the visitor can retry
    }
  }

  const handleCancelRSVP = async () => {
    const result = await cancelRSVP(item.slug, item.base_attendees)
    setAttending(result.attending)
    setAttendeeCount(result.count)
    setRsvp(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.content.trim()) {
      setFormError(t("common.nameRequired"))
      return
    }
    setFormError("")
    try {
      const next = await addComment("meeting-news", item.slug, form)
      setComments(next)
      setForm({ name: "", content: "" })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3500)
    } catch {
      setFormError(t("common.nameRequired"))
    }
  }

  const inputCls = `w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors ${
    dark
      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-orange-500/50"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-400"
  }`

  const mdComponents = {
    h2({ children }) {
      return <h2 className={`text-2xl font-bold mt-10 mb-3 pb-2 border-b ${dark ? "text-white border-white/10" : "text-slate-900 border-slate-200"}`}>{children}</h2>
    },
    p({ children }) {
      return <p className={`leading-[1.85] my-4 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</p>
    },
    a({ href, children }) {
      return <a href={href} className="text-orange-500 hover:underline underline-offset-2" target="_blank" rel="noreferrer">{children}</a>
    },
    ul({ children }) {
      return <ul className={`list-disc list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ul>
    },
    ol({ children }) {
      return <ol className={`list-decimal list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ol>
    },
  }

  const title = L(item, "title", lang)

  return (
    <>
      <Helmet>
        <title>{title} — Future Policy Lab</title>
        <meta name="description" content={L(item, "excerpt", lang)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={L(item, "excerpt", lang)} />
        <meta property="og:image" content={item.cover} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
          <img src={item.cover} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-5 left-4 sm:left-8">
            <Link
              to={isEvent ? "/meetings-news/events" : "/meetings-news/news"}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors border border-white/15"
            >
              <ArrowLeft size={15} /> {isEvent ? t("events.backLabel") : t("news.backLabel")}
            </Link>
          </div>

          {isEvent && isPast && (
            <div className="absolute top-5 right-4 sm:right-8">
              <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold">{t("events.pastEvent")}</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <span className={`inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${
                isEvent ? "bg-orange-600" : "bg-slate-700"
              }`}>
                {isEvent ? <CalendarCheck size={12} /> : <Megaphone size={12} />}
                {isEvent ? t("meetingsNews.eventBadge") : t("meetingsNews.newsBadge")}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex flex-wrap items-center gap-x-5 gap-y-2 py-5 border-b text-sm ${
            dark ? "border-white/8 text-slate-400" : "border-slate-200 text-slate-500"
          }`}
        >
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {formattedDate}</span>
          {formattedTime && <span className="flex items-center gap-1.5"><Clock size={13} /> {formattedTime}</span>}
          <span className="flex items-center gap-1.5"><Eye size={13} /> {views.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {comments.length}</span>

          {item.tags?.length > 0 && (
            <>
              <div className={`w-px h-4 ${dark ? "bg-white/10" : "bg-slate-200"}`} />
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full ${
                    dark ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-500"
                  }`}>
                    <Tag size={9} /> {tagLabel(tag, lang)}
                  </span>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Event RSVP block */}
        {isEvent && (
          <div className={`my-8 p-6 rounded-2xl border ${
            dark ? "border-orange-500/20 bg-orange-600/8" : "border-orange-200 bg-orange-50"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                {item.location && (
                  <p className={`flex items-center gap-2 text-sm font-medium mb-2 ${dark ? "text-slate-200" : "text-slate-800"}`}>
                    <MapPin size={15} className="text-orange-600 shrink-0" /> {L(item, "location", lang)}
                  </p>
                )}
                <p className={`flex items-center gap-2 text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
                  <Users size={15} className="text-orange-600 shrink-0" /> {attendeeCount} {t("events.attending")}
                </p>
              </div>
              {!isPast && (
                attending ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm ${
                      dark ? "bg-white/10 text-white border border-white/15" : "bg-white text-slate-800 border border-slate-300"
                    }`}>
                      <Check size={16} /> {t("events.youreAttending")}
                    </span>
                    <button
                      onClick={handleCancelRSVP}
                      aria-label={t("events.cancelRsvp")}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        dark ? "text-slate-500 hover:bg-white/8 hover:text-white" : "text-slate-400 hover:bg-white hover:text-slate-700"
                      }`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRsvpModalOpen(true)}
                    className="shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-orange-600 text-white hover:bg-orange-500 active:scale-95 transition-all"
                  >
                    <CalendarCheck size={16} /> {t("events.rsvp")}
                  </button>
                )
              )}
            </div>

            {rsvpConfirmed && (
              <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm">
                <Check size={14} /> {t("events.registered")}{rsvp?.email ? ` — ${t("events.confirmationSent")} ${rsvp.email}` : ""}.
              </div>
            )}
          </div>
        )}

        {rsvpModalOpen && (
          <RSVPModal
            eventTitle={title}
            onClose={() => setRsvpModalOpen(false)}
            onSubmit={handleRSVPSubmit}
          />
        )}

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="py-6"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {L(item, "content", lang)}
          </ReactMarkdown>
        </motion.article>

        {/* Comments */}
        <div className="pt-6 pb-16 border-t mt-4" style={{ borderColor: dark ? "rgba(255,255,255,0.07)" : "#e2e8f0" }}>
          <h2 className={`text-xl font-bold mb-6 mt-8 flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"}`}>
            <MessageCircle size={20} className="text-orange-600" />
            {t("common.comments")}
            {comments.length > 0 && (
              <span className={`text-sm font-normal ${dark ? "text-slate-500" : "text-slate-400"}`}>
                · {comments.length}
              </span>
            )}
          </h2>

          {comments.length > 0 && (
            <div className="space-y-3 mb-8">
              {comments.map((c) => (
                <div key={c.id} className={`flex gap-4 p-5 rounded-2xl border ${
                  dark ? "bg-white/3 border-white/8" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    dark ? "bg-orange-600/15 text-orange-400" : "bg-orange-50 text-orange-700"
                  }`}>
                    {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`text-sm font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>{c.name}</span>
                      <span className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>
                        {new Date(c.created_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`rounded-2xl border p-6 ${dark ? "bg-white/3 border-white/8" : "bg-white border-slate-200 shadow-sm"}`}>
            <h3 className={`text-base font-bold mb-5 ${dark ? "text-white" : "text-slate-900"}`}>{t("common.leaveComment")}</h3>

            {submitted && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm flex items-center gap-2">
                <Check size={14} /> {t("common.commentPosted")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                  {t("common.name")} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder={t("common.yourName")}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                  {t("common.comment")} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder={isEvent ? t("events.commentPlaceholder") : t("news.commentPlaceholder")}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {formError && <p className="text-xs text-rose-500">{formError}</p>}

              <button
                type="submit"
                className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-500 active:scale-[0.98] transition-all"
              >
                <Send size={14} /> {t("common.postComment")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className={`border-t py-14 ${dark ? "border-white/8 bg-[#080d16]" : "border-slate-200 bg-slate-50"}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={`text-xl font-bold mb-7 ${dark ? "text-white" : "text-slate-900"}`}>
              {isEvent ? t("events.relatedTitle") : t("news.relatedTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((m) => (
                <div key={m.slug} className="h-full">
                  <MeetingsNewsCard item={m} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
