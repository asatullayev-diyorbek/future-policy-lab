import { db, setCors } from "./_db.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  try {
    const sql = await db()

    if (req.method === "GET") {
      const { slug } = req.query
      if (!slug) return res.status(400).json({ error: "slug is required" })
      const rows = await sql`
        SELECT COUNT(*)::int AS count FROM rsvps WHERE event_slug = ${slug}
      `
      return res.status(200).json({ count: rows[0]?.count ?? 0 })
    }

    if (req.method === "POST") {
      const { slug, name, email, phone } = req.body ?? {}
      const trimmedName = String(name ?? "").trim().slice(0, 120)
      const trimmedEmail = String(email ?? "").trim().slice(0, 200)
      const trimmedPhone = String(phone ?? "").trim().slice(0, 50)

      if (!slug || !trimmedName) {
        return res.status(400).json({ error: "slug and name are required" })
      }
      if (!trimmedEmail && !trimmedPhone) {
        return res.status(400).json({ error: "email or phone is required" })
      }

      const rows = await sql`
        INSERT INTO rsvps (event_slug, name, email, phone)
        VALUES (${slug}, ${trimmedName}, ${trimmedEmail || null}, ${trimmedPhone || null})
        RETURNING id
      `
      const countRows = await sql`
        SELECT COUNT(*)::int AS count FROM rsvps WHERE event_slug = ${slug}
      `
      return res.status(201).json({ id: rows[0].id, count: countRows[0].count })
    }

    if (req.method === "DELETE") {
      const { id, slug } = req.query
      if (!id || !slug) return res.status(400).json({ error: "id and slug are required" })

      await sql`DELETE FROM rsvps WHERE id = ${id} AND event_slug = ${slug}`
      const countRows = await sql`
        SELECT COUNT(*)::int AS count FROM rsvps WHERE event_slug = ${slug}
      `
      return res.status(200).json({ count: countRows[0].count })
    }

    res.setHeader("Allow", "GET, POST, DELETE, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    console.error("rsvps handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
