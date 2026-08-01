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

export function addComment(slug, { name, content }) {
  const comments = getComments(slug)
  const comment = {
    id: Date.now(),
    name,
    content,
    created_at: new Date().toISOString(),
  }
  const next = [comment, ...comments]
  writeJSON(`fpl_comments_${slug}`, next)
  return next
}
