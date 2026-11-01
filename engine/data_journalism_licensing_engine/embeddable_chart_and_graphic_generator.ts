import { NormalizedDataset, InteractiveChartSpec } from './types';

export class EmbeddableChartAndGraphicGenerator {
  public generateBarChart(dataset: NormalizedDataset): InteractiveChartSpec {
    const chartId = `chart-bar-${dataset.datasetId}`;
    const width = 640;
    const height = 360;

    const maxVal = Math.max(...dataset.records.map(r => r.value));
    const chartWidth = 500;
    const barHeight = 40;
    const gap = 30;

    let barsSvg = '';
    dataset.records.forEach((r, idx) => {
      const barW = Math.round((r.value / maxVal) * chartWidth);
      const y = 80 + idx * (barHeight + gap);
      const color = idx === 0 ? '#EF4444' : idx === 1 ? '#3B82F6' : '#10B981';

      barsSvg += `
        <g class="bar-group" data-value="${r.value}" data-category="${r.category}">
          <text x="50" y="${y - 8}" fill="#94A3B8" font-size="12" font-family="sans-serif" font-weight="600">${r.category} (${r.metric})</text>
          <rect x="50" y="${y}" width="${barW}" height="${barHeight}" rx="4" fill="${color}" />
          <text x="${50 + barW + 12}" y="${y + 25}" fill="#F8FAFC" font-size="14" font-family="sans-serif" font-weight="700">${r.value} ${r.unit}</text>
        </g>
      `;
    });

    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" style="background:#0F172A; border-radius:8px; border:1px solid #334155;">
  <text x="50" y="45" fill="#F8FAFC" font-size="16" font-family="sans-serif" font-weight="800">${dataset.title}</text>
  ${barsSvg}
  <text x="50" y="335" fill="#64748B" font-size="10" font-family="sans-serif">Source: Verified Clinical Informatics Dataset • Provenance SHA-256: ${dataset.provenanceSha256.substring(0, 12)}</text>
</svg>`;

    const embedCodeHtml = `<div class="data-journalism-embed" id="${chartId}" style="max-width:${width}px; margin:24px auto;">
  ${svgMarkup}
</div>`;

    return {
      chartId,
      title: dataset.title,
      chartType: 'bar_comparison',
      svgMarkup,
      embedCodeHtml,
      width,
      height
    };
  }
}
