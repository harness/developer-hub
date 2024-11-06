---
title: Helm Rollback Step
description: Reference for the Helm Rollback step. 
sidebar_position: 20
---

This topic describes the configuration and settings for the Helm Rollback step.

The Helm Rollback step performs a rollback for a helm deployment. 

As a best practice, every time you use a [Helm Deployment step](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/step-reference/helm-deploy.md) you should also use a Helm Rollback step in the rollback phase of the pipeline. 

## Name

The name for the rollback step.

## Timeout

Enter a timeout for this step. You can use: 
- `w` for weeks
- `d` for days
- `h` for hours
- `m` for minutes
- `s` for seconds
- `ms` for milliseconds

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



