---
title: Use a Template
description: This topic describes how to use an existing Template in a Pipeline.
# sidebar_position: 2
helpdocs_topic_id: 1re7pz9bj8
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness enables you to add Templates to create reusable logic and Harness entities (like Steps, Stages, and Pipelines) in your Pipelines. You can link these Templates in your Pipelines or share them with your teams for improved efficiency. Templates enhance developer productivity, reduce onboarding time, are enforce standardization across the teams that use Harness.

Harness Templates also give you the option of reusing a Pipeline Templates to create a Pipeline. You do not have to create a Template all the time. Once you've [created a Template](/article/gvbaldmib5-pipeline-template-quickstart), you can reuse it to create multiple Pipelines.

This topic explains how to use an existing Pipeline Template in a Pipeline.

### Before You Begin

* [Templates Overview](/article/6tl8zyxeol-template)
* [Create a Pipeline Template](/article/gvbaldmib5-pipeline-template-quickstart)

### Step: Use a Template

To use a Pipeline Template, navigate to the **Deployments** module, and select **Pipelines**.

Click **New Pipeline**.

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651843855328/screenshot-2022-05-06-at-6-59-55-pm.png)Enter **Name** for your Pipeline and click **Start with Template**.

The next page lists all the available Pipeline Templates.

Select the Template that you want to use.

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651169510535/screenshot-2022-04-28-at-11-41-40-pm.png)You can filter the Templates by scope. You can also use the search bar to search the Template that you want to use.

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651169476851/screenshot-2022-04-28-at-11-39-07-pm.png)In **Details**, you can see the following details about the selected Template:

* Type
* Description
* Tags
* Verison Label: Select the version label. Harness recommends using the **Stable** version of the Template. This ensures that any changes that you make to this version are propagated automatically to the Pipelines using this Template.

In **Template Inputs**, you can view the number of Step or Stage inputs in that Template.

Click **YAML** to view the YAML details of the Template.

Click the **Activity Log** to track all Template events. It shows you details, like who created the Template and Template version changes.

Click **Use Template** to use this Template to create your Pipeline.

Add the runtime input values (if required), and click **Save**. The **Pipeline is published successfully** message appears.

You can also perform the following actions:

* Change Template
* Remove Template
* Open Template in new tab
* Preview Template YAML

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651171274436/screenshot-2022-04-29-at-12-09-45-am.png)Once you've made all the changes, click **Run** and then click **Run Pipeline**. The Template is deployed.

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651171566981/screenshot-2022-04-29-at-12-13-46-am.png)### Option: Copy to Pipeline

You can also copy the contents of a specific Template to your Pipeline using the **Copy to Pipeline** option. This doesn't add any reference to the Template. Copying a Template to a Pipeline is different from using a Template for your Pipeline. You can't change any step or stage parameters when you link to a Template from your Pipeline.

Select the Pipeline Template that you want to copy.

In **Template Inputs**, click **Copy to Pipeline**.

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651172093981/screenshot-2022-04-29-at-12-23-37-am.png)In **Create new Pipeline**, enter a name and click **Start**.

Add a Stage (if required).

Once you've made all the changes, click **Save**. You can **Save Pipeline** or **Save as Template**.

![](https://files.helpdocs.io/i5nl071jo5/articles/1re7pz9bj8/1651172656169/screenshot-2022-04-29-at-12-33-20-am.png)Click **Run** to deploy the Template.

### See Also

* [Create a Step Template](https://ngdocs.harness.io/article/99y1227h13-run-step-template-quickstart)
* [Create an HTTP Step Template](https://ngdocs.harness.io/article/zh49vfdy0a-harness-template-library)
* [Create a Stage Template](https://ngdocs.harness.io/article/s3wrqjsg43-add-a-stage-template)

