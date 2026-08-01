import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useThemeStore } from "../store/theme"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K"
  return n.toString()
}

export default function AnimatedStat({ value, label, icon: Icon, color, bg, bgDark, suffix = "" }) {
  const { theme } = useThemeStore()
  const dark = theme === "dark"
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(ease * value))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return (
    <motion.div
      variants={fadeUp}
      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border text-center ${
        dark ? "bg-white/3 border-white/8" : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${dark ? bgDark : bg}`}>
        <Icon size={20} className={color} />
      </div>
      <div>
        <div className={`text-3xl font-extrabold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
          {formatNum(display)}{suffix}
        </div>
        <div className={`text-xs mt-1 font-medium ${dark ? "text-slate-500" : "text-slate-500"}`}>
          {label}
        </div>
      </div>
    </motion.div>
  )
}
