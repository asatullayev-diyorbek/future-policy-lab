import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useThemeStore } from "./store/theme"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Research from "./pages/Research"
import ResearchDetail from "./pages/ResearchDetail"
import PolicyBriefs from "./pages/PolicyBriefs"
import PolicyBriefDetail from "./pages/PolicyBriefDetail"
import Debates from "./pages/Debates"
import MeetingsNews from "./pages/MeetingsNews"
import Resources from "./pages/Resources"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

export default function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:slug" element={<ResearchDetail />} />
          <Route path="/policy-briefs" element={<PolicyBriefs />} />
          <Route path="/policy-briefs/:slug" element={<PolicyBriefDetail />} />
          <Route path="/debates" element={<Debates />} />
          <Route path="/meetings-news" element={<MeetingsNews />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
