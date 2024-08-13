---
sidebar_position: 2
title: Deployment Architecture
description: Deployment architecture of Harness Chaos Engineering
redirect_from:
- /docs/chaos-engineering/get-started/key-concepts
- /docs/chaos-engineering/architecture-and-security/architecture/components
- /docs/chaos-engineering/architecture-and-security/architecture
- /docs/chaos-engineering/technical-reference/architecture/kubernetes
- /docs/chaos-engineering/technical-reference/architecture/linux
- /docs/chaos-engineering/architecture-and-security/architecture/control-plane
---

## Before you begin

- [All about chaos engineering](/docs/chaos-engineering/concepts/chaos101)

## System architecture overview

To determine and improve the resilience of an application, you need to execute certain steps (known as chaos experiments) on your cluster. This involves two essential components interacting with each other:

- **Control Plane** (HCE SaaS)
- **Execution Plane** (Your host/cluster)

Depending on the version of HCE (SaaS or Self-Managed Platform), the control plane is [hosted](https://app.harness.io) by Harness (for SaaS) or within your domain (for example, `harness.your-domain.io`).

The diagram below illustrates the relationship between HCE SaaS (the control plane) and your host or cluster (the execution plane), demonstrating how experiments are conducted using HCE.

![Architecture](./static/architecture/hce-architecture.png)

From the diagram, you can infer the following at a high level:

1. A connection is established between the execution plane and the control plane.
2. The control plane sends chaos experiments to the execution plane for execution.
3. Results from the execution plane are sent back to the control plane.

For detailed steps on this interaction, refer to [interaction between the control plane and execution plane](#interaction-between-the-execution-plane-and-the-control-plane).

## Component description

The components specified in the diagram earlier are described below.

**Chaos experiment**: It injects one or more chaos faults into a specified chaos infrastructure and summarizes the result of the chaos execution. You can define the experiment using the Chaos Studio through the guided UI or by uploading the workflow CR (custom resource) manifest.

**Chaos fault**: Also known as a **fault**, refers to the failures injected into the chaos infrastructure as part of a chaos experiment. Every fault is scoped to a particular target resource, and you can customize the fault using the fault tunables, which you can define as part of the Chaos Experiment CR and Chaos Engine CR. Optionally, you can define one or more probes as part of a chaos fault.

**ChaosHub**: A collection of experiment templates (defined as workflow CRs) and faults (defined as ChaosExperiment CR and ChaosEngine CR) that help create and execute new chaos experiments against your target resources. Apart from the Enterprise ChaosHub, which is present by default, you can add custom ChaosHub to manage and distribute custom experiment templates and faults.

	- **Enterprise ChaosHub**: Also known as Enterprise hub, it comes out-of-the-box with HCE and consists of pre-built manifests (YAML files) and chaos experiment templates. It is a prebuilt ChaosHub that represents the existing experiments and chaos faults. You can use faults from multiple categories to create chaos experiments in the Enterprise ChaosHub.

**Chaos infrastructure**: It represents the individual components of a deployment environment. It is a service that runs within your target environment to help HCE access the target resources and inject chaos at a cloud-native scale.

**Environment**: It represents your deployment environment such as `Dev`, `QA`, `Staging`, `Production`, etc. Each environment may contain multiple chaos infrastructures. It helps isolate the various environments that the engineering, product owners, QA, and automation teams use under a single Harness project. This allows for better segregation of mission-critical infrastructures with several attached dependencies from dev and staging infrastructures for their safety.

**Chaos Studio**: It is used to create new chaos experiments using various chaos faults and templates from ChaosHub, probes, and custom action steps. You can create new experiments using the guided UI or by using the experiment manifest represented by the workflow CR.

**Resilience score**: It is a quantitative measure of how resilient the target application is to a chaos experiment. You can [calculate](/docs/chaos-engineering/features/experiments/resilience-score) this value based on the priority set for every fault in the experiment and the probe success percentage of the faults (if the probes are defined).

**Chaos Engine Custom Resource (CR)**: It is the user-facing chaos Kubernetes CR which connects a target resource instance with a chaos fault to orchestrate the steps of chaos execution. You can specify run-level details such as overriding fault defaults, providing new environment variables and volumes, deleting or retaining experiment pods, defining probes, and updating the status of the fault execution.

**Chaos Experiment Custom Resource (CR)**: It contains the low-level execution information for the execution of a chaos fault. The CR holds granular details of a fault such as the container image, library, necessary permissions, and chaos parameters. Most of the chaos experiment CR parameters are tunables that you can override from the chaos engine CR.

**Workflow Custom Resource (CR)**: It is used to define the number of operations that are coupled together in a specific sequence to achieve a desired chaos impact. These operations are chaos faults or any custom action associated with the experiment, such as load generation.

**Chaos manager**: A GraphQL-based Golang microservice that serves the requests received from the chaos infrastructure either by querying MongoDB for relevant information.

:::tip
A NoSQL MongoDB **database** microservice accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, ChaosHubs, and GitOps details, among other information.
:::

**Chaos Exporter**: An optional constituent that exposes monitoring metrics such as QPS and others present on the cluster to the frontend.
It facilitates external observability in HCE. You can achieve this by exporting the chaos metrics generated (during the chaos injection as time-series data) to the Prometheus database for processing and analysis.

### Components common to all chaos infrastructure

Some of the components common to all chaos infrastructures include:

- **Workflow controller**: Helps execute chaos experiments by:
	- Searching for the experiment on the cluster.
	- Identifying the experiment.
	- Triggering the experiment.

- **Subscriber**: Serves as a bridge between the execution plane and control plane. It also performs other tasks required to orchestrate the chaos experiment executions, such as:
	- Installing a new chaos experiment on the cluster.
	- Sending the experiment metadata (after completing the execution) to the control plane.
	- Performing health checks on all the components in the chaos execution plane.
	- Creating a chaos experiment CR from a chaos experiment template.
	- Monitoring the events associated with the chaos experiment during its execution.

#### Kubernetes execution plane

The Kubernetes execution plane consists of chaos infrastructure components like [workflow controllers, and subscribers](/docs/chaos-engineering/concepts/deployment-architecture#components-common-to-all-chaos-infrastructure) that are described earlier, and backend execution infrastructure components like [ChaosExperiment CR](/docs/chaos-engineering/concepts/deployment-architecture#component-description), [ChaosEngine CR](/docs/chaos-engineering/concepts/deployment-architecture#component-description), etc.

#### Chaos operator
Leverages the Kubernetes operator pattern to interpret the fault configuration, execute the individual faults in an experiment, execute the fault and its probes (if they have been defined), and populate the result after the execution.

#### Chaos exporter
Optional component that facilitates external observability in HCE. This is achieved by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus database for processing and analysis.

#### Linux execution plane
The Linux execution plane consists of only the Linux chaos infrastructure daemon service.

Linux chaos infrastructure daemon service is a **Systemd** service responsible for injecting faults into a Linux machine as a part of a chaos experiment.

- The infrastructure relies on a polling model to fetch and execute the experiments or tasks from the control plane.
- It uses a rotating access token based authorization along with TLS encryption to ensure secure communication with the control plane.
- Multiple faults in an experiment can execute serially or in parallel to each other, depending on how the faults have been defined.
- Every machine has a one-to-one mapping with the infrastructure daemon service, and all of these infrastructure(s) communicate with the control plane to:
    1. Fetch experiments for execution
    2. Update experiment execution status
    3. Stream experiment logs
    4. Send experiment execution result

#### Compatibility with Linux distribution
The chaos infrastructure has been tested for compatibility in the following Linux OS distributions:
1. Ubuntu 16+
2. Debian 10+
3. CentOS 7+
4. RHEL 7+
5. Fedora 30+
6. openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+

### Control Plane

The Harness control plane comprises microservices that enable the [web-based portal](https://app.harness.io) to perform its functions.

You can sign in (or receive an invitation) to the Harness Platform and use the interactive UI dashboard to:

- Create a chaos environment.
- Create chaos infrastructure and enable chaos within your infrastructure.
- Define chaos experiments.
- Connect to Enterprise ChaosHubs and execute chaos experiments.
- Target resources in your infrastructure.
- Monitor experiments during execution.

#### Why is a Control Plane Required?
The control plane helps **create**, **schedule**, and **monitor** chaos experiments. It includes chaos faults that achieve the desired chaos impact on target resources.

The diagram below illustrates how the control plane (Harness SaaS) and its components (such as chaos experiments, ChaosHub, database, etc.) interact with the execution plane components like Kubernetes or Linux infrastructure.

### Execution Plane
The Harness execution plane contains components responsible for orchestrating chaos injection into target resources. These components include:

- Operator
- Exporter (optional)
- Subscriber
- Workflow Controller

#### Why is an Execution Plane Required?
The execution plane sets up the resources (clusters) where chaos experiments are run. You will use the control plane to interact with these clusters and create chaos experiments.

You can install the execution plane components through the chaos infrastructure in clusters (either external or internal, depending on the type of chaos infrastructure used).

## Interaction Between the Execution Plane and the Control Plane

Here's how the interaction unfolds when you schedule an experiment:

1. After scheduling the experiment, the control plane sends it to the execution plane.
2. The subscriber installs the chaos experiment on the cluster.
3. Upon installation, the workflow controller identifies the experiment and triggers it.
4. The operator searches for the chaos faults within the experiment and initiates their execution.
5. Once the experiment completes, data (such as the experiment name, faults, probes, etc.) is sent back to the workflow controller by the subscriber.

### Resource utilization matrix
The resource utilization matrix for execution plane components is summarized below. These components are installed in the target cluster as a part of the Kubernetes-based chaos infrastructure.

:::tip
The table below is indicative of low to medium-load working conditions. As chaos activity increases, more resources will be required, and the values represented here may vary.
:::

| Deployment          | container           | CPU (Requested) | Memory (Requested) | Image                                               |
|---------------------|---------------------|-----------------|--------------------|-----------------------------------------------------|
| chaos-operator-ce   | chaos-operator-ce   | 125m            | 300M               | docker.io/harness/chaos-operator:1.31.0             |
| chaos-exporter      | chaos-exporter      | 125m            | 300M               | docker.io/harness/chaos-exporter:1.31.0             |
| subscriber          | subscriber          | 125m            | 300M               | docker.io/harness/chaos-subscriber:1.31.0           |
| workflow-controller | workflow-controller | 125m            | 300M               | docker.io/harness/chaos-workflow-controller:v3.4.16 |