import { useEffect, useState } from "react"
import { RefreshCw, Mail, MessageCircle, Users, CalendarCheck } from "lucide-react"
import { getDashboard } from "../utils/api"

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

const fmt = (d) => new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = async () => {
    setLoading(true)
    setError("")
    try {
      setData(await getDashboard())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading && !data) return <p className="text-sm text-slate-500">Loading...</p>
  if (error) return <p className="text-sm text-rose-400">{error}</p>
  if (!data) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-white text-xl">Dashboard</h1>
        <button
          onClick={load}
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
  )
}
