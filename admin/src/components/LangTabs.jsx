const LANGS = [
  { key: "", label: "English" },
  { key: "_uz", label: "Uzbek" },
  { key: "_ru", label: "Russian" },
]

export default function LangTabs({ lang, setLang }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {LANGS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setLang(key)}
          className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
            lang === key ? "bg-blue-600 border-blue-600 text-white" : "border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
