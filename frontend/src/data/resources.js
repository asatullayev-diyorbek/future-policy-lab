// Resource content now lives in the backend database (resources table),
// managed via the admin app. This file only keeps the resource-kind
// taxonomy.
export const RESOURCE_KINDS = [
  { id: "tool", name: "Analytical Tools", name_uz: "Tahliliy vositalar", name_ru: "Аналитические инструменты" },
  { id: "dataset", name: "Open Datasets", name_uz: "Ochiq ma'lumotlar bazalari", name_ru: "Открытые наборы данных" },
  { id: "reading-list", name: "Reading Lists", name_uz: "O'quv ro'yxatlari", name_ru: "Списки литературы" },
]
