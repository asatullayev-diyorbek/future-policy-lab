import { useEffect, useState } from "react"
import { X, CalendarCheck } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { useTranslation } from "../i18n/useTranslation"

export default function RSVPModal({ eventTitle, onClose, onSubmit }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t } = useTranslation()

  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const inputCls = `w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors ${
    dark
      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-orange-500/50"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-400"
  }`

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError(t("rsvpModal.nameRequired")); return }
    if (!form.email.trim() && !form.phone.trim()) { setError(t("rsvpModal.contactRequired")); return }
    setError("")
    onSubmit(form)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl ${
        dark ? "bg-[#0b121e] border-white/10" : "bg-white border-slate-200"
      }`}>
        <div className={`flex items-center justify-between px-6 py-5 border-b ${dark ? "border-white/8" : "border-slate-100"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-orange-600/15" : "bg-orange-50"}`}>
              <CalendarCheck size={17} className="text-orange-600" />
            </div>
            <div>
              <h2 id="rsvp-modal-title" className={`text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>
                {t("rsvpModal.title")}
              </h2>
              <p className={`text-xs truncate max-w-[260px] ${dark ? "text-slate-500" : "text-slate-500"}`}>{eventTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={t("common.close")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              dark ? "text-slate-500 hover:bg-white/8 hover:text-white" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>
              {t("rsvpModal.fullName")} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={t("rsvpModal.namePlaceholder")}
              className={inputCls}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>
              {t("rsvpModal.email")}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@email.com"
              className={inputCls}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1.5 ${dark ? "text-slate-400" : "text-slate-600"}`}>
              {t("rsvpModal.phone")}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+998 90 123 45 67"
              className={inputCls}
            />
          </div>

          <p className={`text-[11px] leading-relaxed ${dark ? "text-slate-600" : "text-slate-400"}`}>
            {t("rsvpModal.note")}
          </p>

          {error && <p className="text-xs text-rose-500">{error}</p>}

          <div className="flex items-center gap-3 mt-1">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 active:scale-[0.98] transition-all"
            >
              <CalendarCheck size={15} /> {t("rsvpModal.confirm")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm border transition-colors ${
                dark ? "border-white/12 text-slate-300 hover:bg-white/5" : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t("rsvpModal.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
