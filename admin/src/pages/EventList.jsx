import ContentList from "../components/ContentList"
import { eventsApi } from "../utils/api"

export default function EventList() {
  return (
    <ContentList
      title="Events"
      basePath="/events"
      api={eventsApi}
      newLabel="New event"
      getTitle={(m) => m.title}
      getMeta={(m) => (
        <>
          <span>{new Date(m.date ?? m.published_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
          <span>{m.base_views} views</span>
        </>
      )}
    />
  )
}
