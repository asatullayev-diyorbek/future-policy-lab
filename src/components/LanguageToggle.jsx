import { useTranslation } from "../i18n/useTranslation"

export default function LanguageToggle({ dark }) {
  const { lang, setLang } = useTranslation()

  return (
    <div className={`flex items-center rounded-xl p-0.5 text-[11px] font-bold ${
      dark ? "bg-white/8" : "bg-slate-100"
    }`}>
      {["uz", "en"].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2 py-1.5 rounded-lg uppercase tracking-wide transition-all duration-150 ${
            lang === code
              ? dark
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 shadow-sm"
              : dark
                ? "text-slate-500 hover:text-slate-300"
                : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
