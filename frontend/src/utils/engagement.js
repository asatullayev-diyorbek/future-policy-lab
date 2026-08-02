const API_BASE = `${import.meta.env.VITE_API_URL}/api`

async function apiFetch(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

function viewedKey(type, slug) {
  return `fpl_viewed_${type}_${slug}`
}

function rsvpKey(slug) {
  return `fpl_rsvp_${slug}`
}

// Returns the current view count without incrementing (safe for read-only displays).
export async function getViewCount(type, slug, baseViews) {
  try {
    const { count } = await apiFetch(`/views?type=${type}&slug=${encodeURIComponent(slug)}`)
    return baseViews + count
  } catch {
    return baseViews
  }
}

// Increments the view count once per browser (localStorage-guarded) and returns the new total.
export async function recordView(type, slug, baseViews) {
  const key = viewedKey(type, slug)
  try {
    if (!localStorage.getItem(key)) {
      const { count } = await apiFetch("/views", {
        method: "POST",
        body: JSON.stringify({ type, slug }),
      })
      localStorage.setItem(key, "1")
      return baseViews + count
    }
    return getViewCount(type, slug, baseViews)
  } catch {
    return baseViews
  }
}

export async function getComments(type, slug) {
  try {
    return await apiFetch(`/comments?type=${type}&slug=${encodeURIComponent(slug)}`)
  } catch {
    return []
  }
}

export async function addComment(type, slug, fields) {
  const created = await apiFetch("/comments", {
    method: "POST",
    body: JSON.stringify({ type, slug, ...fields }),
  })
  const rest = await getComments(type, slug)
  return [created, ...rest.filter((c) => c.id !== created.id)]
}

export function getRSVP(slug) {
  try {
    const raw = localStorage.getItem(rsvpKey(slug))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function isAttending(slug) {
  return getRSVP(slug) !== null
}

export async function getAttendeeCount(slug, baseAttendees) {
  try {
    const { count } = await apiFetch(`/rsvps?slug=${encodeURIComponent(slug)}`)
    return baseAttendees + count
  } catch {
    return baseAttendees
  }
}

export async function submitRSVP(slug, { name, email, phone }, baseAttendees) {
  const { id, count } = await apiFetch("/rsvps", {
    method: "POST",
    body: JSON.stringify({ slug, name, email, phone }),
  })
  localStorage.setItem(rsvpKey(slug), JSON.stringify({ id, name, email, phone, registered_at: new Date().toISOString() }))
  return { attending: true, count: baseAttendees + count }
}

export async function cancelRSVP(slug, baseAttendees) {
  const rsvp = getRSVP(slug)
  localStorage.removeItem(rsvpKey(slug))
  try {
    if (rsvp?.id) {
      const { count } = await apiFetch(`/rsvps?id=${rsvp.id}&slug=${encodeURIComponent(slug)}`, { method: "DELETE" })
      return { attending: false, count: baseAttendees + count }
    }
  } catch {
    // fall through to recompute below
  }
  const count = await getAttendeeCount(slug, baseAttendees)
  return { attending: false, count }
}

export async function submitContact(fields) {
  return apiFetch("/contact", { method: "POST", body: JSON.stringify(fields) })
}

export async function subscribeNewsletter(email) {
  return apiFetch("/newsletter", { method: "POST", body: JSON.stringify({ email }) })
}

export async function getSiteEngagementStats() {
  try {
    return await apiFetch("/admin?stats=1")
  } catch {
    return { viewsDelta: 0, comments: 0 }
  }
}
