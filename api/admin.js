import { db, setCors } from "./_db.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  const token = req.headers["x-admin-token"]
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const sql = await db()

    const [contacts, newsletter, comments, rsvps] = await Promise.all([
      sql`SELECT id, name, email, topic, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 200`,
      sql`SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 500`,
      sql`SELECT id, content_type, slug, name, content, stance, created_at FROM comments ORDER BY created_at DESC LIMIT 100`,
      sql`SELECT id, event_slug, name, email, phone, created_at FROM rsvps ORDER BY created_at DESC LIMIT 200`,
    ])

    return res.status(200).json({ contacts, newsletter, comments, rsvps })
  } catch (err) {
    console.error("admin handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
