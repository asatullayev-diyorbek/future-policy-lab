import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { CalendarCheck, Megaphone, ArrowRight, MapPin, Calendar } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { meetingsNews } from "../data/meetingsNews"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

export default function MeetingsNews() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  const events = meetingsNews
    .filter((m) => m.type === "event")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  const news = meetingsNews
    .filter((m) => m.type === "news")
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

  const now = new Date()
  const nextEvent = events.find((e) => new Date(e.date) >= now) ?? events[0]
  const latestNews = news[0]

  return (
    <>
      <Helmet><title>Meetings & News — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="04 — Meetings & News"
        title="Seminars, Workshops & Lab Updates"
        subtitle="Regular announcements, collaborative workshops, panel discussions, and updates highlighting key policy developments and upcoming lab initiatives."
        image="/meetings-news-header.png"
      />

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Events card */}
            <motion.div
              variants={fadeUp}
              className={`flex flex-col p-7 rounded-2xl border ${
                dark ? "border-orange-500/20 bg-gradient-to-br from-orange-600/10 to-transparent" : "border-orange-100 bg-gradient-to-br from-orange-50 to-white"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${dark ? "bg-orange-600/15" : "bg-orange-50"}`}>
                <CalendarCheck size={22} className="text-orange-600" />
              </div>
              <h2 className={`font-bold text-xl mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>Events</h2>
              <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                Seminars, workshops, and panel discussions — {events.length} listed, RSVP to reserve a seat.
              </p>

              {nextEvent && (
                <div className={`p-4 rounded-xl border mb-6 ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-orange-400" : "text-orange-600"}`}>
                    Next up
                  </p>
                  <p className={`text-sm font-semibold mb-2 ${dark ? "text-slate-200" : "text-slate-800"}`}>{nextEvent.title}</p>
                  <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(nextEvent.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {nextEvent.location && (
                      <span className="flex items-center gap-1 truncate"><MapPin size={11} className="shrink-0" /> {nextEvent.location}</span>
                    )}
                  </div>
                </div>
              )}

              <Link
                to="/meetings-news/events"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-500 transition-colors"
              >
                View all events <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* News card */}
            <motion.div
              variants={fadeUp}
              className={`flex flex-col p-7 rounded-2xl border ${
                dark ? "border-slate-500/20 bg-gradient-to-br from-slate-600/10 to-transparent" : "border-slate-200 bg-gradient-to-br from-slate-50 to-white"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${dark ? "bg-white/8" : "bg-slate-100"}`}>
                <Megaphone size={22} className={dark ? "text-slate-300" : "text-slate-600"} />
              </div>
              <h2 className={`font-bold text-xl mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>News</h2>
              <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                Lab announcements and updates — {news.length} posted, including new research and resource drops.
              </p>

              {latestNews && (
                <div className={`p-4 rounded-xl border mb-6 ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                    Latest
                  </p>
                  <p className={`text-sm font-semibold mb-2 ${dark ? "text-slate-200" : "text-slate-800"}`}>{latestNews.title}</p>
                  <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>
                    {new Date(latestNews.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              )}

              <Link
                to="/meetings-news/news"
                className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  dark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                View all news <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
