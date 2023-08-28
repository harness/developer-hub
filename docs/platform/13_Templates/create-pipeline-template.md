---
title: Create a pipeline template
description: This quickstart walks you through the steps to create a pipeline template.
sidebar_position: 4
helpdocs_topic_id: gvbaldmib5
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness templates let you standardize builds for all your services and distribute them across teams. Templates are reusable builds with a common configuration that conforms to organizational standards, making maintenance easier and less prone to errors.

A pipeline template lets you distribute reusable pipelines across your team or among multiple teams. Instead of building pipelines from scratch, templates simplify the process by having parameters already built-in.

For example, you can automate your build and deploy services by adding a pipeline template. You can link the following templates to your pipeline template:

* Build stage: To push the artifact to the registry, run tests, and security scans.
* Staging deploy stage: To deploy to Dev, QA.
* Approval stage: To add approval stages for PROD.
* Prod deploy stage: To deploy to Production.

This topic walks you through the steps to create a pipeline template.

### Before you begin

* Review [Templates overview](template.md) to understand template concepts.
* Review [Permissions reference](../role-based-access-control/permissions-reference) to learn about the permissions required to create a template at various scopes.
* Review [Pipelines and stages](https://developer.harness.io/docs/category/pipelines).

### Limitations

Failure strategy and notification settings can only be provided when you create a template.

### Review: Permissions requirements

You need create/edit, delete, and access permissions on templates to create a pipeline template. Go to [Permissions reference](../role-based-access-control/permissions-reference) for more information.

### Review: Pipeline template scope

You can add templates at any [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) in Harness.

The following table shows what it means to add templates at different scopes or hierarchies:

|  |  |
| --- | --- |
| **Scope** | **When to add templates?** |
| **Account** | To share step/stage/pipeline templates with users in the account, as well as users within the organizations and projects created within this account. |
| **Organization** | To share step/stage/pipeline templates with users in the organization as well as within the projects created within the org. |
| **Project** | To share step/stage/pipeline templates with users within the project. |

### Visual summary

Here is a quick overview of pipeline templates:

* You can add a pipeline template to an account, org, or project [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).
* You can either link an existing stage template or add a stage to your pipeline template.
* You can either link to a step template or add a step for any new step that you add to your pipeline stage.

![](./static/create-pipeline-template-65.png)

### Step 1: Add a template

First, we'll create a project-level template in the Deployments module. You can do this in any project.

To add a template, do the following:

1. In Harness, navigate to the **Deployments** module.
2. In **Projects**, select the desired project.
3. Under **Project Setup**, select **Templates**.
4. In **Templates**, select **New Template**.

5. Select **Pipeline** to create a pipeline template.

   ![](./static/create-pipeline-template-67.png)

   The **Create New Pipeline Template** dialog opens.

6. In **Name**, enter a name for the pipeline, for example `Quickstart`.

7. In **Version Label**, enter the version of the stage, for example, `v1`. Versioning a template enables you to create a new template without modifying the existing one. For more information, go to [Versioning](template.md).

   ![](./static/create-pipeline-template-68.png)

   You'll see the Git Repository Details option only if you're creating a template on a Git-enabled Project. For more information, go to [Harness Git Experience overview](../10_Git-Experience/git-experience-overview.md).

8. In **Git Repository Details**, in **Repository Display Name**, select your Git repository and Branch.

9. Once you've entered all the details, select **Continue**.

   ![](./static/create-pipeline-template-69.png)

### Step 2: Add a stage

To add a stage to the template, do the following:

1. Follow the steps above to add a template.

2. Click **Add Stage**. The **Select Stage Type** settings appear.

   ![](./static/create-pipeline-template-70.png)

3. Select **Deploy**. The deploy stage type is a CD stage that enables you to deploy any service to your target environment.

   You can also select Build for CI, and Approval for Manual and Jira Approval Stages. More options will be added soon. This document uses the Deploy stage type.The **About Your Stage** settings appear.

4. In **Stage Name**, enter a name for your stage.

5. Select the entity that this stage should deploy. Currently, for deploy, only service can be deployed and it is selected by default.

6. Select **Set Up Stage**.

   ![](./static/create-pipeline-template-71.png)

### Step 3: Add service details

In **About the Service**, select the service that you want to deploy from the **Specify Service** list. You can also use [fixed values, runtime inputs, and expressions](../20_References/runtime-inputs.md).

**Use Runtime Inputs instead of variable expressions:** when you update template settings in a stage or step template, use [runtime inputs](../20_References/runtime-inputs.md) instead of variable expressions. When Harness tries to resolve variable expressions to specific stage-level settings using fully-qualified names, it can cause issues at runtime. Every pipeline where the stage or step template is inserted must use the same names for fully-qualified name references to operate. With runtime inputs, you can supply values for a setting at deployment runtime.In **Service Definition**, select the **Deployment Type**. **Deployment Type** defines how your service will be deployed.

![](./static/create-pipeline-template-72.png)

### Step 4: Add infrastructure details

To add infrastructure details, do the following:

1. In **Infrastructure**, in **Specify Environment**, select the setting for your pipeline execution, for example, **Runtime input**. Harness pipelines allow you to use [fixed values, runtime inputs, and expressions](../20_References/runtime-inputs.md). Environments represent your deployment targets logically (QA, Prod, etc). You can add the same environment to as many stages as you need.

   ![](./static/create-pipeline-template-73.png)

2. In **Infrastructure Definition**, select the method for Harness to reach your Kubernetes cluster. Infrastructure definitions represent the physical infrastructure of the environment. They are the actual clusters, hosts, etc. For example, the target infrastructure definition for a Kubernetes deployment. By separating environments and infrastructure definitions, you can use the same environment in multiple stages while changing the target infrastructure settings with each stage.

3. In **Cluster Details**, enter **Connector** and **Namespace** details. Harness pipelines allow you to use [fixed values, runtime inputs, and expressions](../20_References/runtime-inputs.md) also.

4. In **Connector**, select a connector from the list. To create a new connector, go to [Kubernetes cluster connector settings reference](../7_Connectors/Cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md) and [Add a Kubernetes cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector).

5. In **Namespace**, enter the namespace. For example, `default`.

   ![](./static/create-pipeline-template-74.png)

6. Select **Next**. The **Execution Strategies** settings appear.

   ![](./static/create-pipeline-template-75.png)

### Step 5: Define execution strategies

To define execution strategies, do the following:

1. In **Execution Strategies**, select the deployment strategy for your pipeline template. We've used **Rolling** in this topic. For more information on different execution strategies, go to [Deployment concepts and strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts/).

2. Select **Use Strategy**.

3. Select **Save**. The pipeline template is published successfully.

   ![](./static/create-pipeline-template-76.png)

   If you're using a Git-enabled project, you must provide **Save Template to Git** settings.

   ![](./static/create-pipeline-template-77.png)

4. In **Harness Folder**, enter the name of the folder in your repo where you want to sync. The **Harness Folder** is the default folder in the repository where you are syncing your project.

5. In **File Path**, enter a name for the YAML file. For example, `Example.yaml`. Harness will generate one automatically from the Pipeline name, but you can add your own.

6. In **Commit message**, enter a message for the commit that adds this connector.

7. Select **Save**, and then select **Save** again. You can save the pipeline in two ways:

   * As new version
   * As a new template

   ![](./static/create-pipeline-template-78.png)

8. Select **Save as new Template**.

   **Save as new Template** settings appear.

   ![](./static/create-pipeline-template-79.png)

9. Select **Continue**. The template is published successfully.

### Next Step

* [Use a template](use-a-template.md)

### See also

* [Create a step template](run-step-template-quickstart.md)
* [Create an HTTP step template](harness-template-library.md)
* [Create a stage template](add-a-stage-template.md)
