export const ITEM_TYPES = [
  { id: "event", name: "Events" },
  { id: "news", name: "News" },
]

export const meetingsNews = [
  {
    id: 1,
    slug: "seminar-evidence-based-policy-writing",
    type: "event",
    title: "Seminar: Writing Policy Recommendations from Empirical Data",
    excerpt:
      "A hands-on session on translating research findings into decision-ready policy briefs, led by our Governance Fellow.",
    cover: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    date: "2026-09-12T15:00:00Z",
    location: "Future Policy Lab HQ, Room 204 — also streamed online",
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
  },
  {
    id: 2,
    slug: "new-research-published-informal-sector",
    type: "news",
    title: "New Research Published: The Informal Sector's Role in Youth Employment",
    excerpt:
      "Our latest study on informal labor markets and portable benefits is now live, alongside a companion policy brief.",
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
  },
  {
    id: 3,
    slug: "panel-discussion-algorithmic-accountability",
    type: "event",
    title: "Panel: Algorithmic Accountability in Public Services",
    excerpt:
      "A panel discussion with technology policy researchers on due-process standards for automated eligibility systems.",
    cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
    date: "2026-10-03T16:30:00Z",
    location: "Online — link shared after RSVP",
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
  },
  {
    id: 4,
    slug: "lab-update-new-reading-list-research-methods",
    type: "news",
    title: "New Reading List: Research Methods for Policy Analysis",
    excerpt:
      "A curated set of readings and methodology guides added to the Resources section for members building research literacy.",
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
  },
  {
    id: 5,
    slug: "workshop-designing-community-surveys",
    type: "event",
    title: "Workshop: Designing Surveys That Hold Up to Scrutiny",
    excerpt:
      "A practical workshop on survey design fundamentals, using our municipal-trust study as a working example.",
    cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    date: "2026-09-26T14:00:00Z",
    location: "Future Policy Lab HQ, Room 118",
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
  },
  {
    id: 6,
    slug: "lab-milestone-first-cohort-research-published",
    type: "news",
    title: "Milestone: Our First Cohort of Research Papers Is Now Live",
    excerpt:
      "Six original studies spanning education, governance, economic development, technology, and sustainability are now published.",
    cover: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    published_at: "2025-10-09T09:00:00Z",
    base_views: 615,
    tags: ["announcement", "milestone"],
    content: `We're marking a milestone: our first full cohort of original research is now published across all five of our core themes.

## What's live

Six empirical studies, each paired with a companion policy brief, covering rural education access, municipal transparency, informal labor markets, algorithmic accountability, water scarcity adaptation, and digital literacy outcomes.

## Thank you

This cohort represents months of fieldwork, data collection, and review from our research fellows and the students who contributed interviews and survey data. Explore the full set under Research and Policy Briefs, and join the conversation on any of them under Debates.`,
  },
]

export function getMeetingsNewsBySlug(slug) {
  return meetingsNews.find((m) => m.slug === slug)
}

export function getRelatedMeetingsNews(item, limit = 3) {
  return meetingsNews
    .filter((m) => m.slug !== item.slug && m.type === item.type)
    .slice(0, limit)
}
