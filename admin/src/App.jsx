import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { getToken } from "./utils/api"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ResearchList from "./pages/ResearchList"
import ResearchEditor from "./pages/ResearchEditor"
import ResearchComments from "./pages/ResearchComments"

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
          <Route path="/research/:slug/comments" element={<ResearchComments />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
