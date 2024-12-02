---
title: Helm Deploy Step
description: Reference for the Helm Deploy step. 
sidebar_position: 10
---

This topic describes the configuration and settings for the Helm Deploy step.

The Helm Deploy step performs a rolling deployment strategy. 

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



