---
title: Connect to a Cloud Provider
description: Steps explaining how to create a Cloud Provider connector.
# sidebar_position: 2
helpdocs_topic_id: s9j6cggx1p
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Connect Harness to your AWS and GCP accounts or a platform-agnostic Kubernetes cluster by adding a Cloud Provider Connector.

Connectors contain the information necessary for Harness to integrate and work with 3rd party tools.

Harness uses Connectors at Pipeline runtime to authenticate and perform operations with a 3rd party tool.

### Before you begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)

### Add a Cloud Provider Connector

You can add a Cloud Provider Connector at the Account, Org, or Project scope. This topic will explain how to add it at the Project scope. The process is same for Org and Account. You can add an AWS, GCP, or Kubernetes Cluster as Cloud Provider Connector.

### Step: Add an AWS Connector

For steps on setting up an AWS Connector, see [Add an AWS Connector](add-aws-connector.md).

For details on settings and permissions, see [AWS Connector Settings Reference](ref-cloud-providers/aws-connector-settings-reference.md).

### Step: Add a GCP Connector

For steps on setting up a GCP Connector, see [Add a Google Cloud Platform (GCP) Connector](connect-to-google-cloud-platform-gcp.md).

For details on settings and permissions, see [Google Cloud Platform (GCP) Connector Settings Reference](ref-cloud-providers/gcs-connector-settings-reference.md).

### Step: Add a Kubernetes Cluster Connector

For steps on setting up a Kubernetes Cluster Connector, see [Add a Kubernetes Cluster Connector](add-a-kubernetes-cluster-connector.md).

For details on settings and permissions, see [Kubernetes Cluster Connector Settings Reference](ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).

Here's a quick video that shows you how to add a Kubernetes Cluster Connector and install the Kubernetes Delegate in the target cluster at the same time:

### Step: Add a Microsoft Azure Cloud Connector

For steps on setting up a Microsoft Azure Cloud Connector, see [Add a Microsoft Azure Cloud Connector](add-a-microsoft-azure-connector.md).

### See also

* [Install a Kubernetes Delegate](../2_Delegates/delegate-guide/install-a-kubernetes-delegate.md)
* [Select Delegates with Selectors](../2_Delegates/delegate-guide/select-delegates-with-selectors.md)

