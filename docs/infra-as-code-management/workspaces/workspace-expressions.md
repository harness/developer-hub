---
title: Workspace expressions
description: Learn how to use Harness workspace expressions.
sidebar_position: 30
---

Workspace expressions in Harness Infrastructure as Code Management (IaCM) provide a powerful way to dynamically reference and utilize various workspace-level parameters within your pipelines. By leveraging JEXL (Java Expression Language) expressions, you can access key workspace attributes, allowing for greater flexibility and customization in your workflows.

With workspace expressions, you can:

- Dynamically retrieve and use workspace-specific identifiers and paths.
- Access environment variables and secret variables within the workspace context.
- Integrate versioning and provisioner details directly into your pipeline logic.
- Extract outputs and control cost estimation features.
- Seamlessly manage Git-related parameters such as repository name, branch, commit SHA, and tags.

These expressions are particularly useful in scenarios where your pipeline needs to adapt to different environments or configurations based on the workspace in use.

### Available workspace expressions

Here’s a table of the available workspace expressions in Harness IaCM:

| **Paremeter**                | **Expression**                               | **Description**                                                                 |
|-------------------------------|--------------------------------------------------|---------------------------------------------------------------------------------|
| **Workspace ID**              | `<+workspace.identifier>`                        | Retrieves the unique identifier for the workspace.                              |
| **Folder Path**               | `<+workspace.folderPath>`                        | Returns the root directory path associated with the workspace.                  |
| **Provisioner Type**          | `<+workspace.type>`                              | Provides the type of provisioner being used, such as Terraform or Opentofu.     |
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


Workspace expressions in Harness IaCM allow for advanced customization and dynamic referencing within your CI/CD pipelines. By understanding and utilizing these expressions, you can enhance the efficiency and adaptability of your infrastructure management processes.