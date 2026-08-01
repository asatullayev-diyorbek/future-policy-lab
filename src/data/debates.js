import { RESEARCH_THEMES } from "./research"

export { RESEARCH_THEMES as DEBATE_THEMES }

export const debates = [
  {
    id: 1,
    slug: "should-cash-transfers-be-conditional",
    motion: "Should education cash transfers be conditional on attendance?",
    motion_uz: "Ta'lim uchun pul o'tkazmalari davomatga bog'liq bo'lishi kerakmi?",
    excerpt:
      "Conditional transfers promise accountability, but do they end up excluding the households that need support most?",
    excerpt_uz:
      "Shartli o'tkazmalar javobgarlikni va'da qiladi, ammo ular eng ko'p yordamga muhtoj oilalarni chetlab o'tmaydimi?",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    status: "open",
    published_at: "2026-03-25T09:00:00Z",
    participants: 34,
    base_views: 410,
    tags: ["education", "social-policy"],
    forPosition: {
      author: "Dilnoza Karimova",
      summary:
        "Conditionality is what makes the transfer a policy instrument rather than a handout. Without an attendance link, funds can be absorbed into general household spending with no guarantee they improve the outcome they're meant to target. Conditions also give schools a shared incentive to track and support at-risk students, creating a feedback loop that unconditional transfers don't.",
      summary_uz:
        "Shartlilik pul o'tkazmasini oddiy yordam emas, siyosiy vosita qiladi. Davomat bilan bog'liqlik bo'lmasa, mablag'lar umumiy oila xarajatlariga singib ketishi mumkin va bu maqsad natijani yaxshilashiga hech qanday kafolat bermaydi. Shartlar, shuningdek, maktablarga xavf ostidagi o'quvchilarni kuzatish va qo'llab-quvvatlash uchun umumiy rag'bat beradi, bu esa shartsiz o'tkazmalarda mavjud bo'lmagan teskari aloqa hosil qiladi.",
    },
    againstPosition: {
      author: "Otabek Yorqinov",
      summary:
        "Conditions punish the households least able to meet them — a sick child, a broken bus route, a harvest season that pulls kids into fieldwork. The administrative cost of monitoring compliance often exceeds any behavioral gain, and evidence from several pilot programs shows unconditional transfers produce nearly identical attendance effects at a fraction of the overhead.",
      summary_uz:
        "Shartlar ularga eng kam rioya qila oladigan oilalarni jazolaydi — kasal bola, buzilgan avtobus yo'nalishi, bolalarni dala ishlariga tortadigan hosil yig'ish mavsumi. Rioya etilishini nazorat qilishning ma'muriy xarajati ko'pincha xatti-harakatdagi har qanday yutuqdan oshib ketadi, va bir qancha pilot dasturlar dalillari shartsiz o'tkazmalar deyarli bir xil davomat natijasini ancha kam xarajat bilan berishini ko'rsatadi.",
    },
  },
  {
    id: 2,
    slug: "should-ai-eligibility-systems-be-banned",
    motion: "Should fully automated eligibility decisions be banned in social services?",
    motion_uz: "Ijtimoiy xizmatlarda to'liq avtomatlashtirilgan huquq berish qarorlari taqiqlanishi kerakmi?",
    excerpt:
      "A hard ban would guarantee human review, but might also slow down benefits that families need urgently.",
    excerpt_uz:
      "Qat'iy taqiq inson tekshiruvini kafolatlaydi, ammo oilalarga zudlik bilan kerak bo'lgan imtiyozlarni ham sekinlashtirishi mumkin.",
    theme: "technology",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    status: "open",
    published_at: "2026-02-18T09:00:00Z",
    participants: 51,
    base_views: 890,
    tags: ["technology", "due-process", "social-services"],
    forPosition: {
      author: "Malika Islomova",
      summary:
        "When a system can deny food assistance or housing support with no human in the loop, the due-process cost is too high to accept for efficiency gains alone. A ban forces agencies to build the human review capacity that should have existed from the start, and closes the accountability gap our own research documented.",
      summary_uz:
        "Tizim inson ishtirokisiz oziq-ovqat yordami yoki uy-joy qo'llab-quvvatlashini rad eta olganda, adolatli jarayon xarajati faqat samaradorlik yutug'i uchun qabul qilib bo'lmaydigan darajada yuqori bo'ladi. Taqiq idoralarni boshidanoq mavjud bo'lishi kerak bo'lgan inson tekshiruvi salohiyatini yaratishga majbur qiladi va bizning tadqiqotimiz hujjatlashtirgan javobgarlik bo'shlig'ini yopadi.",
    },
    againstPosition: {
      author: "Jasur Nematov",
      summary:
        "A blanket ban conflates good and bad implementations. Some automated systems process routine renewals faster and more consistently than overworked caseworkers, freeing human reviewers for genuinely contested cases. The fix is a disclosure and appeal standard, not eliminating automation — which would slow down benefits for the majority of straightforward, uncontested applications.",
      summary_uz:
        "Umumiy taqiq yaxshi va yomon amalga oshirishlarni bir-biriga aralashtirib yuboradi. Ba'zi avtomatlashtirilgan tizimlar oddiy yangilashlarni ortiqcha yuklangan xodimlarga qaraganda tezroq va izchilroq qayta ishlaydi, bu esa inson tekshiruvchilarini haqiqiy bahsli holatlar uchun bo'shatadi. Yechim avtomatlashtirishni yo'q qilish emas — bu oddiy, bahssiz arizalarning ko'pchiligi uchun imtiyozlarni sekinlashtiradi — balki oshkoralik va apellyatsiya standartidir.",
    },
  },
  {
    id: 3,
    slug: "should-informal-work-be-formalized",
    motion: "Should governments actively push informal workers toward formal employment?",
    motion_uz: "Hukumatlar norasmiy ishchilarni rasmiy bandlikka faol ravishda yo'naltirishi kerakmi?",
    excerpt:
      "Formalization promises legal protection and tax revenue, but may not match how young workers actually want to work.",
    excerpt_uz:
      "Rasmiylashtirish huquqiy himoya va soliq daromadini va'da qiladi, ammo bu yosh ishchilarning haqiqatan ham qanday ishlashni xohlashiga mos kelmasligi mumkin.",
    theme: "economic-development",
    cover: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    status: "open",
    published_at: "2026-01-30T09:00:00Z",
    participants: 28,
    base_views: 560,
    tags: ["economic-development", "labor-policy"],
    forPosition: {
      author: "Sardor Tashkentov",
      summary:
        "Formal employment comes with legal protections informal work simply doesn't offer — minimum wage enforcement, workplace safety standards, recourse against non-payment. Treating informality as a permanent, acceptable state abandons workers to precarity that formal status was designed to prevent.",
      summary_uz:
        "Rasmiy bandlik norasmiy mehnat taklif qila olmaydigan huquqiy himoyani beradi — minimal ish haqini ta'minlash, mehnat xavfsizligi standartlari, to'lanmagan mehnat uchun himoya vositalari. Norasmiylikni doimiy, maqbul holat sifatida ko'rish ishchilarni rasmiy maqom oldini olish uchun mo'ljallangan beqarorlikka tashlab qo'yadi.",
    },
    againstPosition: {
      author: "Gulnora Saidova",
      summary:
        "Formalization mandates assume workers are choosing informality out of ignorance rather than because the transition costs genuinely outweigh the benefits for their situation. Portable benefits achieve the protection goal without forcing a transition many workers rationally decline — the mandate solves a problem that a lighter-touch policy solves better.",
      summary_uz:
        "Rasmiylashtirish talablari ishchilar norasmiylikni bilmasdan tanlayapti deb taxmin qiladi, holbuki o'tish xarajatlari ularning vaziyati uchun foydadan haqiqatan ham ustun keladi. Ko'chma imtiyozlar ko'plab ishchilar oqilona rad etadigan o'tishni majburlamasdan himoya maqsadiga erishadi — talab yengilroq siyosat yaxshiroq hal qiladigan muammoni hal qiladi.",
    },
  },
  {
    id: 4,
    slug: "should-water-allocation-be-locally-governed",
    motion: "Should local committees, not central authorities, control water allocation?",
    motion_uz: "Suv taqsimotini markaziy organlar emas, mahalliy qo'mitalar boshqarishi kerakmi?",
    excerpt:
      "Local control adapts to context, but risks inconsistency and capture by whoever shows up to the meeting.",
    excerpt_uz:
      "Mahalliy nazorat vaziyatga moslashadi, ammo izchillik yo'qolishi va yig'ilishga kelganlar tomonidan egallab olinishi xavfini tug'diradi.",
    theme: "sustainability",
    cover: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&q=80",
    status: "closed",
    published_at: "2025-12-10T09:00:00Z",
    participants: 22,
    base_views: 340,
    tags: ["sustainability", "governance", "water-policy"],
    forPosition: {
      author: "Nodira Yusupova",
      summary:
        "Central rules can't account for local seasonal variation, crop cycles, or household composition the way a local committee can. Our research found local allocation committees sustained availability gains across three dry seasons where infrastructure-only investment reverted — the coordination function has to happen at the local level to work at all.",
      summary_uz:
        "Markaziy qoidalar mahalliy mavsumiy o'zgarishlar, ekin sikllari yoki oila tarkibini mahalliy qo'mita kabi hisobga ola olmaydi. Bizning tadqiqotimiz mahalliy taqsimot qo'mitalari uch quruq mavsum davomida mavjudlik yutug'ini saqlab qolganini aniqladi, holbuki faqat infratuzilma sarmoyasi bu davrda yo'qolgan — muvofiqlashtirish funksiyasi ishlashi uchun mahalliy darajada bo'lishi shart.",
    },
    againstPosition: {
      author: "Farrukh Ergashev",
      summary:
        "Local committees are vulnerable to capture by whichever households are most present and vocal, at the expense of those who can't attend meetings — often the most water-insecure. Central oversight with local input is a safer default than full local control, which trades one coordination problem for a legitimacy problem.",
      summary_uz:
        "Mahalliy qo'mitalar eng faol va ovozi baland oilalar tomonidan egallab olinishga moyil, bu esa yig'ilishlarga qatnasha olmaydigan — ko'pincha eng suv tanqisligini his qiladigan — oilalar hisobiga bo'ladi. Mahalliy fikr bilan markaziy nazorat to'liq mahalliy nazoratdan ko'ra xavfsizroq standart, chunki to'liq mahalliy nazorat bir muvofiqlashtirish muammosini qonuniylik muammosiga almashtiradi.",
    },
  },
  {
    id: 5,
    slug: "should-budget-portals-be-mandatory",
    motion: "Should every municipality be legally required to publish an open-budget portal?",
    motion_uz: "Har bir munitsipalitet qonun bo'yicha ochiq byudjet portalini e'lon qilishi shart bo'lishi kerakmi?",
    excerpt:
      "Mandates guarantee baseline access to spending data, but a portal without outreach may be transparency theater.",
    excerpt_uz:
      "Talablar xarajat ma'lumotlariga asosiy kirishni kafolatlaydi, ammo targ'ibotsiz portal shaffoflik teatriga aylanishi mumkin.",
    theme: "governance",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    status: "open",
    published_at: "2025-11-15T09:00:00Z",
    participants: 19,
    base_views: 275,
    tags: ["governance", "transparency"],
    forPosition: {
      author: "Aziz Rakhimov",
      summary:
        "A legal mandate sets a floor below which no municipality can fall, regardless of local political will to be transparent. Even an imperfect portal is a starting point residents and journalists can build on — the alternative is leaving transparency entirely optional, which our research shows correlates with lower baseline trust.",
      summary_uz:
        "Qonuniy talab mahalliy siyosiy irodadan qat'i nazar, hech bir munitsipalitet undan pastga tusha olmaydigan chegara belgilaydi. Nomukammal portal ham aholi va jurnalistlar rivojlantira oladigan boshlang'ich nuqta — muqobil variant shaffoflikni butunlay ixtiyoriy qoldirish bo'lib, bizning tadqiqotimiz bu past boshlang'ich ishonch bilan bog'liqligini ko'rsatadi.",
    },
    againstPosition: {
      author: "Kamola Rustamova",
      summary:
        "Unfunded mandates produce compliance-only portals — technically present, practically useless, with no outreach budget attached. A mandate without a funded outreach requirement risks becoming a checkbox exercise that actually undermines the case for transparency investment when it visibly fails to move public trust.",
      summary_uz:
        "Moliyalashtirilmagan talablar faqat rioya qilish uchun portallar yaratadi — texnik jihatdan mavjud, amalda foydasiz, targ'ibot byudjetisiz. Moliyalashtirilmagan targ'ibot talabisiz talab shunchaki belgi qo'yish mashqiga aylanish xavfini tug'diradi, bu esa jamoat ishonchini oshirishda aniq muvaffaqiyatsizlikka uchraganda shaffoflik sarmoyasi uchun asosni zaiflashtiradi.",
    },
  },
  {
    id: 6,
    slug: "should-digital-literacy-be-mandatory-curriculum",
    motion: "Should digital literacy be a mandatory, graded part of the national curriculum?",
    motion_uz: "Raqamli savodxonlik milliy o'quv dasturining majburiy, baholanadigan qismi bo'lishi kerakmi?",
    excerpt:
      "Mandatory status guarantees instructional time, but grading raises questions about equitable access to devices at home.",
    excerpt_uz:
      "Majburiy maqom o'qitish vaqtini kafolatlaydi, ammo baholash uyda qurilmalarga adolatli kirish haqida savollar tug'diradi.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    status: "open",
    published_at: "2025-10-22T09:00:00Z",
    participants: 41,
    base_views: 605,
    tags: ["education", "digital-literacy"],
    forPosition: {
      author: "Aziz Rakhimov",
      summary:
        "Without mandatory, graded status, digital literacy gets deprioritized against subjects with established exams and clear stakes for students and teachers. Making it graded is what guarantees the instructional time our research found is necessary to close the gap between confidence and actual competence.",
      summary_uz:
        "Majburiy, baholanadigan maqomsiz raqamli savodxonlik o'rnatilgan imtihonlari va o'quvchilar hamda o'qituvchilar uchun aniq ahamiyati bo'lgan fanlarga nisbatan orqada qoladi. Uni baholanadigan qilish bizning tadqiqotimiz ishonch va haqiqiy ko'nikma o'rtasidagi tafovutni yopish uchun zarur deb topgan o'qitish vaqtini kafolatlaydi.",
    },
    againstPosition: {
      author: "Zarina Abdullayeva",
      summary:
        "Grading a subject that depends heavily on home device access effectively grades household income. Students without a computer at home will be assessed on skills they had far less opportunity to practice, widening the very inequities digital literacy programs are meant to close. Mandatory instruction, ungraded, achieves the access goal without the equity cost.",
      summary_uz:
        "Uyda qurilmaga kirishga qattiq bog'liq bo'lgan fanni baholash aslida oila daromadini baholaydi. Uyda kompyuteri yo'q o'quvchilar mashq qilish imkoniyati ancha kam bo'lgan ko'nikmalar bo'yicha baholanadi, bu esa raqamli savodxonlik dasturlari yopishga mo'ljallangan tengsizliklarni kengaytiradi. Majburiy, ammo baholanmaydigan o'qitish adolat xarajatisiz kirish maqsadiga erishadi.",
    },
  },
]

export function getDebateBySlug(slug) {
  return debates.find((d) => d.slug === slug)
}

export function getRelatedDebates(debate, limit = 3) {
  return debates
    .filter((d) => d.slug !== debate.slug && d.theme === debate.theme)
    .slice(0, limit)
}
