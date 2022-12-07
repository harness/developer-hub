---
title: Link Templates to Services and Workflows
description: Describes how to link a template to a Service or Workflow. The templates available for linking depend on whether you are adding them to a Service or Workflow.
# sidebar_position: 2
helpdocs_topic_id: xd70p7rmqd
helpdocs_category_id: wha9wf4lk9
helpdocs_is_private: false
helpdocs_is_published: true
---

You can link a template to a Service or Workflow. The templates available for linking depend on whether you are adding them to a Service or Workflow. For example, if you are adding a command in a Service, then the templates available to you will be Bash and PowerShell scripts. If you are in a Workflow that deploys to a an AWS cloud provider, then HTTP templates are available.

When you add a command by linking to a Template, the Template often shows you Template variables that require values. These values are mandatory.In this topic:

* [Before You Begin](https://docs.harness.io/article/xd70p7rmqd-link-templates-to-services-and-workflows#before_you_begin)
* [Link Template to a Service](https://docs.harness.io/article/xd70p7rmqd-link-templates-to-services-and-workflows#link_template_to_a_service)
* [Link Template to a Workflow](https://docs.harness.io/article/xd70p7rmqd-link-templates-to-services-and-workflows#link_template_to_a_workflow)
* [Next Steps](https://docs.harness.io/article/xd70p7rmqd-link-templates-to-services-and-workflows#next_steps)

### Before You Begin

* [Account and Application Templates](/article/ygi6d8epse-use-templates)
* [Create an HTTP Workflow Step Template](/article/dv7ajeroou-account-and-application-templates)
* [Create a Shell Script Workflow Step Template](/article/lfqn3t83hd-create-a-shell-script-workflow-step-template)
* [Create a Service Command Template](/article/kbmz9uc7q9-create-a-service-command-template)
* [Add Service Command Templates into Command Units](/article/mfoy0hrw8y-add-service-command-templates-into-command-units)

### Link Template to a Service

To link a template to a Service, do the following:

1. In **Setup**, click an application, and in **Services**, click a Service. The **Service** settings appear.
2. Click **Add Command**. The **Add Command** settings appear.
3. Click **From Template Library**. The Template Library appears.
4. Locate the template you want, and click the **Link** button.
5. Provide values for the template variables and click **Submit**.  
  
The template is added to the service and linked. You can see the **Version:*****version*** and **Template icon** next to the entity you selected. For example:![](https://files.helpdocs.io/kw8ldg1itf/articles/ygi6d8epse/1532732445768/linked-template.png)

### Link Template to a Workflow

To link a template to a Workflow, do the following:

1. In **Setup**, click an application, and in **Workflows**, click a Workflow. The **Workflow** settings appear.
2. In the Workflow steps, click **Add Command**.
3. Click **From Template Library**. The **Template Library** settings appear.
4. Locate the template you want, and click the **Link** button.
5. Provide values for the template variables and click **SUBMIT**.  
  
The template is added to the workflow and linked. You can see the **Version:*****version*** and **Link icon** next to the entity you selected. For example:![](https://files.helpdocs.io/kw8ldg1itf/articles/ygi6d8epse/1533074956803/template-added-workflow.png)

