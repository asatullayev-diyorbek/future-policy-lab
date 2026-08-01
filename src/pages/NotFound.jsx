import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowRight } from "lucide-react"
import { useThemeStore } from "../store/theme"
import { useTranslation } from "../i18n/useTranslation"

export default function NotFound() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t } = useTranslation()

  return (
    <>
      <Helmet><title>{t("notFound.title")}</title></Helmet>
      <section className={`min-h-[70vh] flex items-center justify-center px-4 ${dark ? "bg-[#0B0F19]" : "bg-white"}`}>
        <div className="text-center">
          <p className={`text-sm font-bold uppercase tracking-widest mb-3 ${dark ? "text-blue-400" : "text-blue-700"}`}>{t("notFound.code")}</p>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 ${dark ? "text-white" : "text-slate-900"}`}>
            {t("notFound.heading")}
          </h1>
          <p className={`text-sm mb-8 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {t("notFound.desc")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 active:scale-95 transition-all"
          >
            {t("notFound.backHome")} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
