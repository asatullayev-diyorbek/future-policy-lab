import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Lock, RefreshCw, Mail, MessageCircle, Users, CalendarCheck } from "lucide-react"

const TOKEN_KEY = "fpl_admin_token"

async function fetchAdminData(token) {
  const res = await fetch("/api/admin", { headers: { "x-admin-token": token } })
  if (!res.ok) throw new Error(res.status === 401 ? "Invalid token" : "Request failed")
  return res.json()
}

function Section({ icon: Icon, title, count, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <Icon size={17} className="text-blue-400" />
        <h2 className="font-bold text-white text-[15px]">{title}</h2>
        <span className="text-xs text-slate-500">({count})</span>
      </div>
      {children}
    </div>
  )
}

function EmptyRow() {
  return <p className="text-sm text-slate-500 py-4 text-center">No records yet.</p>
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "")
  const [inputToken, setInputToken] = useState("")
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const load = async (t) => {
    setLoading(true)
    setError("")
    try {
      const result = await fetchAdminData(t)
      setData(result)
      sessionStorage.setItem(TOKEN_KEY, t)
      setToken(t)
    } catch (err) {
      setError(err.message)
      sessionStorage.removeItem(TOKEN_KEY)
      setToken("")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) load(token)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputToken.trim()) return
    load(inputToken.trim())
  }

  const fmt = (d) => new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })

  if (!token || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060a12] px-4">
        <Helmet><title>Admin — Future Policy Lab</title></Helmet>
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <div className="w-11 h-11 rounded-xl bg-blue-600/15 flex items-center justify-center mb-4">
            <Lock size={19} className="text-blue-400" />
          </div>
          <h1 className="font-bold text-white text-lg mb-1">Admin access</h1>
          <p className="text-sm text-slate-500 mb-5">Enter the admin token to view submissions.</p>
          <input
            type="password"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            placeholder="Admin token"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50 mb-3"
          />
          {error && <p className="text-xs text-rose-400 mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060a12] px-4 sm:px-6 py-10">
      <Helmet><title>Admin — Future Policy Lab</title></Helmet>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-white text-xl">Admin dashboard</h1>
          <button
            onClick={() => load(token)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-colors disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Section icon={Mail} title="Contact messages" count={data.contacts.length}>
            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto">
              {data.contacts.length === 0 && <EmptyRow />}
              {data.contacts.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{c.name}</span>
                    <span className="text-[11px] text-slate-500">{fmt(c.created_at)}</span>
                  </div>
                  <a href={`mailto:${c.email}`} className="text-xs text-blue-400 hover:underline">{c.email}</a>
                  {c.topic && <div className="text-[11px] text-slate-500 mt-1">{c.topic}</div>}
                  <p className="text-sm text-slate-300 mt-2 whitespace-pre-wrap">{c.message}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Users} title="Newsletter subscribers" count={data.newsletter.length}>
            <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto">
              {data.newsletter.length === 0 && <EmptyRow />}
              {data.newsletter.map((n) => (
                <div key={n.id} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-sm text-slate-200">{n.email}</span>
                  <span className="text-[11px] text-slate-500">{fmt(n.created_at)}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={MessageCircle} title="Recent comments" count={data.comments.length}>
            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto">
              {data.comments.length === 0 && <EmptyRow />}
              {data.comments.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{c.name}</span>
                    <span className="text-[11px] text-slate-500">{fmt(c.created_at)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mb-1.5">{c.content_type} / {c.slug}</div>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{c.content}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={CalendarCheck} title="Event RSVPs" count={data.rsvps.length}>
            <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto">
              {data.rsvps.length === 0 && <EmptyRow />}
              {data.rsvps.map((r) => (
                <div key={r.id} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{r.name}</span>
                    <span className="text-[11px] text-slate-500">{fmt(r.created_at)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{r.event_slug}</div>
                  <div className="text-xs text-slate-400 mt-1">{r.email || "—"} {r.phone ? `· ${r.phone}` : ""}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
