import { RESEARCH_THEMES } from "./research"

export { RESEARCH_THEMES as BRIEF_THEMES }

export const policyBriefs = [
  {
    id: 1,
    slug: "transport-first-rural-education-budgets",
    title: "Transport-First: Reallocating Rural Education Budgets",
    excerpt:
      "A two-page brief recommending districts shift funding from blanket cash transfers to targeted transport subsidies.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher" },
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
  },
  {
    id: 2,
    slug: "plain-language-budget-disclosure-standard",
    title: "A Plain-Language Standard for Municipal Budget Portals",
    excerpt:
      "Recommending a minimum outreach requirement to accompany every open-budget transparency portal.",
    theme: "governance",
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow" },
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
    content: `Open-budget portals are frequently procured and launched as standalone technical products. Our research found that portals alone do not move public trust — outreach does.

## The decision

Municipal governments should stop treating budget portals as a complete transparency solution and start budgeting for the outreach layer from day one, not as an afterthought once the portal underperforms.

## Who should act

Municipal finance departments and civic-tech vendors bidding on transparency contracts. Procurement documents should explicitly require an outreach component, not just a technical deliverable.

## Implementation path

1. Add a plain-language quarterly summary requirement to portal procurement specifications.
2. Budget for at least two outreach touchpoints annually, sized to municipal population.
3. Track trust and comprehension via short resident surveys, not portal analytics alone.`,
  },
  {
    id: 3,
    slug: "portable-benefits-for-informal-workers",
    title: "Portable Benefits Over Formalization Mandates",
    excerpt:
      "Why labor policy should decouple social protection from formal employment status for workers under 25.",
    theme: "economic-development",
    cover: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&q=80",
    author: { name: "Sardor Tashkentov", role: "Economic Policy Analyst" },
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
    content: `Formalization mandates continue to underperform among younger informal workers, largely because the transition costs outweigh the benefits for workers without dependents. Our research points to a more direct lever.

## The decision

Rather than continuing to fund formalization incentive programs with weak uptake, labor ministries should pilot portable benefits — health and retirement contributions that follow the worker, not the employer.

## Who should act

Labor ministries and social insurance funds designing the next cycle of youth employment programs.

## Implementation path

1. Design a portable contribution mechanism that does not require formal employer registration.
2. Pair it with a portable skills certification recognized across at least three sectors.
3. Pilot in two regions with high informal youth employment before wider rollout.`,
  },
  {
    id: 4,
    slug: "minimum-disclosure-standard-automated-denials",
    title: "A Minimum Disclosure Standard for Automated Denials",
    excerpt:
      "Any automated benefit denial should come with the top three contributing factors and a reachable human reviewer.",
    theme: "technology",
    cover: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1200&q=80",
    author: { name: "Malika Islomova", role: "Technology Policy Researcher" },
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
  },
  {
    id: 5,
    slug: "fund-community-water-allocation-committees",
    title: "Fund Community Water Allocation Committees by Default",
    excerpt:
      "Water infrastructure investment should be paired, not followed, by a funded local allocation body.",
    theme: "sustainability",
    cover: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?w=1200&q=80",
    author: { name: "Nodira Yusupova", role: "Lead Researcher" },
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
    content: `Infrastructure-only investment in drought-prone districts shows gains that erode within two dry seasons. Districts with community allocation committees held those gains through three seasons in our study.

## The decision

Water authorities should stop funding infrastructure as a standalone capital project and require a funded allocation committee as a default component of every investment.

## Who should act

National and regional water authorities designing the next round of drought-resilience infrastructure funding.

## Implementation path

1. Add allocation-committee funding as a line item in every new water infrastructure budget, not an optional add-on.
2. Set technical usage limits centrally; delegate local rule-setting to the committee within those limits.
3. Track availability annually for at least three seasons post-investment to catch reversion early.`,
  },
  {
    id: 6,
    slug: "practical-assessment-digital-literacy-funding",
    title: "Fund Digital Literacy on Practical Assessment, Not Confidence",
    excerpt:
      "Recommending a shift in curriculum evaluation metrics before the next funding cycle is approved.",
    theme: "education",
    cover: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
    author: { name: "Aziz Rakhimov", role: "Governance Fellow" },
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
    content: `Confidence in digital skills rose sharply after curriculum rollout, but measured competence rose only modestly — and the gap is concentrated in technical tasks, not source evaluation.

## The decision

Ministries evaluating the next funding cycle for this curriculum should require practical assessment results, not confidence survey data, in renewal applications.

## Who should act

Curriculum funders and the ministry unit responsible for approving the program's second phase.

## Implementation path

1. Adopt the practical skills assessment as the required metric for the next funding renewal.
2. Expand technical-skills modules, which showed the largest gap between confidence and competence.
3. Retain the confidence survey only as a secondary, supplementary measure.`,
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
