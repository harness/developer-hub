---
title: Overview
sidebar_position: 1
canonical_url: https://www.harness.io/blog/chaos-engineering
redirect_from:
- /docs/category/chaos-infrastructure
- /docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure/
- /docs/chaos-engineering/concepts/explore-concepts/infrastructures/
- /docs/chaos-engineering/use-harness-ce/infrastructures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes what a chaos infrastructure is, and how you can use it to execute chaos experiments on your cluster.

## What is a chaos infrastructure?

**Chaos infrastructure** represents the individual components of a deployment environment. It is a service that runs in your target environment to help Harness CE access the target resources and inject chaos at a cloud-native scale.

## Why is a chaos infrastructure required?

Chaos infrastructure helps facilitate the chaos fault injection and hypothesis validation thereby enabling chaos automation for target resources.

## How to use a chaos infrastructure?

All the chaos infrastructure services adhere to the **principle of least privilege**, where the services execute with the minimum number of permissions.

Go to [enable or disable an infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/) and [upgrade it](/docs/chaos-engineering/use-harness-ce/infrastructures/upgrade-infra) to get a hands-on experience.

You can install an infrastructure as a part of creating an experiment. This infrastructure is installed on the target Kubernetes cluster and helps inject chaos into applications, thereby executing the chaos experiments.

Go to [flow of control](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/classification#flow-of-control-in-kubernetes-based-faults) to understand the flow of control of Kubernetes faults.

:::tip
- You can add multiple chaos infrastructures as part of an environment.
- You can set up a chaos infrastructure in **cluster-wide** access scope or in a **namespace** scope.
- You can select faults which are compatible to the scope (namespace or cluster-wide) of the infrastructure you selected. For example, if you have a namespace-scoped infrastructure, you can't select cluster-scoped faults since they are incompatible and you will not have the permissions to execute cluster-scoped faults in namespace-scope infrastructure.
:::

## Types of infrastructure

There are different types of chaos infrastructure such as Kubernetes, Linux, and Windows. You can choose to execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service, a Linux daemon or a Windows agent.

Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.

:::info note
To delete your environment, remove the environment references, that is, the infrastructure(s) associated with it first and then delete the environment.
:::


Harness CE facilitates installing two types of chaos infrastructure:
- [DDCR](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/) (Delegate Driven Chaos Runner) aka **Harness Delegate**; and
- [Harness Chaos infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/) that uses a dedicated infrastructure (aka Legacy Kubernetes Infrastructure).

