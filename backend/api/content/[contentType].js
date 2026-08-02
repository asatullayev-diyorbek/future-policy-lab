import { db, setCors } from "../_db.js"
import { requireAdmin } from "../_auth.js"

const CONFIGS = {
  research: {
    table: "research_articles",
    filterParam: "theme",
    fields: `id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, author_name, author_role, author_role_uz, author_role_ru,
      published_at, read_time, base_views, video_id, tags,
      content, content_uz, content_ru, created_at, updated_at`,
    required: ["slug", "title", "theme"],
    insertColumns: [
      "slug", "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "theme", "cover", "author_name", "author_role", "author_role_uz", "author_role_ru",
      "published_at", "read_time", "base_views", "video_id", "tags",
      "content", "content_uz", "content_ru",
    ],
  },
  "policy-briefs": {
    table: "policy_briefs",
    filterParam: "theme",
    fields: `id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, author_name, author_role, author_role_uz, author_role_ru,
      published_at, read_time, base_views, tags,
      recommendations, recommendations_uz, recommendations_ru, related_research_slug,
      content, content_uz, content_ru, created_at, updated_at`,
    required: ["slug", "title", "theme"],
    insertColumns: [
      "slug", "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "theme", "cover", "author_name", "author_role", "author_role_uz", "author_role_ru",
      "published_at", "read_time", "base_views", "tags",
      "recommendations", "recommendations_uz", "recommendations_ru", "related_research_slug",
      "content", "content_uz", "content_ru",
    ],
  },
  debates: {
    table: "debates",
    filterParam: "theme",
    fields: `id, slug, motion, motion_uz, motion_ru, excerpt, excerpt_uz, excerpt_ru,
      theme, cover, status, published_at, participants, base_views, tags,
      for_author, for_summary, for_summary_uz, for_summary_ru,
      against_author, against_summary, against_summary_uz, against_summary_ru,
      created_at, updated_at`,
    required: ["slug", "motion", "theme"],
    insertColumns: [
      "slug", "motion", "motion_uz", "motion_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "theme", "cover", "status", "published_at", "participants", "base_views", "tags",
      "for_author", "for_summary", "for_summary_uz", "for_summary_ru",
      "against_author", "against_summary", "against_summary_uz", "against_summary_ru",
    ],
  },
  "meetings-news": {
    table: "meetings_news",
    filterParam: "type",
    fields: `id, slug, type, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      cover, published_at, base_views, tags, content, content_uz, content_ru,
      date, location, location_uz, location_ru, base_attendees, created_at, updated_at`,
    required: ["slug", "title", "type"],
    insertColumns: [
      "slug", "type", "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "cover", "published_at", "base_views", "tags", "content", "content_uz", "content_ru",
      "date", "location", "location_uz", "location_ru", "base_attendees",
    ],
  },
  resources: {
    table: "resources",
    filterParam: "kind",
    fields: `id, slug, kind, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
      cover, published_at, base_views, tags, content, content_uz, content_ru,
      format, format_uz, format_ru, related_research_slug, readings, created_at, updated_at`,
    required: ["slug", "title", "kind"],
    insertColumns: [
      "slug", "kind", "title", "title_uz", "title_ru", "excerpt", "excerpt_uz", "excerpt_ru",
      "cover", "published_at", "base_views", "tags", "content", "content_uz", "content_ru",
      "format", "format_uz", "format_ru", "related_research_slug", "readings",
    ],
  },
}

const JSON_COLUMNS = new Set(["tags", "recommendations", "recommendations_uz", "recommendations_ru", "readings"])

function insertValue(col, b) {
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

  try {
    const sql = await db()

    if (req.method === "GET") {
      const filterValue = req.query[config.filterParam]
      const text = filterValue
        ? `SELECT ${config.fields} FROM ${config.table} WHERE ${config.filterParam} = $1 ORDER BY published_at DESC`
        : `SELECT ${config.fields} FROM ${config.table} ORDER BY published_at DESC`
      const rows = await sql.query(text, filterValue ? [filterValue] : [])
      return res.status(200).json(rows)
    }

    if (req.method === "POST") {
      requireAdmin(req)
      const b = req.body ?? {}
      if (config.required.some((f) => !b[f])) {
        return res.status(400).json({ error: `${config.required.join(", ")} are required` })
      }
      const values = config.insertColumns.map((col) => insertValue(col, b))
      const placeholders = config.insertColumns.map((_, i) => `$${i + 1}`).join(", ")
      const text = `INSERT INTO ${config.table} (${config.insertColumns.join(", ")}) VALUES (${placeholders}) RETURNING ${config.fields}`
      const rows = await sql.query(text, values)
      return res.status(201).json(rows[0])
    }

    res.setHeader("Allow", "GET, POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    if (err.code === "23505") return res.status(409).json({ error: "Slug already exists" })
    console.error("content list handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
