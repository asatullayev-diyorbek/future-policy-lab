import { useState, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"
import { meetingsNews, ITEM_TYPES } from "../data/meetingsNews"
import PageHero from "../components/PageHero"
import MeetingsNewsCard from "../components/MeetingsNewsCard"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function MeetingsNews() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const [activeType, setActiveType] = useState("all")

  const sorted = useMemo(() => {
    return [...meetingsNews].sort((a, b) => {
      const dateA = new Date(a.type === "event" ? a.date : a.published_at)
      const dateB = new Date(b.type === "event" ? b.date : b.published_at)
      return dateB - dateA
    })
  }, [])

  const filtered = useMemo(() => {
    if (activeType === "all") return sorted
    return sorted.filter((m) => m.type === activeType)
  }, [sorted, activeType])

  const filterCls = (active) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
      active
        ? "bg-orange-600 border-orange-600 text-white"
        : dark
          ? "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
    }`

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap items-center gap-2 mb-10"
          >
            <button onClick={() => setActiveType("all")} className={filterCls(activeType === "all")}>
              All
            </button>
            {ITEM_TYPES.map((t) => (
              <button key={t.id} onClick={() => setActiveType(t.id)} className={filterCls(activeType === t.id)}>
                {t.name}
              </button>
            ))}
          </motion.div>

          {filtered.length > 0 ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((item) => (
                <motion.div key={item.slug} variants={fadeUp} className="h-full">
                  <MeetingsNewsCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className={`text-center py-16 text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              Nothing posted in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
