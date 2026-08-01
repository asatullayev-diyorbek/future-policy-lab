function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable — fail silently
  }
}

export function recordView(slug, baseViews) {
  const key = `fpl_viewed_${slug}`
  const countsKey = "fpl_view_counts"
  const counts = readJSON(countsKey, {})

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, "1")
    counts[slug] = (counts[slug] ?? 0) + 1
    writeJSON(countsKey, counts)
  } else if (counts[slug] === undefined) {
    counts[slug] = 0
    writeJSON(countsKey, counts)
  }

  return baseViews + (counts[slug] ?? 0)
}

export function getComments(slug) {
  return readJSON(`fpl_comments_${slug}`, [])
}

export function addComment(slug, fields) {
  const comments = getComments(slug)
  const comment = {
    id: Date.now(),
    created_at: new Date().toISOString(),
    ...fields,
  }
  const next = [comment, ...comments]
  writeJSON(`fpl_comments_${slug}`, next)
  return next
}

export function getRSVP(slug) {
  return readJSON(`fpl_rsvp_${slug}`, null)
}

export function isAttending(slug) {
  return getRSVP(slug) !== null
}

export function submitRSVP(slug, { name, email, phone }, baseAttendees) {
  writeJSON(`fpl_rsvp_${slug}`, {
    name,
    email,
    phone,
    registered_at: new Date().toISOString(),
  })
  return { attending: true, count: getAttendeeCount(slug, baseAttendees) }
}

export function cancelRSVP(slug, baseAttendees) {
  localStorage.removeItem(`fpl_rsvp_${slug}`)
  return { attending: false, count: getAttendeeCount(slug, baseAttendees) }
}

export function getAttendeeCount(slug, baseAttendees) {
  return baseAttendees + (isAttending(slug) ? 1 : 0)
}
