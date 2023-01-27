---
title: Infrastructure
description: This document lists the infrastructure requirements for a Harness Self-Managed Enterprise Edition - Virtual Machine installation. Harness Self-Managed Enterprise Edition - Virtual Machine refers to i…
sidebar_position: 10
helpdocs_topic_id: yo2jldlq45
helpdocs_category_id: 872aodnvl1
helpdocs_is_private: false
helpdocs_is_published: true
---

This document lists the infrastructure requirements for a Harness Self-Managed Enterprise Edition - Virtual Machine installation.

Harness Self-Managed Enterprise Edition - Virtual Machine refers to installing the Harness Self-Managed Enterprise Edition Kubernetes cluster on VMs.

First, you use the requirements below to bootstrap a Kubernetes cluster on your target VMs.

After you stand up the Kubernetes cluster, you use it to install Harness Self-Managed Enterprise Edition - Virtual Machine on the configured cluster.

## Supported Operating Systems

* Ubuntu 18.04 (recommended)
* CentOS 7.4, 7.5, 7.6, 7.7
* RHEL 7.4, 7.5, 7.6, 7.7

## VM Specifications

There are different VM specifications for production and development installations.

### Number of VMs

The number of VMs depends on the configuration mode you select during installation:

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-32.png)

* **Demo:** 1 VM.
* **Single node production:** 1 VM.
* **HA production mode:** 3 VMs.

You'll be able to add more nodes to the cluster later, if needed.

### Production Installation

VM Specifications: 15 cores, 30 GB memory, 400 GB disk space.

Here are the requirements for each microservice.



|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **Microservice** | **Pods** | **CPU / Pod** | **Memory / Pod** | **Total CPU** | **Total Memory** |
| Manager | 2 | 2 | 4 | 4 | 8 |
| Verification | 2 | 1 | 3 | 2 | 6 |
| Machine Learning Engine | 1 | 8 | 2 | 8 | 2 |
| UI | 2 | 0.25 | 0.25 | 0.5 | 0.5 |
| MongoDB | 3 | 4 | 8 | 12 | 24 |
| Proxy | 1 | 0.5 | 0.5 | 0.5 | 0.5 |
| Ingress | 2 | 0.25 | 0.25 | 0.5 | 0.5 |
| TimescaleDB | 3 | 2 | 8 | 6 | 24 |
| KOTS Admin and Kubernetes Installations |   |   |   | 10 | 18 |
| **Total** |  |  |  | **43.5** | **83.5** |

### Dev Installation

VM Specifications: 10 cores, 16 GB memory, 100 GB disk space.

Here are the requirements for each microservice.

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **Microservice** | **Pods** | **CPU / Pod** | **Memory / Pod** | **Total CPU** | **Total Memory** |
| Manager | 1 | 2 | 4 | 2 | 4 |
| Verification | 1 | 1 | 3 | 1 | 3 |
| Machine Learning Engine | 1 | 3 | 2 | 3 | 2 |
| UI | 1 | 0.25 | 0.25 | 0.25 | 0.25 |
| MongoDB | 3 | 2 | 4 | 6 | 12 |
| Proxy | 1 | 0.5 | 0.5 | 0.5 | 0.5 |
| Ingress | 1 | 0.25 | 0.25 | 0.25 | 0.25 |
| TimescaleDB | 1 | 2 | 8 | 2 | 8 |
| KOTS Admin Pods |   |   |   | 10 | 17.75 |
| **Total** |  |  |  | **25** | **47.75** |

 

## Networking Architecture

The following examples diagram illustrate the simple networking architecture for Harness Self-Managed Enterprise Edition - Virtual Machine.

#### GCP Example

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-33.png)

#### AWS Example

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-34.png)

The following sections go into greater detail.

## Open Ports for 3 VMs

* TCP ports 6443-6783
* UDP ports 6783 and 6784
* TCP port 80 for exposing Harness. Port 80/443 is used as the backend of the load balancer routing traffic to the VMs.
* TCP ports 30900-30905 for monitoring (Grafana Dashboards, Prometheus)
* The KOTS admin tool requires 8800.

For example, here is a GCP firewall rule that includes the required ports (80 is already open):

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-35.png)

## Load Balancer

