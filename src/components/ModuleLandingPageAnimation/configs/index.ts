/**
 * configs/index.ts — Module animation config registry
 *
 * Add a new module by:
 *  1. Creating `configs/<module>.tsx` that satisfies ModuleAnimationConfig.
 *  2. Importing it here and adding it to MODULE_ANIMATION_CONFIGS.
 *
 * Usage in a landing page component:
 *
 *   import ModuleLandingPageAnimation from '@site/src/components/ModuleLandingPageAnimation/ModuleLandingPageAnimation';
 *   import { MODULE_ANIMATION_CONFIGS } from '@site/src/components/ModuleLandingPageAnimation/configs';
 *   import { MODULES } from '@site/src/constants';
 *
 *   const config = MODULE_ANIMATION_CONFIGS[MODULES.iacm];
 *   <ModuleLandingPageAnimation {...config} />
 */

import { MODULES } from '@site/src/constants';
import type { ModuleAnimationConfig } from './types';

// ── Individual config imports ─────────────────────────────────────────────────
import iacmConfig from './iacm';

// ─────────────────────────────────────────────────────────────────────────────
// Registry — maps each MODULES value to its animation config.
// Modules that haven't been configured yet are simply absent from the map.
// ─────────────────────────────────────────────────────────────────────────────
export const MODULE_ANIMATION_CONFIGS: Partial<Record<MODULES, ModuleAnimationConfig>> = {
  [MODULES.iacm]: iacmConfig,

  // ── Add more modules here as their configs are created ──
  // MODULES.ci]:   ciConfig,
  // [MODULES.cd]:   cdConfig,
  // [MODULES.ccm]:      ccmConfig,
  // [MODULES.ff]:       ffConfig,
  // [MODULES.sto]:      stoConfig,
  // [MODULES.ssca]:     sscaConfig,
  // [MODULES.idp]:      idpConfig,
  // [MODULES.sei]:      seiConfig,
  // [MODULES.code]:     codeConfig,
  // [MODULES.ar]:       arConfig,
  // [MODULES.cde]:      cdeConfig,
  // [MODULES.dbdevops]: dbdevopsConfig,
};

// ─────────────────────────────────────────────────────────────────────────────
// Named re-exports for direct import convenience
// ─────────────────────────────────────────────────────────────────────────────
export { iacmConfig };
export type { ModuleAnimationConfig } from './types';
