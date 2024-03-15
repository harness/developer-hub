---
title: Add a Kubernetes cluster connector
description: Connect Harness to your Kubernetes clusters on any platform.
sidebar_position: 5
helpdocs_topic_id: 1gaud2efd4
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

You can connect Harness with your Kubernetes clusters using the provider-agnostic Kubernetes cluster connector or a provider-specific connector, such as the [Google Cloud Platform (GCP) Connector](./connect-to-google-cloud-platform-gcp.md) or [AWS connector](./add-aws-connector.md). For a list of the platforms and technologies supported by Harness, go to [Supported Platforms and Technologies](/docs/get-started/supported-platforms-and-technologies.md).

This page explains how to set up the provider-agnostic Kubernetes cluster connector. Once connected, you can use Kubernetes and Harness for provisioning infrastructure, running a CI build farm, and deploying microservices and other workloads to clusters. This page assumes you have some familiarity with [Harness' key concepts](/docs/platform/get-started/key-concepts.md).

This video shows how to add a Kubernetes cluster connector and install the Kubernetes Delegate in the target cluster at the same time:

<!-- Video:
https://www.youtube.com/embed/wUC23lmqfnY-->
<DocVideo src="https://www.youtube.com/embed/wUC23lmqfnY" />

## Roles and policies for the connector

**What roles should my Kubernetes account have?** The roles and policies needed by the account associated with your connector depend on how you'll use the connector in your Harness pipelines and what actions you need Harness to perform in the cluster.

You can use different methods for authenticating with the Kubernetes cluster, but all of them use a Kubernetes Role. The Role used must have either the `cluster-admin` permission in the target cluster or admin permissions in the target namespace. The Harness Delegate uses `cluster-admin` by default, because this ensures anything can be applied. Any restriction must take into account the actual usage of the connector, such as manifests to be deployed.

In general, the following permissions are required:

- **Deployments:** A Kubernetes service account with permission to create entities in the target namespace is required. The set of permissions should include `list`, `get`, `create`, `watch` (to fetch the pod events), and `delete` permissions for each of the entity types Harness uses. In general, cluster admin permission or namespace admin permission is sufficient.
- **Builds:** A Kubernetes service account with CRUD permissions on Secret, Service, Pod, and PersistentVolumeClaim (PVC).

For a detailed list of roles and policies, go to the [Kubernetes cluster connector settings reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).

:::tip

If you don't want to use `resources: ["*"]` for the Role, you can list out the resources you want to grant. Harness needs `configMap`, `secret`, `event`, `deployment`, and `pod` at a minimum for deployments, as stated above. Beyond that, it depends on the resources you are deploying via Harness.

If you don't want to use `verbs: ["*"]` for the Role, you can list out all of the verbs (`create`, `delete`, `get`, `list`, `patch`, `update`, `watch`).

:::

### Connect to Amazon EKS

To connect Harness to Amazon EKS, you can use the platform-agnostic Kubernetes cluster connector or an [AWS connector configured for EKS](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/##connect-to-elastic-kubernetes-service-eks).

To use an EKS cluster for Kubernetes cluster build infrastructure in Harness CI, you must create a platform-agnostic Kubernetes cluster connector for the stage's build infrastructure, and then you can use either type of connector in individual steps in the stage.

For individual steps in a build stage, if your EKS clusters use IRSA (IAM roles for the delegate's service account) or Fargate nodes in EKS clusters, use an [AWS connector configured for EKS](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/##connect-to-elastic-kubernetes-service-eks).

#### Switching IAM policies

If the IAM role used by your connector does not have the required policies, you can modify or switch the role assigned to the cluster or the Harness Delegate associated with your connector. It can take up to five minutes for IAM policy changes to take effect.

### AKS clusters must have local accounts enabled

To use an AKS cluster for deployments, the AKS cluster must have local accounts enabled (AKS property `disableLocalAccounts=false`).

## Add a Kubernetes cluster connector

1. In your Harness project, go to **Project Setup** and select **Connectors**.
2. Select **New Connector**, and then select the **Kubernetes Cluster** cloud provider connector.
3. Enter a **Name** for the connector. **Description** and **Tags** are optional.

   Harness automatically creates the corresponding **Id** ([entity identifier](../../../platform/references/entity-identifier-reference.md)) based on the name.

   ![](../static/add-a-kubernetes-cluster-connector-06.png)

4. Select **Continue** and select how you want Harness to connect to the cluster. For details about these options, go to the [Kubernetes cluster connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).
5. Select **Continue** to set up delegates.

   Harness uses Kubernetes cluster connectors at pipeline runtime to authenticate and perform operations with Kubernetes. Authentications and operations are performed by Harness Delegates.

   Regardless of the authentication method selected for a Kubernetes cluster connector, you must use Harness Delegates to perform authentication for the connector. Select one of the following:

   * **Use any available Delegate**: Harness selects an available delegate at runtime. To learn how Harness selects delegates, go to [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview.md).
   * **Only use Delegates with all of the following tags**: Use **Tags** to match one or more suitable delegates. To learn more about delegate tags, go to [Use delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors.md).

   If there are no delegates available for your target cluster, you can select **Install new Delegate** if you need to [install a delegate](/docs/platform/delegates/delegate-concepts/delegate-overview.md) without exiting connector configuration. Delegates can be installed on your target cluster or any cluster in your environment that can connect to the cluster.

6. Select **Save and Continue** to run the connection test. Harness tests the credentials you provided using the delegates you selected. If the test passes, select **Finish**.

   During the connection test, Harness uses the provided credentials to list controllers in the **default** namespace in order to validate the credentials. If validation fails, Harness does not save the connector and the connection test fails.

   If your cluster does not have a **default** namespace, or your credentials do not have permission in the **default** namespace, then you can check **Skip default namespace validation** to skip this check and save your connector's settings. You don't need to uncheck this setting later.

   When you use this connector for a build or deployment, you'll specify a namespace. During a build or deployment, Harness uses this namespace rather than the **default** namespace. When you save a pipeline, Harness validates the namespace connection even if you selected **Skip default namespace validation** in the connector's settings.
