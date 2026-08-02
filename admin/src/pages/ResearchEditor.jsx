import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, Save } from "lucide-react"
import { getResearch, createResearch, updateResearch } from "../utils/api"

const THEMES = ["education", "governance", "economic-development", "technology", "sustainability"]
const LANGS = [
  { key: "", label: "English" },
  { key: "_uz", label: "Uzbek" },
  { key: "_ru", label: "Russian" },
]

const EMPTY = {
  slug: "", title: "", title_uz: "", title_ru: "",
  excerpt: "", excerpt_uz: "", excerpt_ru: "",
  theme: "education", cover: "", author_name: "", author_role: "", author_role_uz: "", author_role_ru: "",
  published_at: "", read_time: 5, base_views: 0, video_id: "", tags: "",
  content: "", content_uz: "", content_ru: "",
}

function toDatetimeLocal(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function ResearchEditor() {
  const { slug: existingSlug } = useParams()
  const isEdit = Boolean(existingSlug)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [lang, setLang] = useState("")
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isEdit) return
    getResearch(existingSlug).then(({ article }) => {
      if (!article) { setError("Article not found"); setLoading(false); return }
      setForm({
        ...EMPTY,
        ...article,
        published_at: toDatetimeLocal(article.published_at),
        tags: (article.tags ?? []).join(", "),
      })
      setLoading(false)
    }).catch((err) => { setError(err.message); setLoading(false) })
  }, [existingSlug])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!form.slug.trim() || !form.title.trim()) {
      setError("Slug and English title are required")
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        read_time: Number(form.read_time) || 5,
        base_views: Number(form.base_views) || 0,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : undefined,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }
      if (isEdit) {
        await updateResearch(existingSlug, payload)
      } else {
        await createResearch(payload)
      }
      navigate("/research")
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50"
  const labelCls = "block text-xs font-semibold text-slate-400 mb-1.5"

  return (
    <div className="max-w-4xl">
      <Link to="/research" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to list
      </Link>

      <h1 className="font-bold text-white text-xl mb-6">{isEdit ? `Edit: ${existingSlug}` : "New research article"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Slug {isEdit && "(locked)"}</label>
            <input name="slug" value={form.slug} onChange={set("slug")} disabled={isEdit} className={`${inputCls} disabled:opacity-50`} placeholder="my-article-slug" />
          </div>
          <div>
            <label className={labelCls}>Theme</label>
            <select value={form.theme} onChange={set("theme")} className={inputCls}>
              {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Cover image URL</label>
            <input value={form.cover} onChange={set("cover")} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>YouTube video ID (optional)</label>
            <input value={form.video_id ?? ""} onChange={set("video_id")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Author name</label>
            <input value={form.author_name ?? ""} onChange={set("author_name")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Author role (English)</label>
            <input value={form.author_role ?? ""} onChange={set("author_role")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Published at</label>
            <input type="datetime-local" value={form.published_at} onChange={set("published_at")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Read time (minutes)</label>
            <input type="number" min="1" value={form.read_time} onChange={set("read_time")} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Tags (comma-separated)</label>
            <input value={form.tags} onChange={set("tags")} className={inputCls} placeholder="education, rural-access, policy-evaluation" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 mb-4">
            {LANGS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setLang(key)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                  lang === key ? "bg-blue-600 border-blue-600 text-white" : "border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls}>Title {lang === "" && <span className="text-rose-500">*</span>}</label>
              <input name="title" value={form[`title${lang}`] ?? ""} onChange={set(`title${lang}`)} className={inputCls} />
            </div>
            {lang !== "" && (
              <div>
                <label className={labelCls}>Author role</label>
                <input value={form[`author_role${lang}`] ?? ""} onChange={set(`author_role${lang}`)} className={inputCls} />
              </div>
            )}
            <div>
              <label className={labelCls}>Excerpt</label>
              <textarea rows={2} value={form[`excerpt${lang}`] ?? ""} onChange={set(`excerpt${lang}`)} className={`${inputCls} resize-none`} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Content (Markdown)</label>
                <textarea
                  name="content"
                  rows={18}
                  value={form[`content${lang}`] ?? ""}
                  onChange={set(`content${lang}`)}
                  className={`${inputCls} resize-none font-mono text-xs leading-relaxed`}
                />
              </div>
              <div>
                <label className={labelCls}>Preview</label>
                <div className="prose-preview px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 h-[420px] overflow-y-auto text-sm text-slate-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{form[`content${lang}`] || "*Nothing yet*"}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            <Save size={15} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}
