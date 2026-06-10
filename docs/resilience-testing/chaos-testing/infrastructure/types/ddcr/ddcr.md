---
title: Delegate-Driven Chaos Infrastructure
description: Delegate-Driven Chaos Infrastructure
sidebar_position: 10
redirect_from:
- /docs/category/harness-delegate-driven-infrastructure
- /docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/
- /docs/chaos-engineering/guides/infrastructures/ddcr/
---

This topic describes Delegate-Driven Chaos Infrastructure, its characteristics, and installation. 

## What is DDCR?

DDCR, aka [Harness Delegate or DDCI (Delegate-Driven Chaos Infrastructure) or DDCR (Delegate-Driven Chaos Runners)](/docs/platform/delegates/delegate-concepts/delegate-overview) is a service that runs in your local network that helps connect your infrastructure, artifacts with Harness Manager. It allows for quick onboarding and optimized chaos execution for microservices-based targets on Kubernetes.

To install a new Delegate, go to [enable chaos](../)

The diagram below describes the high-level flow of how you can [discover services](../../../service-discovery) and [create application maps](../../../application-maps).

    ![](./static/delegate/flow-v2.png)

:::info note
- To execute chaos experiments, HCE supports Delegate version `24.09.83900` and above.
:::

### Experiment execution using DDCR

The schematic diagram below describes how chaos experiments are executed in using Harness Delegate. It highlights the use of Harness Delegate which eliminates the need for a separate chaos agent, which simplifies the experiment orchestration mechanism.

    ![](./static/delegate/ddci-flow.png)

Go to [permissions required](./permissions) to know the detailed list of permissions to execute Kubernetes faults with a Delegate.

The diagram below describes the detailed flow of control (step 5 of the earlier diagram), for an example chaos experiment- [pod DNS chaos](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-dns-error).

    ![](./static/delegate/elaborate.png)

### Characteristics of DDCR

- Automated Kubernetes [service discovery](../../../service-discovery) and workloads with network traffic patterns between them through a transient discovery agent.
- [Automated](../../../get-started#choose-between-automatic-and-customizable-application-map-creation) and [guided](../../../application-maps#create-an-application-map) application map creation that represent a fully functional application within the cluster (which comprises of several constituent microservices).
- [Chaos experiment auto-creation](#auto-create-experiment) for a given [application map](../../../application-maps) based on the workload specification and its lineage in terms of network traffic.
- Reuse the Harness Delegate for chaos experiment execution on the user cluster without a dedicated (or separate) chaos agent.
- Application-level and application map level resilience scores.

### Auto-create experiments
Experiments are auto-created based on levels (or categories) you select during automated or guided onboarding. The default setting is that HCE creates all the recommended experiments for the selected application map.

    ![](./static/delegate/exp-rec.png)

### Speed of execution
Earlier, chaos experiments that executed on dedicated chaos infrastructure would typically take more time (in the order of 4 minutes) whereas with Harness Delegate, you can complete experiment execution in less than half the time (in the order of 1.5 minutes).

The diagram below shows the execution time for experiments that use legacy Kubernetes infrastructure.

    ![](./static/delegate/v1-exp.png)

The diagram below shows the execution time for experiments that use Harness Delegate.

    ![](./static/delegate/v2-exp.png)

### Fault tunables
The number of tunables configured in an experiment that uses Harness Delegate is different. Harness Delegate provides better control over the experiments because of the presence of advanced tunables.

### Resilience score

Earlier, resilience score was measured at the experiment level. With Harness Delegate, you can gain insights into an application along with its associated application map. This way, you can view the application-level resilience score and application-map-level resilience score.

## Secret decryption with external secret managers

Chaos experiments that run through Harness Delegate use a dedicated chaos delegate task to decrypt the secrets they consume at runtime, such as connector credentials and APM or cloud probe authentication keys.

Because the delegate performs the decryption, you can store these secrets in the Harness Secret Manager or in an external secret manager such as HashiCorp Vault, Google Cloud KMS, or Azure Key Vault. Secrets are referenced the same way regardless of where they are stored, so your existing experiments and probes do not change.

:::info Feature flag
This behavior is behind the feature flag `CHAOS_DEDICATED_DELEGATE_TASK`. Contact [Harness Support](mailto:support@harness.io) to enable it for your account. When the flag is enabled, chaos workflows that use the Harness NG Manager `/chaos/...` endpoints start using the dedicated chaos delegate task.
:::

Go to [Use an external secret manager](/docs/resilience-testing/security/#use-an-external-secret-manager) to review the supported secret managers and setup steps.

## Next Steps

- [Permissions Required](./permissions)
- [Install Delegate](./installation)
- [Delegate versus Dedicated infrastructure](../ddcr-vs-dedicated)