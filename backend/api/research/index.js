import { db, setCors } from "../_db.js"
import { requireAdmin } from "../_auth.js"

const FIELDS = `
  id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
  theme, cover, author_name, author_role, author_role_uz, author_role_ru,
  published_at, read_time, base_views, video_id, tags,
  content, content_uz, content_ru, created_at, updated_at
`

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  try {
    const sql = await db()

    if (req.method === "GET") {
      const { theme } = req.query
      const rows = theme
        ? await sql`SELECT ${sql.unsafe(FIELDS)} FROM research_articles WHERE theme = ${theme} ORDER BY published_at DESC`
        : await sql`SELECT ${sql.unsafe(FIELDS)} FROM research_articles ORDER BY published_at DESC`
      return res.status(200).json(rows)
    }

    if (req.method === "POST") {
      requireAdmin(req)
      const b = req.body ?? {}
      if (!b.slug || !b.title || !b.theme) {
        return res.status(400).json({ error: "slug, title, and theme are required" })
      }
      const rows = await sql`
        INSERT INTO research_articles (
          slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
          theme, cover, author_name, author_role, author_role_uz, author_role_ru,
          published_at, read_time, base_views, video_id, tags,
          content, content_uz, content_ru
        ) VALUES (
          ${b.slug}, ${b.title}, ${b.title_uz ?? null}, ${b.title_ru ?? null},
          ${b.excerpt ?? null}, ${b.excerpt_uz ?? null}, ${b.excerpt_ru ?? null},
          ${b.theme}, ${b.cover ?? null},
          ${b.author_name ?? null}, ${b.author_role ?? null}, ${b.author_role_uz ?? null}, ${b.author_role_ru ?? null},
          ${b.published_at ?? new Date().toISOString()}, ${b.read_time ?? 5}, ${b.base_views ?? 0},
          ${b.video_id ?? null}, ${JSON.stringify(b.tags ?? [])},
          ${b.content ?? null}, ${b.content_uz ?? null}, ${b.content_ru ?? null}
        )
        RETURNING ${sql.unsafe(FIELDS)}
      `
      return res.status(201).json(rows[0])
    }

    res.setHeader("Allow", "GET, POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    if (err.code === "23505") return res.status(409).json({ error: "Slug already exists" })
    console.error("research index handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
