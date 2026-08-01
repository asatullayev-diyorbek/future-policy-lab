import { useState, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"
import { policyBriefs, BRIEF_THEMES } from "../data/policyBriefs"
import PageHero from "../components/PageHero"
import PolicyBriefCard from "../components/PolicyBriefCard"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function PolicyBriefs() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const [activeTheme, setActiveTheme] = useState("all")

  const filtered = useMemo(() => {
    if (activeTheme === "all") return policyBriefs
    return policyBriefs.filter((b) => b.theme === activeTheme)
  }, [activeTheme])

  const filterCls = (active) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
      active
        ? dark
          ? "bg-emerald-600 border-emerald-600 text-white"
          : "bg-emerald-600 border-emerald-600 text-white"
        : dark
          ? "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
    }`

  return (
    <>
      <Helmet><title>Policy Briefs — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="02 — Policy Briefs"
        title="Decision-Ready Policy Recommendations"
        subtitle="Concise, actionable summaries that distill complex data and academic proposals into clear recommendations for advocates and leaders."
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
            <button onClick={() => setActiveTheme("all")} className={filterCls(activeTheme === "all")}>
              All
            </button>
            {BRIEF_THEMES.map((t) => (
              <button key={t.id} onClick={() => setActiveTheme(t.id)} className={filterCls(activeTheme === t.id)}>
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
              {filtered.map((brief) => (
                <motion.div key={brief.slug} variants={fadeUp} className="h-full">
                  <PolicyBriefCard brief={brief} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className={`text-center py-16 text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              No policy briefs published in this theme yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
