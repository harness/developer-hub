---
title: Helm infrastructure
description: Create Harness environments and Native Helm infrastructure definitions to target your cluster for Helm deployments.
sidebar_position: 3
---

An infrastructure definition links a Harness environment to the Kubernetes cluster where Harness runs Helm deployments. You create both at **Deployments > Environments** and reuse them across pipelines and stages.

---

## Create an environment

1. Go to **Deployments**, expand the drop-down, and select **Environments**.
2. Select **+ New Environment**.
3. Enter a name and select an environment type: **Pre-Production** or **Production**. The type affects governance policies and deployment dashboards.
4. Select **Save**.

Harness opens the environment detail page with three tabs: **Configuration**, **Infrastructure Definitions**, and **References**.

---

## Create an infrastructure definition

Infrastructure definitions live inside an environment. Each definition links the environment to a specific cluster and namespace.

1. Open the environment and select the **Infrastructure Definitions** tab.
2. Select **+ Create Infrastructure**.
3. In the first dialog, select **Native Helm**.
4. Select the infrastructure type that matches your cluster provider (the sections below cover each type).
5. Enter a name; Harness auto-suggests one, and you can change both the name and ID.
6. Under **Storage**, choose **Inline** or a Git repository.
7. Fill in the **Cluster Details** under **Provisioner Configuration**.
8. Configure **Simultaneous deployments** and **Scope to Specific Services** as needed.
9. Select **Save**.

### Kubernetes

Use this type to connect directly to any Kubernetes cluster using a Kubernetes cluster connector.

| Field | Required | Description |
| --- | --- | --- |
| **Connector** | Yes | A Harness Kubernetes cluster connector. |
| **Namespace** | Yes | The namespace to deploy the Helm release into, for example `default`. Supports expressions and runtime input. |
| **Release Name** | No | Defaults to `release-<+INFRA_KEY_SHORT_ID>`. Harness uses this name to track the release state in the cluster. |

:::info Delegate-based credentials
If your delegate runs inside the target cluster, configure the connector to use **Inherit from Delegate**. The delegate already has the service account permissions it needs.
:::

### Google Kubernetes Engine

Use this type to connect to GKE clusters via a GCP connector.

| Field | Required | Description |
| --- | --- | --- |
| **Connector** | Yes | A Harness GCP connector. |
| **Project** | No | The GCP project that contains the cluster. When set, the **Cluster** dropdown lists only clusters in that project. |
| **Cluster** | Yes | The name of the target GKE cluster. Supports runtime input. |
| **Namespace** | Yes | The namespace to deploy the Helm release into. Supports expressions and runtime input. |
| **Release Name** | No | Defaults to `release-<+INFRA_KEY_SHORT_ID>`. |

:::info GCP Workload Identity
If the delegate runs on a GKE cluster with Workload Identity enabled and the GCP connector is set to inherit credentials from the delegate, Harness uses Workload Identity automatically.
:::

### Microsoft Azure

Use this type to connect to AKS clusters via an Azure connector.

| Field | Required | Description |
| --- | --- | --- |
| **Connector** | Yes | A Harness Azure connector. |
| **Subscription ID** | Yes | The Azure subscription that contains the AKS cluster. |
| **Resource Group** | Yes | The resource group that contains the AKS cluster. |
| **Cluster** | Yes | The name of the target AKS cluster. Supports runtime input. |
| **Namespace** | Yes | The namespace to deploy the Helm release into. |
| **Release Name** | No | Defaults to `release-<+INFRA_KEY_SHORT_ID>`. |

### Elastic Kubernetes Service

Use this type to connect to EKS clusters via an AWS connector. Harness uses `aws-iam-authenticator` to generate the kubeconfig.

| Field | Required | Description |
| --- | --- | --- |
| **Connector** | Yes | A Harness AWS connector. |
| **Cluster** | Yes | The EKS cluster in the format `<region>/<cluster-name>`, for example `ap-south-1/my-cluster`. Supports runtime input. |
| **Namespace** | Yes | The namespace to deploy the Helm release into. |
| **Release Name** | No | Defaults to `release-<+INFRA_KEY_SHORT_ID>`. |

### Rancher

Use this type to connect to Rancher-managed clusters. You need the Rancher endpoint URL and a bearer token. The Rancher account associated with the token must have the **Cluster Owner** role or a global permission that enables cluster administration.

| Field | Required | Description |
| --- | --- | --- |
| **Connector** | Yes | A Harness Rancher connector. |
| **Cluster** | Yes | The name of the target Rancher-managed cluster. Supports runtime input. |
| **Namespace** | Yes | The namespace to deploy the Helm release into. Supports runtime input. |
| **Release Name** | No | Defaults to `release-<+INFRA_KEY_SHORT_ID>`. |

---

## Namespace and release name

You can reference the infrastructure definition's namespace in your Helm chart values:
- CEL: `${{infra.namespace}}`
- JEXL: `<+infra.namespace>`

This lets you write charts that work across environments without hardcoding a namespace.

The **Release Name** defaults to `release-<+INFRA_KEY_SHORT_ID>`. Harness uses this name to track the Helm release in the cluster and to look up release history for rollbacks. The name must be unique within the cluster namespace and must start with an alphabetic character (Kubernetes RFC-1035 requirement, hence the `release-` prefix).

---

## Simultaneous deployments

By default, Harness queues deployments to the same infrastructure definition to prevent conflicts; the UI shows **Simultaneous deployments: False**. Set this to **True** on the infrastructure definition to allow concurrent deployments to the same target.

---

## Scope to specific services

By default, an infrastructure definition is available to any service in the environment. Enable **Scope to Specific Services** to limit the infrastructure definition so it only appears when deploying a specific set of services. This prevents teams from accidentally targeting the wrong infrastructure.

---

## Next steps

- Go to [Helm services](./helm-services.md) to configure the chart source and artifact sources for your service.
- Go to [Basic deployment](./helm-deployment-strategies/basic) for a single-phase Helm upgrade.
- Go to [Canary deployment](./helm-deployment-strategies/canary) for a staged rollout with canary release.
- Go to [Blue-green deployment](./helm-deployment-strategies/blue-green) for stage/production swap and rollback.
