---
title: Create an HTTP Step Template
description: The Harness Template Library enables you to standardize and distribute reusable Step Templates across teams that use Harness. This topic walks you through the steps to create an HTTP Step template. O…
# sidebar_position: 2
helpdocs_topic_id: zh49vfdy0a
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Template Library enables you to standardize and distribute reusable Step Templates across teams that use Harness.

This topic walks you through the steps to create an HTTP Step template.

### Objectives

You'll learn how to: 

* Create an HTTP Step Template.
* Define Template parameters.
* Use the HTTP Step Template in a Pipeline.

### Before You Begin

* Review [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts) to establish a general understanding of Harness.
* The HTTP template in this quickstart is added to a CD Pipeline. If you are new to Harness CD, see [CD Quickstarts](https://ngdocs.harness.io/category/c9j6jejsws-cd-quickstarts).
* See ​[CIE Quickstarts](/article/x0d77ktjw8-ci-pipeline-quickstart).

### Step 1: Create a Template

First, we'll create a Project-level Template in the Deployments module. You can do this in any Project.

Navigate to the **Deployments** module and in **Projects** select the desired project.

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1638874551407/step-1.png)Next select **Templates** under Project Setup.

Click **New Template**.

Select **Step** to create a Step Template**.**

The **Create New Step Template** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1634812288521/screenshot-2021-10-21-at-4-01-07-pm.png)In **Name**, enter a name for the template. You can enter Quickstart.

In **Version Label**, enter a name for the version of the template. You can enter V1.

Click **Save**. The **Step Library** panel appears.

### Step 2: Add Step Parameters

In **Step Library,** select **HTTP** under **Utilities**.

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1638874630404/step-2.png)The **Step Parameters** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1638874668534/step-3.png)In **Timeout**, enter a timeout value for this step. You can enter 10s.

In **URL**, enter the URL for the Http call.

In **Method**, select GET.

Click **Save**. The new Template appears under the **Templates** list.

### Step 3: Add the HTTP Step Template to a Pipeline

To add a step template in a Pipeline Execution select the step and click **Add Step**.

The **Step Library** panel appears.

In **Step Library,** select **HTTP** under **Utilities**. The **HTTP Step** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1638874816131/step-4.png)Click **Use Template.** The next page lists all the Project-level templates.

Select the Template that you created.

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1638874871700/step-5.png)Click the **Activity Log** to track all Template events. It shows you details like who created the Template and Template version changes.

Click **Version Label.**

Select **Stable** version of the template. This ensures that any changes that you make to this version are propagated  automatically to the Pipelines using this template.

Click **Use Template.**

![](https://files.helpdocs.io/i5nl071jo5/articles/zh49vfdy0a/1638874928705/step-6.png)In **Name**, enter Quickstart.

Under **Template Inputs**, click **Timeout** and select **Runtime input**.

Click URL and select **Runtime input**.

**Use Runtime Inputs instead of variable expressions:** when you want to template settings in a Stage or step template, use [Runtime Inputs](/article/f6yobn7iq0-runtime-inputs) instead of variable expressions. When Harness tries to resolve variable expressions to specific Stage-level settings using fully-qualified names, it can cause issues at runtime. Every Pipeline where the Stage or step template is inserted must utilize the exact same names for fully-qualified name references to operate. With Runtime Inputs, you can supply values for a setting at deployment runtime.Click **Apply Changes**.

Click **Save**.

