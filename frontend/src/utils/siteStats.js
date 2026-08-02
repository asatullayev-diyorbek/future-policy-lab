import { policyBriefs } from "../data/policyBriefs"
import { debates } from "../data/debates"
import { meetingsNews } from "../data/meetingsNews"
import { resources } from "../data/resources"
import { getSiteEngagementStats } from "./engagement"
import { getAllResearch } from "./researchApi"

const STATIC_CONTENT = [
  ...policyBriefs,
  ...debates,
  ...meetingsNews,
  ...resources,
]

const STATIC_BASE_VIEWS_TOTAL = STATIC_CONTENT.reduce((sum, item) => sum + (item.base_views ?? 0), 0)

export async function getSiteStats() {
  const [{ viewsDelta, comments }, researchArticles] = await Promise.all([
    getSiteEngagementStats(),
    getAllResearch(),
  ])

  const researchBaseViews = researchArticles.reduce((sum, item) => sum + (item.base_views ?? 0), 0)

  return {
    research: researchArticles.length,
    policyBriefs: policyBriefs.length,
    debates: debates.length,
    resources: resources.length,
    views: STATIC_BASE_VIEWS_TOTAL + researchBaseViews + viewsDelta,
    comments,
  }
}
