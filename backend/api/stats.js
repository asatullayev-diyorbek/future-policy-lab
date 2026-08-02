import { db, setCors } from "./_db.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const sql = await db()

    const [viewsRows, commentsRows] = await Promise.all([
      sql`SELECT COALESCE(SUM(count), 0)::int AS total FROM views`,
      sql`SELECT COUNT(*)::int AS total FROM comments`,
    ])

    return res.status(200).json({
      viewsDelta: viewsRows[0]?.total ?? 0,
      comments: commentsRows[0]?.total ?? 0,
    })
  } catch (err) {
    console.error("stats handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
