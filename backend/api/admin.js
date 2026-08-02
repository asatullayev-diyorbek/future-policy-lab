import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db, setCors } from "./_db.js"
import { requireAdmin } from "./_auth.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  try {
    const sql = await db()

    // POST /api/admin — login
    if (req.method === "POST") {
      const { username, password } = req.body ?? {}
      if (!username || !password) {
        return res.status(400).json({ error: "username and password are required" })
      }
      const rows = await sql`SELECT id, username, password_hash FROM admin_users WHERE username = ${username}`
      const user = rows[0]
      if (!user) return res.status(401).json({ error: "Invalid credentials" })

      const valid = await bcrypt.compare(password, user.password_hash)
      if (!valid) return res.status(401).json({ error: "Invalid credentials" })

      const token = jwt.sign(
        { sub: user.id, username: user.username },
        process.env.ADMIN_JWT_SECRET,
        { expiresIn: "7d" }
      )
      return res.status(200).json({ token, username: user.username })
    }

    if (req.method !== "GET") {
      res.setHeader("Allow", "GET, POST, OPTIONS")
      return res.status(405).json({ error: "Method not allowed" })
    }

    // GET /api/admin?stats=1 — public site-wide engagement stats
    if (req.query.stats) {
      const [viewsRows, commentsRows] = await Promise.all([
        sql`SELECT COALESCE(SUM(count), 0)::int AS total FROM views`,
        sql`SELECT COUNT(*)::int AS total FROM comments`,
      ])
      return res.status(200).json({
        viewsDelta: viewsRows[0]?.total ?? 0,
        comments: commentsRows[0]?.total ?? 0,
      })
    }

    // GET /api/admin — dashboard (auth required)
    requireAdmin(req)
    const [contacts, newsletter, comments, rsvps] = await Promise.all([
      sql`SELECT id, name, email, topic, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 200`,
      sql`SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 500`,
      sql`SELECT id, content_type, slug, name, content, stance, created_at FROM comments ORDER BY created_at DESC LIMIT 100`,
      sql`SELECT id, event_slug, name, email, phone, created_at FROM rsvps ORDER BY created_at DESC LIMIT 200`,
    ])
    return res.status(200).json({ contacts, newsletter, comments, rsvps })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    console.error("admin handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
