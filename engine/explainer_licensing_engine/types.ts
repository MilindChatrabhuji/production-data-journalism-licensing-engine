/**
 * Production Data Journalism & Interactive Explainer Content Licensing Engine - Core Types
 * Category D: Content, Media & Audience (Product 79)
 * Standards: Modern Evidence-Based Clinical Informatics & Empirical Investigative Journalism
 */

export type LicenseTier = 'single_story' | 'monthly_syndication' | 'full_editorial_retainer';

export interface DataRecord {
  category: string;
  metric: string;
  value: number;
  unit: string;
  sampleSize: number;
  confidenceInterval: string;
  sourceAuthority: string;
}

export interface NormalizedDataset {
  datasetId: string;
  title: string;
  provenanceSha256: string;
  ingestedDateIso: string;
  records: DataRecord[];
  summaryStatistics: {
    rowCount: number;
    meanValue: number;
    maxValue: number;
    minValue: number;
  };
}

export interface ExplainerStoryboard {
  storyId: string;
  title: string;
  slug: string;
  deckLead: string;
  methodologyNotes: string;
  narrativeSections: Array<{
    heading: string;
    bodyMarkdown: string;
    chartAnchorId?: string;
  }>;
  keyFindings: string[];
  citationIndex: Array<{ id: number; citation: string; url: string }>;
}

export interface InteractiveChartSpec {
  chartId: string;
  title: string;
  chartType: 'bar_comparison' | 'timeline_series' | 'distribution_histogram';
  svgMarkup: string;
  embedCodeHtml: string;
  width: number;
  height: number;
}

export interface FactCheckValidationResult {
  passed: boolean;
  claimsCheckedCount: number;
  discrepanciesFoundCount: number;
  details: Array<{ claimText: string; verifiedAgainstValue: string; status: 'verified' | 'unverified' }>;
  apStyleCompliant: boolean;
  statutoryMedicalDisclaimerPresent: boolean;
}
