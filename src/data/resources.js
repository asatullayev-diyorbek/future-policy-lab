export const RESOURCE_KINDS = [
  { id: "tool", name: "Analytical Tools" },
  { id: "dataset", name: "Open Datasets" },
  { id: "reading-list", name: "Reading Lists" },
]

export const resources = [
  {
    id: 1,
    slug: "policy-brief-writing-template",
    kind: "tool",
    title: "Policy Brief Writing Template",
    excerpt:
      "A structured template used by our own researchers to turn findings into a decision-ready brief in under a page.",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    published_at: "2026-02-01T09:00:00Z",
    base_views: 410,
    format: "Template (DOCX / Google Docs)",
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
  },
  {
    id: 2,
    slug: "root-cause-analysis-framework",
    kind: "tool",
    title: "Root Cause Analysis Framework",
    excerpt:
      "A lightweight framework for tracing a policy symptom back to its structural cause before proposing a fix.",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    published_at: "2025-12-05T09:00:00Z",
    base_views: 265,
    format: "Worksheet (PDF)",
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
  },
  {
    id: 3,
    slug: "rural-education-access-dataset",
    kind: "dataset",
    title: "Rural Education Access Dataset (42 Districts)",
    excerpt:
      "Anonymized district-level attendance, distance-to-school, and intervention data from our secondary education study.",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    published_at: "2026-03-20T09:00:00Z",
    base_views: 590,
    format: "CSV, 42 rows × 18 columns",
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
  },
  {
    id: 4,
    slug: "municipal-trust-survey-data",
    kind: "dataset",
    title: "Municipal Trust Survey Data (12 Municipalities)",
    excerpt:
      "Panel survey responses on institutional trust before and after open-budget portal launches.",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    published_at: "2026-02-15T09:00:00Z",
    base_views: 340,
    format: "CSV, 2,400 rows × 24 columns",
    tags: ["governance", "open-data"],
    related_research_slug: "municipal-transparency-and-trust",
    content: `The panel survey data behind "Municipal Transparency and Public Trust," covering 2,400 residents across 12 municipalities, surveyed before and nine months after portal launch.

## What's included

Standard five-item institutional-trust scale responses, baseline demographics, local news consumption frequency, and a binary flag for portal-plus-outreach vs. portal-only municipalities.

## Suggested uses

Useful for practicing pre/post panel analysis, or for testing whether the outreach effect we found replicates with a different trust scale or subgroup breakdown.

## Citation

Please cite Future Policy Lab and link back to the original research when using this dataset in published work.`,
  },
  {
    id: 5,
    slug: "getting-started-empirical-policy-research",
    kind: "reading-list",
    title: "Getting Started with Empirical Policy Research",
    excerpt:
      "A foundational reading list for students new to survey design, causal inference, and structuring a policy-relevant literature review.",
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
  },
  {
    id: 6,
    slug: "algorithmic-accountability-reading-list",
    kind: "reading-list",
    title: "Algorithmic Accountability in the Public Sector",
    excerpt:
      "Readings on due process, disclosure standards, and procurement for automated decision systems in government.",
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
