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
  const res = await fetch(`${API_BASE}/admin`, {
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

function createResource(type) {
  return {
    getAll: () => request(`/content/${type}`),
    getOne: (slug) => request(`/content/${type}/${encodeURIComponent(slug)}`),
    create: (data) => request(`/content/${type}`, { method: "POST", body: JSON.stringify(data) }),
    update: (slug, data) => request(`/content/${type}/${encodeURIComponent(slug)}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (slug) => request(`/content/${type}/${encodeURIComponent(slug)}`, { method: "DELETE" }),
  }
}

const researchApi = createResource("research")
export const getAllResearch = researchApi.getAll
export const getResearch = researchApi.getOne
export const createResearch = researchApi.create
export const updateResearch = researchApi.update
export const deleteResearch = researchApi.remove

export const getComments = (type, slug) => request(`/comments?type=${type}&slug=${encodeURIComponent(slug)}`)
export const deleteComment = (id) => request(`/comments/${id}`, { method: "DELETE" })

export const policyBriefsApi = createResource("policy-briefs")
export const debatesApi = createResource("debates")
export const meetingsNewsApi = createResource("meetings-news")
export const resourcesApi = createResource("resources")

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(",")[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function uploadImage(file) {
  const dataBase64 = await fileToBase64(file)
  const { url } = await request("/upload", {
    method: "POST",
    body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 }),
  })
  return url
}
