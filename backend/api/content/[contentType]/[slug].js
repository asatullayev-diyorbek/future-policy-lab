import { db, setCors } from "../../_db.js"
import { requireAdmin } from "../../_auth.js"

const CONFIGS = {
  research: {
    table: "research_articles",
    matchField: "theme",
    wrapKey: "article",
    fields: `id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, author_name, author_role, author_role_uz, author_role_ru,
      published_at, read_time, base_views, video_id, tags,
      content, content_uz, content_ru, created_at, updated_at`,
    relatedFields: `id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, video_id, read_time, base_views, published_at`,
    updateColumns: [
      "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "theme", "cover", "author_name", "author_role", "author_role_uz", "author_role_ru",
      "published_at", "read_time", "base_views", "video_id", "tags",
      "content", "content_uz", "content_ru",
    ],
  },
  "policy-briefs": {
    table: "policy_briefs",
    matchField: "theme",
    wrapKey: "brief",
    fields: `id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, author_name, author_role, author_role_uz, author_role_ru,
      published_at, read_time, base_views, tags,
      recommendations, recommendations_uz, recommendations_ru, related_research_slug,
      content, content_uz, content_ru, created_at, updated_at`,
    relatedFields: `id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, read_time, base_views, published_at`,
    updateColumns: [
      "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "theme", "cover", "author_name", "author_role", "author_role_uz", "author_role_ru",
      "published_at", "read_time", "base_views", "tags",
      "recommendations", "recommendations_uz", "recommendations_ru", "related_research_slug",
      "content", "content_uz", "content_ru",
    ],
  },
  debates: {
    table: "debates",
    matchField: "theme",
    wrapKey: "debate",
    fields: `id, slug, motion, motion_uz, motion_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, status, published_at, participants, base_views, tags,
      for_author, for_summary, for_summary_uz, for_summary_ru,
      against_author, against_summary, against_summary_uz, against_summary_ru,
      created_at, updated_at`,
    relatedFields: `id, slug, motion, motion_uz, motion_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, status, base_views, published_at`,
    updateColumns: [
      "motion", "motion_uz", "motion_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "theme", "cover", "status", "published_at", "participants", "base_views", "tags",
      "for_author", "for_summary", "for_summary_uz", "for_summary_ru",
      "against_author", "against_summary", "against_summary_uz", "against_summary_ru",
    ],
  },
  "meetings-news": {
    table: "meetings_news",
    matchField: "type",
    wrapKey: "item",
    fields: `id, slug, type, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      cover, published_at, base_views, tags, content, content_uz, content_ru,
      date, location, location_uz, location_ru, base_attendees, created_at, updated_at`,
    relatedFields: `id, slug, type, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      cover, base_views, published_at, date`,
    updateColumns: [
      "type", "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "cover", "published_at", "base_views", "tags", "content", "content_uz", "content_ru",
      "date", "location", "location_uz", "location_ru", "base_attendees",
    ],
  },
  resources: {
    table: "resources",
    matchField: "kind",
    wrapKey: "resource",
    fields: `id, slug, kind, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      cover, published_at, base_views, tags, content, content_uz, content_ru,
      format, format_uz, format_ru, related_research_slug, readings, created_at, updated_at`,
    relatedFields: `id, slug, kind, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      cover, base_views, published_at`,
    updateColumns: [
      "kind", "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "cover", "published_at", "base_views", "tags", "content", "content_uz", "content_ru",
      "format", "format_uz", "format_ru", "related_research_slug", "readings",
    ],
  },
}

const JSON_COLUMNS = new Set(["tags", "recommendations", "recommendations_uz", "recommendations_ru", "readings"])

function updateValue(col, b) {
  if (JSON_COLUMNS.has(col)) return JSON.stringify(b[col] ?? [])
  if (col === "published_at") return b.published_at ?? new Date().toISOString()
  if (col === "read_time") return b.read_time ?? 5
  if (col === "base_views") return b.base_views ?? 0
  if (col === "participants") return b.participants ?? 0
  if (col === "status") return b.status ?? "open"
  return b[col] ?? null
}

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  const config = CONFIGS[req.query.contentType]
  if (!config) return res.status(404).json({ error: "Unknown content type" })
  const { slug } = req.query

  try {
    const sql = await db()

    if (req.method === "GET") {
      const rows = await sql.query(`SELECT ${config.fields} FROM ${config.table} WHERE slug = $1`, [slug])
      const entity = rows[0]
      if (!entity) return res.status(404).json({ error: "Not found" })

      const related = await sql.query(
        `SELECT ${config.relatedFields} FROM ${config.table} WHERE ${config.matchField} = $1 AND slug != $2 ORDER BY published_at DESC LIMIT 3`,
        [entity[config.matchField], slug]
      )
      return res.status(200).json({ [config.wrapKey]: entity, related })
    }

    if (req.method === "PUT") {
      requireAdmin(req)
      const b = req.body ?? {}
      const values = config.updateColumns.map((col) => updateValue(col, b))
      const setClause = config.updateColumns.map((col, i) => `${col} = $${i + 1}`).join(", ")
      const text = `UPDATE ${config.table} SET ${setClause}, updated_at = now() WHERE slug = $${config.updateColumns.length + 1} RETURNING ${config.fields}`
      const rows = await sql.query(text, [...values, slug])
      if (!rows[0]) return res.status(404).json({ error: "Not found" })
      return res.status(200).json(rows[0])
    }

    if (req.method === "DELETE") {
      requireAdmin(req)
      const rows = await sql.query(`DELETE FROM ${config.table} WHERE slug = $1 RETURNING id`, [slug])
      if (!rows[0]) return res.status(404).json({ error: "Not found" })
      return res.status(200).json({ ok: true })
    }

    res.setHeader("Allow", "GET, PUT, DELETE, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    console.error("content detail handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
