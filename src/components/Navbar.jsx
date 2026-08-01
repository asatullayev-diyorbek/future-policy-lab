import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, X, ArrowRight } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { useThemeStore } from "../store/theme"
import { useTranslation } from "../i18n/useTranslation"

export default function Navbar() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t } = useTranslation()

  const NAV_LINKS = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/about", label: t("nav.about") },
    { to: "/research", label: t("nav.research") },
    { to: "/policy-briefs", label: t("nav.policyBriefs") },
    { to: "/debates", label: t("nav.debates") },
    { to: "/meetings-news/events", label: t("nav.meetings") },
    { to: "/meetings-news/news", label: t("nav.news") },
    { to: "/resources", label: t("nav.resources") },
  ]

  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setMenuOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const linkCls = (isActive) =>
    `px-1.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-200 whitespace-nowrap ${
      isActive
        ? dark
          ? "text-blue-400 bg-blue-500/10 font-semibold"
          : "text-blue-700 bg-blue-50 font-semibold"
        : dark
          ? "text-slate-400 hover:text-slate-100 hover:bg-white/5"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
    }`

  const mobileLinkCls = (isActive) =>
    `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActive
        ? `text-blue-700 ${dark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50"}`
        : dark
          ? "text-slate-400 hover:text-white hover:bg-white/6"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      dark
        ? "bg-[#060B14]/98 border-b border-white/[0.07] backdrop-blur-2xl"
        : "bg-white/98 border-b border-slate-200/80 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
    }`}>

      {dark && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2.5 group transition-opacity hover:opacity-80">
            <img src="/logo-mark.png" alt="Future Policy Lab" className="h-9 w-auto object-contain shrink-0" />
            <div className="hidden xl:flex flex-col leading-none gap-[3px]">
              <span className={`font-extrabold text-[15px] tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
                Future Policy <span className="text-blue-500">Lab</span>
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>
                {t("nav.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => linkCls(isActive)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <LanguageToggle dark={dark} />

            <Link
              to="/contact"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                dark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-700 text-white hover:bg-blue-600"
              }`}
            >
              {t("nav.contact")} <ArrowRight size={13} />
            </Link>

            <ThemeToggle dark={dark} />

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className={`xl:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                dark
                  ? "text-slate-400 hover:bg-white/8 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out border-t ${
        menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0 border-transparent"
      } ${dark ? "border-white/8 bg-[#060B14]" : "border-slate-200 bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => mobileLinkCls(isActive)}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className={({ isActive }) => mobileLinkCls(isActive)}>
            {t("nav.contact")}
          </NavLink>
        </div>
      </div>

    </header>
  )
}
