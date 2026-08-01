import { useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import {
  Mail, Send, MessageCircle, Clock, MapPin, ArrowRight,
  FlaskConical, FileText, CalendarDays, Library,
} from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const TOPICS = [
  { value: "Research submission", to: "/research", icon: FlaskConical, color: "text-blue-600", bg: "bg-blue-50", bgDark: "bg-blue-600/12" },
  { value: "Policy brief proposal", to: "/policy-briefs", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", bgDark: "bg-emerald-600/12" },
  { value: "Debate / forum topic", to: "/debates", icon: MessageCircle, color: "text-violet-600", bg: "bg-violet-50", bgDark: "bg-violet-600/12" },
  { value: "Event or partnership", to: "/meetings-news", icon: CalendarDays, color: "text-orange-600", bg: "bg-orange-50", bgDark: "bg-orange-600/12" },
  { value: "Resource suggestion", to: "/resources", icon: Library, color: "text-pink-600", bg: "bg-pink-50", bgDark: "bg-pink-600/12" },
]

export default function Contact() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = "Name is required."
    if (!form.email.trim()) next.email = "Email is required."
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address."
    if (!form.message.trim()) next.message = "Tell us a bit about your message."
    else if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters."
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSent(true)
    setForm({ name: "", email: "", topic: "", message: "" })
  }

  const inputCls = (field) => `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
    errors[field]
      ? dark
        ? "bg-white/5 border-rose-500/50 text-white placeholder:text-slate-600 focus:border-rose-500"
        : "bg-rose-50/50 border-rose-300 text-slate-900 placeholder:text-slate-400 focus:border-rose-400"
      : dark
        ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50"
        : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400"
  }`

  return (
    <>
      <Helmet><title>Contact — Future Policy Lab</title></Helmet>

      <PageHero
        eyebrow="Get in Touch"
        title="Let's Start a Conversation"
        subtitle="Have research to share, a topic to propose, or a question about the lab? We'd love to hear from you."
      />

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">

            {/* Left column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-4"
            >
              <motion.div variants={fadeUp} className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-blue-600/15" : "bg-blue-50"}`}>
                    <Mail size={20} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-[15px] mb-1 ${dark ? "text-white" : "text-slate-900"}`}>Email</h3>
                    <a href="mailto:hello@futurepolicylab.org" className={`text-sm hover:underline ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      hello@futurepolicylab.org
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-emerald-600/15" : "bg-emerald-50"}`}>
                    <Clock size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-[15px] mb-1 ${dark ? "text-white" : "text-slate-900"}`}>Response time</h3>
                    <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>
                      We typically reply within 2–3 business days.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-orange-600/15" : "bg-orange-50"}`}>
                    <MapPin size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-[15px] mb-1 ${dark ? "text-white" : "text-slate-900"}`}>Based remotely</h3>
                    <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>
                      Our lab operates as a distributed, youth-led team. Seminars and workshops are listed under Meetings & News.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-violet-600/15" : "bg-violet-50"}`}>
                    <MessageCircle size={20} className="text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-[15px] mb-1 ${dark ? "text-white" : "text-slate-900"}`}>Join the Forum</h3>
                    <p className={`text-sm leading-relaxed mb-3 ${dark ? "text-slate-500" : "text-slate-500"}`}>
                      Prefer public dialogue? Take part in a live debate.
                    </p>
                    <Link to="/debates" className={`inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-violet-400" : "text-violet-700"}`}>
                      Go to Debates <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right column: form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`p-7 sm:p-8 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
            >
              {sent ? (
                <div className={`flex flex-col items-center text-center gap-3 py-16 ${dark ? "text-slate-300" : "text-slate-700"}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${dark ? "bg-emerald-500/15" : "bg-emerald-50"}`}>
                    <Send size={22} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-lg">Message sent</h3>
                  <p className="text-sm max-w-xs">Thanks for reaching out — we'll get back to you within 2–3 business days.</p>
                  <button
                    onClick={() => setSent(false)}
                    className={`mt-2 text-sm font-semibold ${dark ? "text-blue-400" : "text-blue-700"}`}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className={`font-bold text-lg mb-1 ${dark ? "text-white" : "text-slate-900"}`}>Send a message</h2>
                  <p className={`text-sm mb-6 ${dark ? "text-slate-500" : "text-slate-500"}`}>
                    Not sure who to reach? Pick the topic closest to your message below.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                    {TOPICS.map(({ value, icon: Icon, color, bg, bgDark }) => {
                      const active = form.topic === value
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, topic: active ? "" : value }))}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                            active
                              ? dark ? "border-blue-500/50 bg-blue-600/10" : "border-blue-300 bg-blue-50"
                              : dark ? "border-white/8 hover:border-white/20" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark ? bgDark : bg}`}>
                            <Icon size={15} className={color} />
                          </div>
                          <span className={`text-[10px] font-medium leading-tight ${dark ? "text-slate-400" : "text-slate-600"}`}>
                            {value.split(" / ")[0]}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputCls("name")} />
                        {errors.name && <p className="text-xs text-rose-500 mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputCls("email")} />
                        {errors.email && <p className="text-xs text-rose-500 mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us what's on your mind..." className={`${inputCls("message")} resize-none`} />
                      {errors.message && <p className="text-xs text-rose-500 mt-1.5">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 active:scale-95 transition-all mt-2"
                    >
                      Send Message <Send size={15} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
