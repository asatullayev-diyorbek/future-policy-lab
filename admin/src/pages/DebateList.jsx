import ContentList from "../components/ContentList"
import { debatesApi } from "../utils/api"

export default function DebateList() {
  return (
    <ContentList
      title="Debates"
      basePath="/debates"
      api={debatesApi}
      newLabel="New debate"
      getTitle={(d) => d.motion}
      getMeta={(d) => (
        <>
          <span>{d.theme}</span>
          <span>{d.status}</span>
          <span>{new Date(d.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
          <span>{d.base_views} views</span>
        </>
      )}
    />
  )
}
