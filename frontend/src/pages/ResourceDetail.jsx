import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Eye, ArrowLeft, Calendar, MessageCircle, Send, Tag, Check,
  Wrench, Database, BookMarked, Download, FlaskConical, ArrowRight,
} from "lucide-react"
import { useThemeStore } from "../store/theme"
import { RESOURCE_KINDS } from "../data/resources"
import { getResearchBySlug } from "../utils/researchApi"
import { getResourceBySlug } from "../utils/contentApi"
import { recordView, getComments, addComment } from "../utils/engagement"
import ResourceCard from "../components/ResourceCard"
import NotFound from "./NotFound"
import { useTranslation } from "../i18n/useTranslation"
import { L, localeFor } from "../i18n/localize"
import { tagLabel } from "../i18n/tagLabels"

const KIND_META = {
  tool: { icon: Wrench },
  dataset: { icon: Database },
  "reading-list": { icon: BookMarked },
}

export default function ResourceDetail() {
  const { slug } = useParams()
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()

  const [resource, setResource] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [views, setViews] = useState(0)
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: "", content: "" })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [relatedResearch, setRelatedResearch] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getResourceBySlug(slug).then(({ resource: res, related: r }) => {
      if (cancelled) return
      setResource(res)
      setRelated(r)
      setViews(res?.base_views ?? 0)
      setLoading(false)
      setSubmitted(false)
      window.scrollTo(0, 0)
      if (res) {
        recordView("resource", res.slug, res.base_views).then(setViews)
        getComments("resource", res.slug).then(setComments)
        if (res.related_research_slug) {
          getResearchBySlug(res.related_research_slug).then(({ article }) => setRelatedResearch(article))
        } else {
          setRelatedResearch(null)
        }
      }
    })
    return () => { cancelled = true }
  }, [slug])

  if (loading) return null
  if (!resource) return <NotFound />

  const kindMeta = KIND_META[resource.kind]
  const rk = RESOURCE_KINDS.find((k) => k.id === resource.kind)
  const kindName = rk ? L(rk, "name", lang) : resource.kind

  const locale = localeFor(lang)
  const formattedDate = new Date(resource.published_at).toLocaleDateString(locale, {
    year: "numeric", month: "long", day: "numeric",
  })

  const format = L(resource, "format", lang)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.content.trim()) {
      setFormError(t("common.nameRequired"))
      return
    }
    setFormError("")
    try {
      const next = await addComment("resource", resource.slug, form)
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
      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-pink-500/50"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-pink-400"
  }`

  const mdComponents = {
    h2({ children }) {
      return <h2 className={`text-2xl font-bold mt-10 mb-3 pb-2 border-b ${dark ? "text-white border-white/10" : "text-slate-900 border-slate-200"}`}>{children}</h2>
    },
    p({ children }) {
      return <p className={`leading-[1.85] my-4 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</p>
    },
    a({ href, children }) {
      return <a href={href} className="text-pink-500 hover:underline underline-offset-2" target="_blank" rel="noreferrer">{children}</a>
    },
    ul({ children }) {
      return <ul className={`list-disc list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ul>
    },
    ol({ children }) {
      return <ol className={`list-decimal list-inside my-4 space-y-1.5 text-[15px] ${dark ? "text-slate-300" : "text-slate-700"}`}>{children}</ol>
    },
  }

  const title = L(resource, "title", lang)

  return (
    <>
      <Helmet>
        <title>{title} — Future Policy Lab</title>
        <meta name="description" content={L(resource, "excerpt", lang)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={L(resource, "excerpt", lang)} />
        <meta property="og:image" content={resource.cover} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
          <img src={resource.cover} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-5 left-4 sm:left-8">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors border border-white/15"
            >
              <ArrowLeft size={15} /> {t("resources.backLabel")}
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-pink-600 text-white text-xs font-semibold">
                <kindMeta.icon size={12} /> {kindName}
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
          <span className="flex items-center gap-1.5"><Eye size={13} /> {views.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {comments.length}</span>

          {resource.tags?.length > 0 && (
            <>
              <div className={`w-px h-4 ${dark ? "bg-white/10" : "bg-slate-200"}`} />
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((tag) => (
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

        {/* Download / format block for tools & datasets */}
        {(resource.kind === "tool" || resource.kind === "dataset") && resource.format && (
          <div className={`my-8 p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center gap-5 ${
            dark ? "border-pink-500/20 bg-pink-600/8" : "border-pink-200 bg-pink-50"
          }`}>
            <div className="flex-1">
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>
                {t("resources.format")}
              </p>
              <p className={`text-sm font-medium ${dark ? "text-slate-200" : "text-slate-800"}`}>{format}</p>
            </div>
            <button
              disabled
              title={t("resources.downloadDisabled")}
              className={`shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-not-allowed opacity-60 ${
                dark ? "bg-white/10 text-white" : "bg-white text-slate-700 border border-slate-300"
              }`}
            >
              <Download size={16} /> {t("resources.download")}
            </button>
          </div>
        )}

        {/* Reading list items */}
        {resource.kind === "reading-list" && resource.readings?.length > 0 && (
          <div className={`my-8 p-6 rounded-2xl border ${
            dark ? "border-pink-500/20 bg-pink-600/8" : "border-pink-200 bg-pink-50"
          }`}>
            <h2 className={`flex items-center gap-2 font-bold text-base mb-4 ${dark ? "text-pink-400" : "text-pink-700"}`}>
              <BookMarked size={18} /> {t("resources.readingList")}
            </h2>
            <ol className="flex flex-col gap-3">
              {resource.readings.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                    dark ? "bg-pink-500/20 text-pink-300" : "bg-pink-100 text-pink-700"
                  }`}>
                    {i + 1}
                  </span>
                  <span className={`text-sm leading-relaxed ${dark ? "text-slate-200" : "text-slate-800"}`}>
                    <strong>{r.title}</strong> — {r.author}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="py-2"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {L(resource, "content", lang)}
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
                {t("common.relatedResearch")}
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
            <MessageCircle size={20} className="text-pink-600" />
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
                    dark ? "bg-pink-600/15 text-pink-400" : "bg-pink-50 text-pink-700"
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
                  placeholder={t("resources.commentPlaceholder")}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {formError && <p className="text-xs text-rose-500">{formError}</p>}

              <button
                type="submit"
                className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-600 text-white font-semibold text-sm hover:bg-pink-500 active:scale-[0.98] transition-all"
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
            <h2 className={`text-xl font-bold mb-7 ${dark ? "text-white" : "text-slate-900"}`}>{kindName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <div key={r.slug} className="h-full">
                  <ResourceCard resource={r} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
