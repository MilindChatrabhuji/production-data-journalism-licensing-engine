/**
 * Cloudflare Worker - Edge Licensing Gateway
 * Sub-10ms global edge routing for Publisher License Verification and Syndication Feeds.
 */

import { PublisherLicenseTokenRouter } from './publisher_license_token_router';
import { AssetSyndicationFeedRouter } from './asset_syndication_feed_router';

export interface Env {
  DB?: any;
}

const router = new PublisherLicenseTokenRouter();
const feed = new AssetSyndicationFeedRouter();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Publisher-Key',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'edge-licensing-gateway',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        settlement: {
          domestic_upi: 'milind.chatrabhuji@okhdfcbank',
          international_paypal: 'milind.chatrabhuji@gmail.com'
        }
      }), { headers: corsHeaders });
    }

    // Publisher License Verification
    if (url.pathname === '/api/license/verify') {
      const authHeader = request.headers.get('Authorization') || '';
      const token = authHeader.replace(/^Bearer\s+/i, '') || url.searchParams.get('token') || '';
      const origin = request.headers.get('Origin') || request.headers.get('Referer') || '';

      const res = await router.verifyToken(token, origin);
      return new Response(JSON.stringify({
        success: res.valid,
        authorized: res.authorized,
        claim: res.claim,
        latencyMs: res.latencyMs,
        reason: res.reason,
        edgeLocation: 'BOM1-Cloudflare-PoP'
      }), { headers: corsHeaders });
    }

    // Syndication Feed endpoint
    if (url.pathname === '/api/syndicate/feed') {
      const mockStories = [
        {
          storyId: 'story-101',
          title: 'High-Throughput Clinical Interoperability at the Serverless Edge',
          slug: 'clinical-interoperability-edge',
          publishedIso: new Date().toISOString(),
          deckLead: 'Empirical analysis shows serverless edge routing achieves 95% latency reduction.',
          chartEmbedUrl: 'https://publisher.example.com/assets/data_journalism_hero.svg',
          canonicalUrl: 'https://publisher.example.com/explainers/clinical-edge'
        }
      ];

      const jsonFeed = feed.generateJsonFeed(mockStories, 'Healthcare Digital Newsroom');
      return new Response(jsonFeed, {
        headers: { ...corsHeaders, 'Content-Type': 'application/feed+json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found' }), { status: 404, headers: corsHeaders });
  }
};
