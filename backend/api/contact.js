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
    const { name, email, topic, message } = req.body ?? {}
    const trimmedName = String(name ?? "").trim().slice(0, 120)
    const trimmedEmail = String(email ?? "").trim().slice(0, 200)
    const trimmedTopic = String(topic ?? "").trim().slice(0, 120)
    const trimmedMessage = String(message ?? "").trim().slice(0, 4000)

    if (!trimmedName || !EMAIL_RE.test(trimmedEmail) || trimmedMessage.length < 10) {
      return res.status(400).json({ error: "Valid name, email, and message (10+ chars) are required" })
    }

    const sql = await db()
    const rows = await sql`
      INSERT INTO contact_messages (name, email, topic, message)
      VALUES (${trimmedName}, ${trimmedEmail}, ${trimmedTopic || null}, ${trimmedMessage})
      RETURNING id, created_at
    `
    return res.status(201).json(rows[0])
  } catch (err) {
    console.error("contact handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
