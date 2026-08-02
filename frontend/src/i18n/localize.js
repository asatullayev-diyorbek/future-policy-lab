export function L(item, field, lang) {
  if (!item) return ""
  if (lang === "uz" && item[`${field}_uz`]) return item[`${field}_uz`]
  if (lang === "ru" && item[`${field}_ru`]) return item[`${field}_ru`]
  return item[field]
}

export function localeFor(lang) {
  return lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US"
}
