/**
 * Asset Syndication Feed Router
 * Generates automated JSON-LD and RSS syndication feeds for licensed digital publisher CMS integrations.
 */

export interface SyndicatedStorySummary {
  storyId: string;
  title: string;
  slug: string;
  publishedIso: string;
  deckLead: string;
  chartEmbedUrl: string;
  canonicalUrl: string;
}

export class AssetSyndicationFeedRouter {
  public generateJsonFeed(stories: SyndicatedStorySummary[], publisherName: string): string {
    return JSON.stringify({
      version: 'https://publisher.example.com/feed/v1.1',
      title: `Data Journalism Syndication Feed for ${publisherName}`,
      home_page_url: 'https://publisher.example.com',
      feed_url: 'https://publisher.example.com/api/syndicate/feed',
      description: 'Peer-reviewed clinical informatics and technical data journalism explainers.',
      items: stories.map(s => ({
        id: s.storyId,
        url: s.canonicalUrl,
        title: s.title,
        content_text: s.deckLead,
        date_published: s.publishedIso,
        attachments: [
          {
            url: s.chartEmbedUrl,
            mime_type: 'image/svg+xml',
            title: 'Interactive SVG Chart'
          }
        ]
      }))
    }, null, 2);
  }
}
