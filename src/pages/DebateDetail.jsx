import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Eye, Users, ArrowLeft, Calendar, MessageCircle, Send, Check, ThumbsUp, ThumbsDown, HelpCircle, Scale } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { getDebateBySlug, getRelatedDebates, DEBATE_THEMES } from "../data/debates"
import { recordView, getComments, addComment } from "../utils/engagement"
import DebateCard from "../components/DebateCard"
import NotFound from "./NotFound"
import { useTranslation } from "../i18n/useTranslation"
import { L, localeFor } from "../i18n/localize"

function StanceBadge({ stance, dark, t }) {
  const STANCE_META = {
    for: { label: t("debates.agreeFor"), icon: ThumbsUp, color: "emerald" },
    against: { label: t("debates.agreeAgainst"), icon: ThumbsDown, color: "rose" },
    undecided: { label: t("debates.undecided"), icon: HelpCircle, color: "slate" },
  }
  const meta = STANCE_META[stance]
  if (!meta) return null
  const Icon = meta.icon
  const cls = {
    emerald: dark ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-50 text-emerald-700",
    rose: dark ? "bg-rose-500/15 text-rose-400" : "bg-rose-50 text-rose-700",
    slate: dark ? "bg-white/8 text-slate-400" : "bg-slate-100 text-slate-500",
  }[meta.color]

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      <Icon size={10} /> {meta.label}
    </span>
  )
}

