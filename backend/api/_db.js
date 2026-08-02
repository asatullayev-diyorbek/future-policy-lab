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

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(60) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS research_articles (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      title VARCHAR(300) NOT NULL,
      title_uz VARCHAR(300),
      title_ru VARCHAR(300),
      excerpt TEXT,
      excerpt_uz TEXT,
      excerpt_ru TEXT,
      theme VARCHAR(50) NOT NULL,
      cover TEXT,
      author_name VARCHAR(120),
      author_role VARCHAR(120),
      author_role_uz VARCHAR(120),
      author_role_ru VARCHAR(120),
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      read_time INTEGER DEFAULT 5,
      base_views INTEGER DEFAULT 0,
      video_id VARCHAR(50),
      tags JSONB NOT NULL DEFAULT '[]',
      content TEXT,
      content_uz TEXT,
      content_ru TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS policy_briefs (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      title VARCHAR(300) NOT NULL,
      title_uz VARCHAR(300),
      title_ru VARCHAR(300),
      excerpt TEXT,
      excerpt_uz TEXT,
      excerpt_ru TEXT,
      theme VARCHAR(50) NOT NULL,
      cover TEXT,
      author_name VARCHAR(120),
      author_role VARCHAR(120),
      author_role_uz VARCHAR(120),
      author_role_ru VARCHAR(120),
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      read_time INTEGER DEFAULT 5,
      base_views INTEGER DEFAULT 0,
      tags JSONB NOT NULL DEFAULT '[]',
      recommendations JSONB NOT NULL DEFAULT '[]',
      recommendations_uz JSONB NOT NULL DEFAULT '[]',
      recommendations_ru JSONB NOT NULL DEFAULT '[]',
      related_research_slug VARCHAR(200),
      content TEXT,
      content_uz TEXT,
      content_ru TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS debates (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      motion VARCHAR(300) NOT NULL,
      motion_uz VARCHAR(300),
      motion_ru VARCHAR(300),
      excerpt TEXT,
      excerpt_uz TEXT,
      excerpt_ru TEXT,
      theme VARCHAR(50) NOT NULL,
      cover TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'open',
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      participants INTEGER DEFAULT 0,
      base_views INTEGER DEFAULT 0,
      tags JSONB NOT NULL DEFAULT '[]',
      for_author VARCHAR(120),
      for_summary TEXT,
      for_summary_uz TEXT,
      for_summary_ru TEXT,
      against_author VARCHAR(120),
      against_summary TEXT,
      against_summary_uz TEXT,
      against_summary_ru TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS meetings_news (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      type VARCHAR(20) NOT NULL,
      title VARCHAR(300) NOT NULL,
      title_uz VARCHAR(300),
      title_ru VARCHAR(300),
      excerpt TEXT,
      excerpt_uz TEXT,
      excerpt_ru TEXT,
      cover TEXT,
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      base_views INTEGER DEFAULT 0,
      tags JSONB NOT NULL DEFAULT '[]',
      content TEXT,
      content_uz TEXT,
      content_ru TEXT,
      date TIMESTAMPTZ,
      location VARCHAR(300),
      location_uz VARCHAR(300),
      location_ru VARCHAR(300),
      base_attendees INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS resources (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(200) NOT NULL UNIQUE,
      kind VARCHAR(20) NOT NULL,
      title VARCHAR(300) NOT NULL,
      title_uz VARCHAR(300),
      title_ru VARCHAR(300),
      excerpt TEXT,
      excerpt_uz TEXT,
      excerpt_ru TEXT,
      cover TEXT,
      published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      base_views INTEGER DEFAULT 0,
      tags JSONB NOT NULL DEFAULT '[]',
      content TEXT,
      content_uz TEXT,
      content_ru TEXT,
      format VARCHAR(300),
      format_uz VARCHAR(300),
      format_ru VARCHAR(300),
      related_research_slug VARCHAR(200),
      readings JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
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
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

const CONTENT_TYPES = new Set(["research", "policy-brief", "debate", "meeting-news", "resource"])

export function isValidContentType(type) {
  return CONTENT_TYPES.has(type)
}
