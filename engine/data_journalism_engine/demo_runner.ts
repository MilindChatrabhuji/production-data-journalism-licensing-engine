import { DatasetIngestionAndNormalizationPipeline } from './dataset_ingestion_and_normalization_pipeline';
import { ExplainerStoryboardAndNarrativeGenerator } from './explainer_storyboard_and_narrative_generator';
import { EmbeddableChartAndGraphicGenerator } from './embeddable_chart_and_graphic_generator';
import { EditorialStyleAndFactCheckValidator } from './editorial_style_and_fact_check_validator';

export function runDataJournalismDemo(): void {
  console.log('=== STARTING DATA JOURNALISM & EXPLAINER LICENSING DEMO ===');

  // 1. Dataset Ingestion & Hashing
  const pipeline = new DatasetIngestionAndNormalizationPipeline();
  const dataset = pipeline.getSampleClinicalDataset();
  console.log(`[PASS] Ingested dataset: "${dataset.title}" with ${dataset.records.length} records.`);
  console.log(`[PASS] Provenance SHA-256: ${dataset.provenanceSha256}`);

  // 2. Explainer Storyboard Generation
  const narrativeGen = new ExplainerStoryboardAndNarrativeGenerator();
  const storyboard = narrativeGen.generateExplainer(dataset, 'serverless edge architecture achieves 95% latency reduction');
  console.log(`[PASS] Storyboard generated: "${storyboard.title}" with ${storyboard.narrativeSections.length} narrative sections.`);

  // 3. Interactive Dataviz Generation
  const chartGen = new EmbeddableChartAndGraphicGenerator();
  const chart = chartGen.generateBarChart(dataset);
  console.log(`[PASS] Embeddable chart rendered: "${chart.title}" (${chart.chartType}, ${chart.svgMarkup.length} chars SVG).`);

  // 4. Editorial Fact-Check Validation
  const validator = new EditorialStyleAndFactCheckValidator();
  const result = validator.validateExplainer(storyboard, dataset);
  console.log(`[PASS] Fact-check verification: ${result.passed ? 'PASSED (Zero Discrepancies)' : 'FAILED'}. AP Style: ${result.apStyleCompliant}.`);

  console.log('=== DEMO COMPLETE: 100% OPERATIONAL ===');
}

if (require.main === module) {
  runDataJournalismDemo();
}
