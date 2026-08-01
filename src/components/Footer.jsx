import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { useTranslation } from "../i18n/useTranslation"

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.889z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const SOCIALS = [
  { href: "#", label: "Telegram",  Icon: TelegramIcon,  hoverLight: "hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200",   hoverDark: "hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30" },
  { href: "#", label: "Instagram", Icon: InstagramIcon, hoverLight: "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200",    hoverDark: "hover:bg-pink-500/10 hover:text-pink-400 hover:border-pink-500/30" },
  { href: "#", label: "LinkedIn",  Icon: LinkedInIcon,  hoverLight: "hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200",       hoverDark: "hover:bg-sky-500/10 hover:text-sky-400 hover:border-sky-500/30" },
]

export default function Footer() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const FOOTER_LINKS = [
    { to: "/about", label: t("nav.about") },
    { to: "/research", label: t("nav.research") },
    { to: "/policy-briefs", label: t("nav.policyBriefs") },
    { to: "/debates", label: t("nav.debates") },
    { to: "/meetings-news/events", label: t("nav.meetings") },
    { to: "/meetings-news/news", label: t("nav.news") },
    { to: "/resources", label: t("nav.resources") },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail("")
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <footer className={`relative border-t ${
      dark ? "border-white/[0.07] bg-[#060a12]" : "border-slate-200 bg-slate-50"
    }`}>

      {dark && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-12 lg:gap-10">

          {/* Brand + social */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <img src="/logo-mark.png" alt="Future Policy Lab" className="h-9 w-auto object-contain shrink-0" />
              <span className={`font-extrabold text-[16px] tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
                Future Policy <span className="text-blue-500">Lab</span>
              </span>
            </Link>

            <p className={`text-sm leading-relaxed mb-7 max-w-[340px] ${dark ? "text-slate-500" : "text-slate-500"}`}>
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ href, label, Icon, hoverLight, hoverDark }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                    dark
                      ? `border-white/10 bg-white/4 text-slate-500 ${hoverDark}`
                      : `border-slate-200 bg-white text-slate-400 ${hoverLight}`
                  }`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${dark ? "text-slate-500" : "text-slate-400"}`}>
              {t("footer.explore")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`text-sm transition-colors ${dark ? "text-slate-400 hover:text-blue-400" : "text-slate-600 hover:text-blue-700"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className={`rounded-2xl p-6 border ${
            dark ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
              dark ? "bg-blue-600/15" : "bg-blue-50"
            }`}>
              <Mail size={18} className="text-blue-700" />
            </div>

            <h4 className={`font-bold text-[15px] mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>
              {t("footer.stayInformed")}
            </h4>
            <p className={`text-sm leading-relaxed mb-5 ${dark ? "text-slate-500" : "text-slate-500"}`}>
              {t("footer.newsletterDesc")}
            </p>

            {sent ? (
              <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium ${
                dark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {t("footer.subscribed")}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    dark
                      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400"
                  }`}
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-bold hover:bg-blue-600 active:scale-95 transition-all shrink-0"
                >
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          dark ? "border-white/[0.06]" : "border-slate-200"
        }`}>
          <span className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>
            © {new Date().getFullYear()} Future Policy Lab. {t("footer.rights")}
          </span>
          <span className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>
            {t("footer.initiative")}
          </span>
        </div>
      </div>
    </footer>
  )
}
