import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Wrench, Database, BookMarked, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { RESOURCE_KINDS } from "../data/resources"
import { getAllResources } from "../utils/contentApi"
import PageHero from "../components/PageHero"
import ResourceCard from "../components/ResourceCard"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

const KIND_META = {
  tool: { icon: Wrench, desc: "Frameworks and templates for structuring policy analysis.", desc_uz: "Siyosat tahlilini tuzish uchun freymvorklar va shablonlar.", desc_ru: "Схемы и шаблоны для структурирования анализа политики." },
  dataset: { icon: Database, desc: "Curated datasets for empirical research and student projects.", desc_uz: "Empirik tadqiqot va talabalar loyihalari uchun tanlangan ma'lumotlar bazalari.", desc_ru: "Подборки данных для эмпирических исследований и студенческих проектов." },
  "reading-list": { icon: BookMarked, desc: "Guidance reading lists to build research literacy and capacity.", desc_uz: "Tadqiqot savodxonligi va salohiyatini oshirish uchun o'quv ro'yxatlari.", desc_ru: "Списки литературы для развития исследовательских навыков." },
}

export default function Resources() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()
  const [activeKind, setActiveKind] = useState("all")
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAllResources().then(setResources)
  }, [])

  const filtered = useMemo(() => {
    if (activeKind === "all") return resources
    return resources.filter((r) => r.kind === activeKind)
  }, [activeKind, resources])

  const grouped = useMemo(() => {
    if (activeKind !== "all") return null
    return RESOURCE_KINDS.map((k) => ({
      kind: k,
      items: resources.filter((r) => r.kind === k.id),
    })).filter((g) => g.items.length > 0)
  }, [activeKind, resources])

  const filterCls = (active) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-150 ${
      active
        ? "bg-pink-600 border-pink-600 text-white"
        : dark
          ? "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
    }`

  return (
    <>
      <Helmet><title>{t("resources.title")}</title></Helmet>

      <PageHero
        eyebrow={t("resources.eyebrow")}
        title={t("resources.heroTitle")}
        subtitle={t("resources.heroSubtitle")}
        image="/resources-header.png"
      />

      {/* Kind overview cards */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {RESOURCE_KINDS.map((k) => {
              const meta = KIND_META[k.id]
              const count = resources.filter((r) => r.kind === k.id).length
              return (
                <motion.button
                  key={k.id}
                  variants={fadeUp}
                  onClick={() => setActiveKind(activeKind === k.id ? "all" : k.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-200 ${
                    activeKind === k.id
                      ? dark ? "border-pink-500/50 bg-pink-600/10" : "border-pink-300 bg-pink-50"
                      : dark ? "border-white/8 bg-white/3 hover:border-white/15" : "border-slate-200 bg-white hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${dark ? "bg-pink-600/15" : "bg-pink-50"}`}>
                      <meta.icon size={20} className="text-pink-600" />
                    </div>
                    <span className={`text-2xl font-extrabold tabular-nums ${dark ? "text-white" : "text-slate-900"}`}>
                      {count}
                    </span>
                  </div>
                  <h3 className={`font-bold text-[15px] mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>{L(k, "name", lang)}</h3>
                  <p className={`text-[13px] leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>{L(meta, "desc", lang)}</p>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Filter + listing */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap items-center gap-2 mb-12"
          >
            <button onClick={() => setActiveKind("all")} className={filterCls(activeKind === "all")}>
              {t("common.all")}
            </button>
            {RESOURCE_KINDS.map((k) => (
              <button key={k.id} onClick={() => setActiveKind(k.id)} className={filterCls(activeKind === k.id)}>
                {L(k, "name", lang)}
              </button>
            ))}
          </motion.div>

          {grouped ? (
            <div className="flex flex-col gap-14">
              {grouped.map(({ kind, items }) => (
                <div key={kind.id}>
                  <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className={`text-lg font-bold mb-5 ${dark ? "text-white" : "text-slate-900"}`}
                  >
                    {L(kind, "name", lang)}
                  </motion.h2>
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.05 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {items.map((resource) => (
                      <motion.div key={resource.slug} variants={fadeUp} className="h-full">
                        <ResourceCard resource={resource} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((resource) => (
                <motion.div key={resource.slug} variants={fadeUp} className="h-full">
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className={`text-center py-16 text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              {t("resources.empty")}
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
              {t("resources.ctaTitle")}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>
              {t("resources.ctaDesc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-pink-600 text-white font-bold text-[15px] hover:bg-pink-500 active:scale-95 transition-all"
              style={{ boxShadow: "0 8px 28px rgba(219,39,119,0.3)" }}
            >
              {t("resources.suggestResource")} <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
