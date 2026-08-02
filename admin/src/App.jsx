import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { getToken } from "./utils/api"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ContentComments from "./components/ContentComments"
import ResearchList from "./pages/ResearchList"
import ResearchEditor from "./pages/ResearchEditor"
import PolicyBriefList from "./pages/PolicyBriefList"
import PolicyBriefEditor from "./pages/PolicyBriefEditor"
import DebateList from "./pages/DebateList"
import DebateEditor from "./pages/DebateEditor"
import MeetingsNewsList from "./pages/MeetingsNewsList"
import MeetingsNewsEditor from "./pages/MeetingsNewsEditor"
import ResourceList from "./pages/ResourceList"
import ResourceEditor from "./pages/ResourceEditor"

function RequireAuth({ children }) {
  if (!getToken()) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Dashboard />} />

          <Route path="/research" element={<ResearchList />} />
          <Route path="/research/new" element={<ResearchEditor />} />
          <Route path="/research/:slug/edit" element={<ResearchEditor />} />
          <Route path="/research/:slug/comments" element={<ContentComments contentType="research" backPath="/research" />} />

          <Route path="/policy-briefs" element={<PolicyBriefList />} />
          <Route path="/policy-briefs/new" element={<PolicyBriefEditor />} />
          <Route path="/policy-briefs/:slug/edit" element={<PolicyBriefEditor />} />
          <Route path="/policy-briefs/:slug/comments" element={<ContentComments contentType="policy-brief" backPath="/policy-briefs" />} />

          <Route path="/debates" element={<DebateList />} />
          <Route path="/debates/new" element={<DebateEditor />} />
          <Route path="/debates/:slug/edit" element={<DebateEditor />} />
          <Route path="/debates/:slug/comments" element={<ContentComments contentType="debate" backPath="/debates" />} />

          <Route path="/meetings-news" element={<MeetingsNewsList />} />
          <Route path="/meetings-news/new" element={<MeetingsNewsEditor />} />
          <Route path="/meetings-news/:slug/edit" element={<MeetingsNewsEditor />} />
          <Route path="/meetings-news/:slug/comments" element={<ContentComments contentType="meeting-news" backPath="/meetings-news" />} />

          <Route path="/resources" element={<ResourceList />} />
          <Route path="/resources/new" element={<ResourceEditor />} />
          <Route path="/resources/:slug/edit" element={<ResourceEditor />} />
          <Route path="/resources/:slug/comments" element={<ContentComments contentType="resource" backPath="/resources" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
