import { useState, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"
import { resources, RESOURCE_KINDS } from "../data/resources"
import PageHero from "../components/PageHero"
import ResourceCard from "../components/ResourceCard"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function Resources() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const [activeKind, setActiveKind] = useState("all")

  const filtered = useMemo(() => {
    if (activeKind === "all") return resources
    return resources.filter((r) => r.kind === activeKind)
  }, [activeKind])

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
      <Helmet><title>Resources — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="05 — Resources"
        title="Tools to Build Research Literacy"
        subtitle="Curated analytical tools, open datasets, guidance reading lists, and methodology guides designed for young scholars."
        image="/resources-header.png"
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
            <button onClick={() => setActiveKind("all")} className={filterCls(activeKind === "all")}>
              All
            </button>
            {RESOURCE_KINDS.map((k) => (
              <button key={k.id} onClick={() => setActiveKind(k.id)} className={filterCls(activeKind === k.id)}>
                {k.name}
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
              {filtered.map((resource) => (
                <motion.div key={resource.slug} variants={fadeUp} className="h-full">
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className={`text-center py-16 text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              Nothing in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
