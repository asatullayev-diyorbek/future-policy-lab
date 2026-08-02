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

  const { slug } = req.query

  try {
    const sql = await db()

    if (req.method === "GET") {
      const rows = await sql`SELECT ${sql.unsafe(FIELDS)} FROM research_articles WHERE slug = ${slug}`
      const article = rows[0]
      if (!article) return res.status(404).json({ error: "Not found" })

      const related = await sql`
        SELECT id, slug, title, title_uz, title_ru, excerpt, excerpt_uz, excerpt_ru,
               theme, cover, video_id, read_time, base_views, published_at
        FROM research_articles
        WHERE theme = ${article.theme} AND slug != ${slug}
        ORDER BY published_at DESC
        LIMIT 3
      `
      return res.status(200).json({ article, related })
    }

    if (req.method === "PUT") {
      requireAdmin(req)
      const b = req.body ?? {}
      const rows = await sql`
        UPDATE research_articles SET
          title = ${b.title}, title_uz = ${b.title_uz ?? null}, title_ru = ${b.title_ru ?? null},
          excerpt = ${b.excerpt ?? null}, excerpt_uz = ${b.excerpt_uz ?? null}, excerpt_ru = ${b.excerpt_ru ?? null},
          theme = ${b.theme}, cover = ${b.cover ?? null},
          author_name = ${b.author_name ?? null}, author_role = ${b.author_role ?? null},
          author_role_uz = ${b.author_role_uz ?? null}, author_role_ru = ${b.author_role_ru ?? null},
          published_at = ${b.published_at ?? new Date().toISOString()},
          read_time = ${b.read_time ?? 5}, base_views = ${b.base_views ?? 0},
          video_id = ${b.video_id ?? null}, tags = ${JSON.stringify(b.tags ?? [])},
          content = ${b.content ?? null}, content_uz = ${b.content_uz ?? null}, content_ru = ${b.content_ru ?? null},
          updated_at = now()
        WHERE slug = ${slug}
        RETURNING ${sql.unsafe(FIELDS)}
      `
      if (!rows[0]) return res.status(404).json({ error: "Not found" })
      return res.status(200).json(rows[0])
    }

    if (req.method === "DELETE") {
      requireAdmin(req)
      const rows = await sql`DELETE FROM research_articles WHERE slug = ${slug} RETURNING id`
      if (!rows[0]) return res.status(404).json({ error: "Not found" })
      return res.status(200).json({ ok: true })
    }

    res.setHeader("Allow", "GET, PUT, DELETE, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    console.error("research slug handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
