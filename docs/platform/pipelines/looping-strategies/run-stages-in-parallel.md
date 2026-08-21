---
title: Run stages in parallel
sidebar_label: Run stages in parallel
description: Run multiple pipeline stages concurrently to reduce execution time and improve efficiency.
keywords:
  - parallel stages
  - concurrent execution
  - parallel execution
  - stage parallelism
tags:
  - pipelines
  - stages
sidebar_position: 40
redirect_from:
  - /docs/platform/pipelines/run-stages-in-parallel
---

You can run multiple stages in parallel when your pipeline needs to perform independent operations concurrently. Parallel stage execution can reduce overall pipeline run time by allowing multiple stages to run simultaneously.

:::warning Parallel stage limit

The maximum number of stages that can be run in parallel is 256.

:::

Common use cases include the following:

- **<a href="/docs/continuous-integration/use-ci/prep-ci-pipeline-components#stages" target="_blank" rel="noopener noreferrer">CI stages</a>:** Run builds and tests in parallel to speed up the integration process, reduce test execution time, and provide faster feedback to developers.
- **<a href="/docs/continuous-delivery/overview#stage" target="_blank" rel="noopener noreferrer">CD stages</a>:** Run deployments in parallel to reduce deployment time and improve operational efficiency.
- **[Infrastructure as Code (IaC)](https://www.harness.io/products/infrastructure-as-code-management):** Run IaC operations in parallel to accelerate resource provisioning and improve infrastructure scalability.

---

## What you will learn from this topic

- How to [add stages to your pipeline](#add-stages-to-your-pipeline) in preparation for parallel execution.
- How to [arrange stages in parallel](#arrange-stages-in-parallel) using the Visual editor or YAML editor.

---

## Before you begin

- **Pipeline access:** You need View or Execute permissions on pipelines. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.
- **Pipeline basics:** You should understand stages and how to add them. For more information, refer to <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>.

---

## Add stages to your pipeline

Before you can run stages in parallel, you must <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">add stages</a> to your pipeline. Each stage represents a logical unit of work (for example, a build stage, test stage, or deployment stage).

Add at least two stages to your pipeline that you want to run concurrently.

---

## Arrange stages in parallel

After adding stages to your pipeline, arrange them to run in parallel using either the Visual editor or YAML editor.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<style>
{`
  .tabs--full-width {
    width: 100%;
  }
  .tabs--full-width .tabs__item {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
`}
</style>

<Tabs className="tabs--full-width">
  <TabItem value="Visual" label="Visual editor" default>


In the Visual editor, drag and drop stages to arrange them in parallel.

<div align="center"><DocImage path={require('./static/add-a-stage-57.png')} alt="Visual editor showing stages being arranged in parallel by dragging" width="80%" /></div>

</TabItem>
  <TabItem value="YAML" label="YAML editor">


In the YAML editor, indent the stages under a `parallel` flag.

```yaml
stages:
    - parallel: ## Stages indented under this flag will run in parallel.
        - stage:
          ...
        - stage:
          ...
    - stage: ## This stage is not in the parallel group.
```


</TabItem>
</Tabs>


---

## Parallel stages execution

When you arrange stages in parallel and run the pipeline, all stages in the parallel group start executing at the same time. The pipeline waits for all parallel stages to complete before moving to the next stage or stage group.

**Execution behavior:**

- **Concurrent start:** All stages in a parallel group begin execution simultaneously, regardless of the number of stages.
- **Independent execution:** Each parallel stage executes independently. One stage does not wait for another unless there is a resource constraint (common in deployment stages).
- **Pipeline progression:** The pipeline moves to the next stage or stage group only after all parallel stages complete. If any parallel stage fails, the pipeline's failure strategy determines whether the pipeline continues or stops.
- **Resource usage:** Parallel stages consume resources concurrently. Ensure your infrastructure has sufficient capacity to handle the parallel workload. For more information, refer to <a href="/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies" target="_blank" rel="noopener noreferrer">Looping strategy best practices</a>.

**Example execution order:**

If you have stages A, B, C in parallel, followed by stage D:

1. Stages A, B, and C all start at the same time.
2. The pipeline waits for A, B, and C to all complete.
3. Stage D starts only after A, B, and C have all finished.

The total execution time is determined by the slowest stage in the parallel group, not the sum of all stage execution times.

:::note Resource constraints in deployment stages

In Continuous Delivery (CD), a <a href="/docs/continuous-delivery/manage-deployments/deployment-resource-constraints" target="_blank" rel="noopener noreferrer">resource constraint</a> step is added to every stage automatically to prevent using two infrastructures simultaneously. As a result, one parallel stage executes first. Once the execution of the first stage finishes, the other stage or stages start.

You can <a href="/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv" target="_blank" rel="noopener noreferrer">deploy multiple services to multiple environments in a single deployment stage</a>. However, running multi-service stages in parallel deploys each service to each environment in parallel. This can become complicated. For such use cases, Harness recommends using separate stages.

:::

---

## Next steps

- <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping strategies</a>: Use matrix, parallelism, and repeat strategies to run stages or steps multiple times with different inputs.
- <a href="/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies" target="_blank" rel="noopener noreferrer">Looping strategy best practices</a>: Plan resource usage and avoid common pitfalls when implementing parallel execution.
- <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>: Learn more about creating and configuring pipeline stages.
