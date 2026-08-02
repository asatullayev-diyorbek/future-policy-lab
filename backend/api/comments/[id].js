import { db, setCors } from "../_db.js"
import { requireAdmin } from "../_auth.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()

  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    requireAdmin(req)
    const { id } = req.query
    const sql = await db()
    const rows = await sql`DELETE FROM comments WHERE id = ${id} RETURNING id`
    if (!rows[0]) return res.status(404).json({ error: "Not found" })
    return res.status(200).json({ ok: true })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    console.error("comment delete handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
