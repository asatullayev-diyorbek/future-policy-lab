import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Eye, Clock, ArrowLeft, Calendar, MessageCircle, Send, Tag, Check } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { getResearchBySlug, getRelatedResearch, RESEARCH_THEMES } from "../data/research"
import { recordView, getComments, addComment } from "../utils/engagement"
import YoutubeEmbed from "../components/YoutubeEmbed"
import ResearchCard from "../components/ResearchCard"
import NotFound from "./NotFound"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"
import { tagLabel } from "../i18n/tagLabels"

export default function ResearchDetail() {
  const { slug } = useParams()
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()

  const article = getResearchBySlug(slug)
  const [views, setViews] = useState(article?.base_views ?? 0)
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: "", content: "" })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (!article) return
    setViews(recordView(article.slug, article.base_views))
    setComments(getComments(article.slug))
    setSubmitted(false)
    window.scrollTo(0, 0)
  }, [article])

  if (!article) return <NotFound />

  const rt = RESEARCH_THEMES.find((r) => r.id === article.theme)
  const themeName = rt ? L(rt, "name", lang) : article.theme
  const related = getRelatedResearch(article)

  const locale = lang === "uz" ? "uz-UZ" : "en-US"
  const formattedDate = new Date(article.published_at).toLocaleDateString(locale, {
    year: "numeric", month: "long", day: "numeric",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.content.trim()) {
      setFormError(t("common.nameRequired"))
      return
    }
    setFormError("")
    const next = addComment(article.slug, form)
    setComments(next)
    setForm({ name: "", content: "" })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  const inputCls = `w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors ${
    dark
      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400"
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
      return <a href={href} className="text-blue-500 hover:underline underline-offset-2" target="_blank" rel="noreferrer">{children}</a>
    },
    ul({ children }) {
      return <ul className={`list-disc list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ul>
    },
    ol({ children }) {
      return <ol className={`list-decimal list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ol>
    },
    blockquote({ children }) {
      return (
        <blockquote className={`border-l-4 border-blue-500 pl-5 my-5 py-3 pr-4 rounded-r-xl ${
          dark ? "text-slate-400 bg-blue-600/8" : "text-slate-600 bg-blue-50"
        }`}>{children}</blockquote>
      )
    },
  }

  const title = L(article, "title", lang)

  return (
    <>
      <Helmet>
        <title>{title} {t("research.detailTitle")}</title>
        <meta name="description" content={L(article, "excerpt", lang)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={L(article, "excerpt", lang)} />
        <meta property="og:image" content={article.cover} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Cover hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
          <img src={article.cover} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-5 left-4 sm:left-8">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors border border-white/15"
            >
              <ArrowLeft size={15} /> {t("research.backLabel")}
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold">
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
              dark ? "bg-blue-600/15 text-blue-400" : "bg-blue-50 text-blue-700"
            }`}>
              {article.author.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div className="leading-tight">
              <p className={`font-semibold text-sm ${dark ? "text-slate-200" : "text-slate-800"}`}>{article.author.name}</p>
              <p className="text-xs">{L(article.author, "role", lang)}</p>
            </div>
          </div>

          <div className={`w-px h-4 ${dark ? "bg-white/10" : "bg-slate-200"}`} />

          <span className="flex items-center gap-1.5"><Calendar size={13} /> {formattedDate}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {article.read_time} {t("common.minRead")}</span>
          <span className="flex items-center gap-1.5"><Eye size={13} /> {views.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {comments.length}</span>

          {article.tags?.length > 0 && (
            <>
              <div className={`w-px h-4 ${dark ? "bg-white/10" : "bg-slate-200"}`} />
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
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

        {article.video_id && <YoutubeEmbed videoId={article.video_id} dark={dark} />}

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="py-6"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {L(article, "content", lang)}
          </ReactMarkdown>
        </motion.article>

        {/* Comments */}
        <div className="pt-6 pb-16 border-t mt-4" style={{ borderColor: dark ? "rgba(255,255,255,0.07)" : "#e2e8f0" }}>
          <h2 className={`text-xl font-bold mb-6 mt-8 flex items-center gap-2 ${dark ? "text-white" : "text-slate-900"}`}>
            <MessageCircle size={20} className="text-blue-600" />
            {t("research.commentsTitle")}
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
                    dark ? "bg-blue-600/15 text-blue-400" : "bg-blue-50 text-blue-700"
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
            <h3 className={`text-base font-bold mb-5 ${dark ? "text-white" : "text-slate-900"}`}>{t("research.leaveComment")}</h3>

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
                  placeholder={t("research.commentPlaceholder")}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {formError && <p className="text-xs text-rose-500">{formError}</p>}

              <button
                type="submit"
                className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 text-white font-semibold text-sm hover:bg-blue-600 active:scale-[0.98] transition-all"
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
            <h2 className={`text-xl font-bold mb-7 ${dark ? "text-white" : "text-slate-900"}`}>{t("research.relatedTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a) => (
                <div key={a.slug} className="h-full">
                  <ResearchCard article={a} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
