---
title: Overview
sidebar_position: 1
description: Chaos infrastructure
redirect_from:
	- /docs/chaos-engineering/technical-reference/architecture/kubernetes
---

This topic introduces you to chaos infrastructure, its types, why it is important, and you can use it.

### What is a chaos infrastructure?

**Chaos infrastructure** represents the individual components of a deployment environment. It is a service that runs within your target environment to help HCE access the target resources and inject chaos at a cloud-native scale.

You can add multiple chaos infrastructures as part of an environment. You can set up a chaos infrastructure with **cluster-wide** access or with a **namespace** scope.

### Types of infrastructure

There are different types of chaos infrastructure based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service or a Linux daemon.

:::tip
Chaos experiments associated with Cloud Foundry are executed with the help of Linux chaos infrastructure, and the ones associated with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.
:::

All the chaos infrastructure services adhere to the principle of least privilege, where the services execute with the minimum number of permissions.


### Why is a chaos infrastructure required?

Chaos infrastructure helps facilitate the chaos fault injection and hypothesis validation thereby enabling chaos automation for target resources.

### How to use a chaos infrastructure?

You can [connect to an infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures), [disconnect from it](/docs/chaos-engineering/features/chaos-infrastructure/disconnect-chaos-infrastructure), and [upgrade it](/docs/chaos-engineering/features/chaos-infrastructure/upgrade-infra).
You can install an infrastructure as a part of creating an experiment. This infrastructure is installed on the target Kubernetes cluster and helps inject chaos into applications, thereby executing the chaos experiments.
Go to [flow of control](/docs/chaos-engineering/chaos-faults/kubernetes/classification#flow-of-control-in-kubernetes-based-faults) to understand the flow of control of Kubernetes faults.