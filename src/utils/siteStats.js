import { researchArticles } from "../data/research"
import { policyBriefs } from "../data/policyBriefs"
import { debates } from "../data/debates"
import { meetingsNews } from "../data/meetingsNews"
import { resources } from "../data/resources"
import { getSiteEngagementStats } from "./engagement"

const ALL_CONTENT = [
  ...researchArticles,
  ...policyBriefs,
  ...debates,
  ...meetingsNews,
  ...resources,
]

const BASE_VIEWS_TOTAL = ALL_CONTENT.reduce((sum, item) => sum + (item.base_views ?? 0), 0)

export async function getSiteStats() {
  const { viewsDelta, comments } = await getSiteEngagementStats()

  return {
    research: researchArticles.length,
    policyBriefs: policyBriefs.length,
    debates: debates.length,
    resources: resources.length,
    views: BASE_VIEWS_TOTAL + viewsDelta,
    comments,
  }
}
