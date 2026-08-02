import jwt from "jsonwebtoken"

export function requireAdmin(req) {
  const header = req.headers["authorization"] || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) {
    const err = new Error("Unauthorized")
    err.status = 401
    throw err
  }
  try {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET)
  } catch {
    const err = new Error("Unauthorized")
    err.status = 401
    throw err
  }
}
