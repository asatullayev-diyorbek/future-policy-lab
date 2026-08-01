import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Mail, Send, MessageCircle } from "lucide-react"
import { useThemeStore } from "../store/theme"
import PageHero from "../components/PageHero"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSent(true)
    setForm({ name: "", email: "", topic: "", message: "" })
  }

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
    dark
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-4"
            >
              <div className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${dark ? "bg-blue-600/15" : "bg-blue-50"}`}>
                  <Mail size={20} className="text-blue-700" />
                </div>
                <h3 className={`font-bold text-[15px] mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>Email</h3>
                <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-500"}`}>hello@futurepolicylab.org</p>
              </div>

              <div className={`p-6 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${dark ? "bg-violet-600/15" : "bg-violet-50"}`}>
                  <MessageCircle size={20} className="text-violet-600" />
                </div>
                <h3 className={`font-bold text-[15px] mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>Join the Forum</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}>
                  Prefer public dialogue? Head to Debates and take part in the discussion.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`p-7 sm:p-8 rounded-2xl border ${dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
            >
              {sent ? (
                <div className={`flex flex-col items-center text-center gap-3 py-10 ${dark ? "text-slate-300" : "text-slate-700"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${dark ? "bg-emerald-500/15" : "bg-emerald-50"}`}>
                    <Send size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-lg">Message sent</h3>
                  <p className="text-sm max-w-xs">Thanks for reaching out — we'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Name</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputCls} required />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Topic</label>
                    <select name="topic" value={form.topic} onChange={handleChange} className={inputCls}>
                      <option value="">Select a topic</option>
                      <option>Research submission</option>
                      <option>Policy brief proposal</option>
                      <option>Debate / forum topic</option>
                      <option>Event or partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us what's on your mind..." className={`${inputCls} resize-none`} required />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 active:scale-95 transition-all mt-2"
                  >
                    Send Message <Send size={15} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
