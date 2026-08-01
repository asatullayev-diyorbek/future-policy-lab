import { create } from "zustand"

export const useLanguageStore = create((set) => ({
  lang: ["uz", "en", "ru"].includes(localStorage.getItem("lang")) ? localStorage.getItem("lang") : "uz",

  setLang: (lang) => {
    localStorage.setItem("lang", lang)
    set({ lang })
  },

  toggleLang: () =>
    set((state) => {
      const next = state.lang === "uz" ? "en" : state.lang === "en" ? "ru" : "uz"
      localStorage.setItem("lang", next)
      return { lang: next }
    }),
}))