There are two load balancers required for a Harness Self-Managed Enterprise Edition - Virtual Machine installation.

### Load Balancer to Harness Self-Managed Enterprise Edition Application

A load balancer routing all the incoming traffic to the port where Harness is exposed on all of the VM’s. Once you install Harness, this port will be used for accessing Harness Self-Managed Enterprise Edition.

* The load balancer can be any of L4 or L7.
* The load balancer should forward unencrypted traffic to the nodes.

Different cloud platforms have different methods for setting up load balancers and traffic routing.

For example, in GCP, you create an HTTP Load Balancer with a frontend listening on port 80 and a backend sending traffic to the Instance group containing your VMs on port 80.

Later, when you configure Harness Self-Managed Enterprise Edition, you will enter the frontend IP address in **Load Balancer URL** and the backend port 80 in the **NodePort** setting:

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-36.png)

You can also use port 443 for TLS.

Typically, you will also set up DNS to resolve a domain to the frontend IP, and then use the domain name in **Load Balancer URL**.

#### Port Mapping for gRPC Traffic

You also need to open port 9879 on the Load Balancer and map it to port 9879 on the Ingress controller. This is to support gRPC traffic.

### In-Cluster Load Balancer for High Availability

A TCP forwarding load balancer (L4) distributing the traffic on port 6443. This will be used for Kubernetes cluster HA. The health check should be on port 6443, also.

The TCP load balancer you created will be selected when you install Harness using the KOTS plugin via the `-s ha` parameter:

```
$ curl -sSL https://k8s.kurl.sh/harness | sudo bash -s ha  
The installer will use network interface 'ens4' (with IP address '10.128.0.25')  
Please enter a load balancer address to route external and internal traffic to the API servers.  
In the absence of a load balancer address, all traffic will be routed to the first master.  
Load balancer address:
```

You will enter the IP address of your TCP load balancer.

For example, here is a GCP TCP load balancer with its frontend forwarding rule using port 6443:

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-37.png)When the kurl installation prompts you for the load balancer IP address, you will enter the load balancer IP and port 6443. For example `10.128.0.50:6443`.

See [HA Installations](https://kots.io/kotsadm/installing/installing-embedded-cluster/#ha-installations) from KOTS.

## User Access Requirements

For initial setup: sudo/root access is required.

## Network Requirements

Whitelist the following URLs:

* kots.io — Kots pulls the latest versions of the kubectl plugin and Kots admin console.
* app.replicated.com — Kots admin console connects to check for the availability of releases according to your license
* proxy.replicated.com — Proxy your registry to pull your private images.

Outbound access to the following URLs:

* proxy.replicated.com​
* replicated.app
* k8s.kurl.sh​
* app.replicated.com

The outbound access is required for a **connected install only**. If you have opted for [Airgap mode](https://kots.io/kotsadm/installing/airgap-packages/), this is not required.If your cluster does not have direct outbound connectivity and needs a proxy for outbound connections, use these instructions: [https://docs.docker.com/network/proxy](https://docs.docker.com/network/proxy/) to set up a proxy on the node machines.

## Trusted Certificate Requirement for Harness Self-Managed Enterprise Edition

All connections to the Harness Manager can be secure or unencrypted according to the URL scheme you use when you configure the Load Balancer URL during installation (`https://` or `http://`):

![](./static/embedded-kubernetes-on-prem-infrastructure-requirements-38.png)For secure connections from any integration into the Harness Manager (Github Webhooks, etc), including the **Harness Delegate**, you must use a publicly trusted certificate.

Harness does not support self-signed certificates for connections to the Harness Manager.

For connections from the Harness Manager outbound to an integration, you can use a self-signed certificate. In this case, you must import the self-signed certificate into Harness Delegate's JRE keystore manually or using a Harness [Delegate Profile](../../firstgen-platform/account/manage-delegates/run-scripts-on-the-delegate-using-profiles.md).

See [Add Self-Signed Certificates for Delegate Connections](../../firstgen-platform/account/manage-delegates/add-self-signed-certificates-for-delegate-connections.md).

## Install Harness Self-Managed Enterprise Edition

Now that you have set up the requirements, proceed with installation in [Harness Self-Managed Enterprise Edition - Virtual Machine: Installation Guide](on-prem-embedded-cluster-setup.md).

