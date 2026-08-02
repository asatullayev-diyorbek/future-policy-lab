import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock } from "lucide-react"
import { login, getToken } from "../utils/api"

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (getToken()) {
    navigate("/", { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate("/", { replace: true })
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a12] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-7">
        <div className="w-11 h-11 rounded-xl bg-blue-600/15 flex items-center justify-center mb-4">
          <Lock size={19} className="text-blue-400" />
        </div>
        <h1 className="font-bold text-white text-lg mb-1">Admin login</h1>
        <p className="text-sm text-slate-500 mb-5">Future Policy Lab content management.</p>

        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Username</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50 mb-3"
          autoFocus
        />

        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50 mb-3"
        />

        {error && <p className="text-xs text-rose-400 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  )
}
