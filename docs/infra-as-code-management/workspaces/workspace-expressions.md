---
title: Workspace expressions
description: Learn how to use Harness workspace expressions.
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Workspace expressions in Harness Infrastructure as Code Management (IaCM) provide a powerful way to dynamically reference and utilize various workspace-level parameters within your pipelines. By leveraging JEXL (Java Expression Language) expressions, you can access key workspace attributes, allowing for greater flexibility and customization in your workflows.

With workspace expressions, you can:

- Dynamically retrieve and use workspace-specific identifiers and paths.
- Access environment variables and secret variables within the workspace context.
- Integrate versioning and provisioner details directly into your pipeline logic.
- Extract outputs and control cost estimation features.
- Seamlessly manage Git-related parameters such as repository name, branch, commit SHA, and tags.

These expressions are particularly useful in scenarios where your pipeline needs to adapt to different environments or configurations based on the workspace in use.

:::info migrate expressions
Go to the **Migrate expressions** tab in the [how to use workspace expressions](https://developer.harness.io/docs/infra-as-code-management/workspaces/workspace-expressions#how-to-use-workspace-expressions) section to see how to update your old expressions to the most recent format.
:::

### Available workspace expressions

Here’s a table of the available workspace expressions in Harness IaCM:

| **Paremeter**                | **Expression**                               | **Description**                                                                 |
|-------------------------------|--------------------------------------------------|---------------------------------------------------------------------------------|
| **Workspace ID**              | `<+workspace.identifier>`                        | Retrieves the unique identifier for the workspace.                              |
| **Folder Path**               | `<+workspace.folderPath>`                        | Returns the root directory path associated with the workspace.                  |
| **Provisioner Type**          | `<+workspace.type>`                              | Provides the type of provisioner being used, such as `opentofu` or `terraform`. |
| **Provisioner Version**       | `<+workspace.provisionerVersion>`                | Fetches the version of the provisioner used in the workspace.                   |
| **Connector Reference**       | `<+workspace.connectorRef>`                      | Retrieves the connector reference associated with the workspace.                |
| **Environment Variable**      | `<+workspace.envVars.SOME_ENV_VAR>`              | Accesses a specific environment variable within the workspace.                  |
| **Terraform/Opentofu Variable** | `<+workspace.variables.OPEN_TOFU_VAR>`         | Retrieves a variable specific to Terraform or Opentofu within the workspace.    |
| **Secret Variable**           | `<+workspace.envVars.SECRET_ENV_VAR>`            | Accesses a secret variable defined in the workspace.                            |
| **Output**                    | `<+workspace.outputs.OUTPUT_ID>`                 | Retrieves a specific output from the workspace.                                 |
| **Workspace Name**            | `<+workspace.name>`                              | Returns the name of the workspace.                                              |
| **Cost Estimation Enabled**   | `<+workspace.enableCostEstimation>`              | Indicates whether cost estimation is enabled for the workspace.                 |
| **Git Connector Reference**   | `<+workspace.gitConnectorRef>`                   | Retrieves the Git connector reference for the workspace.                        |
| **Git Repository Name**       | `<+workspace.gitRepoName>`                       | Provides the name of the Git repository associated with the workspace.          |
| **Git Branch**                | `<+workspace.gitBranch>`                         | Returns the name of the Git branch currently in use.                            |
| **Git SHA**                   | `<+workspace.gitSha>`                            | Retrieves the commit SHA from the Git repository.                               |
| **Git Tag**                   | `<+workspace.gitTag>`                            | Returns the Git tag associated with the current commit.                         |

### How to use workspace expressions

The following example highlights how you can apply workspace expressions to your pipelines run step and output the workspace identifier and secret variable value.

:::warning reserved keyword
Do not name your run step `workspace` as it is a reserved keyword.
:::

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="https://app.tango.us/app/embed/2bac0ddc-f01d-4b9e-ac7a-d7776160cfe8" 
    title="Using Harness workspace expressions" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>
</TabItem>
<TabItem value="Migrate expressions">
If you are currently using and older expression format, update it to the new format accordingly.

For example, update secret variables from:

```hcl
// OLD
<+pipeline.stages.stage_name.spec.execution.steps.step_name.spec.secretVariables.secret_variable_name>

// NEW
<+workspace.envVars.SECRET_ENV_VAR>
```

The following guide demonstrates how to update your workspace's secret environment variable reference:

<iframe 
    src="https://app.tango.us/app/embed/ad446a5f-cc13-408c-be77-8d19c241f8a8" 
    title="Migrate workspace expressions in Harness IaCM" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>

See the following reference of old and new expression formats:

<details>
    <summary>See old and new expressions</summary>
        | Value                   | Expressions                                                                                              |
        |-------------------------|----------------------------------------------------------------------------------------------------------|
        | **Workspace ID**         | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.workspace>`                              |
        |                         | After: `<+workspace.identifier>`                                                                     |
        | **Folder Path**          | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_ROOT_DIR>`            |
        |                         | After: `<+workspace.folderPath>`                                                                     |
        | **Provisioner Type**     | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_PROVISIONER>`         |
        |                         | After: `<+workspace.type>`                                                                           |
        | **Provisioner Version**  | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_TF_VERSION>`          |
        |                         | After: `<+workspace.provisionerVersion>`                                                             |
        | **Connector Ref**        | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_CONNECTOR_REF>`       |
        |                         | After: `<+workspace.connectorRef>`                                                                   |
        | **Env Variable**         | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.SOME_ENV_VAR>`               |
        |                         | After: `<+workspace.envVars.SOME_ENV_VAR>`                                                           |
        | **Terraform/Opentofu var**| Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariables.PLUGIN_WS_TF_VAR_OPEN_TOFU_VAR>` |
        |                         | After: `<+workspace.variables.OPEN_TOFU_VAR>`                                                        |
        | **Secret Variable**      | Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.secretVariables.SECRET_ENV_VAR>`          |
        |                         | After: `<+workspace.envVars.SECRET_ENV_VAR>`                                                         |
        | **Output**               | Before: `<+workspace.<+pipeline.stages.s1.spec.execution.steps.init.spec.workspace>.OUTPUT_ID>`        |
        |                         | After: `<+workspace.outputs.OUTPUT_ID>`                                                              |
        | **Env Var from Connector**| Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.envVariablesFromConnector.PLUGIN_ACCESS_KEY>` |
        |                         | After: `<+workspce.envVariablesFromConnector.PLUGIN_ACCESS_KEY>`                                      |
        | **Secret from Connector**| Before: `<+pipeline.stages.s1.spec.execution.steps.init.spec.secretVariablesFromConnector.PLUGIN_SECRET_KEY>` |
        |                         | After: `<+workspace.secretVariablesFromConnector.PLUGIN_SECRET_KEY>`                                  |
</details>
</TabItem>
</Tabs>

---
Workspace expressions in Harness IaCM allow for advanced customization and dynamic referencing within your CI/CD pipelines. By understanding and utilizing these expressions, you can enhance the efficiency and adaptability of your infrastructure management processes.
