---
title: Architecture
sidebar_position: 1
---
This section describes the Harness Chaos Engineering (HCE) architecture along with the components.

Below is an overview of the HCE architecture.

![Overview](./static/architecture/overview.png)

HCE comprises two parts:

1. **Harness control plane**
2. **Chaos infrastructure**

The diagram below gives a peek into the HCE architecture.
![Architecture](./static/architecture/HCE-architecture.png)

## Harness control plane

**Harness control plane** is the single source to collaboratively create, schedule, and monitor chaos experiments. It comes with a set of chaos faults that are defined in a sequence, which helps achieve the desired chaos impact on the target resources. You can sign in to the Harness platform and leverage the interactive UI dashboard to enable chaos access in your infrastructure, define your chaos experiments and target the infrastructure. You can also monitor the experiments during their execution.

### Control plane components

The control plane in HCE contains many components, which are described below.

#### Chaos infrastructure

Chaos infrastructure corresponds to a set of components that run within your target environment to help HCE discover and inject chaos into the target resources.

- There are different types of chaos infrastructures for different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, etc.
- Based on the target environments, chaos infrastructures can be installed as a Kubernetes service, a Linux daemon, and so on.

:::note
Kubernetes chaos infrastructures can be set up with cluster-wide access or with a single namespace scope.
:::

All the chaos infrastructure services adhere to the principle of least privilege, where the services execute with the minimum number of permissions. You can add multiple chaos infrastructures to a single environment and subject it to a chaos experiment as an entity.

#### Enterprise hub

Enterprise chaos hub comes out of the box with HCE and provides many faults and experiment templates. Enterprise hub is a prebuilt chaos hub, a collection of manifests and charts that represent the existing experiments and faults. You can use faults from multiple categories to create chaos experiments in the Enterprise chaos hub.

#### Chaos manager

The chaos manager is a GraphQL-based Golang microservice that serves the requests either by querying the database for relevant information or fetching information from the execution plane.

#### Database

This is a NoSQL MongoDB database microservice accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, chaos hubs, and GitOps details, among other information.

## Harness execution plane

**Harness Execution Plane** contains the components responsible for orchestrating the chaos injection into the target resources. These components are installed through the chaos infrastructure.
- The [Kubernetes execution plane](./kubernetes) consists of chaos delegate infrastructure components like workflow controllers, subscribers, event trackers, etc., and backend execution infrastructure components like ChaosExperiment CR, ChaosEngine CR, etc.
- The [Linux execution plane](./linux) is consists of only the Linux chaos infrastructure daemon service.
