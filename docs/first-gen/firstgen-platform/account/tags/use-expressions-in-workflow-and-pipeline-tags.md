---
title: Use Expressions in Workflow and Pipeline Tags
description: Tag Workflows and Pipelines with variable expressions.
# sidebar_position: 2
helpdocs_topic_id: 285bu842gb
helpdocs_category_id: 5havnl8qad
helpdocs_is_private: false
helpdocs_is_published: true
---

Workflow and Pipeline Tags support Harness variable expressions.

Using expressions in Tags lets you create dynamic metadata for your deployments. This can be very helpful when filtering Workflows and Pipelines in the Harness **Deployments** page.

## Before You Begin

* [Using Tags](tags.md)
* [Workflows](../../../continuous-delivery/model-cd-pipeline/workflows/workflow-configuration.md)
* [Pipelines](../../../continuous-delivery/model-cd-pipeline/pipelines/pipeline-configuration.md)

## Review: Tag Restrictions

There are many restrictions for using variable expressions in Tags. Review the following restrictions.

### Expressions in Workflow and Pipelines Tags Only

You can only use variable expressions in the Tags created/modified in Workflows and Pipelines. If you attempt to add one in **Tags Management**, an error will occur:

![](./static/use-expressions-in-workflow-and-pipeline-tags-20.png)

If a Tag uses a variable expression in its name or value, you cannot edit it in **Tags Management**. You must delete the Tag in a Workflow or Pipeline and add it again.

### Workflow Variables, Application and Account Defaults Only

For Workflows, you can add variables expressions to Tags for the following:

* Workflow variables — For example `${workflow.variables.wfvar}`.
* Application Defaults — For example `${app.defaults.RUNTIME_PATH}`.
* Account Defaults — For example `${account.defaults.example}`.

For more information, see [Workflows](../../../continuous-delivery/model-cd-pipeline/workflows/workflow-configuration.md) and [Variables and Expressions in Harness](../../techref-category/variables/variables.md).

Harness built-in variables expressions cannot be used in Tags at deployment runtime.

Application Defaults support some Harness built-in expressions, such as the names and descriptions of Application components.

![](./static/use-expressions-in-workflow-and-pipeline-tags-21.png)


### Standard Format Restrictions Do Not Apply

Normally, Tag names and values must meet specific format restrictions: `^[/A-Za-z0-9 _-]+`. No dots are supported.

When using expressions in Tags, you do not need to follow these restrictions. When a variable expression is evaluated by Harness, its result does not have to meet the standard Tag format restrictions. It has no restrictions.

### Tag Naming Restrictions for Deployment Tags

When a Workflow/Pipeline using Tags is deployed, we say the Tags have been promoted to Deployment Tags. But there are restrictions on which Tags may be promoted:

* If the Workflow/Pipeline Tag name or evaluated name contains a dot character, `${`, or any unresolved Harness variables, Harness does not promote it as a Deployment Tag.

### Cannot Use Expressions in Both Name and Value

You can use a variable expression in a Tag name or value, but not both.

## Step 1: Expressions in Workflow Tags

In a Harness Workflow, click **Add Tag**.

In **Name** or **Value**, enter a string or variable expression that references a Workflow variable, Application Default, or Account Default.

In the other setting, enter a string.

For example, here is an Account Default variable added to two Tags. One Tag references the Account Default variable in its **Name**, and the other in its **Value**.

![](./static/use-expressions-in-workflow-and-pipeline-tags-22.png)

Here is an example using Application Default variables for RUNTIME\_PATH:

![](./static/use-expressions-in-workflow-and-pipeline-tags-23.png)

Here is an example using a Workflow variable:

![](./static/use-expressions-in-workflow-and-pipeline-tags-24.png)


### Evaluated Expressions in Deployments

When you deploy the Workflow, the expressions are evaluated after every stage by Harness and their values are displayed in the **Deployments** view.

Here is an example using the three types of variable expressions in the Tag **Name**:

![](./static/use-expressions-in-workflow-and-pipeline-tags-25.png)


## Step 2: Expressions in Pipeline Tags

In a Harness Pipeline, click **Add Tag**.

In **Name** or **Value**, enter a string or variable expression that references one of the following:

