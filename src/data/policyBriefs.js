import { RESEARCH_THEMES } from "./research"

export { RESEARCH_THEMES as BRIEF_THEMES }

export const policyBriefs = [
  {
    id: 1,
    slug: "transport-first-rural-education-budgets",
    title: "Transport-First: Reallocating Rural Education Budgets",
    title_uz: "Avval transport: qishloq ta'lim byudjetlarini qayta taqsimlash",
    excerpt:
      "A two-page brief recommending districts shift funding from blanket cash transfers to targeted transport subsidies.",
    excerpt_uz:
      "Tumanlarga umumiy pul o'tkazmalaridan maqsadli transport subsidiyalariga o'tishni tavsiya qiluvchi ikki sahifali bayon.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher", role_uz: "Bosh tadqiqotchi" },
    published_at: "2026-03-20T09:00:00Z",
    read_time: 4,
    base_views: 640,
    tags: ["education", "budget-policy", "rural-access"],
    related_research_slug: "access-gaps-secondary-education",
    recommendations: [
      "Redirect 15–20% of existing cash-transfer budgets in districts more than 8km from the nearest secondary school toward transport subsidies.",
      "Pilot the reallocation in the ten highest-dropout districts for one academic year before a national rollout.",
      "Track attendance, not just enrollment, as the primary success metric.",
    ],
    recommendations_uz: [
      "Eng yaqin o'rta maktabdan 8 km dan uzoqroqdagi tumanlarda mavjud pul o'tkazmalari byudjetining 15–20% ini transport subsidiyalariga yo'naltirish.",
      "Milliy miqyosda joriy etishdan oldin qayta taqsimlashni eng yuqori tashlab ketish darajasiga ega o'nta tumanda bir o'quv yili davomida sinab ko'rish.",
      "Faqat ro'yxatga olishni emas, balki davomatni asosiy muvaffaqiyat mezoni sifatida kuzatish.",
    ],
    content: `Districts spend heavily on cash-transfer programs intended to keep students enrolled, but our companion research found that in distance-constrained districts, transport — not household cash — is the binding constraint on attendance.

## The decision

Education ministries facing flat or shrinking budgets do not need new funding to act on this finding. They need to reallocate existing cash-transfer funds toward transport subsidies in the specific districts where distance, not income, is the primary barrier.

## Who should act

District education officers and ministry budget planners in districts more than 8km from the nearest secondary school. This does not apply uniformly — in urban and peri-urban districts, cash transfers remain the stronger lever and should not be redirected.

## Implementation path

1. Identify districts by average distance-to-school using existing enrollment records.
2. Reallocate a fixed share of the cash-transfer line item to a transport subsidy pilot.
3. Measure attendance at 90 days and again at the end of the academic year.

The full empirical basis for this recommendation is available in our Research section.`,
    content_uz: `Tumanlar o'quvchilarni maktabda saqlab qolishga qaratilgan pul o'tkazmalari dasturlariga katta mablag' sarflaydi, ammo bizning tegishli tadqiqotimiz masofa cheklangan tumanlarda davomatning asosiy to'sig'i oila puli emas, balki transport ekanligini aniqladi.

## Qaror

Byudjeti o'zgarmagan yoki qisqarayotgan ta'lim vazirliklari bu topilma bo'yicha harakat qilish uchun yangi mablag'ga muhtoj emas. Ular mavjud pul o'tkazmalari mablag'larini masofa, daromad emas, asosiy to'siq bo'lgan aniq tumanlarda transport subsidiyalariga qayta yo'naltirishi kerak.

## Kim harakat qilishi kerak

Eng yaqin o'rta maktabdan 8 km dan uzoqroqdagi tumanlardagi tuman ta'lim mutasaddilari va vazirlik byudjet rejalashtiruvchilari. Bu barcha joyda bir xil qo'llanilmaydi — shahar va shaharga yaqin tumanlarda pul o'tkazmalari kuchliroq vosita bo'lib qolmoqda va qayta yo'naltirilmasligi kerak.

## Amalga oshirish yo'li

1. Mavjud ro'yxatga olish yozuvlaridan foydalanib, o'rtacha maktabgacha masofa bo'yicha tumanlarni aniqlash.
2. Pul o'tkazmalari moddasining belgilangan qismini transport subsidiyasi piloti uchun qayta taqsimlash.
3. Davomatni 90 kunda va o'quv yili oxirida qayta o'lchash.

Ushbu tavsiyaning to'liq empirik asosi Tadqiqotlar bo'limida mavjud.`,
  },
  {
    id: 2,
    slug: "plain-language-budget-disclosure-standard",
    title: "A Plain-Language Standard for Municipal Budget Portals",
    title_uz: "Munitsipal byudjet portallari uchun oddiy til standarti",
    excerpt:
      "Recommending a minimum outreach requirement to accompany every open-budget transparency portal.",
    excerpt_uz:
      "Har bir ochiq byudjet shaffoflik portali uchun minimal targ'ibot talabini tavsiya qilish.",
    theme: "governance",
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow", role_uz: "Boshqaruv bo'yicha tadqiqotchi" },
    published_at: "2026-02-10T09:00:00Z",
    read_time: 3,
    base_views: 410,
    tags: ["governance", "transparency", "civic-tech"],
    related_research_slug: "municipal-transparency-and-trust",
    recommendations: [
      "Require every new budget portal to ship with a plain-language quarterly spending summary.",
      "Fund at least two outreach touchpoints per year — a town hall or SMS digest — alongside the portal.",
      "Evaluate portals on trust and comprehension metrics, not just page views.",
    ],
    recommendations_uz: [
      "Har bir yangi byudjet portali oddiy tildagi choraklik xarajat xulosasi bilan birga chiqishini talab qilish.",
      "Portal bilan birga yiliga kamida ikkita targ'ibot nuqtasini — yig'ilish yoki SMS xabarnomani — moliyalashtirish.",
      "Portallarni faqat sahifa ko'rishlar emas, balki ishonch va tushunish mezonlari bo'yicha baholash.",
    ],
    content: `Open-budget portals are frequently procured and launched as standalone technical products. Our research found that portals alone do not move public trust — outreach does.

## The decision

Municipal governments should stop treating budget portals as a complete transparency solution and start budgeting for the outreach layer from day one, not as an afterthought once the portal underperforms.

## Who should act

Municipal finance departments and civic-tech vendors bidding on transparency contracts. Procurement documents should explicitly require an outreach component, not just a technical deliverable.

## Implementation path

1. Add a plain-language quarterly summary requirement to portal procurement specifications.
2. Budget for at least two outreach touchpoints annually, sized to municipal population.
3. Track trust and comprehension via short resident surveys, not portal analytics alone.`,
    content_uz: `Ochiq byudjet portallari ko'pincha alohida texnik mahsulot sifatida sotib olinadi va ishga tushiriladi. Bizning tadqiqotimiz faqat portalning o'zi jamoat ishonchini oshirmasligini aniqladi — buni targ'ibot amalga oshiradi.

## Qaror

Munitsipal hukumatlar byudjet portallarini to'liq shaffoflik yechimi sifatida ko'rishni to'xtatishi va targ'ibot qatlamini portal past samara ko'rsatgandan keyin emas, balki birinchi kundan moliyalashtirishni boshlashi kerak.

## Kim harakat qilishi kerak

Munitsipal moliya bo'limlari va shaffoflik shartnomalariga tender e'lon qiluvchi fuqarolik texnologiyasi yetkazib beruvchilari. Xarid hujjatlari faqat texnik natija emas, balki aniq targ'ibot komponentini talab qilishi kerak.

## Amalga oshirish yo'li

1. Portal xaridi spetsifikatsiyalariga oddiy tildagi choraklik xulosa talabini qo'shish.
2. Munitsipalitet aholisi hajmiga mos ravishda yiliga kamida ikkita targ'ibot nuqtasi uchun byudjet ajratish.
3. Faqat portal analitikasi emas, balki qisqa aholi so'rovlari orqali ishonch va tushunishni kuzatish.`,
  },
  {
    id: 3,
    slug: "portable-benefits-for-informal-workers",
    title: "Portable Benefits Over Formalization Mandates",
    title_uz: "Rasmiylashtirish talablari o'rniga ko'chma imtiyozlar",
    excerpt:
      "Why labor policy should decouple social protection from formal employment status for workers under 25.",
    excerpt_uz:
      "Nega mehnat siyosati 25 yoshgacha bo'lgan ishchilar uchun ijtimoiy himoyani rasmiy bandlik maqomidan ajratishi kerak.",
    theme: "economic-development",
    cover: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&q=80",
    author: { name: "Sardor Tashkentov", role: "Economic Policy Analyst", role_uz: "Iqtisodiy siyosat tahlilchisi" },
    published_at: "2026-01-25T09:00:00Z",
    read_time: 5,
    base_views: 720,
    tags: ["economic-development", "labor-policy", "informal-sector"],
    related_research_slug: "informal-sector-and-youth-employment",
    recommendations: [
      "Pilot a portable benefits scheme covering health and retirement contributions independent of employer status.",
      "Pair portable benefits with a skills certification that travels across employers and sectors.",
      "Avoid formalization mandates as the primary policy lever for workers under 25.",
    ],
    recommendations_uz: [
      "Ish beruvchi maqomidan qat'i nazar tibbiy sug'urta va pensiya badallarini qamrab oluvchi ko'chma imtiyozlar sxemasini sinab ko'rish.",
      "Ko'chma imtiyozlarni ish beruvchilar va sohalar bo'ylab ko'chib yuradigan ko'nikmalar sertifikati bilan birlashtirish.",
      "25 yoshgacha bo'lgan ishchilar uchun rasmiylashtirish talablarini asosiy siyosiy vosita sifatida qo'llashdan saqlanish.",
    ],
    content: `Formalization mandates continue to underperform among younger informal workers, largely because the transition costs outweigh the benefits for workers without dependents. Our research points to a more direct lever.

## The decision

Rather than continuing to fund formalization incentive programs with weak uptake, labor ministries should pilot portable benefits — health and retirement contributions that follow the worker, not the employer.

## Who should act

Labor ministries and social insurance funds designing the next cycle of youth employment programs.

## Implementation path

1. Design a portable contribution mechanism that does not require formal employer registration.
2. Pair it with a portable skills certification recognized across at least three sectors.
3. Pilot in two regions with high informal youth employment before wider rollout.`,
    content_uz: `Rasmiylashtirish talablari yosh norasmiy ishchilar orasida past samara ko'rsatishda davom etmoqda, buning asosiy sababi o'tish xarajatlari qaramog'idagi shaxslari yo'q ishchilar uchun foydadan ustun kelishidir. Bizning tadqiqotimiz to'g'ridan-to'g'riroq vositani ko'rsatadi.

## Qaror

Mehnat vazirliklari past qamrovga ega rasmiylashtirish rag'batlantirish dasturlarini moliyalashtirishni davom ettirish o'rniga, ko'chma imtiyozlarni — ish beruvchi emas, balki ishchining o'zini kuzatib boradigan tibbiy sug'urta va pensiya badallarini sinab ko'rishi kerak.

## Kim harakat qilishi kerak

Yoshlar bandligi dasturlarining keyingi bosqichini rejalashtirayotgan mehnat vazirliklari va ijtimoiy sug'urta fondlari.

## Amalga oshirish yo'li

1. Rasmiy ish beruvchi ro'yxatidan o'tishni talab qilmaydigan ko'chma badal mexanizmini ishlab chiqish.
2. Uni kamida uchta sohada tan olinadigan ko'chma ko'nikmalar sertifikati bilan birlashtirish.
3. Keng miqyosda joriy etishdan oldin norasmiy yoshlar bandligi yuqori bo'lgan ikkita hududda sinab ko'rish.`,
  },
  {
    id: 4,
    slug: "minimum-disclosure-standard-automated-denials",
    title: "A Minimum Disclosure Standard for Automated Denials",
    title_uz: "Avtomatik rad etishlar uchun minimal oshkoralik standarti",
    excerpt:
      "Any automated benefit denial should come with the top three contributing factors and a reachable human reviewer.",
    excerpt_uz:
      "Har qanday avtomatik imtiyoz rad etilishi eng muhim uchta omil va murojaat qilinishi mumkin bo'lgan inson tekshiruvchisi bilan birga kelishi kerak.",
    theme: "technology",
    cover: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1200&q=80",
    author: { name: "Malika Islomova", role: "Technology Policy Researcher", role_uz: "Texnologiya siyosati tadqiqotchisi" },
    published_at: "2025-12-15T09:00:00Z",
    read_time: 4,
    base_views: 980,
    tags: ["technology", "algorithmic-accountability", "due-process"],
    related_research_slug: "algorithmic-decision-making-public-services",
    recommendations: [
      "Mandate that every automated denial disclose the top three contributing factors in plain language.",
      "Guarantee a human reviewer reachable within a defined response window for every appeal.",
      "Require this standard in future public-sector procurement contracts for eligibility systems.",
    ],
    recommendations_uz: [
      "Har qanday avtomatik rad etish oddiy tilda eng muhim uchta omilni oshkor qilishini majburiy qilish.",
      "Har bir apellyatsiya uchun belgilangan javob muddati ichida murojaat qilinishi mumkin bo'lgan inson tekshiruvchisini kafolatlash.",
      "Bu standartni huquq berish tizimlari uchun kelgusi davlat xaridi shartnomalarida talab qilish.",
    ],
    content: `Automated eligibility systems increasingly determine access to public benefits, but our audit of nine systems found that most give applicants no actionable basis for appeal.

## The decision

Agencies operating automated eligibility systems should adopt a minimum disclosure standard now, before more systems are procured under contracts that make retrofitting disclosure difficult.

## Who should act

Agency IT procurement officers and legal teams reviewing vendor contracts for eligibility and benefits systems.

## Implementation path

1. Add a disclosure requirement to procurement specifications for any new automated eligibility system.
2. For existing systems, require vendors to add plain-language factor disclosure to denial notices.
3. Establish a defined response window — we recommend 5 business days — for human review requests.

This does not require exposing proprietary model internals, only translating outputs into information applicants can act on.`,
    content_uz: `Avtomatlashtirilgan huquq berish tizimlari tobora ko'proq davlat imtiyozlariga kirishni belgilamoqda, ammo to'qqiz tizim bo'yicha bizning auditimiz ko'pchiligi ariza beruvchilarga apellyatsiya uchun hech qanday amaliy asos bermasligini aniqladi.

## Qaror

Avtomatlashtirilgan huquq berish tizimlarini boshqaradigan idoralar ko'proq tizimlar oshkoralikni keyinchalik qo'shishni qiyinlashtiradigan shartnomalar asosida xarid qilinishidan oldin, hozir minimal oshkoralik standartini qabul qilishi kerak.

## Kim harakat qilishi kerak

Idoraning AT xaridi mutasaddilari va huquq berish hamda imtiyoz tizimlari bo'yicha yetkazib beruvchi shartnomalarini ko'rib chiqadigan yuridik guruhlar.

## Amalga oshirish yo'li

1. Har qanday yangi avtomatlashtirilgan huquq berish tizimi uchun xarid spetsifikatsiyalariga oshkoralik talabini qo'shish.
2. Mavjud tizimlar uchun yetkazib beruvchilardan rad etish bildirishnomalariga oddiy tildagi omil oshkoraligini qo'shishni talab qilish.
3. Inson tekshiruvi so'rovlari uchun belgilangan javob muddatini — biz 5 ish kunini tavsiya qilamiz — o'rnatish.

Bu mulkiy model ichki tuzilishini ochishni talab qilmaydi, faqat natijalarni ariza beruvchilar harakat qila oladigan ma'lumotga aylantirishni talab qiladi.`,
  },
  {
    id: 5,
    slug: "fund-community-water-allocation-committees",
    title: "Fund Community Water Allocation Committees by Default",
    title_uz: "Jamoat suv taqsimoti qo'mitalarini sukut bo'yicha moliyalashtirish",
    excerpt:
      "Water infrastructure investment should be paired, not followed, by a funded local allocation body.",
    excerpt_uz:
      "Suv infratuzilmasi sarmoyasi moliyalashtirilgan mahalliy taqsimot organi bilan birga bo'lishi, undan keyin emas.",
    theme: "sustainability",
    cover: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher", role_uz: "Bosh tadqiqotchi" },
    published_at: "2025-11-28T09:00:00Z",
    read_time: 4,
    base_views: 505,
    tags: ["sustainability", "water-policy", "community-governance"],
    related_research_slug: "water-scarcity-adaptation-strategies",
    recommendations: [
      "Require every new water infrastructure project to include a funded, empowered local allocation committee.",
      "Set technical usage limits centrally, but let allocation committees set local rules within those limits.",
      "Track water availability across at least three dry seasons post-investment, not just at project completion.",
    ],
    recommendations_uz: [
      "Har bir yangi suv infratuzilmasi loyihasida moliyalashtirilgan, vakolatli mahalliy taqsimot qo'mitasi bo'lishini talab qilish.",
      "Texnik foydalanish chegaralarini markazlashtirilgan holda belgilash, ammo taqsimot qo'mitalariga shu chegaralar doirasida mahalliy qoidalarni belgilashga ruxsat berish.",
      "Faqat loyiha yakunida emas, balki sarmoyadan keyin kamida uch quruq mavsum davomida suv mavjudligini kuzatish.",
    ],
    content: `Infrastructure-only investment in drought-prone districts shows gains that erode within two dry seasons. Districts with community allocation committees held those gains through three seasons in our study.

## The decision

Water authorities should stop funding infrastructure as a standalone capital project and require a funded allocation committee as a default component of every investment.

## Who should act

National and regional water authorities designing the next round of drought-resilience infrastructure funding.

## Implementation path

1. Add allocation-committee funding as a line item in every new water infrastructure budget, not an optional add-on.
2. Set technical usage limits centrally; delegate local rule-setting to the committee within those limits.
3. Track availability annually for at least three seasons post-investment to catch reversion early.`,
    content_uz: `Qurg'oqchilikka moyil tumanlarda faqat infratuzilmaga sarmoya kiritish ikki quruq mavsum ichida yo'qoladigan yutuqlarni ko'rsatadi. Bizning tadqiqotimizda jamoat taqsimot qo'mitalariga ega tumanlar bu yutuqlarni uch mavsum davomida saqlab qoldi.

## Qaror

Suv organlari infratuzilmani alohida kapital loyiha sifatida moliyalashtirishni to'xtatishi va har bir sarmoyaning sukut bo'yicha komponenti sifatida moliyalashtirilgan taqsimot qo'mitasini talab qilishi kerak.

## Kim harakat qilishi kerak

Qurg'oqchilikka chidamlilik infratuzilmasi moliyalashtirishning keyingi bosqichini rejalashtirayotgan milliy va mintaqaviy suv organlari.

## Amalga oshirish yo'li

1. Har bir yangi suv infratuzilmasi byudjetida taqsimot qo'mitasi moliyalashtirishini ixtiyoriy qo'shimcha emas, balki alohida modda sifatida qo'shish.
2. Texnik foydalanish chegaralarini markazlashtirilgan holda belgilash; mahalliy qoida belgilashni shu chegaralar doirasida qo'mitaga topshirish.
3. Erta qaytishni aniqlash uchun sarmoyadan keyin kamida uch mavsum davomida mavjudlikni har yili kuzatish.`,
  },
  {
    id: 6,
    slug: "practical-assessment-digital-literacy-funding",
    title: "Fund Digital Literacy on Practical Assessment, Not Confidence",
    title_uz: "Raqamli savodxonlikni ishonch emas, amaliy baholash asosida moliyalashtirish",
    excerpt:
      "Recommending a shift in curriculum evaluation metrics before the next funding cycle is approved.",
    excerpt_uz:
      "Keyingi moliyalashtirish bosqichi tasdiqlanishidan oldin o'quv dasturini baholash mezonlarini o'zgartirishni tavsiya qilish.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow", role_uz: "Boshqaruv bo'yicha tadqiqotchi" },
    published_at: "2025-10-15T09:00:00Z",
    read_time: 3,
    base_views: 360,
    tags: ["education", "digital-literacy", "program-evaluation"],
    related_research_slug: "digital-literacy-curriculum-outcomes",
    recommendations: [
      "Replace self-reported confidence surveys with practical skills assessment as the primary curriculum metric.",
      "Expand technical-skills modules in the next curriculum phase, which showed the largest competence gap.",
      "Require the practical assessment result, not the confidence score, in the next funding renewal application.",
    ],
    recommendations_uz: [
      "O'z-o'zini baholash so'rovnomalarini asosiy o'quv dasturi mezoni sifatida amaliy ko'nikmalar baholovi bilan almashtirish.",
      "Eng katta ko'nikma tafovutini ko'rsatgan keyingi o'quv dasturi bosqichida texnik ko'nikma modullarini kengaytirish.",
      "Keyingi moliyalashtirishni yangilash arizasida ishonch ballini emas, balki amaliy baholash natijasini talab qilish.",
    ],
    content: `Confidence in digital skills rose sharply after curriculum rollout, but measured competence rose only modestly — and the gap is concentrated in technical tasks, not source evaluation.

## The decision

Ministries evaluating the next funding cycle for this curriculum should require practical assessment results, not confidence survey data, in renewal applications.

## Who should act

Curriculum funders and the ministry unit responsible for approving the program's second phase.

## Implementation path

1. Adopt the practical skills assessment as the required metric for the next funding renewal.
2. Expand technical-skills modules, which showed the largest gap between confidence and competence.
3. Retain the confidence survey only as a secondary, supplementary measure.`,
    content_uz: `O'quv dasturi joriy etilgandan so'ng raqamli ko'nikmalarga ishonch keskin oshdi, ammo o'lchangan ko'nikma faqat biroz oshdi — va tafovut manba baholashda emas, texnik vazifalarda to'plangan.

## Qaror

Ushbu o'quv dasturining keyingi moliyalashtirish bosqichini baholayotgan vazirliklar yangilash arizalarida ishonch so'rovnomasi ma'lumotlarini emas, balki amaliy baholash natijalarini talab qilishi kerak.

## Kim harakat qilishi kerak

O'quv dasturi moliyachilar va dasturning ikkinchi bosqichini tasdiqlash uchun javobgar vazirlik bo'linmasi.

## Amalga oshirish yo'li

1. Keyingi moliyalashtirishni yangilash uchun amaliy ko'nikmalar baholovini talab qilinadigan mezon sifatida qabul qilish.
2. Ishonch va ko'nikma o'rtasida eng katta tafovutni ko'rsatgan texnik ko'nikma modullarini kengaytirish.
3. Ishonch so'rovnomasini faqat ikkinchi darajali, qo'shimcha o'lchov sifatida saqlab qolish.`,
  },
]

export function getBriefBySlug(slug) {
  return policyBriefs.find((b) => b.slug === slug)
}

export function getRelatedBriefs(brief, limit = 3) {
  return policyBriefs
    .filter((b) => b.slug !== brief.slug && b.theme === brief.theme)
    .slice(0, limit)
}
