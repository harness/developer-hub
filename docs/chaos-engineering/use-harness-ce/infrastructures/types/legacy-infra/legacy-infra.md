---
title: Legacy Infrastructure
---

This topic describes different types of legacy infrastructure, that is,  dedicated infrastructure to facilitate and execute chaos experiments.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service, a Linux daemon or a Windows agent.

There are different types of chaos infrastructure such as:
- [Legacy Infrastructure (Kubernetes)](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/kubernetes)
    - [OpenShift](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/openshift)
- [Linux](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/linux)
- [Windows](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/windows)

## Components in the Dedicated Infrastructure

### Workflow Custom Resource (CR)

    It is used to define the number of operations that are coupled together in a specific sequence to achieve a desired chaos impact. These operations are chaos faults or any custom action associated with the experiment, such as load generation.

### Chaos Manager

    A GraphQL-based Golang microservice that serves the requests received from the chaos infrastructure either by querying MongoDB for relevant information.

:::tip
A NoSQL MongoDB **database** microservice accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, ChaosHubs, and GitOps details, among other information.
:::

### Chaos Exporter

    An optional constituent that exposes monitoring metrics such as QPS and others present on the cluster to the frontend.
    It facilitates external observability in HCE. You can achieve this by exporting the chaos metrics generated (during the chaos injection as time-series data) to the Prometheus database for processing and analysis.

## Components common to all Chaos Infrastructure

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

### Chaos Operator
Leverages the Kubernetes operator pattern to interpret the fault configuration, execute the individual faults in an experiment, execute the fault and its probes (if they have been defined), and populate the result after the execution.

### Chaos Exporter
Optional component that facilitates external observability in Harness CE. This is achieved by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus database for processing and analysis.