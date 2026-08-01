import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FlaskConical, GraduationCap, Landmark, Cpu, Leaf, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const THEMES = [
  { icon: GraduationCap, title: "Education", desc: "Access, quality, and reform in learning systems.", color: "text-blue-600", bg: "bg-blue-50", bgDark: "bg-blue-600/10" },
  { icon: Landmark, title: "Governance", desc: "Institutions, accountability, and public administration.", color: "text-emerald-600", bg: "bg-emerald-50", bgDark: "bg-emerald-600/10" },
  { icon: FlaskConical, title: "Economic Development", desc: "Growth, labor markets, and inclusive prosperity.", color: "text-orange-600", bg: "bg-orange-50", bgDark: "bg-orange-600/10" },
  { icon: Cpu, title: "Technology", desc: "Digital transformation and its societal implications.", color: "text-violet-600", bg: "bg-violet-50", bgDark: "bg-violet-600/10" },
  { icon: Leaf, title: "Sustainability", desc: "Environmental policy and long-term resilience.", color: "text-teal-600", bg: "bg-teal-50", bgDark: "bg-teal-600/10" },
]

export default function Research() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  return (
    <>
      <Helmet><title>Research — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="01 — Research"
        title="Original, Evidence-Based Research"
        subtitle="Data-backed academic papers and empirical studies addressing systemic challenges in education, governance, economic development, technology, and sustainability."
      />

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-2xl font-extrabold tracking-tight mb-10 ${dark ? "text-white" : "text-slate-900"}`}
          >
            Research Themes
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {THEMES.map(({ icon: Icon, title, desc, color, bg, bgDark }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${dark ? bgDark : bg}`}>
                  <Icon size={20} className={color} />
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
              Published research coming soon
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Our first cohort of papers is in review. Want to contribute a study or collaborate on empirical
              research? Reach out — we're always looking for rigorous, evidence-driven work from young researchers.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 active:scale-95 transition-all"
            >
              Submit Your Research <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
