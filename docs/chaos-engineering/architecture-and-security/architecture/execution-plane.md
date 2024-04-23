---
title: Execution plane
sidebar_position: 3
description: Execution plane and its components
---
This section describes the execution plane of Harness Chaos Engineering (HCE).

**Harness Execution Plane** contains the components responsible for orchestrating the chaos injection into the target resources. The execution plane helps set up the resources (clusters) and you can use the control plane to interact with the cluster and create chaos experiments.

You can install the execution plane components through the chaos infrastructure in clusters (external or internal depending on the type of chaos infrastructure used). Some of the components common to all chaos infrastructures include:
1. **Workflow controller**: Helps execute chaos experiments.
2. **Subscriber**: Serves as a bridge between the execution plane and control plane. It also performs other tasks required to orchestrate the chaos experiment executions.

The resource utilization matrix for execution plane components is summarized below. These components are installed in target cluster as a part of the Kubernetes-based chaos infrastructure.

:::tip
The table below is indicative of low to medium-load working conditions. As chaos activity increases, more resources will be required, and the values represented here may vary.
:::

| Deployment          | container           | CPU (Requested) | Memory (Requested) | Image                                               |
|---------------------|---------------------|-----------------|--------------------|-----------------------------------------------------|
| chaos-operator-ce   | chaos-operator-ce   | 125m            | 300M               | docker.io/harness/chaos-operator:1.31.0             |
| chaos-exporter      | chaos-exporter      | 125m            | 300M               | docker.io/harness/chaos-exporter:1.31.0             |
| subscriber          | subscriber          | 125m            | 300M               | docker.io/harness/chaos-subscriber:1.31.0           |
| workflow-controller | workflow-controller | 125m            | 300M               | docker.io/harness/chaos-workflow-controller:v3.4.16 |

## Chaos infrastructure

- Chaos infrastructure components help facilitate the chaos fault injection and hypothesis validation, and enable chaos automation for target resources.

- The [Kubernetes execution plane](/docs/chaos-engineering/features/chaos-infrastructure/kubernetes.md) consists of chaos infrastructure components like workflow controllers, subscribers, event trackers, and backend execution infrastructure components like [ChaosExperiment CR](/docs/chaos-engineering/architecture-and-security/architecture/components#1-chaos-experiment), [ChaosEngine CR](/docs/chaos-engineering/architecture-and-security/architecture/components#17-chaosengine-custom-resource-cr), etc.

- The [Linux execution plane](/docs/chaos-engineering/features/chaos-infrastructure/linux-components.md) consists of only the Linux chaos infrastructure daemon service.



