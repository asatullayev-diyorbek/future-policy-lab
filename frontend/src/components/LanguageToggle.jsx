import { useTranslation } from "../i18n/useTranslation"
import { ChevronDown } from "lucide-react"

const LANGS = [
  { code: "uz", label: "O‘zbekcha" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
]

export default function LanguageToggle({ dark }) {
  const { lang, setLang } = useTranslation()

  return (
    <div className="relative">
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value)}
        aria-label="Select language"
        className={`appearance-none cursor-pointer rounded-xl border py-2 pl-3 pr-8 text-[12px] font-bold uppercase tracking-wide outline-none transition-colors ${
          dark ? "border-white/10 bg-white/8 text-slate-200 hover:bg-white/12" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-white"
        }`}
      >
        {LANGS.map(({ code, label }) => <option key={code} value={code}>{label}</option>)}
      </select>
      <ChevronDown size={13} className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 ${dark ? "text-slate-400" : "text-slate-500"}`} />
    </div>
  )
}
