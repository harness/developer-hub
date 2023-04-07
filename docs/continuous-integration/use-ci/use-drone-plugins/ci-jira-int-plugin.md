---
title: Integrate Jira in a CI pipeline
description: Connect your Harness CI pipelines to Jira.
sidebar_position: 40
---

Understanding how a feature is being released, when Jira issues have been deployed, and whether a build has passed or failed is important for teams to stay aligned and better serve customers. Jira integrations in your CI pipelines provide insight into feature development and release information in Jira by automatically updating the **Deployment** or **Build** fields in Jira.

This topic assumes you have a familiarity with [Harness CI concepts](../../ci-quickstarts/ci-concepts.md), [CI pipeline concepts](../../ci-quickstarts/ci-pipeline-basics.md), and creating pipelines. If you haven't created a Harness CI pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

To integrate Harness CI and Jira, install the **CI Enterprise by Harness** app in your Jira instance, generate an authentication token, and then add a **Plugin** step to your pipeline.

1. Install the [CI Enterprise by Harness app](https://marketplace.atlassian.com/apps/1227511/ci-enterprise-by-harness) in your Jira instance.
2. Go to the **CI Enterprise by Harness** app configuration page.
3. Generate an authentication token and save it as a [Harness text secret](/docs/platform/Security/add-use-text-secrets).

## Add a Plugin step

```mdx-code-block
import Tabs3 from '@theme/Tabs';
import TabItem3 from '@theme/TabItem';
```

```mdx-code-block
<Tabs3>
  <TabItem3 value="Visual" label="Visual">
```

1. In your CI pipeline's **Build** stage, add a [Plugin step](../../ci-technical-reference/plugin-step-settings-reference.md).
2. Enter a **Name** and optional **Description**.
3. For **Container Registry**, select a container registry connector with DockerHub access.
4. In the **Image** field, enter `plugins/jira`.
5. Under **Optional Configuration**, add **Settings** to configure the Jira plugin's properties for this step, as described in the following table. These are passed as environment variables, and, therefore, you must use all uppercase letters for the keys.

| Keys | Required or optional | Description | Value example |
| - | - | - | - |
| `CONNECT_KEY` | Required | Provide authentication credentials as an [expression referencing a text secret](/docs/platform/Security/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the Jira authentication token you created earlier. | `<+secrets.getValue("jiraKey")>` |
| `PROJECT` | Required | Specify the Jira project key. For example, a `My Test` project might have a project key of `MYT`. | `MYT` |
| `INSTANCE` <!--CONNECT_HOSTNAME?--> | Required | Specify the Jira instance using the prefix to your Jira hostname, such as `myorg` in `myorg.atlassian.net`. | `myorg` |
| `ENVIRONMENT_NAME` | Optional | Specify a deployment environment. Use this if you want Harness to update the **Deployment** field in Jira. If `ENVIRONMENT_NAME` is excluded, Harness updates the **Build** field in Jira. | `production` |
| `STATE` | Optional | Specify a deployment or build state. This is useful if you only want an update to appear in Jira when, for example, builds are successful. | `success` <!--unknown, pending, in_progress, cancelled, failed, rolled_back, successful; Default is unknown --> |
| `LOG_LEVEL` | Optional | Set the log level as either `debug` or `info`. Set to `debug` to print the response from Jira in the build logs. | `debug` |

:::tip

You can use [variable expressions](/docs/platform/variables-and-expressions/harness-variables/) for values, such as `<+secrets.getValue("jiraKey")>`.

:::

```mdx-code-block
  </TabItem3>
  <TabItem3 value="YAML" label="YAML" default>
```
The following YAML example describes a [Plugin step](../../ci-technical-reference/plugin-step-settings-reference.md) that uses the Jira plugin to update the **Build** field in Jira when there is a successful build.

```yaml
              - step:
                  type: Plugin
                  name: Update Jira Deployment
                  identifier: updateJiraDeployment
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/jira
                    settings:
                      PROJECT: #Jira project key
                      CONNECT_KEY: <+secrets.getValue("jiraKey")> #Jira app authentication token
                      INSTANCE: #Jira instance hostname
                      STATE: success
```

To update the **Deployment** field in Jira, include `ENVIRONMENT_NAME`, such as:

```yaml
                      ENVIRONMENT_NAME: production
```

The `Plugin` step configuration is as follows:

*  `type: Plugin`
*  `name:` A name for the step.
*  `identifier:` A unique step ID.
*  `connectorRef:` Specify a container registry connector with DockerHub access.
*  `image: plugins/jira`
*  `settings:` Add a series of key-value pairs to configure the Jira plugin's properties for this step, as described in the following table. These are passed as environment variables, and, therefore, you must use all uppercase letters for the keys.

| Keys | Required or optional | Description | Value example |
| - | - | - | - |
| `CONNECT_KEY` | Required | Provide authentication credentials as an [expression referencing a text secret](/docs/platform/Security/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the Jira authentication token you created earlier. | `<+secrets.getValue("jiraKey")>` |
| `PROJECT` | Required | Specify the Jira project key. For example, a `My Test` project might have a project key of `MYT`. | `MYT` |
| `INSTANCE` <!--CONNECT_HOSTNAME?--> | Required | Specify the Jira instance using the prefix to your Jira hostname, such as `myorg` in `myorg.atlassian.net`. | `myorg` |
| `ENVIRONMENT_NAME` | Optional | Specify a deployment environment. Use this if you want Harness to update the **Deployment** field in Jira. If `ENVIRONMENT_NAME` is excluded, Harness updates the **Build** field in Jira. | `production` |
| `STATE` | Optional | Specify a deployment or build state. This is useful if you only want an update to appear in Jira when, for example, builds are successful. | `success` <!--unknown, pending, in_progress, cancelled, failed, rolled_back, successful; Default is unknown -->|
| `LOG_LEVEL` | Optional | Set the log level as either `debug` or `info`. Set to `debug` to print the response from Jira in the build logs. | `debug` |

:::tip

You can use [variable expressions](/docs/platform/variables-and-expressions/harness-variables/) for values, such as `<+secrets.getValue("jiraClientId")>`.

:::

```mdx-code-block
  </TabItem3>
</Tabs3>
```

## Run your pipeline

After adding the **Plugin** step, save and run the pipeline. If you set `LOG_LEVEL: debug`, you can see the Jira response in the build logs.

After the build runs, you can see updates to **Build** and **Deployment** fields on the Jira issue associated with the build. If you drill down into these fields, you can find links to the build in Harness.

<!-- ![](./static/ci-jira-int-ticket-details.png) -->

<docimage path={require('./static/ci-jira-int-ticket-details.png')} />

:::info How does Harness determine which Jira issue and field to update?

The presence of the `ENVIRONMENT_NAME` setting in the **Plugin** step determines whether Harness updates the **Deployment** or **Build** field in Jira. If `ENVIRONMENT_NAME` is included, Harness updates the **Deployment** field. If `ENVIRONMENT_NAME` is excluded, Harness updates the **Build** field.

When the pipeline runs, Harness scans for a Jira issue number, such as `[JIRA-1234]`, in the title of the PR or the latest commit message associated with the build.


:::
