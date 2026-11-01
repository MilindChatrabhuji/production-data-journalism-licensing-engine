# Deployment & Operations Manual - Edge Licensing Gateway

## Prerequisites
* Node.js v18+ or v20+
* Cloudflare account with Workers & D1 enabled ($0.00 free tier)
* Wrangler CLI installed (`npx wrangler`)

## Step 1: Initialize Cloudflare D1 Database
```bash
cd engine/edge_licensing_gateway
npx wrangler d1 create production-journalism-db
```
Copy the generated `database_id` into `wrangler.toml`.

## Step 2: Apply Database Schema
```bash
npx wrangler d1 execute production-journalism-db --file=schema.sql
```

## Step 3: Deploy Worker to Global Edge
```bash
npx wrangler deploy
```

## Step 4: Publisher CMS Integration
* Newsrooms verify license token via `GET https://<your-worker>.workers.dev/api/license/verify?token=<jwt>`.
* Automated CMS content ingestion via `GET https://<your-worker>.workers.dev/api/syndicate/feed`.
