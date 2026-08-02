import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { policyBriefsApi } from "../utils/api"
import LangTabs from "../components/LangTabs"
import MarkdownField, { inputCls, labelCls } from "../components/MarkdownField"

const THEMES = ["education", "governance", "economic-development", "technology", "sustainability"]

const EMPTY = {
  slug: "", title: "", title_uz: "", title_ru: "",
  excerpt: "", excerpt_uz: "", excerpt_ru: "",
  theme: "education", cover: "", author_name: "", author_role: "", author_role_uz: "", author_role_ru: "",
  published_at: "", read_time: 5, base_views: 0, tags: "",
  recommendations: "", recommendations_uz: "", recommendations_ru: "",
  related_research_slug: "",
  content: "", content_uz: "", content_ru: "",
}

function toDatetimeLocal(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function PolicyBriefEditor() {
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
    policyBriefsApi.getOne(existingSlug).then(({ brief }) => {
      if (!brief) { setError("Brief not found"); setLoading(false); return }
      setForm({
        ...EMPTY,
        ...brief,
        published_at: toDatetimeLocal(brief.published_at),
        tags: (brief.tags ?? []).join(", "),
        recommendations: (brief.recommendations ?? []).join("\n"),
        recommendations_uz: (brief.recommendations_uz ?? []).join("\n"),
        recommendations_ru: (brief.recommendations_ru ?? []).join("\n"),
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
        recommendations: form.recommendations.split("\n").map((t) => t.trim()).filter(Boolean),
        recommendations_uz: form.recommendations_uz.split("\n").map((t) => t.trim()).filter(Boolean),
        recommendations_ru: form.recommendations_ru.split("\n").map((t) => t.trim()).filter(Boolean),
      }
      if (isEdit) {
        await policyBriefsApi.update(existingSlug, payload)
      } else {
        await policyBriefsApi.create(payload)
      }
      navigate("/policy-briefs")
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>

  return (
    <div className="max-w-4xl">
      <Link to="/policy-briefs" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to list
      </Link>

      <h1 className="font-bold text-white text-xl mb-6">{isEdit ? `Edit: ${existingSlug}` : "New policy brief"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Slug {isEdit && "(locked)"}</label>
            <input name="slug" value={form.slug} onChange={set("slug")} disabled={isEdit} className={`${inputCls} disabled:opacity-50`} placeholder="my-brief-slug" />
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
            <label className={labelCls}>Related research slug (optional)</label>
            <input value={form.related_research_slug ?? ""} onChange={set("related_research_slug")} className={inputCls} />
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
            <input value={form.tags} onChange={set("tags")} className={inputCls} />
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <LangTabs lang={lang} setLang={setLang} />

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
            <div>
              <label className={labelCls}>Recommendations (one per line)</label>
              <textarea rows={4} value={form[`recommendations${lang}`] ?? ""} onChange={set(`recommendations${lang}`)} className={`${inputCls} resize-none`} />
            </div>
            <MarkdownField label="Content (Markdown)" value={form[`content${lang}`]} onChange={set(`content${lang}`)} />
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
