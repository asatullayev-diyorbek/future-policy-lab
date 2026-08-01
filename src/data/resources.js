export const RESOURCE_KINDS = [
  { id: "tool", name: "Analytical Tools", name_uz: "Tahliliy vositalar" },
  { id: "dataset", name: "Open Datasets", name_uz: "Ochiq ma'lumotlar bazalari" },
  { id: "reading-list", name: "Reading Lists", name_uz: "O'quv ro'yxatlari" },
]

export const resources = [
  {
    id: 1,
    slug: "policy-brief-writing-template",
    kind: "tool",
    title: "Policy Brief Writing Template",
    title_uz: "Siyosat bayoni yozish shabloni",
    excerpt:
      "A structured template used by our own researchers to turn findings into a decision-ready brief in under a page.",
    excerpt_uz:
      "Bizning tadqiqotchilarimiz topilmalarni bir sahifadan kamroq joyda qarorga tayyor bayonga aylantirish uchun ishlatadigan tuzilgan shablon.",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    published_at: "2026-02-01T09:00:00Z",
    base_views: 410,
    format: "Template (DOCX / Google Docs)",
    format_uz: "Shablon (DOCX / Google Docs)",
    tags: ["policy-writing", "template"],
    content: `This is the same structural template our editorial team uses when converting research findings into a Policy Brief. It forces you to state the decision, the audience, and the recommendation before writing anything else.

## Sections included

- The Decision — one sentence naming exactly what should change
- Who Should Act — the specific role or office, not "policymakers" in general
- Evidence Summary — three bullet points maximum
- Implementation Path — a short numbered sequence

## How to use it

Copy the template, fill each section in order, and don't move to Evidence Summary until you can state the decision in one sentence. If you can't, the research isn't ready to brief yet — that's a useful signal, not a failure.

Members can request feedback on a draft brief built from this template via Contact.`,
    content_uz: `Bu bizning muharrirlar jamoamiz tadqiqot topilmalarini Siyosat bayoniga aylantirishda ishlatadigan bir xil tuzilgan shablon. U sizni boshqa narsa yozishdan oldin qaror, auditoriya va tavsiyani belgilashga majbur qiladi.

## Kiritilgan bo'limlar

- Qaror — nima o'zgarishi kerakligini aniq belgilaydigan bitta jumla
- Kim harakat qilishi kerak — umumiy "siyosatchilar" emas, aniq lavozim yoki idora
- Dalillar xulosasi — ko'pi bilan uchta band
- Amalga oshirish yo'li — qisqa raqamlangan ketma-ketlik

## Qanday foydalanish

Shablonni nusxalang, har bir bo'limni tartib bilan to'ldiring va qarorni bitta jumlada bayon qila olmaguningizcha Dalillar xulosasiga o'tmang. Agar bunday qila olmasangiz, tadqiqot hali bayon uchun tayyor emas — bu foydali signal, muvaffaqiyatsizlik emas.

A'zolar ushbu shablon asosida tuzilgan qoralama bayon bo'yicha Aloqa orqali fikr-mulohaza so'rashi mumkin.`,
  },
  {
    id: 2,
    slug: "root-cause-analysis-framework",
    kind: "tool",
    title: "Root Cause Analysis Framework",
    title_uz: "Ildiz sabab tahlili freymvorki",
    excerpt:
      "A lightweight framework for tracing a policy symptom back to its structural cause before proposing a fix.",
    excerpt_uz:
      "Yechim taklif qilishdan oldin siyosiy alomatni uning tarkibiy sababiga qadar kuzatish uchun yengil freymvork.",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    published_at: "2025-12-05T09:00:00Z",
    base_views: 265,
    format: "Worksheet (PDF)",
    format_uz: "Ish varag'i (PDF)",
    tags: ["methodology", "problem-framing"],
    content: `Most weak policy proposals target a symptom rather than its cause. This worksheet walks through a simple five-whys style structure adapted for policy contexts, where causes are rarely singular.

## The framework

1. State the observed problem precisely, with a number if possible
2. Ask "why" and write every plausible contributing factor, not just the first one
3. For each factor, ask whether it is itself a symptom of something upstream
4. Stop when a factor is something a specific actor can actually change
5. Map which of those factors your proposed intervention actually addresses

## Why it matters

Our own research process uses this before fieldwork begins — it's often what separates a study that finds an actionable lever from one that just re-describes the problem in more detail.`,
    content_uz: `Ko'pchilik zaif siyosiy takliflar sababga emas, alomatga qaratilgan bo'ladi. Ushbu ish varag'i siyosat konteksti uchun moslashtirilgan oddiy "besh marta nega" tuzilishini ko'rsatadi, bunda sabablar kamdan-kam holda yagona bo'ladi.

## Freymvork

1. Kuzatilgan muammoni imkon qadar raqam bilan aniq bayon qiling
2. "Nega" deb so'rang va faqat birinchisini emas, har bir mumkin bo'lgan omilni yozing
3. Har bir omil uchun uning o'zi yuqoridagi biror narsaning alomati emasmi, deb so'rang
4. Omil aniq subyekt haqiqatan ham o'zgartira oladigan narsa bo'lganda to'xtang
5. Taklif qilingan tadbiringiz qaysi omillarga haqiqatan ham ta'sir qilishini xaritalang

## Nega bu muhim

Bizning o'z tadqiqot jarayonimiz dala ishi boshlanishidan oldin buni ishlatadi — bu ko'pincha harakatga asos bo'ladigan vosita topadigan tadqiqotni muammoni batafsilroq qayta tasvirlab beradigan tadqiqotdan ajratib turadi.`,
  },
  {
    id: 3,
    slug: "rural-education-access-dataset",
    kind: "dataset",
    title: "Rural Education Access Dataset (42 Districts)",
    title_uz: "Qishloq ta'limi kirish imkoniyati ma'lumotlar bazasi (42 tuman)",
    excerpt:
      "Anonymized district-level attendance, distance-to-school, and intervention data from our secondary education study.",
    excerpt_uz:
      "O'rta ta'lim tadqiqotimizdan tuman darajasidagi anonim davomat, maktabgacha masofa va tadbir ma'lumotlari.",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    published_at: "2026-03-20T09:00:00Z",
    base_views: 590,
    format: "CSV, 42 rows × 18 columns",
    format_uz: "CSV, 42 qator × 18 ustun",
    tags: ["education", "open-data"],
    related_research_slug: "access-gaps-secondary-education",
    content: `The underlying district-level dataset behind our study "Closing Access Gaps in Secondary Education," released for reuse by other researchers and students.

## What's included

Anonymized attendance rates, average distance-to-school, and intervention assignment (transport subsidy / cash transfer / teacher-retention bonus / control) across 42 districts over four academic years.

## What's not included

Household-level interview data is not included to protect participant anonymity — only district-level aggregates are released.

## Suggested uses

This dataset is a good starting point for students learning difference-in-differences or panel regression methods, since it includes a genuine multi-year comparison-group design rather than a single cross-section.

## Citation

Please cite Future Policy Lab and link back to the original research when using this dataset in published work.`,
    content_uz: `Bizning "O'rta ta'limda kirish imkoniyati tafovutlarini bartaraf etish" tadqiqotimiz ortidagi tuman darajasidagi ma'lumotlar bazasi, boshqa tadqiqotchilar va talabalar qayta ishlatishi uchun e'lon qilingan.

## Nima kiritilgan

42 ta tumanda to'rt o'quv yili davomida anonim davomat ko'rsatkichlari, o'rtacha maktabgacha masofa va tadbir tayinlanishi (transport subsidiyasi / pul o'tkazmasi / o'qituvchini saqlab qolish bonusi / nazorat).

## Nima kiritilmagan

Ishtirokchilar anonimligini himoya qilish uchun oila darajasidagi intervyu ma'lumotlari kiritilmagan — faqat tuman darajasidagi umumiy ko'rsatkichlar e'lon qilingan.

## Tavsiya etilgan foydalanish

Ushbu ma'lumotlar bazasi farqlar-farqi yoki panel regressiya metodlarini o'rganayotgan talabalar uchun yaxshi boshlang'ich nuqta, chunki u yagona ko'ndalang kesim emas, balki haqiqiy ko'p yillik taqqoslash guruhi dizaynini o'z ichiga oladi.

## Iqtibos

Ushbu ma'lumotlar bazasidan chop etilgan ishda foydalanganda, iltimos, Future Policy Lab'ga iqtibos keltiring va original tadqiqotga havola bering.`,
  },
  {
    id: 4,
    slug: "municipal-trust-survey-data",
    kind: "dataset",
    title: "Municipal Trust Survey Data (12 Municipalities)",
    title_uz: "Munitsipal ishonch so'rovi ma'lumotlari (12 munitsipalitet)",
    excerpt:
      "Panel survey responses on institutional trust before and after open-budget portal launches.",
    excerpt_uz:
      "Ochiq byudjet portallari ishga tushirilishidan oldin va keyin institutsional ishonch bo'yicha panel so'rovi javoblari.",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    published_at: "2026-02-15T09:00:00Z",
    base_views: 340,
    format: "CSV, 2,400 rows × 24 columns",
    format_uz: "CSV, 2,400 qator × 24 ustun",
    tags: ["governance", "open-data"],
    related_research_slug: "municipal-transparency-and-trust",
    content: `The panel survey data behind "Municipal Transparency and Public Trust," covering 2,400 residents across 12 municipalities, surveyed before and nine months after portal launch.

## What's included

Standard five-item institutional-trust scale responses, baseline demographics, local news consumption frequency, and a binary flag for portal-plus-outreach vs. portal-only municipalities.

## Suggested uses

Useful for practicing pre/post panel analysis, or for testing whether the outreach effect we found replicates with a different trust scale or subgroup breakdown.

## Citation

Please cite Future Policy Lab and link back to the original research when using this dataset in published work.`,
    content_uz: `"Munitsipal shaffoflik va jamoat ishonchi" ortidagi panel so'rovi ma'lumotlari, 12 ta munitsipalitetdagi 2,400 aholini qamrab oladi, portal ishga tushirilishidan oldin va to'qqiz oy o'tgach so'ralgan.

## Nima kiritilgan

Standart besh bandli institutsional ishonch shkalasi javoblari, boshlang'ich demografiya, mahalliy yangiliklarni iste'mol qilish chastotasi va portal-plyus-targ'ibot vs faqat-portal munitsipalitetlar uchun ikkilik belgi.

## Tavsiya etilgan foydalanish

Oldingi/keyingi panel tahlilini mashq qilish yoki biz topgan targ'ibot ta'siri boshqa ishonch shkalasi yoki kichik guruh taqsimoti bilan takrorlanishini sinash uchun foydali.

## Iqtibos

Ushbu ma'lumotlar bazasidan chop etilgan ishda foydalanganda, iltimos, Future Policy Lab'ga iqtibos keltiring va original tadqiqotga havola bering.`,
  },
  {
    id: 5,
    slug: "getting-started-empirical-policy-research",
    kind: "reading-list",
    title: "Getting Started with Empirical Policy Research",
    title_uz: "Empirik siyosat tadqiqotini boshlash",
    excerpt:
      "A foundational reading list for students new to survey design, causal inference, and structuring a policy-relevant literature review.",
    excerpt_uz:
      "So'rov dizayni, sabab-oqibat tahlili va siyosatga oid adabiyotlar sharhini tuzishga yangi kirib kelgan talabalar uchun asosiy o'quv ro'yxati.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    published_at: "2025-12-20T09:00:00Z",
    base_views: 480,
    tags: ["methodology", "reading-list"],
    readings: [
      { title: "Mostly Harmless Econometrics", author: "Angrist & Pischke" },
      { title: "Survey Research Methods", author: "Floyd J. Fowler Jr." },
      { title: "Causal Inference: The Mixtape", author: "Scott Cunningham" },
      { title: "How to Write a Literature Review That Actually Helps Your Argument", author: "Future Policy Lab guide" },
    ],
    content: `Several members preparing their first independent research project asked for a starting point that doesn't assume a graduate-level statistics background. This is our answer.

## How to use this list

Start with the survey methods reading before touching causal inference — most avoidable errors in student research happen at the design stage, not the analysis stage. The literature review guide is ours; the rest are external texts we return to often.

## Who this is for

Students and young researchers planning fieldwork or a literature-based study for the first time. If you're already comfortable with regression and survey design, our other reading lists will be more useful.`,
    content_uz: `Birinchi mustaqil tadqiqot loyihasini tayyorlayotgan bir qancha a'zolar magistratura darajasidagi statistika bilimini talab qilmaydigan boshlang'ich nuqta so'rashdi. Bu bizning javobimiz.

## Ushbu ro'yxatdan qanday foydalanish

Sabab-oqibat tahliliga o'tishdan oldin so'rov metodlari o'qishidan boshlang — talabalar tadqiqotidagi oldini olish mumkin bo'lgan xatolarning ko'pchiligi tahlil bosqichida emas, dizayn bosqichida sodir bo'ladi. Adabiyotlar sharhi qo'llanmasi bizniki; qolganlari biz tez-tez murojaat qiladigan tashqi matnlar.

## Bu kim uchun

Birinchi marta dala ishi yoki adabiyotga asoslangan tadqiqotni rejalashtirayotgan talabalar va yosh tadqiqotchilar. Agar siz regressiya va so'rov dizayni bilan allaqachon qulay ishlasangiz, bizning boshqa o'quv ro'yxatlarimiz sizga foydaliroq bo'ladi.`,
  },
  {
    id: 6,
    slug: "algorithmic-accountability-reading-list",
    kind: "reading-list",
    title: "Algorithmic Accountability in the Public Sector",
    title_uz: "Davlat sektorida algoritmik javobgarlik",
    excerpt:
      "Readings on due process, disclosure standards, and procurement for automated decision systems in government.",
    excerpt_uz:
      "Davlat organlaridagi avtomatlashtirilgan qaror qabul qilish tizimlari uchun adolatli jarayon, oshkoralik standartlari va xarid bo'yicha o'qishlar.",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    published_at: "2026-01-10T09:00:00Z",
    base_views: 305,
    tags: ["technology", "reading-list"],
    related_research_slug: "algorithmic-decision-making-public-services",
    readings: [
      { title: "Weapons of Math Destruction", author: "Cathy O'Neil" },
      { title: "Automating Inequality", author: "Virginia Eubanks" },
      { title: "Algorithmic Accountability: A Primer", author: "Data & Society Research Institute" },
      { title: "Due Process and Algorithmic Denials", author: "Future Policy Lab research" },
    ],
    content: `Assembled while preparing our audit of automated eligibility systems, this list covers the broader landscape of algorithmic accountability in government service delivery.

## Where to start

If you're new to the topic, start with the Data & Society primer before the two books — it's shorter and frames the vocabulary the books assume you already know.

## Related research

Our own study, "Algorithmic Decision-Making in Public Services," applies these ideas directly to a nine-system audit and proposes a concrete disclosure standard.`,
    content_uz: `Avtomatlashtirilgan huquq berish tizimlari auditimizni tayyorlash jarayonida tuzilgan ushbu ro'yxat davlat xizmatlarini yetkazib berishdagi algoritmik javobgarlikning kengroq manzarasini qamrab oladi.

## Qayerdan boshlash kerak

Agar siz mavzuga yangi bo'lsangiz, ikki kitobdan oldin Data & Society qo'llanmasidan boshlang — u qisqaroq va kitoblar allaqachon bilishingizni taxmin qiladigan atamalarni tushuntiradi.

## Tegishli tadqiqot

Bizning o'z tadqiqotimiz "Davlat xizmatlarida algoritmik qaror qabul qilish" ushbu g'oyalarni to'g'ridan-to'g'ri to'qqiz tizim auditiga qo'llaydi va aniq oshkoralik standartini taklif qiladi.`,
  },
]

export function getResourceBySlug(slug) {
  return resources.find((r) => r.slug === slug)
}

export function getRelatedResources(resource, limit = 3) {
  return resources
    .filter((r) => r.slug !== resource.slug && r.kind === resource.kind)
    .slice(0, limit)
}
