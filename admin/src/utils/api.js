const API_BASE = `${import.meta.env.VITE_API_URL}/api`
const TOKEN_KEY = "fpl_admin_jwt"

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (res.status === 401) {
    clearToken()
    const err = new Error("Unauthorized")
    err.status = 401
    throw err
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || "Login failed")
  }
  const data = await res.json()
  setToken(data.token)
  return data
}

export const getDashboard = () => request("/admin")

export const getAllResearch = () => request("/research")
export const getResearch = (slug) => request(`/research/${encodeURIComponent(slug)}`)
export const createResearch = (data) => request("/research", { method: "POST", body: JSON.stringify(data) })
export const updateResearch = (slug, data) => request(`/research/${encodeURIComponent(slug)}`, { method: "PUT", body: JSON.stringify(data) })
export const deleteResearch = (slug) => request(`/research/${encodeURIComponent(slug)}`, { method: "DELETE" })

export const getComments = (type, slug) => request(`/comments?type=${type}&slug=${encodeURIComponent(slug)}`)
export const deleteComment = (id) => request(`/comments/${id}`, { method: "DELETE" })
