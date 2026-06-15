/**
 * configs/iacm.tsx — ModuleLandingPageAnimation config for IaCM
 *
 * Sequences surface three distinct IaCM use cases so users discover
 * capabilities beyond the basic onboarding flow.
 */

import React from 'react';
import { MODULES } from '@site/src/constants';
import { MODULE_COLORS } from '../ModuleLandingPageAnimation';
import type { ModuleAnimationConfig } from './types';

const iacmConfig: ModuleAnimationConfig = {
  module: MODULES.iacm,
  color:  MODULE_COLORS[MODULES.iacm] ?? 'var(--mod-iacm-200)',

  sequences: [
    // ── 1. Core onboarding ────────────────────────────────────────────────────
    {
      title: 'Getting started with IaCM',
      steps: [
        {
          label:    'Connect a provider',
          sublabel: 'Cloud connector setup',
          icon:     <i className="fa-solid fa-plug" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/get-started/',
        },
        {
          label:    'Create a workspace',
          sublabel: 'Configure your workspace',
          icon:     <i className="fa-solid fa-folder-open" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/create-workspace',
        },
        {
          label:    'Configure your IaC',
          sublabel: 'Terraform · OpenTofu · Terragrunt',
          icon:     <i className="fa-solid fa-code" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/get-started/',
        },
        {
          label:    'Run a plan',
          sublabel: 'Preview infrastructure changes',
          icon:     <i className="fa-solid fa-circle-play" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/provision-workspace',
        },
        {
          label:    'Approve changes',
          sublabel: 'Review before applying',
          icon:     <i className="fa-solid fa-circle-check" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/approval-step',
        },
        {
          label:    'Apply & provision',
          sublabel: 'Deploy your infrastructure',
          icon:     <i className="fa-solid fa-rocket" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/provision-workspace',
        },
      ],
    },

    // ── 2. PR automation ──────────────────────────────────────────────────────
    {
      title: 'Automate infrastructure PRs',
      steps: [
        {
          label:    'Commit IaC code',
          sublabel: 'Push changes to your repo',
          icon:     <i className="fa-solid fa-code-branch" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/pr-automation',
        },
        {
          label:    'PR triggers plan',
          sublabel: 'Pipeline runs automatically',
          icon:     <i className="fa-solid fa-bolt" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/pr-automation',
        },
        {
          label:    'Estimate cost',
          sublabel: 'Review spend impact',
          icon:     <i className="fa-solid fa-coins" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/cost-estimation',
        },
        {
          label:    'Policy check',
          sublabel: 'OPA governance enforced',
          icon:     <i className="fa-solid fa-shield-halved" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/policies-governance/opa-workspace',
        },
        {
          label:    'Approve & merge',
          sublabel: 'Team review complete',
          icon:     <i className="fa-solid fa-circle-check" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/approval-step',
        },
        {
          label:    'Auto-provision',
          sublabel: 'Changes applied on merge',
          icon:     <i className="fa-solid fa-rocket" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/provision-workspace',
        },
      ],
    },

    // ── 3. Drift detection ────────────────────────────────────────────────────
    {
      title: 'Detect and fix infrastructure drift',
      steps: [
        {
          label:    'Deploy workspace',
          sublabel: 'Baseline state established',
          icon:     <i className="fa-solid fa-server" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/provision-workspace',
        },
        {
          label:    'Schedule scan',
          sublabel: 'Continuous monitoring',
          icon:     <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/drift-detection',
        },
        {
          label:    'Drift detected',
          sublabel: 'State mismatch found',
          icon:     <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/drift-detection',
        },
        {
          label:    'Alert your team',
          sublabel: 'Notifications sent',
          icon:     <i className="fa-solid fa-bell" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/drift-detection',
        },
        {
          label:    'Remediate',
          sublabel: 'Restore desired state',
          icon:     <i className="fa-solid fa-wrench" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/workspaces/provision-workspace',
        },
        {
          label:    'State verified',
          sublabel: 'Infrastructure in sync',
          icon:     <i className="fa-solid fa-circle-check" aria-hidden="true" />,
          link:     '/docs/infra-as-code-management/pipelines/operations/drift-detection',
        },
      ],
    },
  ],
};

export default iacmConfig;
