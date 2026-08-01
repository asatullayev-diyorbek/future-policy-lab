export const RESEARCH_THEMES = [
  { id: "education", name: "Education" },
  { id: "governance", name: "Governance" },
  { id: "economic-development", name: "Economic Development" },
  { id: "technology", name: "Technology" },
  { id: "sustainability", name: "Sustainability" },
]

export const researchArticles = [
  {
    id: 1,
    slug: "access-gaps-secondary-education",
    title: "Closing Access Gaps in Secondary Education",
    excerpt:
      "An empirical look at dropout drivers among rural secondary students, and which interventions actually move the needle.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher" },
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
  },
  {
    id: 2,
    slug: "municipal-transparency-and-trust",
    title: "Municipal Transparency and Public Trust",
    excerpt:
      "Do open-budget portals actually change how residents perceive local government? A survey-based study across 12 municipalities.",
    theme: "governance",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow" },
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
  },
  {
    id: 3,
    slug: "informal-sector-and-youth-employment",
    title: "The Informal Sector's Role in Youth Employment",
    excerpt:
      "Why informal work is not a policy failure to be eliminated, but a labor-market segment that needs its own targeted support.",
    theme: "economic-development",
    cover: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    author: { name: "Sardor Tashkentov", role: "Economic Policy Analyst" },
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
  },
  {
    id: 4,
    slug: "algorithmic-decision-making-public-services",
    title: "Algorithmic Decision-Making in Public Services",
    excerpt:
      "A survey of automated eligibility systems in social services, and the due-process gaps they introduce.",
    theme: "technology",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    author: { name: "Malika Islomova", role: "Technology Policy Researcher" },
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
  },
  {
    id: 5,
    slug: "water-scarcity-adaptation-strategies",
    title: "Community-Led Water Scarcity Adaptation",
    excerpt:
      "Comparing top-down infrastructure investment with community-managed water allocation in drought-prone districts.",
    theme: "sustainability",
    cover: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher" },
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
  },
  {
    id: 6,
    slug: "digital-literacy-curriculum-outcomes",
    title: "Measuring Digital Literacy Curriculum Outcomes",
    excerpt:
      "A before-and-after study of a national digital literacy curriculum rolled out across 60 schools.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow" },
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
