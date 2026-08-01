import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { ArrowRight, Users, BookOpen, Globe2, FlaskConical, FileText, MessageSquare, Eye } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { AVENUES, PILLARS } from "../data/content"
import { getSiteStats } from "../utils/siteStats"
import AnimatedStat from "../components/AnimatedStat"
import { useTranslation } from "../i18n/useTranslation"
import { L } from "../i18n/localize"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

const wordStagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const wordUp = {
  hidden: { opacity: 0, y: 22, rotateX: -40 },
  show:   { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function SectionTitle({ eyebrow, title, subtitle, dark, center = true }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`mb-10 ${center ? "text-center mx-auto" : ""} max-w-2xl`}
    >
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-blue-400" : "text-blue-700"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 mb-2 ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm sm:text-base ${dark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>
      )}
    </motion.div>
  )
}

function FloatingBlobs({ dark }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 420, height: 420, top: "-8%", right: "6%",
          background: dark ? "rgba(37,99,235,0.16)" : "rgba(59,130,246,0.12)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 30, -10, 0], y: [0, -24, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 320, height: 320, bottom: "-10%", left: "2%",
          background: dark ? "rgba(99,102,241,0.14)" : "rgba(99,102,241,0.10)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, -24, 16, 0], y: [0, 20, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  )
}

