import { useLanguageStore } from "../store/language"
import { useT } from "./translations"

export function useTranslation() {
  const { lang, setLang, toggleLang } = useLanguageStore()
  const t = useT(lang)
  return { t, lang, setLang, toggleLang }
}
