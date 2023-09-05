---
title: What's supported
sidebar_position: 10
---

This topic lists the platforms and technologies that Harness Chaos Engineering (CE) supports for deploying chaos infrastructure.
To learn more about chaos infrastructure, please refer [chaos infrastructure](/docs/chaos-engineering/technical-reference/architecture#chaos-infrastructure).


## Chaos infrastructure

### Supported operating systems and distributions

The following table shows the supported operating systems and distributions for deploying chaos infrastructure.

| Platform | Distribution | Version | Harness cloud | Self-hosted kubernetes cluster |
| -  | - | - | - | - |
| Kubernetes | OpenShift | k8s 1.21+ | ✅ Supported | ✅ Supported |
| Kubernetes | Rancher | k8s 1.21+ | ✅ Supported | ✅ Supported |
| Kubernetes | GKE | k8s 1.21+ | ✅ Supported | ✅ Supported |
| Kubernetes | EKS | k8s 1.21+ | ✅ Supported | ✅ Supported |
| Kubernetes | AKS | k8s 1.21+ | ✅ Supported | ✅ Supported |
| Kubernetes | VMware Tanzu | k8s 1.21+ | ✅ Supported | ✅ Supported |
| Linux | Ubuntu | 16+ | ✅ Supported | ✅ Supported |
| Linux | Debian | 10+ | ✅ Supported | ✅ Supported |
| Linux | CentOS | 7+ | ✅ Supported | ✅ Supported |
| Linux | RHEL | 7+ | ✅ Supported | ✅ Supported |
| Linux | Fedora | 30+ | ✅ Supported | ✅ Supported |
| Linux | openSUSE Leap | 15.4+ | ✅ Supported | ✅ Supported |

### Kubernetes

#### Container runtimes

The supported container runtimes are as follows:

* Docker
* Crio
* Containerd

## Chaos fault types

The following table shows available fault types and where they are supported. For a complete list and detailed information, go to [Chaos faults](/docs/chaos-engineering/technical-reference/chaos-faults/).

| Fault type | Linux | K8s | Windows | VMware | AWS | GCP | Azure |
|------------|-------|-----|---------|--------|-----|-----|-------|
| **Network**<br />For example Network loss, Network latency, etc. | ✅    |   ✅  | ✅      | ✅    |  ✅  |     |     |
| **HTTP**<br />For example, HTTP latency, HTTP modify body, etc. |        | ✅  |         | ✅    |  ✅  |     |      |
| **DNS**<br />For example, DNS error, DNS spoof, etc. | ✅     | ✅  | ✅ |    ✅    |  ✅  |    |      |
| **System time**<br />For example, Time skew chaos, etc.  | ✅    |  ✅  |         |        |    |   |       |
| **Resource stress**<br />For example, CPU stress, Memory stress, etc. | ✅| ✅  | ✅     |  ✅    |  ✅  |    |  ✅  |
| **State change**<br />For example, VM stop, Pod kill, etc.  |  ✅  |  ✅  |   ✅   |   ✅   |  ✅  |   ✅  |   ✅   |
| **Managed Services**<br />For example, AWS ECS agent stop, Azure web app stop, etc. |   |   |   |   ✅   |  ✅  |   ✅  |   ✅   |
