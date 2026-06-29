/**
 * Types ported from PriteshKiri/RT-prompt-library (Apache 2.0).
 * https://github.com/PriteshKiri/RT-prompt-library/blob/main/website/lib/types.ts
 */

export interface Prompt {
  id: string;
  /** Display label for the prompt's category, shown as a badge on cards and in the detail drawer. */
  category: string;
  title: string;
  scenario: string;
  /**
   * Short summary shown on the card under the title.
   * Falls back to a truncated `scenario` when not provided.
   */
  summary?: string;
  /**
   * Short, colored tags shown on the card. Keep each tag to a few words.
   * These are independent from `resourceTypes`, which are the MCP resources
   * the agent touches and are shown in the detail view.
   */
  tags?: string[];
  /**
   * Two short bullets describing what the prompt does, shown on the card.
   */
  useCases?: string[];
  prompt: string;
  expectedOutput: string;
  resourceTypes: string[];
  notes?: string;
}

/**
 * A self-contained set of data the Prompt Library renders. Each topic (e.g.
 * resilience-testing) lives in its own folder under `data/` and is registered
 * by key in `data/index.ts`, then selected at runtime via the provider's
 * `datasetId` prop. To add a new dataset, create a folder with a `prompts.ts`
 * and `placeholderTooltips.ts`, then register it in `data/index.ts`.
 */
export interface PromptDataset {
  /** The prompts shown as cards and resolved by id. */
  prompts: Prompt[];
  /**
   * Tooltips for placeholder inputs in the prompt builder, keyed by the parsed
   * placeholder name (e.g. `SERVICE_NAME`).
   */
  placeholderTooltips: Record<string, string>;
}
