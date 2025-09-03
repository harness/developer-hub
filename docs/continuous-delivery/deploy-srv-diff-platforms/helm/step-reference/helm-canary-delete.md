---
title: Helm Canary Delete Step
description: Reference for the Helm Canary Delete step
sidebar_position: 40
---

The Helm canary delete step only requires a name and a timeout in terms of configuration. This step will delete any resources created by the Helm canary deployment step automatically, you just have to add it to your pipeline!

:::note

Harness Delegate version 84300 or later is required for this feature.

:::

## Name

The name for the delete step.

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
* [Command Flags](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart#configure-command-flags-at-step-level)
