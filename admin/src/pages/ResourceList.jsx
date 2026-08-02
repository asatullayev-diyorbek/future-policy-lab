import ContentList from "../components/ContentList"
import { resourcesApi } from "../utils/api"

export default function ResourceList() {
  return (
    <ContentList
      title="Resources"
      basePath="/resources"
      api={resourcesApi}
      newLabel="New resource"
      getTitle={(r) => r.title}
      getMeta={(r) => (
        <>
          <span>{r.kind}</span>
          <span>{new Date(r.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
          <span>{r.base_views} views</span>
        </>
      )}
    />
  )
}
