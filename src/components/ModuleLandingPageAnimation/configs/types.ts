/**
 * types.ts — shared config types for ModuleLandingPageAnimation
 *
 * Each Harness module landing page that adopts the animation component
 * should have a corresponding config file in this folder that satisfies
 * ModuleAnimationConfig and is registered in configs/index.ts.
 */

import type { WorkflowSequence } from '../ModuleLandingPageAnimation';
import type { MODULES } from '@site/src/constants';

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Full configuration for a module's landing page animation.
 *
 * Create one of these per module in a `configs/<module>.tsx` file,
 * then register it in `configs/index.ts`.
 */
export interface ModuleAnimationConfig {
  /** Harness module identifier (from the MODULES enum) */
  module: MODULES;

  /**
   * Active colour for nodes, connectors, and the sequence title.
   * Use a CSS custom-property reference (e.g. `'var(--mod-iacm-200)'`)
   * so the colour automatically adapts to light/dark mode theming.
   */
  color: string;

  /**
   * Named workflow sequences. One is chosen at random per browser session
   * and plays through once, finishing on the last step with a check icon
   * and expanding ring animation.
   *
   * Tips:
   *  • Keep step labels short (≤ 3 words if possible).
   *  • Use `sublabel` for the extra context line (hidden on mobile).
   *  • Set `link` so clicking the step goes to the relevant doc page.
   *  • Use `icon` to pass an emoji, <i className="fa-solid fa-…"/>, or <img/>.
   */
  sequences: WorkflowSequence[];

  /**
   * Milliseconds each step is highlighted before advancing.
   * Default: 2000. Increase for slower-paced sequences.
   */
  stepDuration?: number;
}
