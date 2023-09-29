---
title: Run CD stages in parallel
description: Perform parallel stage executions.
sidebar_position: 3
---

You can run stages in parallel when you want to perform parallel operations. For example:

- CI: Parallel execution of builds and tests can speed up the integration process and provide faster feedback to developers.
- CD: Parallel execution of deployment stages can help reduce deployment times and increase the efficiency of the process.
- Infrastructure as Code (IaC): Parallel execution of IaC scripts can speed up the creation of resources and improve the scalability of infrastructure.
- Testing: Parallel execution of tests can reduce the overall testing time and provide faster feedback to developers.

## Requirements

* [Learn Harness' Key Concepts](../../get-started/key-concepts.md)
* [Add a Stage](add-a-stage.md)

## Running stages in parallel

Run stages in parallel by dragging them together or by selecting the `+` button under a stage in the UI. 

![](./static/add-a-stage-57.png)

The only change in the stage YAML is an additional `parallel`. 

```
stages:
    - parallel:
        - stage: 
```

Navigate between the stages by hovering over them and selecting the stage.

![](./static/run-stages-in-parallel.png)

A [resource constraint](/docs/continuous-delivery/manage-deployments/deployment-resource-constraints/) step is added to every stage automatically to make sure that you are not using two infrastructures simultaneously. Hence, one parallel stage executes first. Once the execution of the first stage finishes, the other stage(s) will start.

You can deploy multiple services to multiple environments in a single stage (for more information, go to [Use multiple services and environments in a deployment](/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/)). However, running multi-service stages in parallel will deploy each service to each environment in parallel. This can become very complicated. For such use cases, we recommend using multiple stages.

