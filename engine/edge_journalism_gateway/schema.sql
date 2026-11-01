-- Cloudflare D1 Database Schema
-- Production Data Journalism & Explainer Content Licensing Engine

CREATE TABLE IF NOT EXISTS publishers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  license_tier TEXT NOT NULL CHECK(license_tier IN ('single_story', 'monthly_syndication', 'full_editorial_retainer')),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS licensed_stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  provenance_sha256 TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  published_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS license_grants (
  id TEXT PRIMARY KEY,
  publisher_id TEXT NOT NULL,
  story_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  is_active INTEGER DEFAULT 1,
  granted_at TEXT NOT NULL,
  FOREIGN KEY (publisher_id) REFERENCES publishers(id),
  FOREIGN KEY (story_id) REFERENCES licensed_stories(id)
);

CREATE TABLE IF NOT EXISTS syndication_telemetry (
  id TEXT PRIMARY KEY,
  publisher_id TEXT NOT NULL,
  story_id TEXT NOT NULL,
  request_domain TEXT NOT NULL,
  latency_ms REAL NOT NULL,
  recorded_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_publishers_domain ON publishers(domain);
CREATE INDEX IF NOT EXISTS idx_grants_token ON license_grants(token);
