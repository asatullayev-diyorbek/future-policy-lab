import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import LangTabs from "./LangTabs"
import MarkdownField, { inputCls, labelCls } from "./MarkdownField"
import ImageUpload from "./ImageUpload"

const EMPTY = {
  slug: "", title: "", title_uz: "", title_ru: "",
  excerpt: "", excerpt_uz: "", excerpt_ru: "",
  cover: "", published_at: "", base_views: 0, tags: "",
  content: "", content_uz: "", content_ru: "",
  date: "", location: "", location_uz: "", location_ru: "", base_attendees: 0,
}

function toDatetimeLocal(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function MeetingEntryForm({ isEvent, api, basePath, label }) {
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
    api.getOne(existingSlug).then(({ item }) => {
      if (!item) { setError("Entry not found"); setLoading(false); return }
      setForm({
        ...EMPTY,
        ...item,
        published_at: toDatetimeLocal(item.published_at),
        date: toDatetimeLocal(item.date),
        tags: (item.tags ?? []).join(", "),
        base_attendees: item.base_attendees ?? 0,
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
        base_views: Number(form.base_views) || 0,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : undefined,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        date: isEvent && form.date ? new Date(form.date).toISOString() : null,
        location: isEvent ? form.location : null,
        location_uz: isEvent ? form.location_uz : null,
        location_ru: isEvent ? form.location_ru : null,
        base_attendees: isEvent ? Number(form.base_attendees) || 0 : null,
      }
      if (isEdit) {
        await api.update(existingSlug, payload)
      } else {
        await api.create(payload)
      }
      navigate(basePath)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>

  return (
    <div className="max-w-4xl">
      <Link to={basePath} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to list
      </Link>

      <h1 className="font-bold text-white text-xl mb-6">{isEdit ? `Edit: ${existingSlug}` : `New ${label.toLowerCase()}`}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Slug {isEdit && "(locked)"}</label>
            <input value={form.slug} onChange={set("slug")} disabled={isEdit} className={`${inputCls} disabled:opacity-50`} />
          </div>
          <div>
            <label className={labelCls}>Published at</label>
            <input type="datetime-local" value={form.published_at} onChange={set("published_at")} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload value={form.cover} onChange={(url) => setForm((f) => ({ ...f, cover: url }))} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Tags (comma-separated)</label>
            <input value={form.tags} onChange={set("tags")} className={inputCls} />
          </div>

          {isEvent && (
            <>
              <div>
                <label className={labelCls}>Event date/time</label>
                <input type="datetime-local" value={form.date} onChange={set("date")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Attendees (seed count)</label>
                <input type="number" min="0" value={form.base_attendees} onChange={set("base_attendees")} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Location {lang !== "" && `(${lang.replace("_", "")})`}</label>
                <input value={form[`location${lang}`] ?? ""} onChange={set(`location${lang}`)} className={inputCls} />
              </div>
            </>
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
