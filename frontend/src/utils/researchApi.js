const API_BASE = `${import.meta.env.VITE_API_URL}/api`

async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

function normalizeArticle(a) {
  if (!a) return a
  return {
    ...a,
    author: { name: a.author_name, role: a.author_role, role_uz: a.author_role_uz, role_ru: a.author_role_ru },
  }
}

export async function getAllResearch() {
  try {
    const rows = await apiFetch("/content/research")
    return rows.map(normalizeArticle)
  } catch {
    return []
  }
}

export async function getResearchBySlug(slug) {
  try {
    const { article, related } = await apiFetch(`/content/research/${encodeURIComponent(slug)}`)
    return { article: normalizeArticle(article), related: (related ?? []).map(normalizeArticle) }
  } catch {
    return { article: null, related: [] }
  }
}
