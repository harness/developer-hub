---
title: Add variables
description: Add variables at the account, org, project, and pipeline-level.
sidebar_position: 7
helpdocs_topic_id: f3450ye0ul
helpdocs_category_id: bp8t5hf922
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /tutorials/cd-pipelines/variables
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In addition to Harness' many [built-in variable expressions](./harness-variables), you can add custom variables at the account, org, and project [scopes](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes), as well as within individual pipelines.

Account, org, and project variables store values that you can share and use across multiple pipelines in multiple projects.

Pipeline variables include variables added within an individual pipeline and limited to the context of that pipeline.

<details>
<summary>Variable scope diagram</summary>

This diagram illustrates the availability of variables based on their scope.

The **Common To Pipelines** variables represent account-, org-, or project-level variables.
The **Specific to Pipeline** variables are pipeline-level variables.

![](./static/add-a-variable-01.png)

</details>

This topic explains how to add and reference variables in Harness. It assumes you are familiar with [Harness' key concepts](../../get-started/key-concepts.md). To manage variables, you need [permissions](../role-based-access-control/add-manage-roles) to view, create/edit, and delete variables.

## Variable parameters

* Variables can be of type String, Secret, or Number.
* Variable values can be [fixed values, runtime inputs, or expressions](./runtime-inputs).
   * However, account, org, and project variables support fixed values only.
   * Variables created at lower levels (such as pipeline, stage, and service variables) support fixed values, runtime inputs, and expressions.
* You can reference secrets in pipeline, stage, and service variables.
* If you delete a variable that is referenced by [expressions](harness-variables.md) in your pipelines, those expressions **are not** deleted.
   * At runtime, when Harness attempts to resolve the expressions, the expression will resolve as null, and the pipeline can fail if null is an invalid value.
   * After deleting a variable, you must manually check for and remove expressions referencing deleted variables.
* If a variable is assigned a date value in the format `2002-12-14`, the YAML converter adheres to the YAML convention by converting it into a datetime object. For more information, go to the [YAML specification for tags](https://yaml.org/spec/1.2.2/#3212-tags).
* Some variables can be flagged as required.
   * The **Required** setting is supported for pipeline, stage, service, and environment variables.
   * The **Required** options is also enforced when the variable is defined in a template and the template is included in a pipeline.

### Variable availability to pipelines, stages, services, and environments

Account, org, and project variables are available to all lower scopes. For example, an org variable is available to all projects and pipelines under that org.

Variables added to pipelines and stages are available to all stages in the pipeline.

Variables added to services and environments are available in all stages that use those services and environments. For more information, check out the [Harness pipeline, stage, and service variables overview video](https://youtu.be/lqbmO6EVGuU).

You can override service variables at the environment level. For more information, go to [Overriding services at the environment level](/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides).

## Add variables

<Tabs>
<TabItem value="account" label="Account scope" default>

1. In Harness, select **Account Settings**.
2. Select **Account Resources**, and then select **Variables**.
3. Select **New Variable**. The **Add Variable** settings appear.

   <DocImage path={require('./static/add-a-variable-03.png')} width="30%" height="30%" title="Click to view full size image" />

4. Enter a **Name** for your variable.
5. In **Fixed Value**, enter a value for your variable.
6. Select **Save**.

   <DocImage path={require('./static/add-a-variable-04.png')} width="30%" height="30%" title="Click to view full size image" />

</TabItem>
<TabItem value="org" label="Organization scope">

1. Select **Account Settings**.
2. Select **Organizations**.
3. Select an org.
4. In **Organization Resources**, select **Variables**.

   <DocImage path={require('./static/add-a-variable-05.png')} width="60%" height="60%" title="Click to view full size image" />

5. Select **New Variable**.
6. Enter a name, select the variable type, and then enter a value.
7. For example, here's a variable named `organize_var`.

   ![](./static/add-a-variable-06.png)

8.  Note the Id. That Id is used to reference the variable.
9.  Select **Save**.

</TabItem>
<TabItem value="project" label="Project scope">

At the project scope, you can use API or the Harness Platform to create variables.

<Tabs>
<TabItem value="API" label="API">

Use the [createVariable](https://apidocs.harness.io/tag/Variables#operation/createVariable) API to create a new variable.

Here's an example:

```json
curl -i -X POST \
  'https://app.harness.io/ng/api/variables?accountIdentifier=H5W8iol5TNWc4G9h5A2MXg' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: HARNESS_API_KEY' \
  -d '{
    "variable": {
      "identifier": "myvar123",
      "name": "myvar123",
      "description": "testvar",
      "orgIdentifier": "default",
      "projectIdentifier": "CD_Docs",
      "type": "String",
      "spec": {
        "valueType": "FIXED",
        "fixedValue": "bar"
      }
    }
  }'
```

</TabItem>
<TabItem value="Harness Manager" label="Harness Manager">

1. In a Harness Project, select **Project Setup**, and then select **Variables**.
2. Select **New Variable**.
3. Enter a name, select the variable type, and then enter a value.
4. For example, here's a variable named `proj_var`.

   ![](./static/add-a-variable-07.png)

5. Note the Id. That Id is used to reference the variable.
6. Select **Save**.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="pipeline" label="Pipeline variables">

To create variables at the pipeline or stage level, go to the pipeline where you want to add the variable, and then use one of the following options to add variables:

* Select **Variables** on the right side of the pipeline studio to add pipeline or stage variables.
* Select a specific stage, select the **Overview** tab, and add stage variables in the **Advanced** section.
* Add variables in the YAML editor. The indentation determines whether the variable is a pipeline or stage variable. For stage variables, indent `variables` under `- stage`, aligned with `stage.spec`. For pipeline variables, indent `variables` under `pipeline`, aligned with `pipeline.properties`.

```yaml
  variables:
    - name: sourceToken
      type: Secret
      description: Access token for the source repo.
      required: true
      value: <+input>
```

Some steps support step-level environment variables or output variables. Usage for these options is described in the documentation for those step types.

</TabItem>
</Tabs>

## Reference variables in a pipeline

To reference an account and org-level variable, you must use the following expression in your Pipeline:

`<+variable.SCOPE.VARIABLE_ID>`

* Account-level reference: `<+variable.account.VARIABLE_ID>`
* Org-level reference: `<+variable.org.VARIABLE_ID>`
* Project-level reference: `<+variable.VARIABLE_ID>`
* Pipeline-level reference: `<+pipeline.variables.VARIABLE_ID>`
* Stage-level reference: `<+stage.variables.VARIABLE_ID>`
* StepGroup-level reference: `<+stepGroup.variables.VARIABLE_ID>`
* Service-level reference: `<+serviceVariables.VARIABLE_ID>`
* Environment-level reference: `<+env.variables.VARIABLE_ID>`

:::note

The expression to reference **Project** scope variables is `<+variable.VARIABLE_ID>`. You do not need to specify `scope` to reference project variables.

:::

Let's add the variable in a pipeline:

1. In Harness, go to a pipeline in the same org as the variable you created.
2. In a stage **Execution** section, add a [Shell Script](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) step and reference the variables:


```
echo "account var: "<+variable.account.acct_var>
echo "org var: "<+variable.org.organiz_var>
echo "project var: " <+variable.proj_var>
echo "pipeline var: " <+pipeline.variables.pipeline_var>
echo "stage var: " <+stage.variables.stage_var>
echo "step-group var: " <+stepGroup.variables.stepGroup_var>
echo "service var: " <+serviceVariables.service_var>
echo "environment var: " <+env.variables.env_var>
```

When you run the Pipeline, the variable references are resolved and output:

![](./static/add-a-variable-08.png)

### Use an account, org, or project variable in a service variable

1. In **Service**, in **Advanced**, select **Add Variable**.

   <DocImage path={require('./static/807ab89c31339b661d773c5622579ee361c66fdd2fdc05bf49bb1898532af047.png')} width="60%" height="60%" title="Click to view full size image" />

2. The **Add Variable** settings appear.
3. In **Variable** **Name**, enter a name for your variable.
4. Select **String** as **Type** and select **Save**.
5. Your variable is now listed under **Variables**.
6. In **Value**, select **Expression** and enter `<+variable.account.acct_var>`.

   ![](./static/add-a-variable-10.png)

7. Now, when you run your pipeline the referenced value is evaluated at runtime.
8. In your pipeline stage, copy the service variable from the **Variables** panel:

   ![](./static/add-a-variable-11.png)

9. In your Shell Script step, reference the service variable with:

   ```
   <+stage.spec.serviceConfig.serviceDefinition.spec.variables.serv_var>
   ```

10. Run the pipeline and see that the value for the account variable is passed into the service variable:

    ![](./static/add-a-variable-12.png)

You can refer to a variable in most settings. For example, if you have an account variable storing a service named **Example**, you can refer to it inline using the same expression.

![](./static/add-a-variable-13.png)

Now, when you run your pipeline the referenced value is evaluated at runtime.

### Export service variables as environment variables in a Shell Script step

You can use the **Export Service Variables as Env Variables** setting to export service variables as environment variables. This setting is available at account, organization, and project levels.

To enable this setting, go to **Account Settings > Account Resources > Default Settings > Pipeline**, and then expand **Pipeline**. Next, set the **Export Service Variables as Env Variables** setting to `true`.

Once you enable this setting, a service's variables are available as Bash variables in any Shell Script step in a stage that deploys that service. You can access the service variables like you access any Bash variables. For example, the service variable, `var1` is available for use in a Shell Script step as `$var1`.

When you [add a service](#use-an-account-org-or-project-variable-in-a-service-variable), you can select variables of type **String**, **Secret**, or **Number**.

Let's consider an example where you have added the following service variables:

| Variable name | Type | Value |
| --- | --- | --- |
| `svar1` | String | normalValue |
| `svar2` | String | value-with-hyphen |
| `svar3` | String | value_with_underscores |
| `secretServiceVar` | Secret | `yourSecret` |
| `nvar1` | Number | 1 |
| `svar4` | String | abc%def%123 |
| `svar5$abc` | String | key_With_Dollar |
| `svar6` | String | abc,ghj,klk |

In your Shell Script step, you can use these service variables as environment variables if you had enabled the **Export Service Variables as Env Variables** setting.

:::info

Shell scripts executing on remote hosts cannot export the correct value if you're using special characters such as `-`, `_`, `$`, `%`, and spaces in Bash.

:::

When you run the pipeline, you can see the value of the service variables passed as environment variables.

<DocImage path={require('./static/export-srv-var-as-env-var.png')} width="100%" height="100%" title="Click to view full size image" />

## Tutorial - Add and reference variables in a CD pipeline

This tutorial demonstrates how to create and use variables in a Harness CD pipeline.

This tutorial builds upon the pipeline created in the [Deploy using Kubernetes Manifest tutorial](https://developer.harness.io/docs/continuous-delivery/get-started/cd-tutorials/manifest?pipeline=cd-pipeline). If you want to follow along, make sure you have successfully deployed the Guestbook app from that tutorial before proceeding further.

### Reference built-in variables

1. Log into [app.harness.io](https://app.harness.io/), if you have not already done so.
2. Navigate to **Deployments > Pipelines**, and click into your `guestbook_canary_pipeline`.
3. Select **Edit Pipeline** from the top of the page to enter the Pipeline Studio.
4. Select the `deploy-guestbook` stage, then select **Execution**.
5. Select **Add Step > Add Step**.
6. Scroll to the **Utilities** section, then select **Shell Script**.
7. In the **Name** field, type `Successful Deployment Message`.
8. In the **Script** field, paste the following:

   ```
   echo "<+pipeline.triggeredBy.name> successfully deployed <+service.name> to <+env.name>."
   ```

9. Select **Apply Changes**, then **Save**.
10. Select **Run** and then **Run Pipeline**
11. Wait for the pipeline to complete, then select the **Successful Deployment Message** step.
12. Expand **Step Details** if needed, and verify the step log shows the script message with the variable names appropriately rendered.

### Create an account-level variable

1. Navigate to **Account Settings > Account Resources**. Select **Variables**.
2. Select **New Variable**.
3. Name the variable `account_alias` and set its Fixed Value to your first name or nickname.
4. Click **Save**.

   Variables created at the account, org, or project level support fixed values only. Variables created at the entity level (such as pipelines, stages, and services), support dynamic runtime inputs and expressions.

5. Navigate to **Deployments > Pipelines > guestbook_canary_pipeline**. Select **YAML > Edit YAML**.
6. In the **Successful Deployment Message** step, on the **script:** line, replace `<+pipeline.triggeredBy.name>` with `<+variable.account.account_alias>`.
7. Select **Save** and then **Run > Run Pipeline**.
8. After the pipeline completes, verify that the step log message references the value you set for your account level variable.

### Create a project entity-level variable as a runtime input

1. In **Deployments > Pipelines**, select your `guestbook_canary_pipeline`.
2. Select **Edit Pipeline**, then select **Variables** from the right sidebar.
3. Under **Pipeline > Custom Variables**, select **Add Variable**.
4. Name the variable **region**, leave the value blank, then select **Set variable as required during runtime**.
5. Select **Save**, then **Apply Changes**.
6. In the Pipeline Studio, select **YAML**.
7. At the bottom of the YAML, in the **variables** block, replace `value: ""` with `value: <+input>`.
8. In the **Successful Deployment Message** step, modify the **script** line to include the new variable:

   ```
   echo "<+variable.account.account_alias> successfully deployed <+service.name> to <+env.name> in <+pipeline.variables.region>."
   ```

9. Select **Save**.
10. Select **Run**. Note the prompt for a value for the **region** variable. Enter a value of your choosing (e.g. eu, india, usa, etc.).
11. Select **Run Pipeline**.
12. After the pipeline completes, verify that the step log message references the value you set for your account level variable.
