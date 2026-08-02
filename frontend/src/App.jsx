import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, Suspense, lazy } from "react"
import { useThemeStore } from "./store/theme"
import MainLayout from "./layouts/MainLayout"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Research = lazy(() => import("./pages/Research"))
const ResearchDetail = lazy(() => import("./pages/ResearchDetail"))
const PolicyBriefs = lazy(() => import("./pages/PolicyBriefs"))
const PolicyBriefDetail = lazy(() => import("./pages/PolicyBriefDetail"))
const Debates = lazy(() => import("./pages/Debates"))
const DebateDetail = lazy(() => import("./pages/DebateDetail"))
const Events = lazy(() => import("./pages/Events"))
const News = lazy(() => import("./pages/News"))
const MeetingNewsDetail = lazy(() => import("./pages/MeetingNewsDetail"))
const Resources = lazy(() => import("./pages/Resources"))
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"))
const Contact = lazy(() => import("./pages/Contact"))
const NotFound = lazy(() => import("./pages/NotFound"))

export default function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:slug" element={<ResearchDetail />} />
            <Route path="/policy-briefs" element={<PolicyBriefs />} />
            <Route path="/policy-briefs/:slug" element={<PolicyBriefDetail />} />
            <Route path="/debates" element={<Debates />} />
            <Route path="/debates/:slug" element={<DebateDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<MeetingNewsDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<MeetingNewsDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
