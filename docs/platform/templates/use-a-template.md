---
title: Use a template
description: This topic describes how to use an existing template in a pipeline.
sidebar_position: 3
helpdocs_topic_id: 1re7pz9bj8
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness enables you to add templates to create reusable logic and Harness entities (like steps, stages, and pipelines) in your pipelines. You can link these templates in your pipelines or share them with your teams for improved efficiency. Templates enhance developer productivity, reduce onboarding time, are enforce standardization across the teams that use Harness.

Harness templates also give you the option of reusing a pipeline templates to create a pipeline. You do not have to create a template all the time. Once you've [created a template](create-pipeline-template.md), you can reuse it to create multiple pipelines.

This topic explains how to use an existing pipeline template in a pipeline.

### Before you begin

* [Templates overview](template.md)
* [Create a pipeline template](create-pipeline-template.md)

### Step: Use a template

To use a pipeline template, do the following:

1. In Harness, select **Deployments**, and then select **Pipelines**.

2. Select **Create a Pipeline**.

    ![](./static/use-a-template-41.png)

3. Enter a **Name** for your pipeline, and then select **Start with Template**.

   The next page lists all the available pipeline templates.

4. Select the template that you want to use.

   ![](./static/use-a-template-42.png)

   You can filter the templates by scope. You can also use the search bar to search the template that you want to use.

   ![](./static/use-a-template-43.png)


   In **Details**, you can see the following details about the selected template:

   * Type
   * Description
   * Tags
   * Version Label: Select the version label. Harness recommends using the **Stable** version of the template. This ensures that any changes that you make to this version are propagated automatically to the pipelines using this template.

   In **Template Inputs**, you can view the number of step or stage inputs in that template.

5. Select **YAML** to view the YAML details of the template.

6. Select the **Activity Log** to track all template events. It shows you details, like who created the template and template version changes.

7. Select **Use Template** to use this template to create your pipeline.

8. Add the runtime input values (if required), and then select **Save**. The **Pipeline is published successfully** message appears.

   You can also perform the following actions:

   * Change template
   * Remove template
   * Open template in new tab
   * Preview template YAML

   ![](./static/use-a-template-44.png)

9. After you've made all the changes, select **Run**, and then select **Run Pipeline**. The template is deployed.

   ![](./static/use-a-template-45.png)

### Option: Copy to the pipeline

:::note
You must have the **core_template_copy** permission to copy a template. 
:::

You can also copy the contents of a specific template to your pipeline using the **Copy to Pipeline** option. This doesn't add any reference to the template. Copying a template to a pipeline is different from using a template for your pipeline. You can't change any step or stage parameters when you link to a template from your pipeline.

To copy your template to a pipeline, do the following:

1. In Harness, select the pipeline template that you want to copy.

2. In **Template Inputs**, select **Copy to Pipeline**.

   ![](./static/use-a-template-46.png)

3. In **Create new Pipeline**, enter a name, and then select **Start**.

4. Add a stage (if required).

5. Once you've made all the changes, select **Save**. You can **Save Pipeline** or **Save as Template**.

   ![](./static/use-a-template-47.png)

6. Select **Run** to deploy the template.

### See also

* [Create a step template](run-step-template-quickstart.md)
* [Create an HTTP step template](harness-template-library.md)
* [Create a stage template](add-a-stage-template.md)
