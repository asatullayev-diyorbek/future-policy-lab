import ContentList from "../components/ContentList"
import { policyBriefsApi } from "../utils/api"

export default function PolicyBriefList() {
  return (
    <ContentList
      title="Policy briefs"
      basePath="/policy-briefs"
      api={policyBriefsApi}
      newLabel="New brief"
      getTitle={(b) => b.title}
      getMeta={(b) => (
        <>
          <span>{b.theme}</span>
          <span>{new Date(b.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
          <span>{b.base_views} views</span>
        </>
      )}
    />
  )
}
