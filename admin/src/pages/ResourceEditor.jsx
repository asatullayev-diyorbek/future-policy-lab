import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { resourcesApi } from "../utils/api"
import LangTabs from "../components/LangTabs"
import MarkdownField, { inputCls, labelCls } from "../components/MarkdownField"

const EMPTY = {
  slug: "", kind: "tool", title: "", title_uz: "", title_ru: "",
  excerpt: "", excerpt_uz: "", excerpt_ru: "",
  cover: "", published_at: "", base_views: 0, tags: "",
  content: "", content_uz: "", content_ru: "",
  format: "", format_uz: "", format_ru: "",
  related_research_slug: "", readings: "",
}

function toDatetimeLocal(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// readings are stored as an array of {title, author}; edited as "Title | Author" lines
function readingsToText(readings) {
  return (readings ?? []).map((r) => `${r.title} | ${r.author}`).join("\n")
}
function textToReadings(text) {
  return text.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [title, author] = line.split("|").map((s) => s.trim())
    return { title, author: author ?? "" }
  })
}

export default function ResourceEditor() {
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
    resourcesApi.getOne(existingSlug).then(({ resource }) => {
      if (!resource) { setError("Resource not found"); setLoading(false); return }
      setForm({
        ...EMPTY,
        ...resource,
        published_at: toDatetimeLocal(resource.published_at),
        tags: (resource.tags ?? []).join(", "),
        readings: readingsToText(resource.readings),
      })
      setLoading(false)
    }).catch((err) => { setError(err.message); setLoading(false) })
  }, [existingSlug])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const isReadingList = form.kind === "reading-list"

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
        base_views: Number(form.base_views) || 0,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : undefined,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        readings: isReadingList ? textToReadings(form.readings) : [],
      }
      if (isEdit) {
        await resourcesApi.update(existingSlug, payload)
      } else {
        await resourcesApi.create(payload)
      }
      navigate("/resources")
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>

  return (
    <div className="max-w-4xl">
      <Link to="/resources" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to list
      </Link>

      <h1 className="font-bold text-white text-xl mb-6">{isEdit ? `Edit: ${existingSlug}` : "New resource"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Slug {isEdit && "(locked)"}</label>
            <input value={form.slug} onChange={set("slug")} disabled={isEdit} className={`${inputCls} disabled:opacity-50`} />
          </div>
          <div>
            <label className={labelCls}>Kind</label>
            <select value={form.kind} onChange={set("kind")} className={inputCls}>
              <option value="tool">tool</option>
              <option value="dataset">dataset</option>
              <option value="reading-list">reading-list</option>
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
            <label className={labelCls}>Published at</label>
            <input type="datetime-local" value={form.published_at} onChange={set("published_at")} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Tags (comma-separated)</label>
            <input value={form.tags} onChange={set("tags")} className={inputCls} />
          </div>

          {!isReadingList && (
            <div className="sm:col-span-2">
              <label className={labelCls}>Format {lang !== "" && `(${lang.replace("_", "")})`}</label>
              <input value={form[`format${lang}`] ?? ""} onChange={set(`format${lang}`)} className={inputCls} placeholder="e.g. Template (DOCX / Google Docs)" />
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-5">
          <LangTabs lang={lang} setLang={setLang} />

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls}>Title {lang === "" && <span className="text-rose-500">*</span>}</label>
              <input value={form[`title${lang}`] ?? ""} onChange={set(`title${lang}`)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Excerpt</label>
              <textarea rows={2} value={form[`excerpt${lang}`] ?? ""} onChange={set(`excerpt${lang}`)} className={`${inputCls} resize-none`} />
            </div>
            {isReadingList && lang === "" && (
              <div>
                <label className={labelCls}>Readings (one per line: "Title | Author")</label>
                <textarea rows={5} value={form.readings} onChange={set("readings")} className={`${inputCls} resize-none font-mono text-xs`} />
              </div>
            )}
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
