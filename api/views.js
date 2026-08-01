import { db, setCors, isValidContentType } from "./_db.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  try {
    const sql = await db()

    if (req.method === "GET") {
      const { type, slug } = req.query
      if (!isValidContentType(type) || !slug) {
        return res.status(400).json({ error: "type and slug are required" })
      }
      const rows = await sql`
        SELECT count FROM views WHERE content_type = ${type} AND slug = ${slug}
      `
      return res.status(200).json({ count: rows[0]?.count ?? 0 })
    }

    if (req.method === "POST") {
      const { type, slug } = req.body ?? {}
      if (!isValidContentType(type) || !slug) {
        return res.status(400).json({ error: "type and slug are required" })
      }
      const rows = await sql`
        INSERT INTO views (content_type, slug, count)
        VALUES (${type}, ${slug}, 1)
        ON CONFLICT (content_type, slug)
        DO UPDATE SET count = views.count + 1
        RETURNING count
      `
      return res.status(200).json({ count: rows[0].count })
    }

    res.setHeader("Allow", "GET, POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    console.error("views handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
