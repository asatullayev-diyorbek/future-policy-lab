import { neon } from "@neondatabase/serverless"

let _sql = null
let _schemaReady = null

function getSql() {
  if (!_sql) _sql = neon(process.env.DATABASE_URL)
  return _sql
}

async function ensureSchema() {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content_type VARCHAR(20) NOT NULL,
      slug VARCHAR(200) NOT NULL,
      name VARCHAR(120) NOT NULL,
      content TEXT NOT NULL,
      stance VARCHAR(20),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_type, slug)`

  await sql`
    CREATE TABLE IF NOT EXISTS views (
      content_type VARCHAR(20) NOT NULL,
      slug VARCHAR(200) NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (content_type, slug)
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      event_slug VARCHAR(200) NOT NULL,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(200),
      phone VARCHAR(50),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_rsvps_event ON rsvps(event_slug)`

  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(200) NOT NULL,
      topic VARCHAR(120),
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(200) NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

export async function db() {
  if (!_schemaReady) _schemaReady = ensureSchema()
  await _schemaReady
  return getSql()
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

const CONTENT_TYPES = new Set(["research", "policy-brief", "debate", "meeting-news", "resource"])

export function isValidContentType(type) {
  return CONTENT_TYPES.has(type)
}
