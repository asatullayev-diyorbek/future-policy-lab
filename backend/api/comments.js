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
        SELECT id, name, content, stance, created_at
        FROM comments
        WHERE content_type = ${type} AND slug = ${slug}
        ORDER BY created_at DESC
      `
      return res.status(200).json(rows)
    }

    if (req.method === "POST") {
      const { type, slug, name, content, stance } = req.body ?? {}
      if (!isValidContentType(type) || !slug) {
        return res.status(400).json({ error: "type and slug are required" })
      }
      const trimmedName = String(name ?? "").trim().slice(0, 120)
      const trimmedContent = String(content ?? "").trim().slice(0, 4000)
      if (!trimmedName || !trimmedContent) {
        return res.status(400).json({ error: "name and content are required" })
      }
      const safeStance = ["for", "against", "undecided"].includes(stance) ? stance : null

      const rows = await sql`
        INSERT INTO comments (content_type, slug, name, content, stance)
        VALUES (${type}, ${slug}, ${trimmedName}, ${trimmedContent}, ${safeStance})
        RETURNING id, name, content, stance, created_at
      `
      return res.status(201).json(rows[0])
    }

    res.setHeader("Allow", "GET, POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    console.error("comments handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
