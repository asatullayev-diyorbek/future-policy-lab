// Meeting/news content now lives in the backend database (meetings_news
// table), managed via the admin app. This file only keeps the item-type
// taxonomy (event vs news).
export const ITEM_TYPES = [
  { id: "event", name: "Events", name_uz: "Uchrashuvlar", name_ru: "Мероприятия" },
  { id: "news", name: "News", name_uz: "Yangiliklar", name_ru: "Новости" },
]
