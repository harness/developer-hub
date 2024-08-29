---
title: Delegate
sidebar_position: 2
description: Harness chaos infrastructure that uses Harness Delegate to allow for quick onboarding and optimized chaos execution of experiments.
redirect_from:
- /docs/chaos-engineering/onboarding/harness-infra
- /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/
---

This topic walks you through Harness chaos infrastructure that uses Harness Delegate and how it facilitates quick onboarding and optimizes chaos experiments.

## What is Harness Delegate?

Harness Delegate is a beta product in HCE that allows for quick onboarding and optimized chaos execution for microservices-based targets on Kubernetes.
The features described below help achieve quick onboarding and optimized chaos experiment execution.
The diagram below describes the high-level flow of how you can [discover services](/docs/chaos-engineering/concepts/explore-features/service-discovery) and [create application maps](/docs/chaos-engineering/concepts/explore-features/app-maps).

    ![](./static/flow-v2.png)

### Experiment execution using Delegate

The schematic diagram below describes how chaos experiments are executed in Harness infrastructure using Harness Delegate, that is, using Harness Delegate. It highlights the use of Harness Delegate which eliminates the need for a separate chaos agent, which simplifies the experiment orchestration mechanism.

    ![](./static/ddci-flow.png)

Go to [permissions required](/docs/chaos-engineering/concepts/explore-features/infrastructures/delegate/permissions) to know the detailed list of permissions to execute Kubernetes faults with a Delegate.

The diagram below describes the detailed flow of control (step 5 of the earlier diagram), for an example chaos experiment- [pod DNS chaos](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-dns-error).

    ![](./static/elaborate.png)

## Features of Harness Delegate
- Automated Kubernetes [service discovery](/docs/chaos-engineering/concepts/explore-features/service-discovery) and workloads with network traffic patterns between them through a transient discovery agent.
- [Automated](/docs/chaos-engineering/getting-started/onboarding/guided-onboarding#choose-between-automatic-and-customizable-application-map-creation) and [guided](/docs/chaos-engineering/concepts/explore-features/app-maps#create-an-application-map) application map creation that represent a fully functional application within the cluster (which comprises of several constituent microservices).
- [Chaos experiment auto-creation](#auto-create-experiment) for a given [application map](/docs/chaos-engineering/concepts/explore-features/app-maps) based on the workload specification and its lineage in terms of network traffic.
- Reuse the Harness Delegate for chaos experiment execution on the user cluster without a dedicated (or separate) chaos agent.
- Application-level and application map level resilience scores.

### Auto-create experiment
Experiments are auto-created based on levels (or categories) you select during automated or guided onboarding. The default setting is that HCE creates all the recommended experiments for the selected application map.

    ![](./static/exp-rec.png)

### Speed of execution
Previously, chaos experiments that executed on dedicated chaos infrastructure would typically take more time (in the order of 4 minutes) whereas with Harness Delegate, you can complete experiment execution in less than half the time (in the order of 1.5 minutes).

The diagram below shows the execution time for experiments that use legacy Kubernetes infrastructure.

    ![](./static/v1-exp.png)

The diagram below shows the execution time for experiments that use Harness Delegate.

    ![](./static/v2-exp.png)

### Fault tunables
The number of tunables to specify in an experiment changes; Harness Delegate gives better control over the experiments since it provides advanced tunables.

The diagram below shows the tunables used in experiments that use legacy Kubernetes infrastructure..

    ![](./static//v1-tunables.png)

The diagram below shows the tunables used in experiments that use Harness Delegate.

    ![](./static/v2-tunables.png)

### Resilience score

Previously, resilience score was measured at the experiment level. With Harness Delegate, you can gain insights into an application along with its associated application map. This way, you can view the application-level resilience score and application map level resilience score.
