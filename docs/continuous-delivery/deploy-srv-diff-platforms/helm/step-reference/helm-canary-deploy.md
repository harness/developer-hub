---
title: Helm Canary Deploy Step
description: Reference for the Helm Canary Deploy step
sidebar_position: 30
---

This topic describes the configuration and settings for the Helm Canary Deploy step.

The Helm Canary Deploy step deploys using a canary based strategy. To learn more, go to [Harness canary deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment/#harness-canary-deployments).

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

## Instances

In Instances, select **Instance Count** or **Percentage**.

In Instances, enter the number of pods to deploy.

If you selected Instance Count, enter the number of pods.

If you selected Percentage, enter a percentage of the pods defined in your Service Definition Manifests files to deploy.

For example, in you have replicas: 4 in a manifest in Service, and you enter 50 in Instances, then 2 pods are deployed in this Phase step.

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



