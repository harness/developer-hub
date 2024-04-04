---
title: Add variables
description: Add variables at the account, org, project, and pipeline-level.
sidebar_position: 3
helpdocs_topic_id: f3450ye0ul
helpdocs_category_id: bp8t5hf922
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /tutorials/cd-pipelines/variables
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In addition to Harness' many [built-in variables](./harness-variables), you can add custom variables at the account, org, and project [scopes](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes), as well as within individual pipelines.

Account, org, and project variables store values that you can share and use across multiple pipelines or in multiple projects.

Pipeline variables include all lower-scope variables, such as variables defined on pipelines, stages, step groups, steps, and Continuous Delivery services and environments. These variables store values for a specific pipeline, and they are limited to the context of that pipeline.

<details>
<summary>Variable scope diagram</summary>

This diagram illustrates the availability of variables based on their scope.

The **Common To Pipelines** variables represent account-, org-, or project-level variables.
The **Specific to Pipeline** variables are pipeline-level variables.

![](./static/add-a-variable-01.png)

</details>

This topic explains how to add and reference variables in Harness. It assumes you are familiar with [Harness' key concepts](/docs/platform/get-started/key-concepts.md). To manage variables, you need [permission](../role-based-access-control/add-manage-roles) to view, create/edit, and delete variables.

## Variable usage and definition specifications

* Variables can be of type string, secret, or number.
* Variable values can be [fixed values, runtime inputs, or expressions](./runtime-inputs).
   * Account, org, and project variables support fixed values only.
   * Variables created at lower levels (such as pipeline, stage, and service variables) support fixed values, runtime inputs, and expressions.
* You can reference secrets in pipeline, stage, and service variables.
* If you delete a variable that is referenced in your pipelines, the [expressions](harness-variables.md) referencing that variable **are not** automatically deleted.
   * At runtime, when Harness attempts to resolve the expressions, the pipeline can fail or an expression can resolve as `null` if Harness can't find the variable.
   * After deleting a variable, you must manually check for and remove expressions referencing deleted variables.
* If a variable is assigned a date value in the format `2002-12-14`, the YAML converter adheres to the YAML convention by converting it into a datetime object. For more information, go to the [YAML specification for tags](https://yaml.org/spec/1.2.2/#3212-tags).
* Sometimes you can mark variables as required.
   * The **Required** setting is supported for pipeline variables, stage variables, and CD service and environment variables.
   * The **Required** setting is also enforced when the variable is defined in a template and the template is included in a pipeline.
* Pipelines fail if a variable's default value starts with an asterisk (`*`). Instead, you can wrap the asterisk in double quotes (`"*"`).

### Variable availability to pipelines, stages, services, and environments

Account, org, and project variables are available to all lower scopes. For example, an org variable is available to all projects and pipelines under that org.

Variables added to pipelines and stages are available to all stages in the pipeline.

Variables added to services and environments are available in all stages that use those services and environments. For more information, check out the [Harness pipeline, stage, and service variables overview video](https://youtu.be/lqbmO6EVGuU).

You can also override service variables at the environment level. For more information, go to [Overriding services at the environment level](/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides).

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
<TabItem value="Harness Manager" label="Harness Manager" default>

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

* Select **Variables** on the right side of the Pipeline Studio. Here, you can add pipeline, stage, service, step group, and other variables, depending on your pipeline's content.
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

Similarly, you can add CD service and environment variables within stages that have a service or environment definition. To add a service variable, edit a CD stage with a service definition, select the **Service** tab, expand the **Advanced** section, and select **Add Variable**. Optionally, you can [export service variables as environment variables](/docs/continuous-delivery/x-platform-cd-features/services/export-ser-var-as-env-var).

:::info

*CD environment variables* are variables for your defined CD environments (such as production or development environments). These can be different from pipeline environment variables that define the execution runtime environment.

:::

You can also add variables to step groups.

Additionally, some step types support step-level runtime environment variable or output variables. Usage for these options is in the documentation for those step types.

</TabItem>
</Tabs>

## Reference variables

Use [expressions](/docs/platform/variables-and-expressions/harness-variables.md) to reference variables in Harness.

For custom variables, the expression you use depends on where you created the variable:

* Account variable reference: `<+variable.account.VARIABLE_ID>`
* Org variable reference: `<+variable.org.VARIABLE_ID>`
* Project variable reference: `<+variable.VARIABLE_ID>`
* Pipeline variable reference: `<+pipeline.variables.VARIABLE_ID>`
* Stage variable reference (within the same stage where you defined it): `<+stage.variables.VARIABLE_ID>`
* StepGroup variable reference: `<+stepGroup.variables.VARIABLE_ID>`
* Service variable reference: `<+serviceVariables.VARIABLE_ID>`
* Environment variable reference: `<+env.variables.VARIABLE_ID>`

Here's a simple script example that echoes some variables in a pipeline:

1. In Harness, edit a pipeline.

   If you want to reference an account, org, or project variable, the pipeline must be within the account, org, or project where you created that variable.

2. Select a stage and add a step that can run a script, such as a [Run step](/docs/continuous-integration/use-ci/run-step-settings.md) or a [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step).

3. Add a script to echo your variables, such as:

   ```
   echo "Account var: "<+variable.account.VARIABLE_ID>
   echo "Org var: "<+variable.org.VARIABLE_ID>
   echo "Project var: " <+variable.VARIABLE_ID>
   echo "Pipeline var: " <+pipeline.variables.VARIABLE_ID>
   echo "Stage var: " <+stage.variables.VARIABLE_ID>
   ```

4. Run the pipeline and find the echoed variables in the execution logs.

   ![](./static/add-a-variable-08.png)

### Use an account/org/project variable as the value of a pipeline variable

You can use a higher-level variable as the value for pipeline variables (including pipeline, stage, step group, service, and environment variables).

1. [Add a variable](#add-variables) at the account, or, or project scope that you want to use as the value for a lower-level variable.
2. Add a variable to a pipeline, stage, step group, or other entity. For example, to add a service variable, select a stage with a service definition, select the **Service** tab, expand the **Advanced** section, and select **New Variable**.
3. For **Variable Name**, enter a name for your variable.
4. For **Type**, select **String**.
5. For **Value**, enter an expression referencing your account, org, or project variable, such as `<+variable.account.VARIABLE_ID>`.

   ![](./static/add-a-variable-10.png)

When you run this pipeline, Harness resolves the variables value from the reference to the account/org/project variable.

For example, to reference a service variable in a Shell Script step:

1. Edit your pipeline and select **Variables** on the right side of the Pipeline Studio.
2. Locate the variable you want to use, and select the **Copy** icon to copy the expression referencing that variable.

   ![](./static/add-a-variable-11.png)

3. In your Shell Script step, paste the expression where you want to reference the variable in your commands:

   ```sh
   echo "<+stage.spec.serviceConfig.serviceDefinition.spec.variables.SERVICE_VARIABLE_ID>"
   ```

4. Run the pipeline and find the variable's resolved value in the execution logs.

    ![](./static/add-a-variable-12.png)

:::tip

You can use [expressions](/docs/platform/variables-and-expressions/harness-variables.md) to reference variables in most pipeline settings. For example, if you have an account variable that stores a service definition, you could use an expression referencing that variable in your CD stage's **Specify Service** setting.

![](./static/add-a-variable-13.png)

When you run the pipeline, Harness pulls the service definition from the referenced variable.

## Tutorial - Use variables in a CD pipeline

This tutorial demonstrates how to create and use variables in a Harness CD pipeline.

This tutorial builds upon the pipeline created in the [Deploy using Kubernetes Manifest tutorial](https://developer.harness.io/docs/continuous-delivery/get-started/cd-tutorials/manifest?pipeline=cd-pipeline). If you want to follow along, make sure you have successfully deployed the Guestbook app from that tutorial before proceeding further.

### Use built-in variables

Harness has many built-in variables that you can reference in your pipelines.

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

### Use account variables

You can create custom variables and use them in your pipelines.

1. Navigate to **Account Settings > Account Resources**. Select **Variables**.
2. Select **New Variable**.
3. Name the variable `account_alias` and set its Fixed Value to your first name or nickname.
4. Click **Save**.

   Variables created at the account, org, or project level support fixed values only. Variables created at the entity level (such as pipelines, stages, and services), support dynamic runtime inputs and expressions.

5. Navigate to **Deployments > Pipelines > guestbook_canary_pipeline**. Select **YAML > Edit YAML**.
6. In the **Successful Deployment Message** step, on the **script:** line, replace `<+pipeline.triggeredBy.name>` with `<+variable.account.account_alias>`.
7. Select **Save** and then **Run > Run Pipeline**.
8. After the pipeline completes, verify that the step log message references the value you set for your account level variable.

### Use pipeline variables with runtime input

Pipeline, stage, step group, and other limited-scope variables can have fixed values or take values from other variables or [runtime input](/docs/platform/variables-and-expressions/runtime-input-usage.md), which allows the user to define a value at runtime.

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
