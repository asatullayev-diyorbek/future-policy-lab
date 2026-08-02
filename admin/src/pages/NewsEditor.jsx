import MeetingEntryForm from "../components/MeetingEntryForm"
import { newsApi } from "../utils/api"

export default function NewsEditor() {
  return <MeetingEntryForm isEvent={false} api={newsApi} basePath="/news" label="News item" />
}
