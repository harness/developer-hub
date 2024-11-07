---
title: Helm Blue Green Swap Step
description: Reference for the Helm Blue Green Swap step
sidebar_position: 60
---

This topic describes the configuration and settings for the Helm Blue Green Swap step. This step swaps the primary service running the application with the stage service that is waiting to take over.

:::note

Currently, this feature is behind the feature flag `CDS_HELM_BG_STRATEGY`. Please contact [Harness support](mailto:support@harness.io) to enable this feature.

Harness Delegate version 84300 or later is required for this feature.

:::

## Name

The name for the swap step.

## Timeout

Enter a timeout for this step. You can use: 
- `w` for weeks
- `d` for days
- `h` for hours
- `m` for minutes
- `s` for seconds
- `ms` for milliseconds

## Advanced Options

See the following:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)




