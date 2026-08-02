import MeetingEntryForm from "../components/MeetingEntryForm"
import { eventsApi } from "../utils/api"

export default function EventEditor() {
  return <MeetingEntryForm isEvent api={eventsApi} basePath="/events" label="Event" />
}
