import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"
import { meetingsNews } from "../data/meetingsNews"
import PageHero from "../components/PageHero"
import MeetingsNewsCard from "../components/MeetingsNewsCard"
import { useTranslation } from "../i18n/useTranslation"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function News() {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const { t } = useTranslation()

  const news = useMemo(() => {
    return meetingsNews
      .filter((m) => m.type === "news")
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  }, [])

  return (
    <>
      <Helmet><title>{t("news.title")}</title></Helmet>

      <PageHero
        eyebrow={t("news.eyebrow")}
        title={t("news.heroTitle")}
        subtitle={t("news.heroSubtitle")}
      />

      <section className={`py-16 sm:py-20 ${dark ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {news.length > 0 ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {news.map((item) => (
                <motion.div key={item.slug} variants={fadeUp} className="h-full">
                  <MeetingsNewsCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className={`text-center py-16 text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}>
              {t("news.empty")}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
