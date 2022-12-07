---
title: Add an Environment
description: Define environments where your Service can be deployed.
sidebar_position: 10
helpdocs_topic_id: n39w05njjv
helpdocs_category_id: 1eqg76ac72
helpdocs_is_private: false
helpdocs_is_published: true
---

You define your target deployment infrastructure using a Harness Environment. Environments represent your deployment infrastructures, such as Dev, QA, Stage, Production, etc.


### Before You Begin

* [Add Services](https://docs.harness.io/category/add-services)

### Step 1: Add an Environment

To add an environment, do the following:

1. Click **Setup**.
2. Click an Application.
3. Click **Environments**.
4. Click **Add Environment**. The **Environment** dialog appears.

   ![](./static/environment-configuration-00.png)

5. Enter a name and description for the Environment. For example, the name **DEV** with the description: **This is the development environment for example.com**.
6. In **Environment Type**, choose **Production** or **Non-Production**.
7. Click **Submit**. The **Environment Overview** appears. Here you can add the Infrastructure Definition and overrides to the configurations of the Services that use this Environment.

### Step 2: Add Infrastructure Definition

The Infrastructure Definition is where you specify the target infrastructure for your deployment. The target infrastructure can be an existing infrastructure or an infrastructure provisioner, such as Terraform or CloudFormation. For detailed information on adding Infrastructure Definition, see [Add an Infrastructure Definition](infrastructure-definitions.md).

### Step 3: Override a Service Configuration

For information about how a Service configuration is overwritten in a Kubernetes deployment, see [Override Harness Kubernetes Service Settings](https://docs.harness.io/article/ycacqs7tlx-override-harness-kubernetes-service-settings).You can configure your Environment to override settings of the Services that use the Environment. For example, a Service might use a specific values.yaml file, but your Environment might need to change the name and namespace of the Deployment object because it is deploying the Service to a QA Environment.

To override a Service configuration, see [Override a Service Configuration in an Environment](override-service-files-and-variables-in-environments.md).

### Step 4: Add Service Verification

24/7 Service Guard applies Harness Continuous Verification unsupervised machine-learning to detect regressions and anomalies across transactions and events for the service and displays the results in the 24/7 Service Guard dashboard.

For detailed information on adding Service Verification, see [24/7 Service Guard Overview](../../continuous-verification/continuous-verification-overview/concepts-cv/24-7-service-guard-overview.md).

### Next Steps

* [Restrict Deployment Access to Specific Environments](https://docs.harness.io/article/twlzny81xl-restrict-deployment-access-to-specific-environments)
* [Add Workflows](https://docs.harness.io/category/add-workflows)