export default function DebateDetail() {
  const { slug } = useParams()
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()

  const STANCES = [
    { id: "for", label: t("debates.agreeFor"), icon: ThumbsUp, color: "emerald" },
    { id: "against", label: t("debates.agreeAgainst"), icon: ThumbsDown, color: "rose" },
    { id: "undecided", label: t("debates.undecided"), icon: HelpCircle, color: "slate" },
  ]

  const debate = getDebateBySlug(slug)
  const [views, setViews] = useState(debate?.base_views ?? 0)
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: "", content: "", stance: "undecided" })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (!debate) return
    setViews(recordView(debate.slug, debate.base_views))
    setComments(getComments(debate.slug))
    setSubmitted(false)
    window.scrollTo(0, 0)
  }, [debate])

  if (!debate) return <NotFound />

  const dt = DEBATE_THEMES.find((d) => d.id === debate.theme)
  const themeName = dt ? L(dt, "name", lang) : debate.theme
  const related = getRelatedDebates(debate)

  const locale = localeFor(lang)
  const formattedDate = new Date(debate.published_at).toLocaleDateString(locale, {
    year: "numeric", month: "long", day: "numeric",
  })

  const forCount = comments.filter((c) => c.stance === "for").length
  const againstCount = comments.filter((c) => c.stance === "against").length
  const undecidedCount = comments.filter((c) => c.stance === "undecided").length
  const totalStanced = forCount + againstCount + undecidedCount
  const forPct = totalStanced ? Math.round((forCount / totalStanced) * 100) : 0
  const againstPct = totalStanced ? Math.round((againstCount / totalStanced) * 100) : 0
  const undecidedPct = totalStanced ? 100 - forPct - againstPct : 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.content.trim()) {
      setFormError(t("common.nameRequired"))
      return
    }
    setFormError("")
    const next = addComment(debate.slug, form)
    setComments(next)
    setForm({ name: "", content: "", stance: "undecided" })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  const inputCls = `w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors ${
    dark
      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-400"
  }`

  const motion_ = L(debate, "motion", lang)

  return (
    <>
      <Helmet>
        <title>{motion_} — Future Policy Lab</title>
        <meta name="description" content={L(debate, "excerpt", lang)} />
        <meta property="og:title" content={motion_} />
        <meta property="og:description" content={L(debate, "excerpt", lang)} />
        <meta property="og:image" content={debate.cover} />
      </Helmet>

      {/* Cover hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
          <img src={debate.cover} alt={motion_} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-5 left-4 sm:left-8 flex items-center gap-2">
            <Link
              to="/debates"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors border border-white/15"
            >
              <ArrowLeft size={15} /> {t("debates.backLabel")}
            </Link>
          </div>

          <div className="absolute top-5 right-4 sm:right-8">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              debate.status === "open" ? "bg-emerald-500 text-white" : "bg-slate-600 text-white"
            }`}>
              {debate.status === "open" ? t("debates.openForDiscussion") : t("debates.closed")}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold">
                {themeName}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
                {motion_}
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
          <span className="flex items-center gap-1.5"><Users size={13} /> {debate.participants} {t("debates.participants")}</span>
          <span className="flex items-center gap-1.5"><Eye size={13} /> {views.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {comments.length}</span>
        </motion.div>

        {/* For / Against */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8"
        >
          <div className={`rounded-2xl border p-6 ${
            dark ? "border-emerald-500/20 bg-emerald-600/8" : "border-emerald-200 bg-emerald-50"
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp size={18} className="text-emerald-600" />
              <h2 className={`font-bold text-base ${dark ? "text-emerald-400" : "text-emerald-700"}`}>{t("debates.for")}</h2>
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-slate-200" : "text-slate-800"}`}>
              {L(debate.forPosition, "summary", lang)}
            </p>
            <p className={`text-xs font-semibold ${dark ? "text-slate-500" : "text-slate-500"}`}>
              — {debate.forPosition.author}
            </p>
          </div>

          <div className={`rounded-2xl border p-6 ${
            dark ? "border-rose-500/20 bg-rose-600/8" : "border-rose-200 bg-rose-50"
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <ThumbsDown size={18} className="text-rose-600" />
              <h2 className={`font-bold text-base ${dark ? "text-rose-400" : "text-rose-700"}`}>{t("debates.against")}</h2>
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-slate-200" : "text-slate-800"}`}>
              {L(debate.againstPosition, "summary", lang)}
            </p>
            <p className={`text-xs font-semibold ${dark ? "text-slate-500" : "text-slate-500"}`}>
              — {debate.againstPosition.author}
            </p>
          </div>
        </motion.div>

        {/* Community sentiment */}
        {totalStanced > 0 && (
          <div className={`rounded-2xl border p-5 mb-8 ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
            <h3 className={`flex items-center gap-2 text-sm font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
              <Scale size={15} className="text-violet-600" /> {t("debates.sentiment")}
            </h3>
            <div className="flex w-full h-2.5 rounded-full overflow-hidden mb-2">
              <div className="bg-emerald-500" style={{ width: `${forPct}%` }} />
              <div className="bg-rose-500" style={{ width: `${againstPct}%` }} />
              <div className={dark ? "bg-white/15" : "bg-slate-300"} style={{ width: `${undecidedPct}%` }} />
            </div>
            <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>
              <span>{t("debates.forPct")} {forPct}%</span>
              <span>{t("debates.againstPct")} {againstPct}%</span>
              <span>{t("debates.undecidedPct")} {undecidedPct}%</span>
            </div>
          </div>
        )}

        {/* Comments / discussion */}
        <div className="pt-2 pb-16">
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"}`}>
            <MessageCircle size={20} className="text-violet-600" />
            {t("debates.joinDiscussion")}
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
                    dark ? "bg-violet-600/15 text-violet-400" : "bg-violet-50 text-violet-700"
                  }`}>
                    {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-sm font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>{c.name}</span>
                      <StanceBadge stance={c.stance} dark={dark} t={t} />
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
            <h3 className={`text-base font-bold mb-5 ${dark ? "text-white" : "text-slate-900"}`}>{t("debates.addYourVoice")}</h3>

            {submitted && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm flex items-center gap-2">
                <Check size={14} /> {t("common.commentPosted")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs font-medium mb-2 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                  {t("debates.whereStand")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {STANCES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, stance: id }))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        form.stance === id
                          ? "bg-violet-600 border-violet-600 text-white"
                          : dark
                            ? "border-white/10 text-slate-400 hover:border-white/20"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon size={12} /> {label}
                    </button>
                  ))}
                </div>
              </div>

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
                  placeholder={t("debates.commentPlaceholder")}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {formError && <p className="text-xs text-rose-500">{formError}</p>}

              <button
                type="submit"
                className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 active:scale-[0.98] transition-all"
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
            <h2 className={`text-xl font-bold mb-7 ${dark ? "text-white" : "text-slate-900"}`}>{t("debates.relatedTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((d) => (
                <div key={d.slug} className="h-full">
                  <DebateCard debate={d} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
