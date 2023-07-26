---
title: Exporting service variables as environment variables in a Shell Script step
description: Learn how to export service variables as environment variables when using a Shell Script step
sidebar_position: 8
---

You can use the **Export Service Variables as Env Variables** setting to export service variables as environment variables. This setting is available at account, organization, and project levels.

To enable this setting, go to **Account Settings > Account Resources > Default Settings > Pipeline**, and then expand **Pipeline**. Next, set the **Export Service Variables as Env Variables** setting to `true`.

Once you enable this setting, a service's variables are available as Bash variables in any Shell Script step in a stage that deploys that service. You can access the service variables like you access any Bash variables. For example, the service variable, `var1` is available for use in a Shell Script step as `$var1`.

When you [add a service variable](/docs/platform/Variables-and-Expressions/add-a-variable#use-an-account-org-or-project-variable-in-a-service-variable), you can select variables of type **String**, **Secret**, or **Number**. 

Let's consider an example where you have added the following service variables: 

| **Variable name** | **Type** | **Value** |
| :--- | :--- | :--- |
| `svar1` | String | normalValue |
| `svar2` | String | value-with-hyphen |
| `svar3` | String | value_with_underscores |
| `secretServiceVar` | Secret | `yourSecret` |
| `nvar1` | Number | 1 |
| `svar4` | String | abc%def%123 |
| `svar5$abc` | String | key_With_Dollar |
| `svar6` | String | abc,ghj,klk |

In your Shell Script step, you can use these service variables as environment variables if you had enabled the **Export Service Variables as Env Variables** setting.

:::info Limitation

Shell scripts executing on remote hosts cannot export the correct value if you're using special characters such as `-`, `_`, `$`, `%`, and spaces in Bash.

:::

When you run the pipeline, you can see the value of the service variables passed as environment variables.

<docimage path={require('./static/export-srv-var-as-env-var.png')} width="100%" height="100%" title="Click to view full size image" />  

## See also

- [Using Shell Script steps in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts)
- [Add variables](/docs/platform/variables-and-expressions/add-a-variable/#use-an-account-org-or-project-variable-in-a-service-variable)
- [Services and environments basics](/docs/continuous-delivery/get-started/services-and-environments-overview)