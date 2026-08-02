import { put } from "@vercel/blob"
import { setCors } from "./_db.js"
import { requireAdmin } from "./_auth.js"

const MAX_BYTES = 8 * 1024 * 1024 // 8MB

export default async function handler(req, res) {
  setCors(res)
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    requireAdmin(req)
    const { filename, contentType, dataBase64 } = req.body ?? {}
    if (!filename || !contentType || !dataBase64) {
      return res.status(400).json({ error: "filename, contentType, and dataBase64 are required" })
    }
    if (!contentType.startsWith("image/")) {
      return res.status(400).json({ error: "Only image uploads are allowed" })
    }

    const buffer = Buffer.from(dataBase64, "base64")
    if (buffer.length > MAX_BYTES) {
      return res.status(400).json({ error: "File too large (max 8MB)" })
    }

    const blob = await put(filename, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return res.status(201).json({ url: blob.url })
  } catch (err) {
    if (err.status === 401) return res.status(401).json({ error: "Unauthorized" })
    console.error("upload handler error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
