export const RESEARCH_THEMES = [
  { id: "education", name: "Education", name_uz: "Ta'lim", name_ru: "Образование" },
  { id: "governance", name: "Governance", name_uz: "Boshqaruv", name_ru: "Управление" },
  { id: "economic-development", name: "Economic Development", name_uz: "Iqtisodiy rivojlanish", name_ru: "Экономическое развитие" },
  { id: "technology", name: "Technology", name_uz: "Texnologiya", name_ru: "Технологии" },
  { id: "sustainability", name: "Sustainability", name_uz: "Barqarorlik", name_ru: "Устойчивое развитие" },
]

export const researchArticles = [
  {
    id: 1,
    slug: "access-gaps-secondary-education",
    title: "Closing Access Gaps in Secondary Education",
    title_uz: "O'rta ta'limda kirish imkoniyati tafovutlarini bartaraf etish",
    title_ru: "Устранение пробелов в доступе к среднему образованию",
    excerpt:
      "An empirical look at dropout drivers among rural secondary students, and which interventions actually move the needle.",
    excerpt_uz:
      "Qishloq hududlaridagi o'rta maktab o'quvchilari orasida o'qishni tashlab ketish sabablariga empirik nazar va qaysi tadbirlar haqiqatan ham natija beradi.",
    excerpt_ru:
      "Эмпирический анализ причин отсева сельских школьников и мер, которые действительно меняют ситуацию.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher", role_uz: "Bosh tadqiqotchi", role_ru: "Ведущий исследователь" },
    published_at: "2026-03-14T09:00:00Z",
    read_time: 9,
    base_views: 1240,
    video_id: "TGi5SkGbNo0",
    tags: ["education", "rural-access", "policy-evaluation"],
    content: `Secondary school dropout rates in rural districts remain nearly three times higher than in urban centers, despite a decade of enrollment-focused policy. This study asks a narrower question than "why do students leave school" — it asks which specific, fundable interventions change that trajectory, and which ones look good on paper but don't move outcomes.

## Methodology

We tracked cohort-level administrative data across 42 districts over four academic years, paired with structured interviews with 180 households. The comparison group design let us isolate the effect of transport subsidies, conditional cash transfers, and teacher-retention bonuses independently.

## Key findings

Transport subsidies produced the largest single effect on attendance — a 14-point improvement in districts more than 8km from the nearest secondary school. Conditional cash transfers showed a smaller but still significant effect, concentrated almost entirely among households with more than two school-age children.

Teacher-retention bonuses, by contrast, showed no measurable effect on dropout rates within the four-year window, though they did correlate with improved standardized test scores among students who stayed enrolled.

> The intervention with the clearest short-term payoff is not always the one policymakers reach for first — transport, not cash, was the strongest lever in our sample.

## Policy implications

These findings suggest a reallocation, not an increase, in existing rural education budgets: transport infrastructure should be prioritized over blanket cash-transfer expansion in districts where distance is the binding constraint. A companion policy brief on this study is available under Policy Briefs.`,
    content_uz: `Qishloq tumanlaridagi o'rta maktabni tashlab ketish darajasi, o'nlab yillik ro'yxatga olishga qaratilgan siyosatga qaramay, shahar markazlariga nisbatan deyarli uch baravar yuqoriligicha qolmoqda. Ushbu tadqiqot "nega o'quvchilar maktabni tashlab ketadi" degan keng savoldan ko'ra tor savolni beradi — qaysi aniq, moliyalashtirilishi mumkin bo'lgan tadbirlar bu yo'nalishni o'zgartiradi va qaysilari qog'ozda yaxshi ko'rinsa-da, natijaga ta'sir qilmaydi.

## Metodologiya

Biz 42 ta tumanda to'rt o'quv yili davomida kogorta darajasidagi ma'muriy ma'lumotlarni kuzatdik, bunga 180 ta oila bilan tuzilgan intervyular qo'shildi. Taqqoslash guruhi dizayni transport subsidiyalari, shartli pul o'tkazmalari va o'qituvchilarni saqlab qolish uchun bonuslarning ta'sirini alohida ajratib olish imkonini berdi.

## Asosiy topilmalar

Transport subsidiyalari davomat ko'rsatkichiga eng katta ta'sir ko'rsatdi — eng yaqin o'rta maktabdan 8 km dan uzoqroqdagi tumanlarda 14 balllik yaxshilanish. Shartli pul o'tkazmalari kichikroq, ammo baribir sezilarli ta'sir ko'rsatdi, bu asosan ikkitadan ortiq maktab yoshidagi farzandi bo'lgan oilalarda kuzatildi.

O'qituvchilarni saqlab qolish bonuslari esa, aksincha, to'rt yillik davrda o'qishni tashlab ketishga sezilarli ta'sir ko'rsatmadi, garchi ular maktabda qolgan o'quvchilarning standart test natijalarining yaxshilanishi bilan bog'liq bo'lsa-da.

> Eng aniq qisqa muddatli natija bermaydigan tadbir har doim ham siyosatchilar birinchi murojaat qiladigan tadbir emas — bizning namunamizda pul emas, transport eng kuchli vosita bo'ldi.

## Siyosiy xulosalar

    Ushbu topilmalar mavjud qishloq ta'lim byudjetlarini oshirish emas, balki qayta taqsimlashni taklif qiladi: masofa asosiy cheklov bo'lgan tumanlarda transport infratuzilmasi umumiy pul o'tkazmalarini kengaytirishdan ustuvor bo'lishi kerak. Ushbu tadqiqot bo'yicha qo'shimcha siyosat bayoni Siyosat bayonlari bo'limida mavjud.`,
    content_ru: `В сельских районах уровень отсева из средней школы остаётся почти втрое выше, чем в городах, несмотря на десятилетнюю политику, ориентированную на охват образованием. Это исследование задаёт более узкий вопрос, чем «почему ученики бросают школу»: какие конкретные и доступные для финансирования меры меняют эту траекторию, а какие лишь хорошо выглядят на бумаге.

## Методология

Мы отслеживали административные данные на уровне когорт в 42 районах в течение четырёх учебных лет и дополнили их структурированными интервью со 180 домохозяйствами. Дизайн с группой сравнения позволил отдельно оценить влияние транспортных субсидий, условных денежных выплат и бонусов за удержание учителей.

## Основные выводы

Транспортные субсидии дали наибольший отдельный эффект: посещаемость выросла на 14 пунктов в районах, расположенных более чем в 8 км от ближайшей средней школы. Условные денежные выплаты дали меньший, но всё же значимый эффект, почти полностью сосредоточенный среди семей, где более двух детей школьного возраста.

Напротив, бонусы за удержание учителей не оказали измеримого влияния на отсев за четырёхлетний период, хотя были связаны с улучшением результатов стандартизированных тестов среди учеников, продолживших обучение.

> Мера с наиболее очевидной краткосрочной отдачей не всегда оказывается первой, к которой обращаются политики: в нашей выборке решающим фактором был транспорт, а не деньги.

## Политические выводы

Результаты указывают не на необходимость увеличения, а на перераспределение существующих бюджетов сельского образования: в районах, где расстояние является главным ограничением, транспортная инфраструктура должна иметь приоритет перед повсеместным расширением денежных выплат. Дополнительная политическая записка по этому исследованию опубликована в разделе «Политические записки».`,
  },
  {
    id: 2,
    slug: "municipal-transparency-and-trust",
    title: "Municipal Transparency and Public Trust",
    title_uz: "Munitsipal shaffoflik va jamoat ishonchi",
    title_ru: "Муниципальная прозрачность и общественное доверие",
    excerpt:
      "Do open-budget portals actually change how residents perceive local government? A survey-based study across 12 municipalities.",
    excerpt_uz:
      "Ochiq byudjet portallari aholining mahalliy hokimiyatga munosabatini haqiqatan ham o'zgartiradimi? 12 ta munitsipalitet bo'yicha so'rov asosidagi tadqiqot.",
    excerpt_ru:
      "Действительно ли порталы открытого бюджета меняют восприятие местной власти? Исследование на основе опроса в 12 муниципалитетах.",
    theme: "governance",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow", role_uz: "Boshqaruv bo'yicha tadqiqotchi", role_ru: "Исследователь управления" },
    published_at: "2026-02-02T09:00:00Z",
    read_time: 7,
    base_views: 860,
    video_id: null,
    tags: ["governance", "transparency", "local-government"],
    content: `Open-budget portals have been adopted by dozens of municipalities on the assumption that visible spending data builds public trust. We tested that assumption directly with a panel survey of 2,400 residents across 12 municipalities, half of which launched portals during our observation window.

## What we measured

Trust was measured on a standard five-item institutional-trust scale, administered before portal launch and again nine months after. We controlled for baseline trust, local news consumption, and recent service-delivery incidents.

## Findings

Portal adoption alone produced no statistically significant shift in trust. The effect only appeared in municipalities that paired the portal with active outreach — town halls, SMS digests, or local-language summaries of spending data. In those cases, trust improved by a modest but real 6 points.

## Root cause

Interviews suggest the mechanism is not data availability but data legibility. Raw line-item budgets are largely illegible to residents without institutional context; a portal without a translation layer functions as a compliance artifact rather than a trust-building tool.

## Recommendation

Municipalities considering transparency investments should budget for outreach and plain-language summaries alongside the technical portal — the portal is necessary but not sufficient.`,
    content_uz: `Ochiq byudjet portallari ko'rinadigan xarajat ma'lumotlari jamoat ishonchini oshiradi degan taxmin asosida o'nlab munitsipalitetlar tomonidan qabul qilingan. Biz bu taxminni to'g'ridan-to'g'ri 12 ta munitsipalitetdagi 2,400 aholi orasida panel so'rovi orqali sinovdan o'tkazdik, ularning yarmi kuzatuv davrida portallarni ishga tushirdi.

## Nimani o'lchadik

Ishonch standart besh bandli institutsional ishonch shkalasi bo'yicha, portal ishga tushirilishidan oldin va to'qqiz oy o'tgach qayta o'lchandi. Biz boshlang'ich ishonch, mahalliy yangiliklarni iste'mol qilish va yaqinda yuz bergan xizmat ko'rsatish holatlarini nazorat qildik.

## Topilmalar

Faqat portalni joriy etishning o'zi ishonchda statistik jihatdan sezilarli o'zgarish keltirib chiqarmadi. Ta'sir faqat portalni faol targ'ibot bilan — yig'ilishlar, SMS xabarnomalar yoki xarajatlar bo'yicha mahalliy tildagi xulosalar bilan birlashtirgan munitsipalitetlarda ko'rindi. Bunday hollarda ishonch kichik, ammo real — 6 ballga oshdi.

## Asosiy sabab

Intervyular mexanizm ma'lumotning mavjudligida emas, balki uning tushunarliligida ekanligini ko'rsatadi. Institutsional kontekstsiz xom byudjet moddalari aholi uchun deyarli tushunarsiz; tarjima qatlamisiz portal ishonch quruvchi vosita emas, balki majburiy hisobot artefakti sifatida ishlaydi.

## Tavsiya

Shaffoflikka sarmoya kiritishni ko'rib chiqayotgan munitsipalitetlar texnik portal bilan bir qatorda targ'ibot va oddiy tildagi xulosalar uchun ham byudjet ajratishi kerak — portal zarur, ammo yetarli emas.`,
    content_ru: `Порталы открытого бюджета внедряются десятками муниципалитетов исходя из предположения, что доступные данные о расходах укрепляют общественное доверие. Мы проверили это предположение с помощью панельного опроса 2 400 жителей 12 муниципалитетов, половина из которых запустила порталы в период наблюдения.

## Что мы измеряли

Доверие измерялось по стандартной шкале из пяти пунктов до запуска портала и повторно через девять месяцев. Мы учитывали исходный уровень доверия, потребление местных новостей и недавние случаи предоставления услуг.

## Результаты

Само по себе внедрение портала не привело к статистически значимому изменению доверия. Эффект появился только в муниципалитетах, которые дополнили портал активной информационной работой: общественными встречами, SMS-рассылками или краткими обзорами расходов на местном языке. В этих случаях доверие выросло на умеренные, но реальные 6 пунктов.

## Первопричина

Интервью показывают, что решающим фактором является не доступность данных, а их понятность. Сырые бюджетные строки без институционального контекста практически непонятны жителям; портал без объяснений становится формальным отчётным инструментом, а не способом укрепления доверия.

## Рекомендация

Муниципалитеты, планирующие инвестиции в прозрачность, должны закладывать средства не только на технический портал, но и на информационную работу и понятные резюме. Портал необходим, но его недостаточно.`,
  },
  {
    id: 3,
    slug: "informal-sector-and-youth-employment",
    title: "The Informal Sector's Role in Youth Employment",
    title_uz: "Norasmiy sektorning yoshlar bandligidagi o'rni",
    title_ru: "Роль неформального сектора в занятости молодёжи",
    excerpt:
      "Why informal work is not a policy failure to be eliminated, but a labor-market segment that needs its own targeted support.",
    excerpt_uz:
      "Nima uchun norasmiy mehnat bartaraf etilishi kerak bo'lgan siyosiy nuqson emas, balki o'ziga xos maqsadli qo'llab-quvvatlashga muhtoj mehnat bozori segmenti.",
    excerpt_ru:
      "Почему неформальная занятость — не политический провал, который нужно устранить, а сегмент рынка труда, требующий адресной поддержки.",
    theme: "economic-development",
    cover: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    author: { name: "Sardor Tashkentov", role: "Economic Policy Analyst", role_uz: "Iqtisodiy siyosat tahlilchisi", role_ru: "Аналитик экономической политики" },
    published_at: "2026-01-18T09:00:00Z",
    read_time: 11,
    base_views: 1560,
    video_id: "3fumBcKC6RE",
    tags: ["economic-development", "informal-sector", "youth"],
    content: `Roughly 4 in 10 employed youth in our sample work in the informal sector — a figure often treated as evidence of policy failure. This paper argues that framing undersells both the scale and the function of informal work, and proposes a different set of policy levers.

## The scale problem

National labor statistics undercount informal work by an estimated 18%, largely because seasonal and platform-mediated work falls outside standard survey categories. Our fieldwork used snowball sampling across six sectors to capture this gap.

## Why formalization mandates underperform

Programs designed to move workers into formal employment show weak uptake — not because workers reject formal work, but because the transition costs (registration, tax compliance, loss of flexibility) outweigh the benefits for workers under 25 without dependents.

## What works instead

Portable benefits — health coverage and retirement contributions that follow the worker rather than the employer — showed far higher uptake in our pilot regions. These decouple social protection from formal-employment status entirely.

[YouTube: a field summary of the portable-benefits pilot is embedded below]

## Conclusion

Rather than treating informality as a problem to formalize away, policy should meet workers where they are: portable, low-friction benefits paired with skills certification that travels across employers.`,
    content_uz: `Bizning namunamizda band bo'lgan yoshlarning taxminan 10 tadan 4 tasi norasmiy sektorda ishlaydi — bu ko'pincha siyosiy nuqson dalili sifatida qaraladigan ko'rsatkich. Ushbu maqola bunday talqin norasmiy mehnatning ham ko'lamini, ham funksiyasini kamsitishini ta'kidlaydi va boshqacha siyosiy vositalar to'plamini taklif qiladi.

## Ko'lam muammosi

Milliy mehnat statistikasi norasmiy mehnatni taxminan 18% ga kam ko'rsatadi, buning asosiy sababi mavsumiy va platforma orqali amalga oshiriladigan ishlar standart so'rov toifalariga kirmasligidir. Bizning dala tadqiqotimiz bu bo'shliqni aniqlash uchun oltita sohada "qor to'pi" namunasidan foydalandi.

## Nega rasmiylashtirish talablari samara bermayapti

Ishchilarni rasmiy bandlikka o'tkazishga qaratilgan dasturlar past qamrovga ega — buning sababi ishchilar rasmiy ishni rad etishi emas, balki o'tish xarajatlari (ro'yxatdan o'tish, soliq to'lash, moslashuvchanlikning yo'qolishi) qaramog'idagi shaxslari bo'lmagan 25 yoshgacha bo'lgan ishchilar uchun foydadan ustun kelishidir.

## Buning o'rniga nima ishlaydi

Ko'chma imtiyozlar — ishchini ish beruvchi emas, balki ishchining o'zini kuzatib boradigan tibbiy sug'urta va pensiya badallari — bizning pilot hududlarimizda ancha yuqori qamrovni ko'rsatdi. Bu ijtimoiy himoyani rasmiy bandlik maqomidan butunlay ajratadi.

[YouTube: ko'chma imtiyozlar piloti bo'yicha dala xulosasi quyida joylashtirilgan]

## Xulosa

Norasmiylikni rasmiylashtirish orqali bartaraf etilishi kerak bo'lgan muammo sifatida ko'rish o'rniga, siyosat ishchilarni ular turgan joyda kutib olishi kerak: ish beruvchilar o'rtasida ko'chib yuradigan ko'nikmalar sertifikati bilan birga keladigan ko'chma, kam to'siqli imtiyozlar.`,
    content_ru: `В нашей выборке около четырёх из десяти работающих молодых людей заняты в неформальном секторе — показатель, который часто считают свидетельством провала политики. Но такой взгляд недооценивает масштаб и функцию неформальной занятости.

## Проблема масштаба

Национальная статистика труда недооценивает неформальную занятость примерно на 18%, поскольку сезонная и платформенная работа не попадает в стандартные категории опросов. Наше полевое исследование охватило шесть отраслей.

## Почему формализация не работает

Программы перевода работников в официальный сектор дают слабый результат не потому, что люди отвергают официальную работу, а потому, что регистрация, налоги и потеря гибкости превышают выгоды для работников младше 25 лет без иждивенцев.

## Что работает лучше

Переносимые льготы — медицинское страхование и пенсионные взносы, которые следуют за работником, а не работодателем, — показали значительно более высокий охват в пилотных регионах. Такой подход отделяет социальную защиту от статуса официальной занятости.

## Вывод

Вместо попытки устранить неформальность принудительной формализацией политика должна поддерживать работников там, где они находятся: через переносимые льготы с низкими барьерами и сертификаты навыков, признаваемые разными работодателями.`,
  },
  {
    id: 4,
    slug: "algorithmic-decision-making-public-services",
    title: "Algorithmic Decision-Making in Public Services",
    title_uz: "Davlat xizmatlarida algoritmik qaror qabul qilish",
    title_ru: "Алгоритмическое принятие решений в государственных услугах",
    excerpt:
      "A survey of automated eligibility systems in social services, and the due-process gaps they introduce.",
    excerpt_uz:
      "Ijtimoiy xizmatlardagi avtomatlashtirilgan huquq berish tizimlari va ular keltirib chiqaradigan adolatli jarayon bo'shliqlari bo'yicha tadqiqot.",
    excerpt_ru:
      "Обзор автоматизированных систем предоставления социальных услуг и пробелов в гарантиях надлежащей процедуры.",
    theme: "technology",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    author: { name: "Malika Islomova", role: "Technology Policy Researcher", role_uz: "Texnologiya siyosati tadqiqotchisi", role_ru: "Исследователь технологической политики" },
    published_at: "2025-12-05T09:00:00Z",
    read_time: 8,
    base_views: 2040,
    video_id: null,
    tags: ["technology", "algorithmic-accountability", "social-services"],
    content: `Automated systems now determine eligibility for a growing share of public benefits. This study reviews 9 such systems currently in use and asks a specific question: when an algorithm denies a benefit, what recourse does the applicant actually have?

## Audit approach

We requested documentation, appeal logs, and — where available — model specifications for each system. Three agencies declined to share model logic, citing vendor confidentiality, which is itself a finding.

## Due-process gaps

In 6 of 9 systems, applicants had no mechanism to see the specific factors behind a denial — only a generic rejection code. Appeal success rates in these systems were less than half those in systems that disclosed reasoning.

## A workable standard

We propose a minimum disclosure standard: any automated denial must be accompanied by the top three contributing factors in plain language, and a human reviewer must be reachable within a defined window. This does not require opening proprietary model internals — only translating outputs into actionable, appealable information.

## Why this matters now

As more services move to automated eligibility, the gap between efficiency gains and due-process protections will widen unless disclosure standards are set now, before systems become further entrenched.`,
    content_uz: `Avtomatlashtirilgan tizimlar endi davlat imtiyozlarining tobora ortib borayotgan qismi uchun huquqni belgilamoqda. Ushbu tadqiqot hozirda foydalanilayotgan 9 ta shunday tizimni ko'rib chiqadi va aniq savol beradi: algoritm imtiyozni rad etganda, ariza beruvchida haqiqatan ham qanday himoya vositasi bor?

## Audit yondashuvi

Biz har bir tizim uchun hujjatlar, apellyatsiya jurnallari va imkon bo'lsa, model spetsifikatsiyalarini so'radik. Uchta idora yetkazib beruvchi maxfiyligini bahona qilib, model mantig'ini ulashishdan bosh tortdi — bu o'zi ham bir topilma.

## Adolatli jarayondagi bo'shliqlar

9 tizimdan 6 tasida ariza beruvchilar rad etish ortidagi aniq omillarni ko'rish imkoniyatiga ega emas edi — faqat umumiy rad etish kodi. Bunday tizimlarda apellyatsiya muvaffaqiyat darajasi sababni oshkor qiladigan tizimlarnikidan ikki baravardan kam edi.

## Amaliy standart

Biz minimal oshkoralik standartini taklif qilamiz: har qanday avtomatik rad etish oddiy tilda eng muhim uchta omil bilan birga kelishi va inson tekshiruvchisi belgilangan muddat ichida murojaat qilinishi mumkin bo'lishi kerak. Bu mulkiy model ichki tuzilishini ochishni talab qilmaydi — faqat natijalarni harakatga asos bo'ladigan, shikoyat qilinishi mumkin bo'lgan ma'lumotga aylantirishni talab qiladi.

## Bu nega hozir muhim

Ko'proq xizmatlar avtomatlashtirilgan huquq berishga o'tar ekan, oshkoralik standartlari hozir, tizimlar yanada mustahkamlanmasdan oldin belgilanmasa, samaradorlik yutuqlari va adolatli jarayon himoyasi o'rtasidagi bo'shliq kengayadi.`,
    content_ru: `Автоматизированные системы всё чаще определяют право на получение государственных льгот. Мы изучили девять таких систем и задали конкретный вопрос: если алгоритм отказывает в льготе, какие реальные средства защиты есть у заявителя?

## Подход к аудиту

Мы запросили документацию, журналы апелляций и, если возможно, спецификации моделей. Три ведомства отказались раскрыть логику моделей, сославшись на конфиденциальность поставщиков — и это само по себе важный результат.

## Пробелы в надлежащей процедуре

В шести из девяти систем заявители не могли увидеть конкретные факторы, лежащие в основе отказа, а получали лишь общий код. Успешность апелляций в этих системах была менее половины показателя систем, раскрывающих причины.

## Практический стандарт

Каждый автоматический отказ должен сопровождаться тремя главными факторами простым языком, а заявителю должна быть доступна проверка человеком в установленный срок. Это не требует раскрытия внутренней логики защищённой модели — необходимо лишь превратить её результат в понятную информацию для обжалования.

## Почему это важно сейчас

По мере автоматизации услуг разрыв между эффективностью и гарантиями справедливой процедуры будет расти, если стандарты раскрытия не установить до того, как системы станут необратимо встроены в управление.`,
  },
  {
    id: 5,
    slug: "water-scarcity-adaptation-strategies",
    title: "Community-Led Water Scarcity Adaptation",
    title_uz: "Jamoat boshchiligidagi suv tanqisligiga moslashish",
    title_ru: "Адаптация к нехватке воды под руководством сообществ",
    excerpt:
      "Comparing top-down infrastructure investment with community-managed water allocation in drought-prone districts.",
    excerpt_uz:
      "Qurg'oqchilikka moyil tumanlarda yuqoridan-pastga infratuzilma sarmoyasini jamoat boshqaruvidagi suv taqsimoti bilan solishtirish.",
    excerpt_ru:
      "Сравнение централизованных инфраструктурных инвестиций с распределением воды под управлением местных сообществ в засушливых районах.",
    theme: "sustainability",
    cover: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher", role_uz: "Bosh tadqiqotchi", role_ru: "Ведущий исследователь" },
    published_at: "2025-11-20T09:00:00Z",
    read_time: 10,
    base_views: 990,
    video_id: "qeMFqkcPYcg",
    tags: ["sustainability", "water-policy", "community-governance"],
    content: `Drought-prone districts have typically received large infrastructure investments — new wells, pipelines, and reservoirs. This study compares outcomes in districts that received infrastructure-only investment against those that paired infrastructure with community-managed allocation committees.

## Design

We compared 8 districts over three dry seasons: 4 infrastructure-only, 4 with added community allocation committees empowered to set local usage rules within technical limits set by the water authority.

## Results

Infrastructure-only districts saw water availability improve initially but decline again within two seasons as usage patterns reverted to pre-investment norms. Districts with allocation committees maintained availability gains through all three seasons, with usage patterns shifting toward the technical limits set by engineers.

## Interpretation

Infrastructure solves a supply problem; it does not solve a coordination problem. Community allocation committees appear to function as the missing coordination layer — translating technical constraints into locally legitimate rules that residents actually follow.

## Recommendation

Future water-infrastructure investment should be paired, by default, with a funded and empowered local allocation body, not treated as a standalone capital project.`,
    content_uz: `Qurg'oqchilikka moyil tumanlar odatda katta infratuzilma sarmoyalarini — yangi quduqlar, quvurlar va suv omborlarini olgan. Ushbu tadqiqot faqat infratuzilma sarmoyasini olgan tumanlar bilan infratuzilmani jamoat boshqaruvidagi taqsimot qo'mitalari bilan birlashtirgan tumanlar natijalarini solishtiradi.

## Dizayn

Biz uchta quruq mavsum davomida 8 ta tumanni solishtirdik: 4 tasi faqat infratuzilma, 4 tasi esa suv organi belgilagan texnik chegaralar doirasida mahalliy foydalanish qoidalarini belgilash vakolatiga ega bo'lgan jamoat taqsimot qo'mitalari qo'shilgan.

## Natijalar

Faqat infratuzilmaga ega tumanlarda suv mavjudligi dastlab yaxshilangan, ammo foydalanish andozalari sarmoyagacha bo'lgan me'yorlarga qaytgani sayin ikkinchi mavsumda yana pasaygan. Taqsimot qo'mitalariga ega tumanlar esa barcha uch mavsum davomida mavjudlik yutuqlarini saqlab qolgan, foydalanish andozalari muhandislar belgilagan texnik chegaralarga qarab siljigan.

## Talqin

Infratuzilma yetkazib berish muammosini hal qiladi; u muvofiqlashtirish muammosini hal qilmaydi. Jamoat taqsimot qo'mitalari yetishmayotgan muvofiqlashtirish qatlami sifatida ishlayotganga o'xshaydi — texnik cheklovlarni aholi haqiqatan ham amal qiladigan mahalliy qonuniy qoidalarga aylantiradi.

## Tavsiya

Kelgusi suv infratuzilmasi sarmoyalari alohida kapital loyiha sifatida emas, balki sukut bo'yicha moliyalashtirilgan va vakolatli mahalliy taqsimot organi bilan birga bo'lishi kerak.`,
    content_ru: `Засушливые районы обычно получают крупные инфраструктурные инвестиции: новые скважины, трубопроводы и резервуары. Это исследование сравнивает районы, получившие только инфраструктуру, с районами, где инфраструктура сочеталась с комитетами распределения воды под управлением сообщества.

## Дизайн

Мы сравнили восемь районов в течение трёх сухих сезонов: четыре получили только инфраструктуру, а в четырёх дополнительно работали местные комитеты, уполномоченные устанавливать правила использования воды в технических пределах.

## Результаты

В районах с одной лишь инфраструктурой доступность воды сначала улучшилась, но через два сезона снова снизилась, поскольку привычки использования вернулись к прежним нормам. Районы с комитетами сохраняли улучшения все три сезона, а модели использования приблизились к техническим ограничениям, установленным инженерами.

## Интерпретация

Инфраструктура решает проблему предложения, но не проблему координации. Комитеты распределения стали недостающим связующим звеном: они переводят технические ограничения в легитимные местные правила, которым жители действительно следуют.

## Рекомендация

Будущие инвестиции в водную инфраструктуру следует по умолчанию сопровождать финансируемым и наделённым полномочиями местным органом распределения, а не рассматривать как отдельный капитальный проект.`,
  },
  {
    id: 6,
    slug: "digital-literacy-curriculum-outcomes",
    title: "Measuring Digital Literacy Curriculum Outcomes",
    title_uz: "Raqamli savodxonlik o'quv dasturi natijalarini o'lchash",
    title_ru: "Оценка результатов программы цифровой грамотности",
    excerpt:
      "A before-and-after study of a national digital literacy curriculum rolled out across 60 schools.",
    excerpt_uz:
      "60 ta maktabda joriy etilgan milliy raqamli savodxonlik o'quv dasturining oldingi-keyingi natijalarini o'rganish.",
    excerpt_ru:
      "Исследование результатов национальной программы цифровой грамотности до и после её внедрения в 60 школах.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow", role_uz: "Boshqaruv bo'yicha tadqiqotchi", role_ru: "Исследователь управления" },
    published_at: "2025-10-09T09:00:00Z",
    read_time: 6,
    base_views: 720,
    video_id: null,
    tags: ["education", "digital-literacy", "curriculum"],
    content: `A national digital literacy curriculum was introduced in 60 pilot schools eighteen months ago. This study measures what students actually retained, using a skills-based assessment rather than self-reported confidence — a distinction that turns out to matter.

## Assessment design

Students completed a practical skills assessment (identifying phishing attempts, evaluating source credibility, basic spreadsheet tasks) both before rollout and eighteen months after, alongside a self-reported confidence survey.

## The confidence-competence gap

Self-reported confidence in digital skills rose sharply — 34 points on average. Measured competence rose by a more modest 11 points, concentrated almost entirely in source-credibility evaluation rather than technical tasks.

## Why the gap matters

Programs evaluated only on confidence surveys would appear far more successful than the skills data supports. This has direct implications for how the curriculum's next phase is funded and evaluated — outcome measurement needs to move to practical assessment.

## Next steps

We recommend expanding the technical-skills modules and adopting practical assessment as the primary evaluation metric for the curriculum's second phase.`,
    content_uz: `O'n sakkiz oy oldin 60 ta pilot maktabda milliy raqamli savodxonlik o'quv dasturi joriy etilgan edi. Ushbu tadqiqot o'quvchilar haqiqatan ham nimani o'zlashtirganini, o'z-o'zini baholash o'rniga ko'nikmalarga asoslangan baholash orqali o'lchaydi — bu farq muhim bo'lib chiqdi.

## Baholash dizayni

O'quvchilar joriy etishdan oldin va o'n sakkiz oy o'tgach amaliy ko'nikmalar baholovidan (fishing urinishlarini aniqlash, manba ishonchliligini baholash, jadval bilan asosiy ishlar) o'z-o'zini baholash so'rovnomasi bilan birga o'tdilar.

## Ishonch va ko'nikma o'rtasidagi tafovut

Raqamli ko'nikmalarga o'z-o'zini ishonch keskin oshdi — o'rtacha 34 ball. O'lchangan ko'nikma esa ancha kamroq, 11 ballga oshdi, bu asosan texnik vazifalar emas, balki manba ishonchliligini baholashda to'plandi.

## Nega bu tafovut muhim

Faqat ishonch so'rovnomalari bo'yicha baholangan dasturlar ko'nikma ma'lumotlari tasdiqlaganidan ancha muvaffaqiyatli ko'rinadi. Bu o'quv dasturining keyingi bosqichi qanday moliyalashtirilishi va baholanishiga to'g'ridan-to'g'ri ta'sir qiladi — natijani o'lchash amaliy baholashga o'tishi kerak.

## Keyingi qadamlar

Biz texnik ko'nikma modullarini kengaytirish va o'quv dasturining ikkinchi bosqichi uchun amaliy baholashni asosiy baholash mezoni sifatida qabul qilishni tavsiya qilamiz.`,
    content_ru: `Национальная программа цифровой грамотности была введена 18 месяцев назад в 60 пилотных школах. В этом исследовании измеряется, что ученики действительно усвоили, с помощью оценки навыков, а не самооценки уверенности — и это различие оказалось важным.

## Дизайн оценки

Ученики проходили практическую проверку навыков до запуска программы и через 18 месяцев: распознавали фишинговые попытки, оценивали надёжность источников и выполняли базовые задания в электронных таблицах. Одновременно они отвечали на вопросы о собственной уверенности.

## Разрыв между уверенностью и компетентностью

Самооценка уверенности в цифровых навыках резко выросла — в среднем на 34 пункта. Измеренная компетентность выросла значительно скромнее, на 11 пунктов, почти полностью за счёт оценки надёжности источников, а не технических заданий.

## Почему разрыв важен

Программы, оцениваемые только по опросам уверенности, выглядели бы гораздо успешнее, чем показывают данные о навыках. Это напрямую влияет на финансирование и оценку следующего этапа программы: измерение результатов должно перейти к практическим заданиям.

## Следующие шаги

Мы рекомендуем расширить модули технических навыков и сделать практическую оценку главным показателем для второго этапа программы.`,
  },
]

export function getResearchBySlug(slug) {
  return researchArticles.find((a) => a.slug === slug)
}

export function getRelatedResearch(article, limit = 3) {
  return researchArticles
    .filter((a) => a.slug !== article.slug && a.theme === article.theme)
    .slice(0, limit)
}
