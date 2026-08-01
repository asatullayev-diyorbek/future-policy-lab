import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Database, BookMarked, Wrench, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const CATEGORIES = [
  { icon: Wrench, title: "Analytical Tools", desc: "Frameworks and templates for structuring policy analysis." },
  { icon: Database, title: "Open Datasets", desc: "Curated datasets for empirical research and student projects." },
  { icon: BookMarked, title: "Reading Lists & Methodology Guides", desc: "Guidance reading lists to build research literacy and capacity among young scholars." },
]

export default function Resources() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {CATEGORIES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${dark ? "bg-pink-600/15" : "bg-pink-50"}`}>
                  <Icon size={20} className="text-pink-600" />
                </div>
                <h3 className={`font-bold text-[15px] mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>{title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`p-10 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-slate-50"}`}
          >
            <h3 className={`font-bold text-xl mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
              Our resource library is being built
            </h3>
            <p className={`text-sm leading-relaxed mb-6 max-w-lg mx-auto ${dark ? "text-slate-400" : "text-slate-600"}`}>
              We're assembling the first set of datasets, guides, and tools. If there's a specific resource you'd
              find useful for your research, let us know.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 text-white font-bold text-sm hover:bg-pink-500 active:scale-95 transition-all"
            >
              Suggest a Resource <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
