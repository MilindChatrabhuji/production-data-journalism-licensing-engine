# Client Delivery Workflow - Newsroom Content Licensing Retainers

## Phase 1: Intake & Dataset Curation (Day 1–3)
1. Execute `EDITORIAL_CONTENT_LICENSING_AGREEMENT.md` with selected retainer tier ($500 / $1,500 / $3,000).
2. Configure newsroom payment coordinates:
   * Domestic UPI: `milind.chatrabhuji@okhdfcbank`
   * International PayPal: `milind.chatrabhuji@gmail.com`
3. Identify target investigative topic, datasets (WHO, CDC, MIMIC), and newsroom publishing domain.

## Phase 2: Gateway & Syndication Setup (Day 4–7)
1. Deploy dedicated Cloudflare Workers edge licensing gateway.
2. Grant publisher API token with registered publication domains.
3. Establish automated JSON-LD feed endpoint for publisher CMS.

## Phase 3: Weekly Production & Delivery Cadence
1. **Monday:** Ingest and normalize raw datasets with cryptographic SHA-256 provenance hashes.
2. **Wednesday:** Synthesize investigative storyboard and render embeddable SVG dataviz charts.
3. **Friday:** Deliver validated explainers and update syndication feed.

## Phase 4: Monthly Executive Review & Invoicing
1. Issue monthly retainer invoice via `invoicing_engine.ts` on the 1st of each month.
2. Deliver quarterly syndication telemetry and reader engagement metrics report.
