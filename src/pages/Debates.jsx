import { useState, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"
import { debates, DEBATE_THEMES } from "../data/debates"
import PageHero from "../components/PageHero"
import DebateCard from "../components/DebateCard"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function Debates() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()
  const [activeTheme, setActiveTheme] = useState("all")

  const filtered = useMemo(() => {
    if (activeTheme === "all") return debates
    return debates.filter((d) => d.theme === activeTheme)
  }, [activeTheme])

  const filterCls = (active) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
      active
        ? "bg-violet-600 border-violet-600 text-white"
        : dark
          ? "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
    }`

  return (
    <>
      <Helmet><title>{t("debates.title")}</title></Helmet>

      <PageHero
        eyebrow={t("debates.eyebrow")}
        title={t("debates.heroTitle")}
        subtitle={t("debates.heroSubtitle")}
        image="/debates-header.png"
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
              {t("common.all")}
            </button>
            {DEBATE_THEMES.map((dt) => (
              <button key={dt.id} onClick={() => setActiveTheme(dt.id)} className={filterCls(activeTheme === dt.id)}>
                {L(dt, "name", lang)}
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
              {filtered.map((debate) => (
                <motion.div key={debate.slug} variants={fadeUp} className="h-full">
                  <DebateCard debate={debate} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className={`text-center py-16 text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              {t("debates.empty")}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
