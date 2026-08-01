import { researchArticles } from "../data/research"
import { policyBriefs } from "../data/policyBriefs"
import { debates } from "../data/debates"
import { meetingsNews } from "../data/meetingsNews"
import { resources } from "../data/resources"
import { getComments, getViewCount } from "./engagement"

const ALL_CONTENT = [
  ...researchArticles,
  ...policyBriefs,
  ...debates,
  ...meetingsNews,
  ...resources,
]

export function getSiteStats() {
  let totalViews = 0
  let totalComments = 0

  for (const item of ALL_CONTENT) {
    totalViews += getViewCount(item.slug, item.base_views)
    totalComments += getComments(item.slug).length
  }

  return {
    research: researchArticles.length,
    policyBriefs: policyBriefs.length,
    debates: debates.length,
    resources: resources.length,
    views: totalViews,
    comments: totalComments,
  }
}
