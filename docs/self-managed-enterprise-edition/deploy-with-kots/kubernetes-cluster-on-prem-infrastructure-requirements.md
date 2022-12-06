---
title: Infrastructure requirements for KOTS
description: This document lists the infrastructure requirements for installing Harness Self-Managed Enterprise Edition
# sidebar_position: 2
helpdocs_topic_id: d5lptkp5ow
helpdocs_category_id: vu99714ib1
helpdocs_is_private: false
helpdocs_is_published: true
---

Installation of Harness Self-Managed Enterprise Edition in an existing Kubernetes cluster requires the following infrastructure.

## Production environment

Self-Managed Enterprise Edition NextGen is installed as an application on an existing Self-Managed Enterprise Edition FirstGen installation.

The following tables list the resource requirements for the installation of Self-Managed Enterprise Edition in the production environment.

### Self-Managed Enterprise Edition FirstGen

| **Microservice** | **Pods** | **CPU / Pod** | **Memory / Pod** | **Total CPU** | **Total Memory** |
| :-- | :-: | :-: | :-: | :-: | :-: |
| Manager | 2 | 2 | 4 | 4 | 8 |
| Verification | 2 | 1 | 3 | 2 | 6 |
| Machine Learning Engine | 1 | 8 | 2 | 8 | 2 |
| UI | 2 | 0.25 | 0.25 | 0.5 | 0.5 |
| MongoDB | 3 | 4 | 8 | 12 | 24 |
| Proxy | 1 | 0.5 | 0.5 | 0.5 | 0.5 |
| Ingress | 2 | 0.25 | 0.25 | 0.5 | 0.5 |
| TimescaleDB | 3 | 2 | 8 | 6 | 24 |
| KOTS Admin Pods |   |   |   | 4 | 8 |
| **Total** |  |  |  | **37.5** | **73.5** |

The compute resources listed for the KOTS admin pods support a full stack. In an existing cluster, the requirements for KOTS are usually lower.

### Self-Managed Enterprise Edition NextGen

| **Microservice** | **Pods** | **CPU / Pod** | **Memory / Pod** | **Total CPU** | **Total Memory** |
| :-- | :-: | :-: | :-: | :-: | :-: |
| Log Minio | 1 | 1 | 4Gi | 1 | 4Gi |
| Log service | 1 | 1 | 3Gi | 1 | 3Gi |
| SCM | 1 | 0.1 | 0.5Gi | 0.1 | 0.5Gi |
| Gateway | 2 | 0.5 | 3Gi | 1 | 6Gi |
| NextGen UI | 2 | 0.2 | 0.2Gi | 0.4 | 0.4Gi |
| Platform service | 2 | 1 | 3Gi | 2 | 6Gi |
| Test Intelligence | 2 | 1 | 3Gi | 2 | 6Gi |
| Access Control | 2 | 1 | 3Gi | 2 | 6Gi |
| CI Manager | 2 | 1 | 3Gi | 2 | 6Gi |
| NextGen Manager | 2 | 2 | 6Gi | 4 | 12Gi |
| Pipeline | 2 | 1 | 6Gi | 2 | 12Gi |
| **Total** |  **19** |  |  | **17.5** | **61.9Gi** |

## Development environment

The following table lists the requirements for the installation of Self-Managed Enterprise Edition in the development environment.

| **Microservice** | **Pods** | **CPU / Pod** | **Memory / Pod** | **Total CPU** | **Total Memory** |
| :-- | :-: | :-: | :-: | :-: | :-: |
| Manager | 1 | 2 | 4 | 2 | 4 |
| Verification | 1 | 1 | 3 | 1 | 3 |
| Machine Learning Engine | 1 | 3 | 2 | 3 | 2 |
| UI | 1 | 0.25 | 0.25 | 0.25 | 0.25 |
| MongoDB | 3 | 2 | 4 | 6 | 12 |
| Proxy | 1 | 0.5 | 0.5 | 0.5 | 0.5 |
| Ingress | 1 | 0.25 | 0.25 | 0.25 | 0.25 |
| TimescaleDB | 1 | 2 | 8 | 2 | 8 |
| Kots Admin Pods |   |   |   | 4 | 8 |
| **Total** |  |  |  | **19** | **38** |

## Recommended node specifications

Harness recommends the following minimum requirements for nodes.

* 8 cores vCPU
* 12 GB memory

## Storage requirements

Your Kubernetes cluster must attach a Kubernetes [StorageClass](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/storage-class-v1/) resource. You provide the name of the [StorageClass](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/storage-class-v1/) during the installation process.

A typical installation of Self-Managed Enterprise Edition uses a total of 1000 GB of storage in the following distribution:

| **Component** | **Pods** | **Storage per pod** | **Total** |
| :-- | :-: | :-: | :-: |
| **MongoDB** | 3 | 200 GB | 600 GB |
| **Timescale DB** | 3 | 120 GB | 360 GB |
| **Redis** | n/a | n/a | 40 GB |

