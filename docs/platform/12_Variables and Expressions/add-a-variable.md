---
title: Add Account, Org, and Project-level Variables
description: Describes steps to add Variables as Resources.
# sidebar_position: 2
helpdocs_topic_id: f3450ye0ul
helpdocs_category_id: bp8t5hf922
helpdocs_is_private: false
helpdocs_is_published: true
---

In your Pipelines, Variables can be added at the Pipeline-level, which makes them available to all Stages in the Pipeline. Within a Stage, you can add Variables at the Stage and Service-level. Here's [a video](https://youtu.be/lqbmO6EVGuU) covering those Variable types.

But what about when you need to use the same Variable across multiple Pipelines, or even Pipelines in multiple Projects?

With Account-level, Org-level, and Project-level Variables, Harness lets you store values that you can share and use across multiple Pipelines in multiple Projects.

This topic explains how to add Variables as an Account-level and Org-level Resource in Harness.

For details on Harness built-in variables, see [Built-in Harness Variables Reference](/article/lml71vhsim-harness-variables).### Before You Begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts).
* Make sure you have [all permissions](/article/tsons9mu0v-add-manage-roles) on Variables to add and manage Variables.![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652286536496/screenshot-2022-05-11-at-9-57-45-pm.png)

### Limitations

* Harness supports only String type Account-level, Org-level, and Project-level Variables. This is only a temporary limitation. You can use Secrets in Pipeline, Stage, and Service variables.
* If you delete a Variable that is referenced using [expressions](/article/lml71vhsim) in entities like Pipelines, the reference expressions are not deleted. At runtime, when the expressions are resolved, the expression will resolve as null.

### Visual Summary

Here is a quick overview of how Variables can be shared across Pipelines.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652320246864/screenshot-2022-05-12-at-7-19-19-am.png)### Step 1: Add Account, Org, and Project Variables

You can add a Variable to the Account, Organization, or Project [scope](/article/vz5cq0nfg2-rbac-in-harness#rbac_scope).

#### Account

In Harness, click **Account Settings**.

Click **Account Resources** and then click **Variables**.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652286110770/screenshot-2022-05-11-at-9-50-58-pm.png)Click **New Variable**. The **Add Variable** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652326530565/screenshot-2022-05-12-at-9-04-25-am.png)Enter a **Name** for your Variable.

In **Fixed Value**, enter a value for your Variable.

Click **Save**.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652345505394/screenshot-2022-05-12-at-2-21-12-pm.png)#### Org

Click **Account Settings**.

Click **Organizations**.

Select an Org.

In **Organization Resources**, click **Variables**.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653071903363/clean-shot-2022-05-20-at-11-37-45.png)Click **New Variable**.

Enter a name, select the variable type (for example, **String**), and enter a value.

For example, here's a variable named **organiz\_var**.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653072329541/clean-shot-2022-05-20-at-11-45-19.png)Note the Id. That Id is used to reference the variable.

Click **Save**.

#### Project

In a Harness Project, click **Project Setup**, and then click **Variables**.

Click **New Variable**.

Enter a name, select the variable type (for example, **String**), and enter a value.

For example, here's a variable named **proj\_var**.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653072434084/clean-shot-2022-05-20-at-11-47-05.png)Note the Id. That Id is used to reference the variable.

Click **Save**.

### Step 2: Reference Variables in a Pipeline

To reference an Account and Org-level Variable, you must use the following expression in your Pipeline:

`<+variable.[scope].[variable_id]>`

* Account-level reference: `<+variable.account.[var Id]>`
* Org-level reference: `<+variable.org.[var Id]>`
* Project-level reference: `<+variable.[var Id]>`

The expression to reference **Project** scope Variables is `<+variable.Example>`. You do not need to specify `scope` to reference Project Variables.For example, to reference the Variable you just created, the expression will be:

`<+variable.account.Example>`

Let us add the Variable in a Pipeline now.

In Harness go to a Pipeline in the same Org as the variable you created.

In **Execution**, add a [Shell Script](/article/k5lu0u6i1i-using-shell-scripts) step and reference the variables:


```
echo "account var: "<+variable.account.acct_var>  
echo "org var: "<+variable.org.organiz_var>  
echo "project var: " <+variable.proj_var>
```
When you run the Pipeline, the variable references are resolved and output:

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653073061898/clean-shot-2022-05-20-at-11-57-33.png)### Review: Using an Account, Org, or Project Variable in a Service Variable

In **Service**, in **Advanced**, click **Add Variable**.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652329517911/screenshot-2022-05-12-at-9-54-38-am.png)The **Add Variable** settings appear.

In **Variable** **Name**, enter a name for your Variable.

Select **String** as **Type** and click **Save**.

Your Variable is now listed under **Variables**.

In **VALUE**, select **Expression** and enter `<+variable.account.acct_var>`.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653073228695/clean-shot-2022-05-20-at-12-00-11.png)Now, when you run your Pipeline the referenced value is evaluated at runtime.

Copy the Service variable from **Variables**:

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653073441583/clean-shot-2022-05-20-at-12-03-38.png)In your Shell Script step, reference the Service variable with `<+stage.spec.serviceConfig.serviceDefinition.spec.variables.serv_var>`.

Run the Pipeline and see that the value for the Account Variable is passed into the Service Variable:

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1653073553017/clean-shot-2022-05-20-at-12-05-13.png)You can refer to a Variable in most settings. For example, if you an Account Variable storing a Service named **Example**, you can refer to it inline using the same expression.

![](https://files.helpdocs.io/i5nl071jo5/articles/f3450ye0ul/1652331383760/screenshot-2022-05-12-at-10-25-23-am.png)Now, when you run your Pipeline the referenced value is evaluated at runtime.

