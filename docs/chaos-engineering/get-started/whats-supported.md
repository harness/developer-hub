---
title: What's supported
sidebar_position: 10
---

This topic lists the platforms and technologies that Harness Chaos Engineering (CE) supports.

## Chaos infrastructure

You can deploy chaos infrastructure on the platforms below.

### Kubernetes

#### Kubernetes distributions

CE supports Kubernetes version 1.21+, in the following distributions:

* OpenShift
* Rancher
* GKE
* EKS
* AKS
* VMware Tanzu

#### Container runtimes

The supported container runtimes are as follows:

* Docker
* Crio
* Containerd

### Linux

#### Linux distributions

CE supports these Linux OS distributions:

* Ubuntu version 16+
* Debian version 10+
* CentOS version 7+
* RHEL version 7+
* Fedora version 30+
* openSUSE Leap version 15.4+

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
