export const ITEM_TYPES = [
  { id: "event", name: "Events", name_uz: "Uchrashuvlar", name_ru: "Мероприятия" },
  { id: "news", name: "News", name_uz: "Yangiliklar", name_ru: "Новости" },
]

export const meetingsNews = [
  {
    id: 1,
    slug: "seminar-evidence-based-policy-writing",
    type: "event",
    title: "Seminar: Writing Policy Recommendations from Empirical Data",
    title_uz: "Seminar: Empirik ma'lumotlar asosida siyosat tavsiyalarini yozish",
    excerpt:
      "A hands-on session on translating research findings into decision-ready policy briefs, led by our Governance Fellow.",
    excerpt_uz:
      "Tadqiqot natijalarini qarorga tayyor siyosat bayonlariga aylantirish bo'yicha amaliy dars, Boshqaruv bo'yicha tadqiqotchimiz tomonidan olib boriladi.",
    cover: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    date: "2026-09-12T15:00:00Z",
    location: "Future Policy Lab HQ, Room 204 — also streamed online",
    location_uz: "Future Policy Lab bosh ofisi, 204-xona — onlayn ham translyatsiya qilinadi",
    published_at: "2026-08-01T09:00:00Z",
    base_views: 320,
    base_attendees: 41,
    tags: ["workshop", "policy-writing"],
    content: `This hands-on seminar walks through the process our researchers use to turn empirical findings into a policy brief a decision-maker can act on in five minutes.

## What you'll learn

- How to identify the single decision a brief should drive
- Structuring recommendations so they're specific enough to implement
- Common mistakes that make briefs get filed instead of read

## Who should attend

Open to all lab members and any student or young researcher currently working on a research project they'd like to translate into policy language. No prior policy-writing experience required.

## Format

90 minutes: a 30-minute walkthrough followed by a live workshop on a sample dataset, with feedback from the Policy Briefs editorial team.`,
    content_uz: `Ushbu amaliy seminar bizning tadqiqotchilarimiz empirik topilmalarni qaror qabul qiluvchi besh daqiqada harakat qila oladigan siyosat bayoniga aylantirish uchun ishlatadigan jarayonni ko'rsatadi.

## Nimalarni o'rganasiz

- Bayon qaysi bitta qarorni harakatga keltirishi kerakligini aniqlash
- Tavsiyalarni amalga oshirish uchun yetarlicha aniq bo'ladigan qilib tuzish
- Bayonlarni o'qish o'rniga arxivga tushirib qo'yadigan keng tarqalgan xatolar

## Kim qatnashishi kerak

Barcha lab a'zolari va siyosat tiliga aylantirmoqchi bo'lgan tadqiqot loyihasi ustida ishlayotgan har qanday talaba yoki yosh tadqiqotchi uchun ochiq. Oldindan siyosat yozish tajribasi talab qilinmaydi.

## Format

90 daqiqa: 30 daqiqalik tushuntirish, so'ngra namunaviy ma'lumotlar bazasi bo'yicha jonli trening, Siyosat bayonlari muharrirlar jamoasi fikr-mulohazalari bilan.`,
  },
  {
    id: 2,
    slug: "new-research-published-informal-sector",
    type: "news",
    title: "New Research Published: The Informal Sector's Role in Youth Employment",
    title_uz: "Yangi tadqiqot chop etildi: norasmiy sektorning yoshlar bandligidagi o'rni",
    excerpt:
      "Our latest study on informal labor markets and portable benefits is now live, alongside a companion policy brief.",
    excerpt_uz:
      "Norasmiy mehnat bozorlari va ko'chma imtiyozlar bo'yicha eng so'nggi tadqiqotimiz, tegishli siyosat bayoni bilan birga endi mavjud.",
    cover: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    published_at: "2026-01-18T09:00:00Z",
    base_views: 480,
    tags: ["announcement", "research"],
    content: `We're glad to share our latest empirical study, "The Informal Sector's Role in Youth Employment," now available in the Research section.

## What's in it

The study draws on fieldwork across six sectors to argue that portable benefits — not formalization mandates — are the more effective lever for protecting young informal workers.

## Related reading

A companion policy brief, "Portable Benefits Over Formalization Mandates," distills the findings into three concrete recommendations for labor ministries. Both are available now:

- Research: The Informal Sector's Role in Youth Employment
- Policy Brief: Portable Benefits Over Formalization Mandates

As always, we welcome comments and critique — reach out via Contact if you'd like to discuss the methodology or propose a follow-up study.`,
    content_uz: `Biz eng so'nggi empirik tadqiqotimiz — "Norasmiy sektorning yoshlar bandligidagi o'rni" — ni ulashishdan xursandmiz, u endi Tadqiqotlar bo'limida mavjud.

## Unda nima bor

Tadqiqot oltita sohadagi dala ishlariga tayanib, ko'chma imtiyozlar — rasmiylashtirish talablari emas — yosh norasmiy ishchilarni himoya qilishning samaraliroq vositasi ekanligini ta'kidlaydi.

## Tegishli o'qish

Tegishli siyosat bayoni "Rasmiylashtirish talablari o'rniga ko'chma imtiyozlar" topilmalarni mehnat vazirliklari uchun uchta aniq tavsiyaga jamlaydi. Ikkalasi ham endi mavjud:

- Tadqiqot: Norasmiy sektorning yoshlar bandligidagi o'rni
- Siyosat bayoni: Rasmiylashtirish talablari o'rniga ko'chma imtiyozlar

Har doimgidek, izoh va tanqidlarni kutib olamiz — metodologiyani muhokama qilish yoki keyingi tadqiqotni taklif qilish uchun Aloqa orqali murojaat qiling.`,
  },
  {
    id: 3,
    slug: "panel-discussion-algorithmic-accountability",
    type: "event",
    title: "Panel: Algorithmic Accountability in Public Services",
    title_uz: "Panel: davlat xizmatlarida algoritmik javobgarlik",
    excerpt:
      "A panel discussion with technology policy researchers on due-process standards for automated eligibility systems.",
    excerpt_uz:
      "Avtomatlashtirilgan huquq berish tizimlari uchun adolatli jarayon standartlari bo'yicha texnologiya siyosati tadqiqotchilari bilan panel muhokamasi.",
    cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
    date: "2026-10-03T16:30:00Z",
    location: "Online — link shared after RSVP",
    location_uz: "Onlayn — havola ro'yxatdan o'tgandan keyin yuboriladi",
    published_at: "2026-08-15T09:00:00Z",
    base_views: 275,
    base_attendees: 58,
    tags: ["panel", "technology-policy"],
    content: `Following our research audit of automated eligibility systems, we're hosting a panel to discuss what a workable disclosure standard should look like in practice.

## Panelists

Our Technology Policy Researcher will be joined by two guest practitioners currently working on algorithmic accountability standards in public-sector procurement.

## Discussion topics

- What agencies actually owe applicants when a benefit is denied by an algorithm
- Whether disclosure requirements should be legislated or handled via procurement standards
- Lessons from the nine-system audit in our published research

## How to join

RSVP below to receive the streaming link 24 hours before the session. Q&A will be open to all attendees in the final 20 minutes.`,
    content_uz: `Avtomatlashtirilgan huquq berish tizimlari bo'yicha tadqiqot auditimizdan so'ng, biz amaliy oshkoralik standarti qanday ko'rinishi kerakligini muhokama qilish uchun panel tashkil qilmoqdamiz.

## Panel ishtirokchilari

Bizning Texnologiya siyosati tadqiqotchimizga davlat sektori xaridlarida algoritmik javobgarlik standartlari ustida ishlayotgan ikki mehmon mutaxassis qo'shiladi.

## Muhokama mavzulari

- Imtiyoz algoritm tomonidan rad etilganda idoralar ariza beruvchilarga aslida nima qarzdor
- Oshkoralik talablari qonun bilan belgilanishi yoki xarid standartlari orqali hal qilinishi kerakmi
- Bizning chop etilgan tadqiqotimizdagi to'qqiz tizim auditidan saboqlar

## Qanday qo'shilish mumkin

Sessiyadan 24 soat oldin translyatsiya havolasini olish uchun quyida ro'yxatdan o'ting. So'nggi 20 daqiqada barcha ishtirokchilar uchun savol-javob ochiq bo'ladi.`,
  },
  {
    id: 4,
    slug: "lab-update-new-reading-list-research-methods",
    type: "news",
    title: "New Reading List: Research Methods for Policy Analysis",
    title_uz: "Yangi o'quv ro'yxati: siyosat tahlili uchun tadqiqot metodlari",
    excerpt:
      "A curated set of readings and methodology guides added to the Resources section for members building research literacy.",
    excerpt_uz:
      "Tadqiqot savodxonligini oshirayotgan a'zolar uchun Resurslar bo'limiga qo'shilgan tanlangan o'qish materiallari va metodologik qo'llanmalar to'plami.",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    published_at: "2025-12-20T09:00:00Z",
    base_views: 190,
    tags: ["announcement", "resources"],
    content: `We've added a new curated reading list to the Resources section, focused on foundational research methods for policy analysis.

## What's included

The list covers survey design, causal inference basics, and structuring a literature review for a policy-relevant question — aimed at students and young researchers new to empirical work.

## Why now

Several members preparing their first independent research project asked for a starting point that doesn't assume a graduate-level statistics background. This list is our answer.

Browse it under Resources, or reach out via Contact if there's a specific method or tool you'd like us to add a guide for next.`,
    content_uz: `Biz Resurslar bo'limiga siyosat tahlili uchun asosiy tadqiqot metodlariga qaratilgan yangi tanlangan o'quv ro'yxatini qo'shdik.

## Nima kiritilgan

Ro'yxat so'rov dizayni, sabab-oqibat tahlili asoslari va siyosatga oid savol uchun adabiyotlar sharhini tuzishni qamrab oladi — bu empirik ishga yangi kelgan talabalar va yosh tadqiqotchilar uchun mo'ljallangan.

## Nega hozir

Birinchi mustaqil tadqiqot loyihasini tayyorlayotgan bir qancha a'zolar magistratura darajasidagi statistika bilimini talab qilmaydigan boshlang'ich nuqta so'rashdi. Ushbu ro'yxat bizning javobimiz.

Uni Resurslar bo'limida ko'rib chiqing yoki keyingi qo'llanma qo'shishimizni istagan aniq metod yoki vosita bo'lsa, Aloqa orqali murojaat qiling.`,
  },
  {
    id: 5,
    slug: "workshop-designing-community-surveys",
    type: "event",
    title: "Workshop: Designing Surveys That Hold Up to Scrutiny",
    title_uz: "Trening: tekshiruvga bardosh beradigan so'rovlarni loyihalash",
    excerpt:
      "A practical workshop on survey design fundamentals, using our municipal-trust study as a working example.",
    excerpt_uz:
      "So'rov dizayni asoslari bo'yicha amaliy trening, munitsipal ishonch tadqiqotimiz ishchi misol sifatida qo'llaniladi.",
    cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    date: "2026-09-26T14:00:00Z",
    location: "Future Policy Lab HQ, Room 118",
    location_uz: "Future Policy Lab bosh ofisi, 118-xona",
    published_at: "2026-08-20T09:00:00Z",
    base_views: 210,
    base_attendees: 27,
    tags: ["workshop", "methodology"],
    content: `Survey design mistakes are often invisible until a study is already in the field. This workshop walks through the common failure points using our own municipal transparency study as a worked example.

## What we'll cover

- Wording that avoids leading respondents
- Sampling decisions that hold up under peer review
- Pre-registering a survey instrument before fieldwork begins

## Who should attend

Anyone planning fieldwork for a research project, brief, or debate prep this term. Space is limited — RSVP to reserve a seat.`,
    content_uz: `So'rov dizaynidagi xatolar ko'pincha tadqiqot dala ishiga chiqqunga qadar ko'rinmaydi. Ushbu trening o'zimizning munitsipal shaffoflik tadqiqotimizni ishchi misol sifatida ishlatib, keng tarqalgan xato nuqtalarini ko'rsatadi.

## Nimalarni qamrab olamiz

- Respondentlarni yo'naltirmaydigan so'z tanlash
- Ekspert baholovidan o'tadigan namuna olish qarorlari
- Dala ishi boshlanishidan oldin so'rov vositasini oldindan ro'yxatdan o'tkazish

## Kim qatnashishi kerak

Ushbu semestrda tadqiqot loyihasi, bayon yoki munozaraga tayyorgarlik uchun dala ishini rejalashtirayotgan har kim. O'rinlar cheklangan — o'rin band qilish uchun ro'yxatdan o'ting.`,
  },
  {
    id: 6,
    slug: "lab-milestone-first-cohort-research-published",
    type: "news",
    title: "Milestone: Our First Cohort of Research Papers Is Now Live",
    title_uz: "Yutuq: birinchi tadqiqotlar to'plamimiz endi mavjud",
    excerpt:
      "Six original studies spanning education, governance, economic development, technology, and sustainability are now published.",
    excerpt_uz:
      "Ta'lim, boshqaruv, iqtisodiy rivojlanish, texnologiya va barqarorlik bo'yicha oltita original tadqiqot endi chop etildi.",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    published_at: "2025-10-09T09:00:00Z",
    base_views: 615,
    tags: ["announcement", "milestone"],
    content: `We're marking a milestone: our first full cohort of original research is now published across all five of our core themes.

## What's live

Six empirical studies, each paired with a companion policy brief, covering rural education access, municipal transparency, informal labor markets, algorithmic accountability, water scarcity adaptation, and digital literacy outcomes.

## Thank you

This cohort represents months of fieldwork, data collection, and review from our research fellows and the students who contributed interviews and survey data. Explore the full set under Research and Policy Briefs, and join the conversation on any of them under Debates.`,
    content_uz: `Biz muhim bosqichni nishonlaymiz: birinchi to'liq original tadqiqotlar to'plamimiz besh asosiy mavzumizning barchasi bo'yicha chop etildi.

## Nima mavjud

Har biri tegishli siyosat bayoni bilan birlashtirilgan oltita empirik tadqiqot — qishloq ta'lim kirish imkoniyati, munitsipal shaffoflik, norasmiy mehnat bozorlari, algoritmik javobgarlik, suv tanqisligiga moslashish va raqamli savodxonlik natijalarini qamrab oladi.

## Rahmat

Ushbu to'plam bizning tadqiqot bo'yicha hamkasblarimiz va intervyu hamda so'rov ma'lumotlarini taqdim etgan talabalarning oylab davom etgan dala ishi, ma'lumot yig'ish va ko'rib chiqish natijasidir. To'liq to'plamni Tadqiqotlar va Siyosat bayonlari bo'limida ko'ring va Munozaralar bo'limida ularning har biri bo'yicha suhbatga qo'shiling.`,
  },
]

