import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MessageSquare, Users, Mic, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const FORMATS = [
  { icon: Mic, title: "Structured Forums", desc: "Moderated exchanges on a defined policy question, with time for both sides of the argument." },
  { icon: Users, title: "Diverse Perspectives", desc: "Voices from different disciplines, backgrounds, and political leanings, in one room." },
  { icon: MessageSquare, title: "Critical Inquiry", desc: "Discussion designed to test assumptions, not just confirm them." },
]

export default function Debates() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  return (
    <>
      <Helmet><title>Debates — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="03 — Debates"
        title="Structured Forums for Rigorous Debate"
        subtitle="Intellectual exchanges fostering critical inquiry and diverse perspective-sharing on today's most pressing public matters."
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
            {FORMATS.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${dark ? "bg-violet-600/15" : "bg-violet-50"}`}>
                  <Icon size={20} className="text-violet-600" />
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
              A space for continuous dialogue
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Our forum is for collaboration and debate on today's most pressing policy questions. Join the
              discussion with fellow researchers, exchange insights, and help shape tomorrow's policy landscape.
              Upcoming sessions will be announced on our Meetings &amp; News page.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/meetings-news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 active:scale-95 transition-all"
              >
                Upcoming Sessions <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all active:scale-95 ${
                  dark ? "border-white/12 text-slate-200 hover:bg-white/5" : "border-slate-300 text-slate-700 hover:bg-white"
                }`}
              >
                Propose a Topic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
