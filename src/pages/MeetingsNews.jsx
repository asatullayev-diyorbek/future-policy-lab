import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CalendarDays, Megaphone, Users2, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const CATEGORIES = [
  { icon: CalendarDays, title: "Seminars & Workshops", desc: "Upcoming sessions and collaborative workshops — everyone is welcome to join." },
  { icon: Users2, title: "Panel Discussions", desc: "Conversations with researchers and practitioners on live policy questions." },
  { icon: Megaphone, title: "Lab Announcements", desc: "New research papers, reading lists, datasets, and materials to strengthen your analytical skills." },
]

export default function MeetingsNews() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  return (
    <>
      <Helmet><title>Meetings & News — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="04 — Meetings & News"
        title="Seminars, Workshops & Lab Updates"
        subtitle="Regular announcements, collaborative workshops, panel discussions, and updates highlighting key policy developments and upcoming lab initiatives."
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
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${dark ? "bg-orange-600/15" : "bg-orange-50"}`}>
                  <Icon size={20} className="text-orange-600" />
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
              No events scheduled yet
            </h3>
            <p className={`text-sm leading-relaxed mb-6 max-w-lg mx-auto ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Our first seminars and workshops are being planned. Subscribe to our newsletter in the footer, or get
              in touch, to be notified as soon as dates are announced.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 active:scale-95 transition-all"
            >
              Get Notified <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
