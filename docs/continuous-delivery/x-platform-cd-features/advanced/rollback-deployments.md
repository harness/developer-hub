---
title: Rollback deployments
description: Rollback your most recent successful deployment.
sidebar_position: 3
---

:::info

Currently, this feature is behind the feature flag, `POST_PROD_ROLLBACK`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Rollback deployment initiates a rollback of your most-recent successful deployment. This allows rapid, predictable recovery from a deployment that succeeded on technical criteria, but that you want to undo for other reasons.

## Limitations

- Rollback deployment is currently supported for the following deployment types only: 
  - Kubernetes
  - Tanzu Application Services (TAS)
- Rollback of a stage is defined as running the Rollback steps defined for that stage. There is no other way of rolling back.

Harness anticipates expanding this feature to other deployment types in the future.

## Important notes

- You can rollback successful pipelines only. The rollback option is not available for failed pipelines.
- Only the rollback steps that are part of the stage can be rolled back.
- You cannot rollback the same pipeline multiple times. It can be rolled back if a normal execution is run again.
- If the pipeline configuration has changed between executions, the previous execution YAML is used a reference to rollback.
- If the Rollback steps have expressions of the main steps, they must be resolved first. For example, you should be able to reuse a step in the rollback section as the output of a step in the steps section.
- The stages should rollback in reverse order if rollback deployment is triggered. 

## Rollback deployments

