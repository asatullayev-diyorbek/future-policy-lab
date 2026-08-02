import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { LayoutDashboard, FlaskConical, LogOut } from "lucide-react"
import { clearToken } from "../utils/api"

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/research", label: "Research", icon: FlaskConical, end: false },
]

export default function Layout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 shrink-0 border-r border-white/10 bg-[#080c14] flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="font-extrabold text-white text-[15px]">Future Policy <span className="text-blue-500">Admin</span></span>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-blue-600/15 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors w-full"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 px-6 sm:px-10 py-10">
        <Outlet />
      </main>
    </div>
  )
}
