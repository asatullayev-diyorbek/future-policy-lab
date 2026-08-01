import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Eye, Clock, ArrowLeft, Calendar, MessageCircle, Send, Tag, Check, ListChecks, ArrowRight, FlaskConical } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { getBriefBySlug, getRelatedBriefs, BRIEF_THEMES } from "../data/policyBriefs"
import { getResearchBySlug } from "../data/research"
import { recordView, getComments, addComment } from "../utils/engagement"
import PolicyBriefCard from "../components/PolicyBriefCard"
import NotFound from "./NotFound"
import { useTranslation } from "../i18n/useTranslation"
import { L, localeFor } from "../i18n/localize"
import { tagLabel } from "../i18n/tagLabels"

export default function PolicyBriefDetail() {
  const { slug } = useParams()
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()

  const brief = getBriefBySlug(slug)
  const [views, setViews] = useState(brief?.base_views ?? 0)
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: "", content: "" })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (!brief) return
    recordView("policy-brief", brief.slug, brief.base_views).then(setViews)
    getComments("policy-brief", brief.slug).then(setComments)
    setSubmitted(false)
    window.scrollTo(0, 0)
  }, [brief])

  if (!brief) return <NotFound />

  const bt = BRIEF_THEMES.find((b) => b.id === brief.theme)
  const themeName = bt ? L(bt, "name", lang) : brief.theme
  const related = getRelatedBriefs(brief)
  const relatedResearch = brief.related_research_slug ? getResearchBySlug(brief.related_research_slug) : null

  const locale = localeFor(lang)
  const formattedDate = new Date(brief.published_at).toLocaleDateString(locale, {
    year: "numeric", month: "long", day: "numeric",
  })

  const recommendations = lang === "ru" && brief.recommendations_ru
    ? brief.recommendations_ru
    : lang === "uz" && brief.recommendations_uz
      ? brief.recommendations_uz
      : brief.recommendations

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.content.trim()) {
      setFormError(t("common.nameRequired"))
      return
    }
    setFormError("")
    try {
      const next = await addComment("policy-brief", brief.slug, form)
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
      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-emerald-500/50"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
  }`

  const mdComponents = {
    h2({ children }) {
      return <h2 className={`text-2xl font-bold mt-10 mb-3 pb-2 border-b ${dark ? "text-white border-white/10" : "text-slate-900 border-slate-200"}`}>{children}</h2>
    },
    h3({ children }) {
      return <h3 className={`text-xl font-semibold mt-7 mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{children}</h3>
    },
    p({ children }) {
      return <p className={`leading-[1.85] my-4 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</p>
    },
    a({ href, children }) {
      return <a href={href} className="text-emerald-500 hover:underline underline-offset-2" target="_blank" rel="noreferrer">{children}</a>
    },
    ul({ children }) {
      return <ul className={`list-disc list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ul>
    },
    ol({ children }) {
      return <ol className={`list-decimal list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ol>
    },
  }

  const title = L(brief, "title", lang)

  return (
    <>
      <Helmet>
        <title>{title} — Future Policy Lab</title>
        <meta name="description" content={L(brief, "excerpt", lang)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={L(brief, "excerpt", lang)} />
        <meta property="og:image" content={brief.cover} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Cover hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
          <img src={brief.cover} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-5 left-4 sm:left-8">
            <Link
              to="/policy-briefs"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors border border-white/15"
            >
              <ArrowLeft size={15} /> {t("policyBriefs.backLabel")}
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold">
                {themeName}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex flex-wrap items-center gap-x-5 gap-y-2 py-5 border-b text-sm ${
            dark ? "border-white/8 text-slate-400" : "border-slate-200 text-slate-500"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
              dark ? "bg-emerald-600/15 text-emerald-400" : "bg-emerald-50 text-emerald-700"
            }`}>
              {brief.author.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div className="leading-tight">
              <p className={`font-semibold text-sm ${dark ? "text-slate-200" : "text-slate-800"}`}>{brief.author.name}</p>
              <p className="text-xs">{L(brief.author, "role", lang)}</p>
            </div>
          </div>

          <div className={`w-px h-4 ${dark ? "bg-white/10" : "bg-slate-200"}`} />

          <span className="flex items-center gap-1.5"><Calendar size={13} /> {formattedDate}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {brief.read_time} {t("common.minRead")}</span>
          <span className="flex items-center gap-1.5"><Eye size={13} /> {views.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {comments.length}</span>

          {brief.tags?.length > 0 && (
            <>
              <div className={`w-px h-4 ${dark ? "bg-white/10" : "bg-slate-200"}`} />
              <div className="flex flex-wrap gap-1.5">
                {brief.tags.map((tag) => (
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

        {/* Key recommendations */}
        <div className={`my-8 p-6 rounded-2xl border ${
          dark ? "border-emerald-500/20 bg-emerald-600/8" : "border-emerald-200 bg-emerald-50"
        }`}>
          <h2 className={`flex items-center gap-2 font-bold text-base mb-4 ${dark ? "text-emerald-400" : "text-emerald-700"}`}>
            <ListChecks size={18} /> {t("policyBriefs.keyRecommendations")}
          </h2>
          <ol className="flex flex-col gap-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  dark ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {i + 1}
                </span>
                <span className={`text-sm leading-relaxed ${dark ? "text-slate-200" : "text-slate-800"}`}>{rec}</span>
              </li>
            ))}
          </ol>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="py-2"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {L(brief, "content", lang)}
          </ReactMarkdown>
        </motion.article>

        {relatedResearch && (
          <Link
            to={`/research/${relatedResearch.slug}`}
            className={`flex items-center gap-4 p-5 rounded-2xl border my-8 transition-colors group ${
              dark ? "border-white/8 bg-white/3 hover:bg-white/5" : "border-slate-200 bg-white hover:border-blue-200"
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-blue-600/15" : "bg-blue-50"}`}>
              <FlaskConical size={20} className="text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>
                {t("common.based")}
              </p>
              <p className={`text-sm font-semibold truncate ${dark ? "text-slate-200" : "text-slate-800"}`}>
                {L(relatedResearch, "title", lang)}
              </p>
            </div>
            <ArrowRight size={16} className={`shrink-0 transition-transform group-hover:translate-x-1 ${dark ? "text-slate-500" : "text-slate-400"}`} />
          </Link>
        )}

        {/* Comments */}
        <div className="pt-6 pb-16 border-t mt-4" style={{ borderColor: dark ? "rgba(255,255,255,0.07)" : "#e2e8f0" }}>
          <h2 className={`text-xl font-bold mb-6 mt-8 flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"}`}>
            <MessageCircle size={20} className="text-emerald-600" />
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
                    dark ? "bg-emerald-600/15 text-emerald-400" : "bg-emerald-50 text-emerald-700"
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
                  placeholder={t("policyBriefs.commentPlaceholder")}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {formError && <p className="text-xs text-rose-500">{formError}</p>}

              <button
                type="submit"
                className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 active:scale-[0.98] transition-all"
              >
                <Send size={14} /> {t("common.postComment")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className={`border-t py-14 ${dark ? "border-white/8 bg-[#080d16]" : "border-slate-200 bg-slate-50"}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={`text-xl font-bold mb-7 ${dark ? "text-white" : "text-slate-900"}`}>{t("policyBriefs.relatedTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((b) => (
                <div key={b.slug} className="h-full">
                  <PolicyBriefCard brief={b} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
