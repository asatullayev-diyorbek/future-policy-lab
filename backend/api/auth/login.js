import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db, setCors } from "../_db.js"

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { username, password } = req.body ?? {}
    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" })
    }

    const sql = await db()
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
  } catch (err) {
    console.error("login handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
