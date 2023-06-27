---
title: What's supported
sidebar_position: 15
---

This topic lists the platforms and technologies that Harness Chaos Engineering (CE) supports.

## Chaos infrastructure

You can deploy chaos infrastructure on the platforms below.

### Kubernetes

#### Kubernetes distributions

CE supports these Kubernetes distributions:

* OpenShift
* Rancher
* GKE
* EKS
* AKS
* VMware Tanzu

### Linux

#### Linux distributions

* Ubuntu version 16+
* Debian version 10+
* CentOS version 7+
* RHEL version 7+
* Fedora version 30+
* openSUSE Leap version 15.4+

## Container runtimes

CE supports these container runtimes:

* Docker
* Crio
* Containerd

## Chaos fault types 

The following table shows available fault types and where they are supported. For a complete list and detailed information, go to [Chaos faults](/docs/chaos-engineering/technical-reference/chaos-faults/).

| Fault type | Linux | K8s | Windows | VMware | AWS | GCP | AKS |
|------------|-------|-----|---------|--------|-----|-----|-----|
| Networking | ✅    |     | ✅      | ✅    |     |     |     |  
| HTTP       |        | ✅  |         | ✅    |    |     |      |
| DNS        | ✅     | ✅  | ✅      | ✅    |    |    |      |
| Time faults | ✅    |     |         |        |    |   |       |
| Resource stress | ✅| ✅  | ✅     |  ✅    |    |    |  ✅  |
| Status change |  ✅  |    |        |        |    |     |      |
| I/O system | ✅      | ✅ | ✅     | ✅    |     |    | ✅   |
