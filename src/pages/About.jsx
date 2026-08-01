import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Target, Compass, Sparkles } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { AVENUES, PILLARS } from "../data/content"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function About() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  return (
    <>
      <Helmet><title>About Us — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="About Us"
        title="Research. Evidence. Be Who We Are."
        subtitle="Future Policy Lab is a youth-led policy platform that brings together rigorous research, critical analysis, and public dialogue."
        image="/about-header.png"
      />

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className={`text-base sm:text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
              Our mission is to encourage independent thinking and provide practical ideas grounded in empirical
              evidence rather than speculation. Through five core avenues of engagement, we aim to make policy
              discussions accessible to students, young researchers, and future leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Five avenues */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-10 text-center ${dark ? "text-white" : "text-slate-900"}`}
          >
            Five Core Avenues of Engagement
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col gap-4"
          >
            {AVENUES.map(({ icon: Icon, number, title, summary, color, bg, bgDark }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`flex items-start gap-5 p-6 rounded-2xl border ${
                  dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${dark ? bgDark : bg}`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className={`font-mono text-xs font-bold ${dark ? "text-slate-600" : "text-slate-400"}`}>{number}</span>
                    <h3 className={`font-bold text-lg ${dark ? "text-white" : "text-slate-900"}`}>{title}</h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>{summary}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PEC0 Core Pillars */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10"
          >
            <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-blue-400" : "text-blue-700"}`}>
              Our Work
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 ${dark ? "text-white" : "text-slate-900"}`}>
              PECO Core Pillars
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {PILLARS.map(({ icon: Icon, title, desc, color, bg, bgDark }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`flex flex-col items-start p-7 rounded-2xl border ${
                  dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${dark ? bgDark : bg}`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
