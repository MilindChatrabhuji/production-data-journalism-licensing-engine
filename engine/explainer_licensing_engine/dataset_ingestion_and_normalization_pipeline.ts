import { NormalizedDataset, DataRecord } from './types';
import * as crypto from 'crypto';

export class DatasetIngestionAndNormalizationPipeline {
  public ingestAndNormalize(
    title: string,
    rawRecords: DataRecord[]
  ): NormalizedDataset {
    const datasetId = `ds-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const ingestedDateIso = new Date().toISOString();

    // Compute provenance SHA-256 hash
    const rawString = JSON.stringify(rawRecords);
    const provenanceSha256 = crypto.createHash('sha256').update(rawString).digest('hex');

    const values = rawRecords.map(r => r.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const meanValue = values.length > 0 ? Number((sum / values.length).toFixed(2)) : 0;
    const maxValue = values.length > 0 ? Math.max(...values) : 0;
    const minValue = values.length > 0 ? Math.min(...values) : 0;

    return {
      datasetId,
      title,
      provenanceSha256,
      ingestedDateIso,
      records: rawRecords,
      summaryStatistics: {
        rowCount: rawRecords.length,
        meanValue,
        maxValue,
        minValue
      }
    };
  }

  public getSampleClinicalDataset(): NormalizedDataset {
    return this.ingestAndNormalize(
      'Global Healthcare API & Interoperability Benchmark Study',
      [
        {
          category: 'Traditional Monolith',
          metric: 'P99 Latency',
          value: 185.4,
          unit: 'ms',
          sampleSize: 100000,
          confidenceInterval: '182.1 - 188.7',
          sourceAuthority: 'Clinical Informatics Evaluation Lab'
        },
        {
          category: 'Serverless Edge Node',
          metric: 'P99 Latency',
          value: 8.6,
          unit: 'ms',
          sampleSize: 100000,
          confidenceInterval: '8.2 - 9.0',
          sourceAuthority: 'Cloud Infrastructure Benchmarks'
        },
        {
          category: 'Distributed Cache Hit',
          metric: 'P99 Latency',
          value: 3.2,
          unit: 'ms',
          sampleSize: 100000,
          confidenceInterval: '3.0 - 3.4',
          sourceAuthority: 'Global Edge Observability Consortium'
        }
      ]
    );
  }
}
