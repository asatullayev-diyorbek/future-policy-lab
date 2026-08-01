import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"

export default function PageHero({ eyebrow, title, subtitle }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"

  return (
    <section className={`relative overflow-hidden border-b ${
      dark ? "bg-[#080d16] border-white/[0.06]" : "bg-white border-slate-200"
    }`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={dark ? "rgba(148,163,184,0.1)" : "rgba(148,163,184,0.3)"} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
      <div
        className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 80% 40%, rgba(29,78,216,0.14) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 80% 40%, rgba(29,78,216,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-5 ${
              dark
                ? "bg-blue-600/10 border-blue-500/25 text-blue-400"
                : "bg-blue-50 border-blue-200 text-blue-700"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {eyebrow}
            </span>
          )}
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 ${
            dark ? "text-white" : "text-slate-900"
          }`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-base sm:text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
