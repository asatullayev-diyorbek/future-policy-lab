import ContentList from "../components/ContentList"
import { meetingsNewsApi } from "../utils/api"

export default function MeetingsNewsList() {
  return (
    <ContentList
      title="Meetings & News"
      basePath="/meetings-news"
      api={meetingsNewsApi}
      newLabel="New entry"
      getTitle={(m) => m.title}
      getMeta={(m) => (
        <>
          <span>{m.type}</span>
          <span>{new Date(m.type === "event" && m.date ? m.date : m.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
          <span>{m.base_views} views</span>
        </>
      )}
    />
  )
}