A Proof of Concept (PoC) installation of Self-Managed Enterprise Edition requires 200 GB of storage in the following distribution:

| **Component** | **Pods** | **Storage per pod** | **Total** |
| :-- | :-: | :-: | :-: |
| **MongoDB** | 3 | 50 GB | 150 GB |
| **Timescale DB** | 1 | 20 GB | 20 GB |
| **Redis** | n/a | n/a | 30 GB |

## Allow list and outbound access requirements

Add the following URLs to your allow list:

| **URL** | **Usage** |
| :-- | :-- |
| **kots.io** | KOTS pulls the latest versions of the `kubectl` plugin and KOTS admin console (`kotsadm`). |
| **app.replicated.com** | KOTS admin console connects to check for the releases that your license allows. |
| **proxy.replicated.com** | Allows you to proxy your registry to pull your private images. |

Provide outbound access to the following URLs:

* proxy.replicated.com​
* replicated.app
* k8s.kurl.sh​
* app.replicated.com

Outbound access is required for **connected install only**. Outbound access is not required to install in [Airgap mode](https://kots.io/kotsadm/installing/airgap-packages/). If your cluster does not have direct outbound connectivity and requires a proxy for outbound connections, see the following for information on how to create a proxy on the node machines: [https://docs.docker.com/network/proxy](https://docs.docker.com/network/proxy/).

## Cluster and network architecture

The following diagram describes the cluster and network architecture for a Self-Managed Enterprise Edition Kubernetes Cluster installation.

![](./static/kubernetes-cluster-on-prem-infrastructure-requirements-04.png)

## Namespace requirements

The examples in this documentation use the `harness` namespace.

If your installation will operate in a different namespace, you must update the Harness `spec` samples you use to apply the namespace you specified.

## Load balancer

The installation of Harness Self-Managed Enterprise Edition requires a load balancer. You enter the URL of the load balancer into the KOTS admin console when Self-Managed Enterprise Edition is installed.

After Harness Self-Managed Enterprise Edition is installed, the load balancer is used to access the Harness Manager UI with a web browser.

For information on how to create the load balancer, see [Self-Managed Enterprise Edition - Kubernetes Cluster: Setup Guide](kubernetes-cluster-on-prem-kubernetes-cluster-setup.md).

### gRPC and load balancer settings

The configuration of gRPC depends on load balancer support for HTTP2.

#### Load balancer support for HTTP2 over port 443

If your load balancer supports HTTP2 over port 443, you configure gRPC when you install Self-Managed Enterprise Edition NextGen. gRPC is configured in the **GRPC Target** and **GRPC Authority** fields.

![](./static/kubernetes-cluster-on-prem-infrastructure-requirements-05.png)

The following table describes the **GRPC Target** and **GRPC Authority** fields.


| **Value** | **Description** |
| :-- | :-- |
| **GRPC Target** | The hostname of the load balancer. This is the URL of the load balancer. |
| **GRPC Authority** | Append the hostname to the following string: `manager-grpc-<hostname>`. For example, `manager-grpc-35.202.197.230`. |

#### No load balancer support for HTTP2 over port 443

If your load balancer does not support HTTP2 over port 443, use one of the following configuration options:

* **Load balancer supports multiple SSL ports.** Add port 9879 in the application load balancer and target port 9879 or node port 32510 on the Ingress controller.

    | **Value** | **Description** |
    | :-- | :-- |
    | **GRPC Target** | The hostname of the load balancer. |
    | **GRPC Authority** | The hostname of the load balancer. |

* **Load balancer does not support multiple SSL ports.** Create a new load balancer and target port 9879 or node port 32510 on the Ingress controller:

    | **Value** | **Description** |
    | :-- | :-- |
    | **GRPC Target** | The hostname of the new load balancer. |
    | **GRPC Authority** | The hostname of the new load balancer. |

## Trusted certificate requirement for Harness Self-Managed Enterprise Edition

You can use secure or unencrypted connections to Harness Manager. This option depends on the URL scheme you apply during installation, when you configure the **Load Balancer URL** field. You can use `https://` or `http://`.

![](./static/kubernetes-cluster-on-prem-infrastructure-requirements-06.png)

For secure connections from your integrations to Harness Manager, you must use a public trusted certificate. This includes your integration with Harness Delegate as well as to Github Webhooks and so on. Harness does not support self-signed certificates for connections to Harness Manager.

For connections from Harness Manager outbound to an integration, you can use a self-signed certificate. In this case, you must import the self-signed certificate into Harness Delegate's JRE keystore manually or by using a Harness Delegate Profile.

### Terminate at Harness

You have the option to terminate at the Harness ingress instead of the load balancer. If you configured the Harness ingress controller, you can add a TLS secret to the `harness` namespace.

The following instruction adds a TLS secret based on a public certificate with the name `harness-cert`:

```
kubectl create secret tls harness-cert --cert=path/to/cert/file --key=path/to/key/file
```
