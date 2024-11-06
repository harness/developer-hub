--- 
title: Helm Blue Green Deploy step
description: Reference for the Helm Blue Green Deploy step
sidebar_position: 50
---

This topic describes the configuration and settings for the Helm Blue Green Deploy step.

The Helm Blue Green Deploy step deploys using a canary based strategy. To learn more, go to [Blue Green Deployments](/docs/continuous-delivery/manage-deployments/deployment-concepts#blue-green-deployment).

For a successfully blue green deployment, you will require this deployment step as well as the [Blue Green Swap step](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/step-reference/helm-bg-swap) after this step.

## Name

The name for the deploy step.

## Timeout

Enter a timeout for this step. You can use: 
- `w` for weeks
- `d` for days
- `h` for hours
- `m` for minutes
- `s` for seconds
- `ms` for milliseconds

## Ignore Release History Failed Status

By default, if the latest Helm release failed, Harness does not proceed with the install/upgrade and throws an error.

Enable this option to have Harness ignore these errors and proceed with install/upgrade.

## Skip Steady State Check

By default, Harness checks to see if a deployed workload has reached steady state.

If you select this option, Harness will not check that the workload has reached steady state.

## Optional Configuration

Add any environment variables here.

## Advanced Options

See the following:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)
