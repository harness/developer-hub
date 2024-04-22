---
title: HCE execution plane
sidebar_position: 3
description: HCE execution plane
---
This section describes the execution plane of Harness Chaos Engineering (HCE).

**Harness Execution Plane** contains the components responsible for orchestrating the chaos injection into the target resources. These components are installed through the chaos infrastructure.

The resource utilization matrix for execution plane components is summarized below. These components are installed in target cluster as a part of the Kubernetes-based chaos infrastructure.

:::important
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

- The [Kubernetes execution plane](/docs/chaos-engineering/features/chaos-infrastructure/kubernetes.md) consists of chaos infrastructure components like workflow controllers, subscribers, event trackers, and backend execution infrastructure components like ChaosExperiment CR, ChaosEngine CR, etc.

- The [Linux execution plane](/docs/chaos-engineering/features/chaos-infrastructure/linux-components.md) consists of only the Linux chaos infrastructure daemon service.
