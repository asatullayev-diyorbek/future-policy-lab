export function L(item, field, lang) {
  if (!item) return ""
  if (lang === "uz" && item[`${field}_uz`]) return item[`${field}_uz`]
  return item[field]
}
