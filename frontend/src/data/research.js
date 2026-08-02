// Research article content now lives in the backend database (research_articles
// table), managed via the admin app. This file only keeps the shared theme
// taxonomy, which is also re-exported by policyBriefs.js and debates.js.
export const RESEARCH_THEMES = [
  { id: "education", name: "Education", name_uz: "Ta'lim", name_ru: "Образование" },
  { id: "governance", name: "Governance", name_uz: "Boshqaruv", name_ru: "Управление" },
  { id: "economic-development", name: "Economic Development", name_uz: "Iqtisodiy rivojlanish", name_ru: "Экономическое развитие" },
  { id: "technology", name: "Technology", name_uz: "Texnologiya", name_ru: "Технологии" },
  { id: "sustainability", name: "Sustainability", name_uz: "Barqarorlik", name_ru: "Устойчивое развитие" },
]
