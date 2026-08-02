import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Trash2 } from "lucide-react"
import { getComments, deleteComment } from "../utils/api"

export default function ResearchComments() {
  const { slug } = useParams()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState(null)

  const load = async () => {
    setLoading(true)
    setError("")
    try {
      setComments(await getComments("research", slug))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [slug])

  const handleDelete = async (id) => {
    if (!confirm("Delete this comment?")) return
    setDeletingId(id)
    try {
      await deleteComment(id)
      setComments((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="max-w-3xl">
      <Link to="/research" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to list
      </Link>

      <h1 className="font-bold text-white text-xl mb-1">Comments</h1>
      <p className="text-sm text-slate-500 mb-6">{slug}</p>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}
      {error && <p className="text-sm text-rose-400">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-3">
          {comments.length === 0 && <p className="text-sm text-slate-500 py-8 text-center">No comments yet.</p>}
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-white text-sm">{c.name}</span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(c.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                </div>
                <p className="text-sm text-slate-300 whitespace-pre-wrap">{c.content}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                disabled={deletingId === c.id}
                className="p-2 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0 disabled:opacity-50"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
