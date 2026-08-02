import { getSiteEngagementStats } from "./engagement"
import { getAllResearch } from "./researchApi"
import { getAllPolicyBriefs, getAllDebates, getAllMeetingsNews, getAllResources } from "./contentApi"

export async function getSiteStats() {
  const [{ viewsDelta, comments }, research, policyBriefs, debates, meetingsNews, resources] = await Promise.all([
    getSiteEngagementStats(),
    getAllResearch(),
    getAllPolicyBriefs(),
    getAllDebates(),
    getAllMeetingsNews(),
    getAllResources(),
  ])

  const baseViewsTotal = [...research, ...policyBriefs, ...debates, ...meetingsNews, ...resources]
    .reduce((sum, item) => sum + (item.base_views ?? 0), 0)

  return {
    research: research.length,
    policyBriefs: policyBriefs.length,
    debates: debates.length,
    resources: resources.length,
    views: baseViewsTotal + viewsDelta,
    comments,
  }
}