* Workflow variables — For example `${workflow.variables.wfvar}`.  
If you want to use Workflow variables in a Pipeline tag, you need to create a Pipeline variable that represents the Workflow variable value.
* Application Defaults — For example `${app.defaults.RUNTIME_PATH}`.
* Account Defaults — For example `${account.defaults.example}`.
* Pipeline Name — Use `${pipeline.name}`.
* Pipeline Description — Use `${pipeline.description}`.

Here is an example using expressions for an Application Default and Workflow variable in the Tag **Name**:

![](./static/use-expressions-in-workflow-and-pipeline-tags-26.png)


### Workflow Variables in Pipeline Tags

If you want to use Workflow variables in a Pipeline tag, you need to create a Pipeline variable that represents the Workflow variable value.

For example, here is a Workflow variable:

![](./static/use-expressions-in-workflow-and-pipeline-tags-27.png)

When we add the Workflow as a stage in a Pipeline, we use an expression as its value:

![](./static/use-expressions-in-workflow-and-pipeline-tags-28.png)

This expression is now a Pipeline variable that evaluates to the Workflow variable value at runtime.

And now we add the Pipeline variable to the Pipeline tag:

![](./static/use-expressions-in-workflow-and-pipeline-tags-29.png)


### Evaluated Expressions in Deployments

When you deploy the Pipeline, the expressions are evaluated after every stage by Harness and their values are displayed in the **Deployments** view.

The expressions in all Tags on the Workflows deployed by the Pipeline are also evaluated and displayed.

Here is an example where the Pipeline has Tags using expressions for the Application Default and a Workflow variable. In addition, a Workflow in the Pipeline also uses an Account Default expressions in a Tag **Name**.

As a result, the Pipeline Deployment displays the evaluated expressions for Tags from the Pipeline and its Workflow:

![](./static/use-expressions-in-workflow-and-pipeline-tags-30.png)


## Step 3: Filtering By Tag Expressions in Deployments

In **Deployments**, you can filter by Tag **Name** or a combination of **Name:Value**.

Here is an example of a filter that uses a Tag Name that contains a Workflow expression, `${workflow.variables.wfvar}`. Since you are filtering deployments, you must enter the evaluated value for the expression in the Filter (`wf-var-value`) like this:

![](./static/use-expressions-in-workflow-and-pipeline-tags-31.png)

:::note
The **Display matching workflow executions as separate cards in the result** filter option allows you to see each Workflow deployment as separate.
:::

The filter results in all deployments for Workflows and Pipelines that use the Tag:

![](./static/use-expressions-in-workflow-and-pipeline-tags-32.png)

Each deployment is listed separately. If the Tag is used in a single Workflow/Pipeline, but that Workflow/Pipeline has been deployed multiple times, then each deployment is listed separately.

You can also filter by Name:Value using the evaluated expression. So, if the Tag on the Workflow is `WorkflowVar: ${workflow.variables.wfvar}`, then you can filter by `WorkflowVar:wf-var-value`.

## Step 4: Filtering and Grouping by Tag Expressions in Custom Dashboards

You can create a Harness [Custom Dashboard](../../fg-monitoring/custom-dashboards.md) that filters or groups using Tags that use expressions.

You can use a Tag whose name or value uses an expression, but you can only filter or group by Tag *name*.

You cannot use the expression itself to filter or group. You must use the evaluated expression displayed in Harness **Deployments**.

You can use expression Tags in the following Widgets:

* Deployments
* Lead Time to Production
* Mean Time to Restore

You simply use the **Tag (Deployments)** option in the **Data Filter** or **Group By** settings of the Widget.

![](./static/use-expressions-in-workflow-and-pipeline-tags-33.png)

This can be a very powerful method for creating Custom Dashboards.

For example, let's say you had a Workflow or Pipeline Tag named **commitID**. The value for it is passed in as an expression, such as `${workflow.variables.commitID}`. You could provide the value for the variable using [a Trigger that passes in a Git commit ID](../../../continuous-delivery/model-cd-pipeline/expressions/passing-variable-into-workflows.md).

When you deploy, the expression is evaluated and the commit ID is displayed in **Deployments** like **commitID:521747298a3790fde1710f3aa2d03b55020575aa**.

Now, you can create a Custom Dashboard for the name **commitID** that filters or groups deployments by each commit ID.

## Notes

* When you use Workflow variables for Tags, a value must be provided for the Workflow variable at the time of deployment. The value must be added whether the Workflow is deployed alone, as part of a Pipeline, or as part of a Trigger.

