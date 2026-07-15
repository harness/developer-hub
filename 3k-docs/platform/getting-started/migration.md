---
title: Migration Guide
sidebar_label: Migration Guide
description: Learn how to migrate from Harness NextGen (NG) to Harness 3.0. 
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides a step-by-step process for migrating from Harness NG to Harness 3.0. Existing NG resources are fully compatible with 3.0, so teams can migrate incrementally at their own pace.

:::info No Downtime Required
Migration to Harness 3.0 does not require downtime. Existing NG pipelines, connectors, secrets, and other resources continue to work without modification. The migration process is additive -- you adopt new features when ready.
:::

## Setup

Follow these eight steps to migrate from Harness NG to Harness 3.0. Each step can be performed independently, and you can proceed at whatever pace suits your team.

1. **Review Existing Pipelines**: Audit your existing NG pipelines to understand their structure, stage types, and dependencies. Identify pipelines that would benefit most from the v1 YAML format.

1. **Simplify YAML**: Convert pipeline YAML from the NG format to the v1 specification. Remove boilerplate fields like `projectIdentifier` and `orgIdentifier` that are no longer required at the pipeline level.

1. **Remove Stage Types**: In v1 YAML, explicit stage type wrappers are simplified. The `type: Deployment` with nested `spec.deploymentType` is replaced with a flat type: `deploy` or `type: ci`.

1. **Add Typed Inputs**: Replace runtime inputs (`<+input>`) with the new typed inputs system. Typed inputs support string, number, boolean, choice, and secret types with validation and default values.

1. **Deploy Delegate 2.0**: Install the new unified Delegate 2.0 alongside existing delegates. Route new pipelines to Delegate 2.0 using delegate selectors, and decommission NG delegates as workloads are migrated.

1. **Customize Navigation**: Explore the new 3.0 navigation layout. Pin frequently used projects and resources, configure your sidebar preferences, and learn the keyboard shortcuts for efficient navigation.

1. **Explore Harness Code**: Harness Code is the built-in source code management system in Harness 3.0. Evaluate whether migrating repositories to Harness Code can simplify your pipeline configurations and reduce external dependencies.

1. **Use Harness AI**: Leverage the reimagined AI Assistant to accelerate your migration. It can help create new v1 pipelines, explain configuration differences, and troubleshoot issues during the transition.

## YAML migration

The following example shows a side-by-side comparison of the same pipeline expressed in the NG format and the 3.0 v1 format. The v1 format is significantly shorter and easier to read.

<Tabs queryString="yaml-format">
<TabItem value="ng" label="Before">

```yaml title="ng-pipeline.yaml"
# Harness NG (v0 YAML)
pipeline:
  name: Deploy App
  identifier: deploy_app
  projectIdentifier: my_project
  orgIdentifier: default
  stages:
    - stage:
        name: Deploy to Dev
        identifier: deploy_dev
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: my_service
          environment:
            environmentRef: dev
            deployToAll: false
            infrastructureDefinitions:
              - identifier: k8s_dev
          execution:
            steps:
              - step:
                  name: Rolling Deploy
                  identifier: rolling
                  type: K8sRollingDeploy
                  spec:
                    skipDryRun: false
```

</TabItem>
<TabItem value="harness" label="After">

```yaml title="v1-pipeline.yaml"
# Harness 3.0 (v1 YAML)
pipeline:
  name: Deploy App
  stages:
    - name: Deploy to Dev
      service: my_service
      environment:
        name: dev
        deploy-to: k8s_dev
      steps:
        - name: Rolling Deploy
          with:
            skip_dry_run: false
```

</TabItem>
</Tabs>

:::tip Key Differences
The v1 format removes `projectIdentifier`, `orgIdentifier`, and `identifier` fields (inferred from context), flattens the stage and step hierarchy, and replaces nested `serviceRef` / `environmentRef` with top-level service and environment fields.
:::

## Backward compatibility

All existing NG resources are fully compatible with Harness 3.0. No modifications are required to continue using your existing configurations.

| Resource             | Compatibility Status |
| -------------------- | -------------------- |
| NG Pipelines         | Fully compatible     |
| Services             | Fully compatible     |
| Environments         | Fully compatible     |
| Infrastructures      | Fully compatible     |
| Connectors & Secrets | Fully compatible     |
| Templates            | Fully compatible     |
| Expressions          | Fully compatible     |

## When to use Pipeline v1

The v1 pipeline format is optional. Use the following guidance to decide when to adopt it versus continuing with existing NG pipelines.

| Scenario                        | Recommendation                                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Existing working pipelines      | Keep using them as-is. NG pipelines are fully supported in 3.0 and will continue to work without changes.                                     |
| Want to use new features        | Create new pipelines using the v1 format. New features such as typed inputs, improved expressions, and simplified syntax are available in v1. |
| Need Stage Groups or GHA syntax | Requires Pipeline v1. Stage Groups (parallel stage orchestration) and GitHub Actions-compatible syntax are only available in the v1 format.   |
