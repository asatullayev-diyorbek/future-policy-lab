const API_BASE = `${import.meta.env.VITE_API_URL}/api`

async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

function normalizeBrief(b) {
  if (!b) return b
  return {
    ...b,
    author: { name: b.author_name, role: b.author_role, role_uz: b.author_role_uz, role_ru: b.author_role_ru },
  }
}

function normalizeDebate(d) {
  if (!d) return d
  return {
    ...d,
    forPosition: { author: d.for_author, summary: d.for_summary, summary_uz: d.for_summary_uz, summary_ru: d.for_summary_ru },
    againstPosition: { author: d.against_author, summary: d.against_summary, summary_uz: d.against_summary_uz, summary_ru: d.against_summary_ru },
  }
}

export async function getAllPolicyBriefs() {
  try {
    const rows = await apiFetch("/content/policy-briefs")
    return rows.map(normalizeBrief)
  } catch {
    return []
  }
}

export async function getPolicyBriefBySlug(slug) {
  try {
    const { brief, related } = await apiFetch(`/content/policy-briefs/${encodeURIComponent(slug)}`)
    return { brief: normalizeBrief(brief), related: (related ?? []).map(normalizeBrief) }
  } catch {
    return { brief: null, related: [] }
  }
}

export async function getAllDebates() {
  try {
    const rows = await apiFetch("/content/debates")
    return rows.map(normalizeDebate)
  } catch {
    return []
  }
}

export async function getDebateBySlug(slug) {
  try {
    const { debate, related } = await apiFetch(`/content/debates/${encodeURIComponent(slug)}`)
    return { debate: normalizeDebate(debate), related: (related ?? []).map(normalizeDebate) }
  } catch {
    return { debate: null, related: [] }
  }
}

export async function getAllMeetingsNews() {
  try {
    return await apiFetch("/content/meetings-news")
  } catch {
    return []
  }
}

export async function getMeetingsNewsBySlug(slug) {
  try {
    const { item, related } = await apiFetch(`/content/meetings-news/${encodeURIComponent(slug)}`)
    return { item, related: related ?? [] }
  } catch {
    return { item: null, related: [] }
  }
}

export async function getAllResources() {
  try {
    return await apiFetch("/content/resources")
  } catch {
    return []
  }
}

export async function getResourceBySlug(slug) {
  try {
    const { resource, related } = await apiFetch(`/content/resources/${encodeURIComponent(slug)}`)
    return { resource, related: related ?? [] }
  } catch {
    return { resource: null, related: [] }
  }
}
