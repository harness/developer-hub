/**
 * Registry of Prompt Library datasets.
 *
 * Each dataset is a folder under `data/` exporting a `prompts` array and a
 * `placeholderTooltips` map. Register it here under a stable key, then point a
 * page at it with `<PromptLibraryProvider datasetId="<key>">` (or
 * `<PromptLibrary datasetId="<key>" />`).
 *
 * To add a new topic:
 *   1. Create `data/<topic>/prompts.ts` and `data/<topic>/placeholderTooltips.ts`.
 *   2. Import them below and add an entry to `datasets`.
 *   3. Reference the key from your `.md`/`.mdx` page - no component edits needed.
 */
import type { PromptDataset } from './types';
import { prompts as resilienceTestingPrompts } from './resilience-testing/prompts';
import { placeholderTooltips as resilienceTestingTooltips } from './resilience-testing/placeholderTooltips';

export const datasets: Record<string, PromptDataset> = {
  'resilience-testing': {
    prompts: resilienceTestingPrompts,
    placeholderTooltips: resilienceTestingTooltips,
  },
};

export function getDataset(id: string): PromptDataset | undefined {
  return datasets[id];
}
