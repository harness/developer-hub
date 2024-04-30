---
title: What's supported
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering/get-started/whats-supported
---

This topic lists the platforms and technologies that Harness Chaos Engineering (HCE) supports for deploying chaos infrastructure.
To learn more about chaos infrastructure, go to [Chaos infrastructure](/docs/chaos-engineering/architecture-and-security/architecture/control-plane).

Harness Chaos Engineering is supported on the following platforms:
- [Harness SaaS](#harness-saas)
- [Harness Self-Managed Enterprise Edition](#harness-self-managed-enterprise-edition)
- [Harness Self-Managed Enterprise Edition In Offline Environments](#harness-self-managed-enterprise-edition-in-offline-environments)

## Harness SaaS

### Chaos infrastructure

#### Supported operating systems and distributions

The following table shows the supported operating systems and distributions for deploying chaos infrastructure.

| Platform | Distribution | Version | Supported |
| -  | - | - | - |
| Kubernetes | OpenShift | k8s 1.21+ |  ✅  |
| Kubernetes | Rancher | k8s 1.21+ |  ✅  |
| Kubernetes | GKE | k8s 1.21+ |  ✅  |
| Kubernetes | EKS | k8s 1.21+ |  ✅  |
| Kubernetes | AKS | k8s 1.21+ |  ✅  |
| Kubernetes | VMware Tanzu | k8s 1.21+ |  ✅  |
| Linux | Ubuntu | 16+ |  ✅  |
| Linux | Debian | 10+ |  ✅  |
| Linux | CentOS | 7+ |  ✅  |
| Linux | RHEL | 7+ |  ✅  |
| Linux | Fedora | 30+ |  ✅  |
| Linux | openSUSE Leap | 15.4+ |  ✅  |

### Kubernetes

#### Container runtimes

The supported container runtimes are as follows:

* Docker
* Crio
* Containerd

### Chaos fault types

The following table shows available fault types and where they are supported. For a complete list and detailed information, go to [Chaos faults](/docs/chaos-engineering/chaos-faults/).

| Fault type | Linux | K8s | Windows | VMware | AWS | GCP | Azure |
|------------|-------|-----|---------|--------|-----|-----|-------|
| **Network**<br />For example Network loss, Network latency, etc. | ✅    |   ✅  | ✅      | ✅    |  ✅  |     |     |
| **HTTP**<br />For example, HTTP latency, HTTP modify body, etc. |        | ✅  |         | ✅    |  ✅  |     |      |
| **DNS**<br />For example, DNS error, DNS spoof, etc. | ✅     | ✅  | ✅ |    ✅    |  ✅  |    |      |
| **System time**<br />For example, Time skew chaos, etc.  | ✅    |  ✅  |         |        |    |   |       |
| **Resource stress**<br />For example, CPU stress, Memory stress, etc. | ✅| ✅  | ✅     |  ✅    |  ✅  |    |  ✅  |
| **State change**<br />For example, VM stop, Pod kill, etc.  |  ✅  |  ✅  |   ✅   |   ✅   |  ✅  |   ✅  |   ✅   |
| **Managed Services**<br />For example, AWS ECS agent stop, Azure web app stop, etc. |   |   |   |   ✅   |  ✅  |   ✅  |   ✅   |

## Harness Self-Managed Enterprise Edition

Chaos Engineering on Harness Self-Managed Enterprise Edition is in feature parity with Harness SaaS with the following limitations:
* Harness Enterprise ChaosHub is not connected by default.
  * Contact [Harness Support](mailto:support@harness.io) for access to the Harness Enterprise ChaosHub. Once you have access, you can add the Enterprise ChaosHub as a [custom ChaosHub](/docs/chaos-engineering/features/chaos-hubs/add-chaos-hub.md).
* Harness AI Development Assistant (AIDA™) for CE

For more information, go to [Self-Managed Enterprise Edition](/docs/self-managed-enterprise-edition) and [CE on SMP](/docs/chaos-engineering/get-started/ce-on-smp/ce-smp-roadmap).

## Harness Self-Managed Enterprise Edition In Offline Environments

All CE features supported in [Harness Self-Managed Enterprise Edition](#harness-self-managed-enterprise-edition) are also supported in Self-Managed Enterprise Edition in offline environments.
