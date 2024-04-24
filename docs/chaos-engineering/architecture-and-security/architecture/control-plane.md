---
title: HCE control plane
sidebar_position: 2
description: HCE control plane
redirect_from:
    - /docs/chaos-engineering/technical-reference/architecture
---
This section describes the control plane of Harness Chaos Engineering (HCE).

HCE comprises two parts:

1. **Harness control plane**
2. **Chaos infrastructure**

The diagram below gives a peek into the HCE architecture.

![Overview](./static/overview.png)

**Harness control plane** consists of microservices that help the [web-based portal](https://app.harness.io) perform its functionalities. This portal helps create, schedule, and monitor chaos experiments. It comes with chaos faults that help achieve the desired chaos impact on the target resources. You can sign in (or get an invite) to the Harness platform and leverage the interactive UI dashboard to:

- [Create chaos environment](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#step-2-add-a-chaos-environment).
- [Create chaos infrastructure and enable chaos in your infrastructure](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#step-3-add-a-chaos-infrastructure).
- [Define chaos experiments](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#step-5-construct-a-chaos-experiment).
- Connect to Enterprise ChaosHubs and execute chaos experiments.
- Target the resources in your infrastructure.
- Monitor experiments during their execution.

:::tip
Depending on the version of HCE (Saas or Self-Managed Platform), the control plane is [hosted](https://app.harness.io) by Harness (for SaaS) or within your domain (for example, `harness.your-domain.io`).
:::

The diagram below describes how the control plane (Harness Saas) and its components interact with the [execution plane](/docs/chaos-engineering/architecture-and-security/architecture/execution-plane.md).

![Architecture](./static/hce-architecture.png)

- **Chaos infrastructure** is a service that runs within your target environment to help HCE access the target resources and inject chaos at a cloud-native scale. It can be set up with cluster-wide access or with a single namespace scope.

	There are different types of chaos infrastructures for different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, etc.
	Based on the target environments, chaos infrastructures can be installed as a Kubernetes service or a Linux daemon.

	All the chaos infrastructure services adhere to the principle of least privilege, where the services execute with the minimum number of permissions. You can add multiple chaos infrastructures to a single environment and subject it to a chaos experiment as an entity.

	:::tip
	Chaos experiments associated with Cloud Foundry are executed with the help of Linux chaos infrastructure, and the ones associated with AWS, GCP, Azure, VMware, and Baremetal are executed on Kubernetes infrastructure.
	:::

- **Enterprise ChaosHub** (or Enterprise hub) comes out-of-the-box with HCE and consists of pre-built manifests (YAML files) and chaos experiment templates. It is a prebuilt ChaosHub that represents the existing experiments and chaos faults. You can use faults from multiple categories to create chaos experiments in the Enterprise ChaosHub.

- **Chaos manager** is a GraphQL-based Golang microservice that serves the requests received from the chaos infrastructure either by querying the database for relevant information or fetching information from the execution plane.

- This is a NoSQL MongoDB **database** microservice accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, ChaosHubs, and GitOps details, among other information.
