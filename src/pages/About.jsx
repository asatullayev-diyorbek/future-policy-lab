import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Quote, FlaskConical, FileText, MessageSquare, Library, Eye, MessageCircle, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { AVENUES, PILLARS } from "../data/content"
import { getSiteStats } from "../utils/siteStats"
import PageHero from "../components/PageHero"
import AnimatedStat from "../components/AnimatedStat"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function About() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  const [stats, setStats] = useState({ research: 0, policyBriefs: 0, debates: 0, resources: 0, views: 0, comments: 0 })

  useEffect(() => {
    setStats(getSiteStats())
  }, [])

  const STAT_ITEMS = [
    { key: "research", label: "Research Papers", icon: FlaskConical, color: "text-blue-600", bg: "bg-blue-50", bgDark: "bg-blue-600/12" },
    { key: "policyBriefs", label: "Policy Briefs", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", bgDark: "bg-emerald-600/12" },
    { key: "debates", label: "Active Debates", icon: MessageSquare, color: "text-violet-600", bg: "bg-violet-50", bgDark: "bg-violet-600/12" },
    { key: "resources", label: "Resources", icon: Library, color: "text-pink-600", bg: "bg-pink-50", bgDark: "bg-pink-600/12" },
    { key: "views", label: "Total Views", icon: Eye, color: "text-orange-600", bg: "bg-orange-50", bgDark: "bg-orange-600/12", suffix: "+" },
    { key: "comments", label: "Community Comments", icon: MessageCircle, color: "text-teal-600", bg: "bg-teal-50", bgDark: "bg-teal-600/12" },
  ]

  return (
    <>
      <Helmet><title>About Us — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="About Us"
        title="Research. Evidence. Be Who We Are."
        subtitle="Future Policy Lab is a youth-led policy platform that brings together rigorous research, critical analysis, and public dialogue."
        image="/about-header.png"
      />

      {/* Mission + Stats */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`relative p-8 sm:p-10 rounded-2xl border mb-16 ${
              dark ? "border-white/8 bg-gradient-to-br from-blue-600/10 to-transparent" : "border-blue-100 bg-gradient-to-br from-blue-50 to-white"
            }`}
          >
            <Quote size={34} className={`mb-4 ${dark ? "text-blue-500/40" : "text-blue-200"}`} />
            <p className={`text-lg sm:text-xl leading-relaxed font-medium max-w-3xl ${dark ? "text-slate-200" : "text-slate-800"}`}>
              Our mission is to encourage independent thinking and provide practical ideas grounded in empirical
              evidence rather than speculation — making policy discussions accessible to students, young
              researchers, and future leaders.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10"
          >
            <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-blue-400" : "text-blue-700"}`}>
              By the Numbers
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 ${dark ? "text-white" : "text-slate-900"}`}>
              The Lab in Numbers
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {STAT_ITEMS.map(({ key, label, icon, color, bg, bgDark, suffix }) => (
              <AnimatedStat
                key={key}
                value={stats[key]}
                label={label}
                icon={icon}
                color={color}
                bg={bg}
                bgDark={bgDark}
                suffix={suffix}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Five avenues */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10"
          >
            <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-blue-400" : "text-blue-700"}`}>
              How We Work
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 ${dark ? "text-white" : "text-slate-900"}`}>
              Five Core Avenues of Engagement
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {AVENUES.map(({ icon: Icon, number, title, summary, color, bg, bgDark }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`flex items-start gap-4 p-5 rounded-2xl border ${
                  i === AVENUES.length - 1 ? "sm:col-span-2" : ""
                } ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? bgDark : bg}`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-mono text-[11px] font-bold ${dark ? "text-slate-600" : "text-slate-400"}`}>{number}</span>
                    <h3 className={`font-bold text-base ${dark ? "text-white" : "text-slate-900"}`}>{title}</h3>
                  </div>
                  <p className={`text-[13.5px] leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>{summary}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PECO Core Pillars */}
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

      {/* CTA */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-slate-50"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
              Want to be part of it?
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Submit research, propose a policy brief, or join a live debate — there are several ways to get involved.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-700 text-white font-bold text-[15px] hover:bg-blue-600 active:scale-95 transition-all"
                style={{ boxShadow: "0 8px 28px rgba(29,78,216,0.3)" }}
              >
                Get Involved <ArrowRight size={17} />
              </Link>
              <Link
                to="/research"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-[15px] border transition-all active:scale-95 ${
                  dark ? "border-white/12 text-slate-200 hover:bg-white/5" : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                Explore Research
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
