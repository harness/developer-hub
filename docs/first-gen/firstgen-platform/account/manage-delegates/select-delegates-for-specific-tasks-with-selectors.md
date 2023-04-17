---
title: Select Delegates with Selectors
description: Delegate Selectors were formerly called Tags. Now, Tags refers only to tagging Harness Application components as described in Using Tags. When Harness needs to run a task, it makes a connection to a…
sidebar_position: 140
helpdocs_topic_id: c3fvixpgsl
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
Delegate Selectors were formerly called Tags. Now, *Tags* refers only to tagging Harness Application components as described in [Using Tags](../tags/tags.md).
:::

When Harness needs to run a task, it makes a connection to a resource via its Delegates. Harness selects the best Delegate according to its history or it round robins between Delegates. See [How Does Harness Manager Pick Delegates?](delegate-installation.md#how-does-harness-manager-pick-delegates).

In a few cases, you might want Harness to select specific Delegates. In these cases, you can use Delegate Selectors:

* **For some Cloud Provider types:** you can use Delegate Selectors to select the Delegate to use for authentication. The Cloud Provider inherits the authentication permissions used by the Delegate.
* **For some Workflow step types:** you can target specific Delegates using Selectors. This is only done if the Workflow Infrastructure Definition's Cloud Provider does not use Delegate Selectors already.

In this topic:

* [Review: Implicit and Custom Selectors](#review-implicit-and-custom-selectors)
* [Review: How Selectors are Used](#review-how-selectors-are-used)
* [Step 1: Create a Selector](#step-1-create-a-selector)
* [Step 2: Select Delegates Using Selectors](#step-2-select-delegates-using-selectors)
* [See Also](#see-also)

## Review: Implicit and Custom Selectors

There are two types of Selectors:

* **Implicit**—Harness provides these Selectors as part of your account. They are generated automatically and can be used to identify the Delegate, and can be used in AWS Cloud Providers.
* **Custom**—These are Selectors that you add to identify this Delegate and select it in other entities, such as the Shell Script Workflow step.

In this topic, we will focus on custom Selectors.

## Review: How Selectors are Used

By default, when your Workflow is deployed, Harness uses the Cloud Provider in the Workflow's Infrastructure Definition to connect to the target environment. 

If the Infrastructure Definition's Cloud Provider uses a Delegate Selector (supported in Kubernetes Cluster and AWS Cloud Providers), then the Workflow uses the selected Delegate for all of its steps.

In these cases, you should not add a Delegate Selector to any step in the Workflow. The Workflow is already using a Selector via its Infrastructure Definition's Cloud Provider.

In cases where the Infrastructure Definition's Cloud Provider does not use a Delegate Selector, Harness selects the Delegate to use based on criteria explained [here](delegate-installation.md#how-does-harness-manager-pick-delegates).

In these cases, you might want a Workflow step to use a specific Delegate. You can use a Delegate Selector to select the Delegate.

For that Workflow step only, Harness will use the Delegate selected via the Delegate Selector.

### Pre-deployment Steps

Workflow types with **Pre-deployment Steps** do not use the Infrastructure Definition, and so they do not use the Infrastructure Definition's Cloud Provider and any related Delegate Selectors. 

Steps added to this section can select Delegates using the step's Delegate Selectors setting.

## Step 1: Create a Selector

1. In Harness, click Setup, and then click **Harness Delegates**.
2. In the listing of the Delegate where you want to add a Selector, click **Custom** **Selector**.
3. In **Edit Selectors**, type in the Selector name, such as **dev**, and press **Enter**. You can enter as many Selectors as you like.
4. Click **Submit**. The Selector is added.

## Step 2: Select Delegates Using Selectors

Elsewhere, such as in a [Shell Script step in a Workflow](../../../continuous-delivery/model-cd-pipeline/workflows/capture-shell-script-step-output.md), you can use the Selector to ensure that this Delegate is used when executing the command.

:::note
**All of the Selectors** that you enter must be in the Delegate(s) you are targeting.Another common use of a Delegate Selector is in an [AWS Cloud Provider](../manage-connectors/add-amazon-web-services-cloud-provider.md).
:::

For example, you can install a Delegate in an AWS VPC and then select it in the AWS Cloud Provider Credentials when you select **Assume IAM Role on Delegate**.

In the **Delegate Selector** setting, you select the Selector by name, such as **ecs-delegate**.

![](./static/select-delegates-for-specific-tasks-with-selectors-56.png)

Now the Harness AWS Cloud Provider will use the Delegate's credentials to connect with AWS.

## See Also

* [Run Scripts on Delegates using Profiles](run-scripts-on-the-delegate-using-profiles.md)
* [Scope Delegates to Harness Components and Commands](scope-delegates-to-harness-components-and-commands.md)

