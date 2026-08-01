import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FileText, ArrowRight, CheckCircle2 } from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const STEPS = [
  "Identify the core issue and its root causes",
  "Distill academic proposals into clear, decision-ready language",
  "Translate data into actionable recommendations for advocates and leaders",
]

export default function PolicyBriefs() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  return (
    <>
      <Helmet><title>Policy Briefs — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="02 — Policy Briefs"
        title="Decision-Ready Policy Recommendations"
        subtitle="Concise, actionable summaries that distill complex data and academic proposals into clear recommendations for advocates and leaders."
      />

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm mb-4 ${
                  dark ? "bg-emerald-600/15 text-emerald-400" : "bg-emerald-50 text-emerald-700"
                }`}>
                  {i + 1}
                </div>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>{step}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`p-10 rounded-2xl border text-center ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${dark ? "bg-emerald-600/15" : "bg-emerald-50"}`}>
              <FileText size={26} className="text-emerald-600" />
            </div>
            <h3 className={`font-bold text-xl mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
              Our first policy briefs are in development
            </h3>
            <p className={`text-sm leading-relaxed mb-6 max-w-lg mx-auto ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Each brief will pair a two-page summary with the underlying research, so advocates and leaders can
              move from evidence to action quickly. Check back soon, or get in touch to propose a topic.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 active:scale-95 transition-all"
            >
              Propose a Brief <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-2xl font-extrabold tracking-tight mb-6 text-center ${dark ? "text-white" : "text-slate-900"}`}
          >
            What makes a brief useful
          </motion.h2>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3"
          >
            {["Grounded in empirical evidence, not speculation", "Written for decision-makers, not just academics", "Focused on root causes and key drivers", "Paired with clear, actionable recommendations"].map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className={`text-sm ${dark ? "text-slate-300" : "text-slate-700"}`}>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  )
}
