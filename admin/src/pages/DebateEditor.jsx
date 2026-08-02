import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { debatesApi } from "../utils/api"
import LangTabs from "../components/LangTabs"
import { inputCls, labelCls } from "../components/MarkdownField"

const THEMES = ["education", "governance", "economic-development", "technology", "sustainability"]

const EMPTY = {
  slug: "", motion: "", motion_uz: "", motion_ru: "",
  excerpt: "", excerpt_uz: "", excerpt_ru: "",
  theme: "education", cover: "", status: "open",
  published_at: "", participants: 0, base_views: 0, tags: "",
  for_author: "", for_summary: "", for_summary_uz: "", for_summary_ru: "",
  against_author: "", against_summary: "", against_summary_uz: "", against_summary_ru: "",
}

function toDatetimeLocal(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function DebateEditor() {
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
    debatesApi.getOne(existingSlug).then(({ debate }) => {
      if (!debate) { setError("Debate not found"); setLoading(false); return }
      setForm({
        ...EMPTY,
        ...debate,
        published_at: toDatetimeLocal(debate.published_at),
        tags: (debate.tags ?? []).join(", "),
      })
      setLoading(false)
    }).catch((err) => { setError(err.message); setLoading(false) })
  }, [existingSlug])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!form.slug.trim() || !form.motion.trim()) {
      setError("Slug and English motion are required")
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        participants: Number(form.participants) || 0,
        base_views: Number(form.base_views) || 0,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : undefined,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }
      if (isEdit) {
        await debatesApi.update(existingSlug, payload)
      } else {
        await debatesApi.create(payload)
      }
      navigate("/debates")
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading...</p>

  return (
    <div className="max-w-4xl">
      <Link to="/debates" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to list
      </Link>

      <h1 className="font-bold text-white text-xl mb-6">{isEdit ? `Edit: ${existingSlug}` : "New debate"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Slug {isEdit && "(locked)"}</label>
            <input name="slug" value={form.slug} onChange={set("slug")} disabled={isEdit} className={`${inputCls} disabled:opacity-50`} placeholder="my-debate-slug" />
          </div>
          <div>
            <label className={labelCls}>Theme</label>
            <select value={form.theme} onChange={set("theme")} className={inputCls}>
              {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select value={form.status} onChange={set("status")} className={inputCls}>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Cover image URL</label>
            <input value={form.cover} onChange={set("cover")} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Published at</label>
            <input type="datetime-local" value={form.published_at} onChange={set("published_at")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Participants (seed count)</label>
            <input type="number" min="0" value={form.participants} onChange={set("participants")} className={inputCls} />
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
              <label className={labelCls}>Motion {lang === "" && <span className="text-rose-500">*</span>}</label>
              <input name="motion" value={form[`motion${lang}`] ?? ""} onChange={set(`motion${lang}`)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Excerpt</label>
              <textarea rows={2} value={form[`excerpt${lang}`] ?? ""} onChange={set(`excerpt${lang}`)} className={`${inputCls} resize-none`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="text-sm font-bold text-emerald-400 mb-3">For position</h3>
                <label className={labelCls}>Author</label>
                <input value={form.for_author ?? ""} onChange={set("for_author")} className={`${inputCls} mb-3`} />
                <label className={labelCls}>Summary</label>
                <textarea name="for_summary" rows={6} value={form[`for_summary${lang}`] ?? ""} onChange={set(`for_summary${lang}`)} className={`${inputCls} resize-none`} />
              </div>
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <h3 className="text-sm font-bold text-rose-400 mb-3">Against position</h3>
                <label className={labelCls}>Author</label>
                <input value={form.against_author ?? ""} onChange={set("against_author")} className={`${inputCls} mb-3`} />
                <label className={labelCls}>Summary</label>
                <textarea name="against_summary" rows={6} value={form[`against_summary${lang}`] ?? ""} onChange={set(`against_summary${lang}`)} className={`${inputCls} resize-none`} />
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
