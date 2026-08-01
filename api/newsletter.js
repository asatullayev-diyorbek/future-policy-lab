import { db, setCors } from "./_db.js"

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { email } = req.body ?? {}
    const trimmedEmail = String(email ?? "").trim().slice(0, 200)
    if (!EMAIL_RE.test(trimmedEmail)) {
      return res.status(400).json({ error: "A valid email is required" })
    }

    const sql = await db()
    await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${trimmedEmail})
      ON CONFLICT (email) DO NOTHING
    `
    return res.status(201).json({ ok: true })
  } catch (err) {
    console.error("newsletter handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
