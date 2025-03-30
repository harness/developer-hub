---
title: K8s Diff Step
description: This topic describes how to compare the current live state deployed Kubernetes resources with the changes defined in a YAML.
sidebar_position: 10
---

## Overview

Use the kubectl diff command to compare the current live state of deployed Kubernetes resources with changes defined in a YAML file. This preview helps catch unintended modifications and prevent misconfigurations before deployment.

The command used in this step is: `kubectl diff -f <file.yaml>`

:::note
This feature is behind the feature flag `CDS_K8S_DIFF_STEP_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

## Pre-requisites

You must have the **diffutils** package installed on your system to use the `kubectl diff` command. This package provides the necessary utilities for comparing file differences.

## When and where to use the K8s Diff Step

You can add the K8s Diff step anywhere in the Deploy stage. It runs before changes are applied, making it useful for reviewing potential modifications to Kubernetes resources.

Here is an example of a K8s Diff step added before the Kubernetes rolling deployment:

<div align="center">
  <DocImage path={require('./static/k8s-diff-1.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

## Add K8s Diff Step

In your Harness **Kubernetes Deploy Stage** execution view, click **Add Step**, then select **K8s Diff** from the list of available steps.

<div align="center">
  <DocImage path={require('./static/k8s-diff-2.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

### Step Parameters

**Name**: Enter a name for the step.

**Timeout**: Enter a timeout duration.

You can use:

- `w` for weeks.
- `d` for days.
- `h` for hours.
- `m` for minutes.
- `s` for seconds.
- `ms` for milliseconds.

The maximum is `53w`. 

Save the step. No additional configuration is needed. The step automatically fetches the manifest resources from the configured **Service**.

### Advanced Settings

See the following:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

<details>
<summary>K8s Diff Step YAML Sample</summary>

```yaml
- step:
    type: K8sDiff
    name: K8sDiff
    identifier: K8sDiff
    spec: {}
    timeout: 10m
```
</details>

## Execution

This is how the execution logs would look like after executing the K8s Diff step.

<div align="center">
  <DocImage path={require('./static/k8s-diff-3.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

You can also find the difference in the output of the step:

<div align="center">
  <DocImage path={require('./static/k8s-diff-4.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

## Limitations

- The `kubectl diff` command requires **server-side Apply**, which is available in Kubernetes version 1.18 and above.

- `kubectl diff` may not work correctly with third-party **Custom Resource Definitions (CRDs)**, as they are not always fully supported by the diff command.

- The command **does not display changes for secrets**, due to security restrictions designed to protect sensitive data.

## K8s Diff Step Sample

To see an example of how to use the K8s Diff Step, visit the [Harness Community Repository](https://github.com/harness-community/harnesscd-example-apps/tree/master/kubernetes-steps/diff-step).

This repository provides a ready-to-use sample application and the necessary configuration files to help you get started quickly.