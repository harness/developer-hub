---
title: What's supported
sidebar_position: 2
redirect_from:
  - /docs/chaos-engineering/get-started/whats-supported
---

# What's supported

Harness Chaos Engineering works across multiple deployment models and supports a wide range of platforms for running chaos experiments.

## Deployment Options

Choose the deployment model that fits your organization's needs:

### 🌐 Harness SaaS
- **Fully managed** cloud service
- **Quick setup** - start in minutes
- **Automatic updates** and maintenance
- **Global availability** with 99.9% uptime SLA

### 🏢 Self-Managed Enterprise Edition (On-Premises)
- **On-premises deployment** with full control
- **Enterprise integrations** (LDAP, SSO)
- **Custom security policies** and compliance
- **Air-gapped environments** supported

### 🔒 Offline Environments (On-Premises)
- **Completely isolated** from external networks
- **All enterprise features** available
- **Custom ChaosHub** integration required
- **Contact support** for Enterprise ChaosHub access

---

## Supported Platforms

### Kubernetes Distributions
Run chaos experiments on any CNCF-certified Kubernetes cluster:

| Platform | Minimum Version | Status |
|----------|----------------|--------|
| **Amazon EKS** | k8s 1.21+ | ✅ Fully Supported |
| **Azure AKS** | k8s 1.21+ | ✅ Fully Supported |
| **Google GKE** | k8s 1.21+ | ✅ Fully Supported |
| **Red Hat OpenShift** | k8s 1.21+ | ✅ Fully Supported |
| **Rancher** | k8s 1.21+ | ✅ Fully Supported |
| **VMware Tanzu** | k8s 1.21+ | ✅ Fully Supported |
| **Self-managed clusters** | k8s 1.21+ | ✅ Fully Supported |

:::info Container Runtimes
Kubernetes faults work with **Docker**, **CRI-O**, and **containerd** runtimes.
:::

### Linux Distributions
Deploy chaos infrastructure on popular Linux distributions:

| Distribution | Minimum Version | Status |
|-------------|----------------|--------|
| **Ubuntu** | 16.04+ | ✅ Fully Supported |
| **Red Hat Enterprise Linux** | 7+ | ✅ Fully Supported |
| **CentOS** | 7+ | ✅ Fully Supported |
| **Debian** | 10+ | ✅ Fully Supported |
| **Fedora** | 30+ | ✅ Fully Supported |
| **openSUSE Leap** | 15.4+ | ✅ Fully Supported |

---

## Chaos Fault Categories

The following table shows available fault types and where they are supported. For a complete list and detailed information, go to [Chaos faults](/docs/chaos-engineering/use-harness-ce/chaos-faults/).

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

## Next Steps

1. **[Choose your deployment](./on-premise-vs-saas)** - SaaS vs Self-Managed
2. **[Learn key concepts](./key-concepts)** - Understand chaos engineering fundamentals
3. **[Start with tutorials](./tutorials)** - Run your first chaos experiment
4. **[Explore integrations](./integrations)** - Connect with your existing tools

:::tip Ready to get started?
Check out our **[Overview](./overview)** to understand how Harness Chaos Engineering can help build resilient systems.
:::
