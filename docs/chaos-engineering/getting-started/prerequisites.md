---
title: Prerequisites
description: Get everything you need to start running Chaos Engineering experiments with Harness.
sidebar_position: 1
canonical_url: https://www.harness.io/blog/chaos-engineering
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/prerequisites
- /docs/chaos-engineering/get-started/tutorials/prerequisites
- /docs/chaos-engineering/get-started/prerequisites
- /docs/chaos-engineering/onboarding/prerequisites
- /docs/chaos-engineering/getting-started/saas
---

This topic describes prerequisites to be fulfilled before executing chaos experiments (on various platforms, such as cloud, Windows, Linux, and so on) using Harness Chaos Engineering (SaaS). 

## Access to Harness

- Sign up for a [Harness account](https://app.harness.io) if you don’t already have one.
- Navigate to the **Chaos Engineering** module once you're logged in.

    ![](./static/chaos-engg.png)

## Target System (What You'll Test)

- A running Kubernetes cluster where your app or infrastructure lives.
- If your target system is a Windows OS based machine or Linux machine, go to [Prerequisites for Windows OS](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/windows/prerequisites) and [Permissions Required](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/windows/windows-chaos-permissions) and [Prerequisites for Linux](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/linux/permissions). For VMware platform, go to [VMware - vCenter and Windows permissions](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/vmware/permissions) and [VMware - Linux permissions](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/vmware/linux/binary-installation) 


## Platform Info

Make sure you know:

- If your target system is [Kubernetes](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/) or cloud-based ([AWS](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/), [GCP](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/gcp/), or [Azure](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/azure/)), determine the Kubernetes version.
- If you're using GKE, are you on **Standard** or **Autopilot**?
- Harness experiments run from a control plane that connects to your target clusters, hence a [delegate](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview) is required to establish that connection.

:::info note
- If you want to inject chaos into your AWS resource, use [IRSA](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-iam-integration/), and set up your execution environment on EKS.
- Harness Chaos Engineering supports injecting faults across different Kubernetes clusters from a single, [centralized execution plane](https://developer.harness.io/docs/chaos-engineering/concepts/how-stuff-works/centralized-exec-plane) (cluster), if there is network connectivity (transient runners/pods on the target clusters).
:::

## Internet Access

- Your clusters must be able to reach `app.harness.io` and other necessary endpoints.
- Is [whitelisting](https://developer.harness.io/docs/platform/authentication/authentication-overview/#restrict-email-domains) required?
- If you're using a proxy or firewall, ensure [outbound access](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips) is configured correctly.

## Permissions (RBAC)

- Harness needs permissions to create workloads in your target cluster.
- The permissions required for Kubernetes or the cloud-based platform is linked below:
    - [AWS permissions required](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/permissions)
    - [GCP](https://developer.harness.io/docs/category/security-configuration)
    - [Kubernetes permissions required](https://developer.harness.io/docs/category/permissions)
- Use [sample RBAC policies](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/governance/rbac) to control access.
- You can scope permissions to a single namespace.
- You can create [custom roles/serviceaccounts](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-iam-integration) on the cloud providers to inject chaos.
- Would [service discovery](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/service-discovery/) and fault injection be restricted to a particular namespace? For example, node faults can't be executed in namespace mode.
- Are approvals required to create roles with [specific policies](https://developer.harness.io/docs/platform/governance/policy-as-code/sample-policy-use-case/)/permissions? Harness CE provides the minimal policy spec based on the resources and faults.

:::info note
- By default, chaos injection is cluster-scoped. Harness CE [discovers services](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/service-discovery/) and injects chaos on workloads across namespaces on a given cluster.
:::

## Image Registries

- Your cluster should be able to pull images from public registries like Docker Hub or GHCR.
- If using a [private registry](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry/), ensure proper access is set up.
- Check if the target clusters use one or more registries.

## Deployment Options

- You can deploy Harness components via [Helm](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/kubernetes#use-helm-template-to-install-chaos-infrastructure), manifests, or [pipelines](https://developer.harness.io/docs/continuous-integration/get-started/key-concepts).

## Security Policies

- Ensure that security policies like [Kyverno](https://developer.harness.io/docs/chaos-engineering/security/security-templates/kyverno-policies) or [OPA](https://developer.harness.io/docs/chaos-engineering/security/security-templates/opa) validate workloads during runtime.
- Some chaos experiments (like container kill or network loss) require [privileged access, i.e ChaosGuard](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/).

## Service Mesh Considerations

- If you're using a service mesh (for example, Istio or Linkerd), check if sidecar injection is enforced.
- Harness supports sidecar-aware deployments with specific configuration.

## Resource Constraints

- Check if there are [resource limits](https://developer.harness.io/docs/platform/account-license-limits/) on all containers since Harness workloads require CPU and memory resources.
- If you use quotas or [limit ranges](https://developer.harness.io/docs/platform/rate-limits), ensure Harness can run within those constraints.

## Health Probes

- Ensure your app has **liveness** and **readiness** probes.
- Harness uses these to determine whether the app recovers after chaos is injected.
- Define [resilience probes](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/probes/) in your experiment.

## Observability Tools (Optional)

- Harness can integrate with observability tools like Prometheus, Datadog, or New Relic.
- Ensure your metrics systems (endpoints) are accessible from your cluster if you plan to use them.

---

## Next Steps

- [Run Your First Chaos Experiment](https://developer.harness.io/docs/chaos-engineering/getting-started/execute-your-first-chaos-experiment)