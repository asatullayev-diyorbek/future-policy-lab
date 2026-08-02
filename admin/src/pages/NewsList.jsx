import ContentList from "../components/ContentList"
import { newsApi } from "../utils/api"

export default function NewsList() {
  return (
    <ContentList
      title="News"
      basePath="/news"
      api={newsApi}
      newLabel="New news item"
      getTitle={(m) => m.title}
      getMeta={(m) => (
        <>
          <span>{new Date(m.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
          <span>{m.base_views} views</span>
        </>
      )}
    />
  )
}
