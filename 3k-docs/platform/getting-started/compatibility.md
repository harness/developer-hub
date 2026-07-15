---
title: Backward Compatibility
sidebar_label: Backward Compatibility
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness 3.0 provides full backwards compatibility with existing Harness NG resources. All investments in pipelines, services, environments, connectors, secrets, templates, and expressions are protected. Nothing breaks when you upgrade to 3.0.

:::tip Zero Breaking Changes
Harness 3.0 is designed as a non-breaking upgrade. Every NG resource type continues to function exactly as it did before. The 3.0 platform adds new capabilities on top of the existing foundation without removing or modifying existing behavior.
:::

## Compatible resources

The following table provides a detailed breakdown of compatibility for each resource type. All resources created in Harness NG are fully operational in the 3.0 environment.

| Resource Type        | Status           | Details                                                                                                                                                                               |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NG Pipelines         | Fully compatible | All existing NG pipelines (v0 YAML) run without modification in 3.0. The pipeline engine supports both v0 and v1 YAML formats simultaneously. No conversion is required.              |
| Services             | Fully compatible | Service definitions including artifact sources, manifests, config files, and overrides continue to work as-is. Services can be referenced from both v0 and v1 pipelines.              |
| Environments         | Fully compatible | Environment definitions, environment groups, and environment-level overrides are fully preserved. Infrastructure definitions within environments work without changes.                |
| Infrastructures      | Fully compatible | Infrastructure definitions for Kubernetes, ECS, serverless, SSH, WinRM, and all other deployment targets are fully compatible. No changes to infrastructure configuration are needed. |
| Connectors & Secrets | Fully compatible | All connector types (cloud providers, SCMs, artifact registries, monitoring tools) and secret configurations work without modification. Scope-based access rules are preserved.       |
| Templates            | Fully compatible | Pipeline templates, stage templates, and step templates created in NG continue to work. Templates can be used in both v0 and v1 pipelines.                                            |
| Expressions          | Fully compatible | All Harness expressions (`<+...>` syntax) are fully supported. The v1 format also introduces a new `${{ }}` expression syntax that can be used alongside the existing format.         |

## Pipeline converter

While existing NG pipelines work without modification, teams that want to take advantage of the v1 YAML format can use the upcoming automatic pipeline converter to transform their configurations.

- **One-click conversion**: Convert an NG pipeline to v1 format with a single action from the pipeline editor. No manual YAML editing required.
- **Inline transformation**: The converter performs the transformation in place, updating the pipeline YAML while preserving comments and formatting where possible.
- **Preview before applying**: Review the converted YAML in a side-by-side diff view before applying the changes. This allows you to verify the transformation and make manual adjustments if needed.

The converter handles structural changes, field renames, and format simplifications automatically.

<Tabs queryString="yaml-format">
<TabItem value="ng" label="Before">

```yaml title="before-conversion.yaml"
# Before: NG Pipeline (v0)
pipeline:
  name: Build and Test
  identifier: build_test
  projectIdentifier: my_project
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: build
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  name: Run Tests
                  identifier: run_tests
                  type: Run
                  spec:
                    command: npm test
```

</TabItem>
<TabItem value="harness" label="After">

```yaml title="v1-pipeline.yaml"
# After: Pipeline v1
pipeline:
  name: Build and Test
  stages:
    - name: Build
      steps:
        - name: Run Tests
          run: npm test
```

</TabItem>
</Tabs>

:::tip Conversion Strategy
Start by converting low-risk pipelines such as `development` and `testing` to build confidence with the v1 format. Once your team is comfortable, convert staging and production pipelines. The converter preserves all execution logic, so pipeline behavior does not change after conversion.
:::