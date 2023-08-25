---
title: Create an HTTP step template
description: The Harness Template Library enables you to standardize and distribute reusable step templates across teams that use Harness. This topic walks you through the steps to create an HTTP step template. O…
sidebar_position: 7
helpdocs_topic_id: zh49vfdy0a
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Template Library enables you to standardize and distribute reusable step templates across teams that use Harness.

This topic walks you through the steps to create an HTTP step template.

### Objectives

You'll learn how to: 

* Create an HTTP step template.
* Define template parameters.
* Use the HTTP step template in a pipeline.

### Before you begin

* Review [Harness Key Concepts](../../first-gen/starthere-firstgen/harness-key-concepts.md) to establish a general understanding of Harness.
* The HTTP template in this quickstart is added to a CD Pipeline. If you are new to Harness CD, go to [CD Quickstarts](https://developer.harness.io/tutorials/cd-pipelines).
* Go to [CI pipeline tutorials](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md).

### Step 1: Create a Template

First, we'll create a project-level template in the Deployments module. You can do this in any project.

To create a project-level template, do the following:

1. In Harness, navigate to the **Deployments** module.
2. In **Projects**, select the desired project.
3. Under **Project Setup**, select **Templates**.
4. Select **New Template**.
5. Select **Step** to create a step template.

   The **Create New Step Template** settings appear.

   ![](./static/harness-template-library-35.png)

6. In **Name**, enter a name for the template, for example `Quickstart`.

7. In **Version Label**, enter a name for the version of the template, for example `V1`.

8. Click **Save**.
   The **Step Library** panel opens.

### Step 2: Add step parameters

To add step parameters, do the following:

1. Follow the steps above to create a template.

2. In **Step Library,** select **HTTP** under **Utilities**.

   ![](./static/harness-template-library-36.png)

   The **Step Parameters** settings appear.

   ![](./static/harness-template-library-37.png)

3. In **Timeout**, enter a timeout value for this step. You can enter 10s.

4. In **URL**, enter the URL for the HTTP call.

5. In **Method**, select **GET**.

6. Select **Save**. The new template appears under the **Templates** list.

### Step 3: Add the HTTP step template to a pipeline

To add a step template in a pipeline execution, do the following:

1. In Harness, select your pipeline.

2. Select the step, and then select **Add Step**.

   The **Step Library** panel opens.

3. In **Step Library,** select **HTTP** under **Utilities**. The **HTTP Step** settings appear.

   ![](./static/harness-template-library-38.png)

4. Click **Use Template.** The next page lists all the Project-level templates.

5. Select the template that you created.

   ![](./static/harness-template-library-39.png)

6. Select the **Activity Log** to track all template events. It shows you details like who created the template and template version changes.

7. In **Details**, from the **Version Label** list, select **Always use the stable version**.

   Selecting this option ensures that any changes that you make to this version are propagated automatically to the pipelines using this template.

8. Select **Use Template**.

   ![](./static/harness-template-library-40.png)

9. In **Name**, enter `Quickstart`.

10. Under **Template Inputs**, select **Timeout**, and then select **Runtime input**.

11. Click URL and select **Runtime input**.

   **Use Runtime Inputs instead of variable expressions:** when you want to template settings in a stage or step template, use [Runtime inputs](../20_References/runtime-inputs.md) instead of variable expressions. When Harness tries to resolve variable expressions to specific stage-level settings using fully-qualified names, it can cause issues at runtime. Every pipeline where the stage or step template is inserted must utilize the exact same names for fully-qualified name references to operate. With runtime inputs, you can supply values for a setting at deployment runtime.
   
12. Select **Apply Changes**.

12. Select **Save**.
