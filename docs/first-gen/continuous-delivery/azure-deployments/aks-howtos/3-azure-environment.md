---
title: 3 - Define Your AKS Target Infrastructure
description: Define the target deployment environment for your application.
sidebar_position: 40
helpdocs_topic_id: 7qsyj7wvpq
helpdocs_category_id: mkyr84ulx3
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/m7nkbph0ac).Once you've added a Service to your Application, you can define Environments where your Service can be deployed.

* [Create a New Harness Environment](3-azure-environment.md#create-a-new-harness-environment)
* [Add an Infrastructure Definition](3-azure-environment.md#add-an-infrastructure-definition)
* [Next Step](3-azure-environment.md#next-step)

### Create a New Harness Environment

In an Environment, you specify the following:

* A Harness Service, such as the Service with a Docker image artifact you configured.
* A Cloud Provider, such as the Kubernetes Cluster Cloud Provider that you added in [Cloud Providers Setup](1-harness-account-setup.md#cloud-providers-setup).

An Environment can be a Dev, QA, Production, or other environment. You can deploy one or many Services to each Environment.

The following procedure creates an Environment for the Service we set up earlier.

1. In your Harness Application, click **Environments**. The **Environments** page appears.
2. Click **Add Environment**. The **Environment** dialog appears.
3. In **Name**, enter a name that describes the deployment environment, for example, **AKS**.
4. In **Environment Type**, select **Non-Production**.
5. Click **SUBMIT**. The new **Environment** page appears.

### Add an Infrastructure Definition

[​Infrastructure Definitions](https://docs.harness.io/article/v3l3wqovbe-infrastructure-definitions) specify the target deployment infrastructure for your Harness Services, and the specific infrastructure details for the deployment, like VPC settings. 

To add the Infrastructure Definition, do the following:

1. In the Harness Environment, click **Add Infrastructure Definition**. The **Infrastructure Definition** dialog appears.
2. In **Name**, enter the name you will to select this Infrastructure Definition when you create a Workflow.
3. In **Cloud Provider Type**, select **Kubernetes Cluster**.
4. In **Deployment Type**, select **Kubernetes**.
5. Click **Use Already Provisioned Infrastructure**. If you were using a Harness [Infrastructure Provisioner](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner), you would select **Map Dynamically Provisioned Infrastructure**.
6. In **Cloud Provider**, select the Cloud Provider you added earlier. Ensure that you select the **Kubernetes Cluster Cloud Provider** you set up for the AKS connection and not the Azure Cloud Provider you set up for the ACR connection.
7. In **Namespace**, enter the name of the cluster namespace you want to use. As we noted in [Namespace Variable](2-service-and-artifact-source.md#namespace-variable), you can enter any value here and the Service will use it in its Namespace manifest to create the namespace at runtime.
8. In **Release Name**, you can see the expression Harness uses for tracking a release. The release name must be unique across the cluster. The Harness-generated unique identifier `${infra.kubernetes.infraId}` can be used as a suffix to ensure a unique release name.
9. In **Scope to specific Services**, select the Harness Service you created earlier.
10. Click **Submit**.

That is all you have to do to set up the deployment Environment in Harness.

Now that you have the Service and Environment set up. Now you can create the deployment Workflow in Harness.

Your Environment can overwrite Service Config Variables, Config Files, and other settings. This enables you to have a Service keep its settings but have them changed when used with this Environment. For example, you might have a single Service but an Environment for QA and an Environment for Production, and you want to overwrite the values.yaml setting in the Service depending on the Environment. We don't overwrite any Services variables in this guide. For more information, see [Override Service Settings](https://docs.harness.io/article/2gffsizl8u-kubernetes-environments#override_service_settings) in the [Kubernetes Deployments](../../kubernetes-deployments/kubernetes-deployments-overview.md) doc.

### Next Step

* [4 - Azure Workflows and Deployments](4-azure-workflows-and-deployments.md)

