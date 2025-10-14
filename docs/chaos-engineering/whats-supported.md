---
title: What's supported
sidebar_position: 2
redirect_from:
  - /docs/chaos-engineering/get-started/whats-supported
  - /docs/chaos-engineering/whats-supported
---

# What's supported

This topic lists the platforms and technologies that Harness Chaos Engineering supports for deploying chaos infrastructure and running chaos experiments.

Harness Chaos Engineering is supported on the following deployment models:
- [Harness SaaS](#harness-saas)
- [Self-Managed Enterprise Edition](#self-managed-enterprise-edition)
- [Self-Managed Enterprise Edition in Offline Environments](#self-managed-enterprise-edition-in-offline-environments)

Harness Chaos Engineering supports running faults on [AWS](/docs/chaos-engineering/faults/chaos-faults/aws/), [Azure](/docs/chaos-engineering/faults/chaos-faults/azure/), [GCP](/docs/chaos-engineering/faults/chaos-faults/gcp/), [Kubernetes](/docs/chaos-engineering/faults/chaos-faults/kubernetes/), [Linux](/docs/chaos-engineering/faults/chaos-faults/linux/), [VMware](/docs/chaos-engineering/faults/chaos-faults/vmware/), and [Windows](/docs/chaos-engineering/faults/chaos-faults/windows/) platforms.

---

## Harness SaaS

**Harness SaaS** is a fully managed cloud service that provides:
- **Quick setup** - start in minutes
- **Automatic updates** and maintenance
- **Global availability** with 99.9% uptime SLA
- **Enterprise ChaosHub** access included

### Supported Platforms for Chaos Infrastructure

The following table shows the supported operating systems and distributions for deploying chaos infrastructure:

| Platform | Distribution | Version | Supported |
|----------|-------------|---------|----------|
| **Kubernetes** | Amazon EKS | k8s 1.21+ | ✅ |
| **Kubernetes** | Azure AKS | k8s 1.21+ | ✅ |
| **Kubernetes** | Google GKE | k8s 1.21+ | ✅ |
| **Kubernetes** | Red Hat OpenShift | k8s 1.21+ | ✅ |
| **Kubernetes** | Rancher | k8s 1.21+ | ✅ |
| **Kubernetes** | VMware Tanzu | k8s 1.21+ | ✅ |
| **Kubernetes** | Self-managed clusters | k8s 1.21+ | ✅ |
| **Linux** | Ubuntu | 16.04+ | ✅ |
| **Linux** | Red Hat Enterprise Linux | 7+ | ✅ |
| **Linux** | CentOS | 7+ | ✅ |
| **Linux** | Debian | 10+ | ✅ |
| **Linux** | Fedora | 30+ | ✅ |
| **Linux** | openSUSE Leap | 15.4+ | ✅ |

:::info Container Runtimes
Kubernetes faults work with **Docker**, **CRI-O**, and **containerd** runtimes.
:::

### Supported Chaos Fault Categories

The following table shows available fault types and where they are supported. For a complete list and detailed information, go to [Chaos faults](/docs/chaos-engineering/faults/chaos-faults/).

| Fault type | Linux | K8s | Windows | VMware | AWS | GCP | Azure |
|------------|-------|-----|---------|--------|-----|-----|-------|
| **Network**<br />Network loss, Network latency, etc. | ✅ | ✅ | ✅ | ✅ | ✅ | | |
| **HTTP**<br />HTTP latency, HTTP modify body, etc. | | ✅ | | ✅ | ✅ | | |
| **DNS**<br />DNS error, DNS spoof, etc. | ✅ | ✅ | ✅ | ✅ | ✅ | | |
| **System time**<br />Time skew chaos, etc. | ✅ | ✅ | | | | | |
| **Resource stress**<br />CPU stress, Memory stress, etc. | ✅ | ✅ | ✅ | ✅ | ✅ | | ✅ |
| **State change**<br />VM stop, Pod kill, etc. | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Managed Services**<br />AWS ECS agent stop, Azure web app stop, etc. | | | | | ✅ | ✅ | ✅ |

---

## Self-Managed Enterprise Edition

**Self-Managed Enterprise Edition** provides on-premises deployment with:
- **Full control** over your deployment
- **Enterprise integrations** (LDAP, SSO)
- **Custom security policies** and compliance
- **All SaaS features** in feature parity

### Limitations

Chaos Engineering on Self-Managed Enterprise Edition has the following limitations compared to SaaS:
- **Harness Enterprise ChaosHub** is not connected by default
  - Contact [Harness Support](mailto:support@harness.io) for access to the Enterprise ChaosHub
  - Once you have access, you can add it as a [custom ChaosHub](/docs/chaos-engineering/guides/chaoshub)
- **Harness AI Development Assistant (AIDA™)** for CE

### Supported Platforms

All platforms and fault categories supported in [Harness SaaS](#harness-saas) are also supported in Self-Managed Enterprise Edition.

For more information about deployment, go to [Self-Managed Enterprise Edition and CE on SMP](/docs/chaos-engineering/guides/on-premises-smp/).

---

## Self-Managed Enterprise Edition in Offline Environments

**Self-Managed Enterprise Edition in Offline Environments** provides:
- **Completely isolated** from external networks
- **Air-gapped deployment** support
- **All enterprise features** available
- **Custom security policies** and compliance

### Requirements

- **Custom ChaosHub** integration required for fault templates
- **Contact support** for Enterprise ChaosHub access in offline environments

### Supported Platforms

All CE features and platforms supported in [Self-Managed Enterprise Edition](#self-managed-enterprise-edition) are also supported in offline environments.

---

## Next Steps

1. **[Choose your deployment](./on-premise-vs-saas)** - Compare SaaS vs Self-Managed options
2. **[Learn key concepts](./key-concepts)** - Understand chaos engineering fundamentals
3. **[Start with tutorials](./tutorials)** - Run your first chaos experiment
4. **[Explore integrations](./integrations/cicd/jenkins)** - Connect with your existing tools

:::tip Ready to get started?
Check out our **[Get Started](./get-started)** guide to begin your chaos engineering journey.
:::