const RU_MEETINGS_COPY = {
  "seminar-evidence-based-policy-writing": {
    title: "Семинар: как писать политические рекомендации на основе эмпирических данных", excerpt: "Практическая сессия о превращении результатов исследования в готовые к решению политические записки.", location: "Штаб-квартира Future Policy Lab, аудитория 204 — также онлайн",
    content: `На практическом семинаре мы разберём процесс, который используют наши исследователи, чтобы превратить эмпирические выводы в политическую записку, с которой руководитель может работать за пять минут.

## Чему вы научитесь

- Определять одно решение, к которому должна вести записка
- Формулировать рекомендации достаточно конкретно для реализации
- Избегать ошибок, из-за которых записки откладывают вместо чтения

## Для кого

Для членов лаборатории, студентов и молодых исследователей, работающих над проектом. Предыдущий опыт написания политических документов не нужен.

## Формат

90 минут: 30-минутное объяснение и практикум на наборе данных с обратной связью редакционной команды.`,
  },
  "new-research-published-informal-sector": {
    title: "Опубликовано новое исследование: роль неформального сектора в занятости молодёжи", excerpt: "Новое исследование неформального рынка труда и переносимых льгот опубликовано вместе с политической запиской.",
    content: `Мы рады представить новое эмпирическое исследование «Роль неформального сектора в занятости молодёжи», доступное в разделе «Исследования».

## Что внутри

Исследование на материалах шести секторов показывает, что переносимые льготы, а не обязательная формализация, лучше защищают молодых работников неформального сектора.

## Связанные материалы

Политическая записка «Переносимые льготы вместо обязательной формализации» формулирует три конкретные рекомендации для министерств труда. Мы приветствуем комментарии и предложения по дальнейшим исследованиям.`,
  },
  "panel-discussion-algorithmic-accountability": {
    title: "Панельная дискуссия: алгоритмическая подотчётность в государственных услугах", excerpt: "Дискуссия с исследователями технологической политики о гарантиях надлежащей процедуры для автоматизированных систем.", location: "Онлайн — ссылка будет отправлена после регистрации",
    content: `После аудита автоматизированных систем определения права на льготы мы проводим панельную дискуссию о том, каким должен быть практический стандарт раскрытия причин.

## Участники

К нашему исследователю технологической политики присоединятся два приглашённых специалиста по стандартам алгоритмической подотчётности в государственных закупках.

## Темы

- Что ведомства должны заявителю при отказе алгоритма
- Следует ли закреплять требования раскрытия законом или через закупки
- Уроки аудита девяти систем

Зарегистрируйтесь, чтобы получить ссылку на трансляцию за 24 часа до сессии.`,
  },
  "lab-update-new-reading-list-research-methods": {
    title: "Новый список литературы: методы исследований для анализа политики", excerpt: "В раздел «Ресурсы» добавлена подборка материалов и методических руководств для развития исследовательских навыков.",
    content: `В раздел «Ресурсы» добавлен новый список литературы по основам исследовательских методов для анализа политики.

## Что включено

Материалы охватывают дизайн опросов, основы причинного вывода и структуру обзора литературы по политически значимому вопросу. Они предназначены для студентов и молодых исследователей, начинающих эмпирическую работу.

Несколько участников попросили отправную точку, не предполагающую знания статистики уровня магистратуры. Этот список — наш ответ.`,
  },
  "workshop-designing-community-surveys": {
    title: "Практикум: проектирование опросов, выдерживающих проверку", excerpt: "Практический семинар по основам дизайна опросов на примере исследования муниципального доверия.", location: "Штаб-квартира Future Policy Lab, аудитория 118",
    content: `Ошибки дизайна опроса часто остаются незаметными, пока исследование уже не началось. На практикуме мы разберём типичные слабые места на примере нашего исследования муниципальной прозрачности.

## Что рассмотрим

- Формулировки, не подталкивающие респондента к ответу
- Решения по выборке, выдерживающие экспертную проверку
- Предварительную регистрацию инструмента опроса до начала полевой работы

Практикум открыт всем, кто планирует полевое исследование, политическую записку или подготовку к дебатам.`,
  },
  "lab-milestone-first-cohort-research-published": {
    title: "Веха: опубликован первый цикл наших исследовательских работ", excerpt: "Опубликованы шесть оригинальных исследований по образованию, управлению, экономике, технологиям и устойчивому развитию.",
    content: `Мы отмечаем важную веху: первый полный цикл оригинальных исследований опубликован по всем пяти ключевым темам.

## Что доступно

Шесть эмпирических исследований с сопровождающими политическими записками охватывают доступ к сельскому образованию, муниципальную прозрачность, неформальный рынок труда, алгоритмическую подотчётность, адаптацию к нехватке воды и результаты цифровой грамотности.

## Спасибо

Этот цикл — результат месяцев полевой работы, сбора данных и экспертной проверки наших исследователей и студентов. Изучите материалы в разделах «Исследования» и «Политические записки».`,
  },
}

for (const item of meetingsNews) {
  const copy = RU_MEETINGS_COPY[item.slug]
  if (copy) {
    item.title_ru = copy.title
    item.excerpt_ru = copy.excerpt
    item.content_ru = copy.content
    if (copy.location) item.location_ru = copy.location
  }
}

export function getMeetingsNewsBySlug(slug) {
  return meetingsNews.find((m) => m.slug === slug)
}

export function getRelatedMeetingsNews(item, limit = 3) {
  return meetingsNews
    .filter((m) => m.slug !== item.slug && m.type === item.type)
    .slice(0, limit)
}