export default function Home() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t, lang } = useTranslation()

  const [stats, setStats] = useState({ research: 0, policyBriefs: 0, debates: 0, views: 0 })

  useEffect(() => {
    setStats(getSiteStats())
  }, [])

  const HOME_STATS = [
    { key: "research", label: t("home.statResearch"), icon: FlaskConical, color: "text-blue-600", bg: "bg-blue-50", bgDark: "bg-blue-600/12" },
    { key: "policyBriefs", label: t("home.statBriefs"), icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", bgDark: "bg-emerald-600/12" },
    { key: "debates", label: t("home.statDebates"), icon: MessageSquare, color: "text-violet-600", bg: "bg-violet-50", bgDark: "bg-violet-600/12" },
    { key: "views", label: t("home.statViews"), icon: Eye, color: "text-orange-600", bg: "bg-orange-50", bgDark: "bg-orange-600/12", suffix: "+" },
  ]

  return (
    <>
      <Helmet><title>{t("home.title")}</title></Helmet>

      {/* ═══════════════════════════════════════════════════ HERO */}
      <section className={`relative overflow-hidden ${dark ? "bg-[#080d16]" : "bg-white"}`}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill={dark ? "rgba(148,163,184,0.1)" : "rgba(148,163,184,0.3)"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>

        <FloatingBlobs dark={dark} />

        <div
          className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
          style={{
            background: dark
              ? "radial-gradient(ellipse at 80% 40%, rgba(29,78,216,0.16) 0%, transparent 65%)"
              : "radial-gradient(ellipse at 80% 40%, rgba(29,78,216,0.09) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-16 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-6 ${
                dark
                  ? "bg-blue-600/10 border-blue-500/25 text-blue-400"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {t("home.badge")}
              </motion.div>

              <h1 className={`text-5xl sm:text-6xl lg:text-[3.6rem] font-extrabold leading-[1.08] tracking-tight mb-5 ${
                dark ? "text-white" : "text-slate-900"
              }`} style={{ perspective: 800 }}>
                <motion.span variants={wordStagger} initial="hidden" animate="show" className="block">
                  {[t("home.heroLine1"), t("home.heroLine2")].map((word) => (
                    <motion.span key={word} variants={wordUp} className="inline-block mr-3">
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent inline-block"
                >
                  {t("home.heroLine3")}
                </motion.span>
              </h1>

              <motion.p variants={fadeUp} className={`text-base sm:text-lg leading-relaxed mb-9 max-w-2xl ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}>
                {t("home.heroDesc")}
              </motion.p>

              <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/research"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-700 text-white font-bold text-[15px] hover:bg-blue-600 transition-colors"
                    style={{ boxShadow: "0 8px 28px rgba(29,78,216,0.35)" }}
                  >
                    {t("home.exploreResearch")}
                    <ArrowRight size={17} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/about"
                    className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-[15px] border transition-colors ${
                      dark
                        ? "border-white/12 text-slate-200 hover:bg-white/5"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {t("home.aboutUs")}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex justify-center lg:justify-end"
            >
              <motion.img
                src="/header.png"
                alt="Future Policy Lab — research, policy, and analysis"
                className="w-full max-w-[560px] object-contain select-none"
                draggable={false}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Stat strip */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"
          >
            {[
              { icon: BookOpen, label: t("home.stat1Label"), value: t("home.stat1Value") },
              { icon: Users, label: t("home.stat2Label"), value: t("home.stat2Value") },
              { icon: Globe2, label: t("home.stat3Label"), value: t("home.stat3Value") },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className={`flex items-center gap-3.5 px-5 py-5 rounded-2xl border transition-colors ${
                  dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-blue-600/15" : "bg-blue-50"}`}
                >
                  <Icon size={18} className="text-blue-700" />
                </motion.div>
                <div>
                  <p className={`text-sm font-bold leading-tight ${dark ? "text-white" : "text-slate-900"}`}>{value}</p>
                  <p className={`text-[11.5px] leading-snug ${dark ? "text-slate-500" : "text-slate-500"}`}>{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ LIVE NUMBERS BAR */}
      <section className={`py-8 border-y ${dark ? "bg-[#060a12] border-white/[0.06]" : "bg-slate-50 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className={`grid grid-cols-2 sm:grid-cols-4 divide-x ${dark ? "divide-white/8" : "divide-slate-200"}`}
          >
            {HOME_STATS.map(({ key, label, icon, color, bg, bgDark, suffix }) => (
              <div key={key} className="flex justify-center py-1">
                <AnimatedStat
                  variant="bar"
                  value={stats[key]}
                  label={label}
                  icon={icon}
                  color={color}
                  bg={bg}
                  bgDark={bgDark}
                  suffix={suffix}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ FIVE AVENUES */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            eyebrow={t("home.avenuesEyebrow")}
            title={t("home.avenuesTitle")}
            subtitle={t("home.avenuesSubtitle")}
            dark={dark}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {AVENUES.map((avenue) => (
              <motion.div key={avenue.title} variants={scaleIn} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                <Link
                  to={avenue.slug}
                  className={`group flex flex-col h-full p-6 rounded-2xl border transition-all duration-200 ${
                    dark
                      ? "border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${dark ? avenue.bgDark : avenue.bg}`}>
                      <avenue.icon size={22} className={avenue.color} />
                    </div>
                    <span className={`font-mono text-xs font-bold ${dark ? "text-slate-700" : "text-slate-300"}`}>
                      {avenue.number}
                    </span>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{L(avenue, "title", lang)}</h3>
                  <p className={`text-[13.5px] leading-relaxed mb-4 flex-1 ${dark ? "text-slate-500" : "text-slate-500"}`}>
                    {L(avenue, "summary", lang)}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1 ${
                    dark ? "text-blue-400" : "text-blue-700"
                  }`}>
                    {t("common.learnMore")} <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ PEC0 CORE PILLARS */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            eyebrow={t("home.pillarsEyebrow")}
            title={t("home.pillarsTitle")}
            subtitle={t("home.pillarsSubtitle")}
            dark={dark}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group flex flex-col items-start p-7 rounded-2xl border transition-colors ${
                  dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${dark ? pillar.bgDark : pillar.bg}`}>
                  <pillar.icon size={22} className={pillar.color} />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{L(pillar, "title", lang)}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>{L(pillar, "desc", lang)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ MEET US & FORUM TEASER */}
      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={`p-8 rounded-2xl border ${
                dark ? "border-white/8 bg-gradient-to-br from-blue-600/10 to-transparent" : "border-blue-100 bg-gradient-to-br from-blue-50 to-white"
              }`}
            >
              <h3 className={`font-bold text-xl mb-3 ${dark ? "text-white" : "text-slate-900"}`}>{t("home.meetNewsTitle")}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {t("home.meetNewsDesc")}
              </p>
              <Link
                to="/meetings-news"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-blue-400" : "text-blue-700"}`}
              >
                {t("home.seeWhatsHappening")} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={`p-8 rounded-2xl border ${
                dark ? "border-white/8 bg-gradient-to-br from-violet-600/10 to-transparent" : "border-violet-100 bg-gradient-to-br from-violet-50 to-white"
              }`}
            >
              <h3 className={`font-bold text-xl mb-3 ${dark ? "text-white" : "text-slate-900"}`}>{t("home.forumTitle")}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {t("home.forumDesc")}
              </p>
              <Link
                to="/debates"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-violet-400" : "text-violet-700"}`}
              >
                {t("home.joinDiscussion")} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ CTA */}
      <section className={`relative overflow-hidden py-16 sm:py-20 ${dark ? "bg-[#080d16]" : "bg-white"}`}>
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
          style={{
            width: 500, height: 500, marginLeft: -250, marginTop: -250,
            background: dark ? "rgba(37,99,235,0.14)" : "rgba(59,130,246,0.10)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
              {t("home.ctaTitle")}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed mb-8 ${dark ? "text-slate-400" : "text-slate-500"}`}>
              {t("home.ctaSubtitle")}
            </p>
            <motion.div className="inline-block" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-700 text-white font-bold text-[15px] hover:bg-blue-600 transition-colors"
                style={{ boxShadow: "0 8px 28px rgba(29,78,216,0.3)" }}
              >
                {t("home.getInvolved")}
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
