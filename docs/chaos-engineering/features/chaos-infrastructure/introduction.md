---
title: Overview
sidebar_position: 1
description: Chaos infrastructure
redirect_from:
- /docs/chaos-engineering/technical-reference/architecture/kubernetes
- /docs/chaos-engineering/get-started/prerequisites/#chaos-infrastructure-requirements
---

This topic introduces you to chaos infrastructure, its types, why it is important, and you can use it.

## What is a chaos infrastructure?

**Chaos infrastructure** represents the individual components of a deployment environment. It is a service that runs in your target environment to help HCE access the target resources and inject chaos at a cloud-native scale.

### Types of infrastructure

There are different types of chaos infrastructure such as Kubernetes, Linux, and Windows. You can choose to execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service, a Linux daemon or a Windows agent.

:::tip
Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.
:::

All the chaos infrastructure services adhere to the **principle of least privilege**, where the services execute with the minimum number of permissions.

## Why is a chaos infrastructure required?

Chaos infrastructure helps facilitate the chaos fault injection and hypothesis validation thereby enabling chaos automation for target resources.

## How to use a chaos infrastructure?

You can [connect to an infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures), [disconnect from it](/docs/chaos-engineering/features/chaos-infrastructure/disconnect-chaos-infrastructure), and [upgrade it](/docs/chaos-engineering/features/chaos-infrastructure/upgrade-infra).
You can install an infrastructure as a part of creating an experiment. This infrastructure is installed on the target Kubernetes cluster and helps inject chaos into applications, thereby executing the chaos experiments.
Go to [flow of control](/docs/chaos-engineering/chaos-faults/kubernetes/classification#flow-of-control-in-kubernetes-based-faults) to understand the flow of control of Kubernetes faults.

:::tip
- You can add multiple chaos infrastructures as part of an environment.
- You can set up a chaos infrastructure in **cluster-wide** access scope or in a **namespace** scope.
:::

### Chaos infrastructure requirements

The table below lists the chaos infrastructure execution plane components and the required resources. You can install these components in your target cluster, allowing the chaos infrastructure to run experiments here. Chaos infrastructure runs within your target environment to aid HCE in accessing the target resources and injecting chaos at a cloud-native scale.

| Deployment | Container | CPU<br />required | Memory<br />required | Image |
|------------|-----------|-------------------|----------------------|-------|
| chaos-operator-ce  | chaos-operator-ce     | 125m | 300M | chaosnative/chaos-operator          |
| chaos-exporter     | chaos-exporter        | 125m | 300M | chaosnative/chaos-exporter          |
| subscriber         | subscriber            | 125m | 300M | chaosnative/harness-chaos-subscriber|
| workflow-controller| workflow-controller   | 125m | 300M | chaosnative/workflow-controller     |

