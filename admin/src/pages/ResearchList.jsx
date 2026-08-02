import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Pencil, Trash2, MessageCircle, Eye } from "lucide-react"
import { getAllResearch, deleteResearch } from "../utils/api"

export default function ResearchList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingSlug, setDeletingSlug] = useState(null)

  const load = async () => {
    setLoading(true)
    setError("")
    try {
      setArticles(await getAllResearch())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (slug) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeletingSlug(slug)
    try {
      await deleteResearch(slug)
      setArticles((prev) => prev.filter((a) => a.slug !== slug))
    } catch (err) {
      alert(err.message)
    } finally {
      setDeletingSlug(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-white text-xl">Research articles</h1>
        <Link
          to="/research/new"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 transition-colors"
        >
          <Plus size={15} /> New article
        </Link>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}
      {error && <p className="text-sm text-rose-400">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          {articles.length === 0 && <p className="text-sm text-slate-500 py-8 text-center">No articles yet.</p>}
          {articles.map((a) => (
            <div key={a.slug} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/5 last:border-0">
              <div className="min-w-0">
                <p className="font-semibold text-white text-sm truncate">{a.title}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>{a.theme}</span>
                  <span>{new Date(a.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
                  <span className="flex items-center gap-1"><Eye size={11} /> {a.base_views}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/research/${a.slug}/comments`}
                  className="p-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
                  title="Comments"
                >
                  <MessageCircle size={14} />
                </Link>
                <Link
                  to={`/research/${a.slug}/edit`}
                  className="p-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
                  title="Edit"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(a.slug)}
                  disabled={deletingSlug === a.slug}
                  className="p-2 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
