---
title: Integrate Jira in a CI pipeline
description: Connect your Harness CI pipelines to Jira.
sidebar_position: 40
---

Understanding how a feature is being released, when Jira issues have been deployed, and whether a build has passed or failed is important for teams to stay aligned and better serve customers. Jira integrations in your CI pipelines provide insight into feature development and release information in Jira.

To integrate Harness CI and Jira, you need to:

1. [Prepare Jira](#prepare-jira): Install the Harness App in your Jira instance and generate an app authentication key.
2. [Add the Plugin step](#add-the-plugin-step): Add the Jira plugin, as a **Plugin** step, to your CI pipeline.
3. Run pipeline <!-- must be triggered by webhook? -->

This topic assumes you have a familiarity with [Harness CI concepts](../../ci-quickstarts/ci-concepts.md), [CI pipeline concepts](../../ci-quickstarts/ci-pipeline-basics.md), and creating pipelines. If you haven't created a Harness CI pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

## Prepare Jira

1. In your Jira instance, select **Apps** and then select **Explore more apps**.
2. Search for and add the Harness CI for Jira app. <!-- what is the name? -->
3. To get OAuth credentials for this app, [configure an incoming link](https://confluence.atlassian.com/adminjiraserver/configure-an-incoming-link-1115659067.html).
4. Save the **Client ID** and **Client secret** as [Harness text secrets](/docs/platform/Security/add-use-text-secrets).

:::info

If you can't configure an OAuth2 connection, you must create an authentication token and save it as a Harness text secret. You need either an auth token or OAuth2 credentials for Harness to be able to send information to Jira.

:::

## Add the Plugin step

Add one or more **Plugin** steps to a CI **Build** stage to send updates to Jira. For example, your pipeline can have a step that updates Jira any time a build runs and another step that updates Jira when there is a deployment to production.

<!-- ![A CI Build stage with two Jira Plugin steps.](./static/ci-jira-int-two-plugin-steps.png) -->

<docimage path={require('./static/ci-jira-int-two-plugin-steps.png')} />

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```

1. In your pipeline's **Build** stage, select **Add Step**, select **Add Step** again, and then select **Plugins** from the **Step Library**.
2. Enter a **Name** and optional **Description**.
3. For **Container Registry**, select the container registry where the [Jira Drone plugin](https://github.com/drone/drone-jira) is located. You can use the default Harness Docker Connector or your own container registry (if it has a Jira Drone plugin image).
4. In the **Image** field, enter the name of the Jira Drone plugin image, such as `plugins/jira`.
5. Under **Optional Configuration**, add **Settings** to configure the Jira plugin's properties for this step. The following table describes required and optional properties.

| Key | Required or optional | Description | Value example |
| - | - | - | - |
| `LOG_LEVEL` | Optional | Define the plugin's log level. Set to `debug` to print the response from Jira in the build logs. | `debug` or `info` |
| `CLOUD_ID` | Required | Atlassian Cloud ID | <!-- Is this required? -->  |
| `CLIENT_ID` | Required | A reference to a text secret containing the Atlassian OAuth2 client ID for the app's incoming connection. | `<+secrets.getValue("jiraClientId")>` |
| `CLIENT_SECRET` | Required | A reference to a text secret containing the Atlassian OAuth2 client secret for the app's incoming connection. | `<+secrets.getValue("jiraClientSecret")>` |
| `INSTANCE` | Optional | The prefix to your Jira hostname, such as `myorg` in `myorg.atlassian.net`. | `myorg` |
| `PROJECT` | Required | The Jira project name. | `MYT` |
| `PIPELINE` | Optional | The pipeline name. | <!-- not clear if PIPELINE is needed or has any function? --> |
| `ENVIRONMENT_NAME` | Optional | A specific deployment environment to associate with this step. Useful if you only want an update to appear in Jira when there is, for example, a deployment to the production environment. | `production` |
| `LINK` | Optional | A link to the deployment. | <!-- not clear if LINK is needed or has any function? --> |
| `STATE` | Optional | The deployment state. Useful if you only want an update to appear in Jira when, for example, builds are successful. | `success` |

:::tip

You can use [variable expressions](/docs/platform/variables-and-expressions/harness-variables/) for values, such as `<+secrets.getValue("jiraClientId")>`.

If you have an authentication token instead of OAuth2 credentials, specify `CONNECT_KEY: [auth token secret]` instead of `CLIENT_ID` and `CLIENT_SECRET`.

:::

<!-- ![A Plugin step configured for the Jira plugin.](./static/ci-jira-int-plugin-step-visual.png) -->

<docimage path={require('./static/ci-jira-int-plugin-step-visual.png')} />

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML">
```

Go to the pipeline where you want to add the Jira integration, and add a `Plugin` step configured as follows:

   *  `type: Plugin`
   *  `name:` A name for the step.
   *  `identifier:` A unique step ID.
   *  `connectorRef:` Specify the container registry where the [Jira Drone plugin](https://github.com/drone/drone-jira) is located. You can use the default Harness Docker Connector (`account.harnessImage`) or your own container registry (if it has a Jira Drone plugin image).
   *  `image:` Enter the name of the Jira Drone plugin image, such as `plugins/jira`.
   *  `settings:` Add a series of key-value pairs to configure the Jira plugin's properties for this step. The following table describes required and optional properties.

| Key | Required or optional | Description | Value example |
| - | - | - | - |
| `LOG_LEVEL` | Optional | Define the plugin's log level. Set to `debug` to print the response from Jira in the build logs. | `debug` or `info` |
| `CLOUD_ID` | Required | Atlassian Cloud ID | <!-- Is this required? --> |
| `CLIENT_ID` | Required | A reference to a text secret containing the Atlassian OAuth2 client ID for the app's incoming connection. | `<+secrets.getValue("jiraClientId")>` |
| `CLIENT_SECRET` | Required | A reference to a text secret containing the Atlassian OAuth2 client secret for the app's incoming connection. | `<+secrets.getValue("jiraClientSecret")>` |
| `INSTANCE` | Optional | The prefix to your Jira hostname, such as `myorg` in `myorg.atlassian.net`. | `myorg` |
| `PROJECT` | Required | The Jira project name. | `MYT` |
| `PIPELINE` | Optional | The pipeline name. | <!-- not clear if PIPELINE is needed or has any function? --> |
| `ENVIRONMENT_NAME` | Optional | A specific deployment environment to associate with this step. Useful if you only want an update to appear in Jira when there is, for example, a deployment to the production environment. | `production` |
| `LINK` | Optional | A link to the deployment. | <!-- not clear if LINK is needed or has any function? --> |
| `STATE` | Optional | The deployment state. Useful if you only want an update to appear in Jira when, for example, builds are successful. | `success` |

:::tip

You can use [variable expressions](/docs/platform/variables-and-expressions/harness-variables/) for values, such as `<+secrets.getValue("jiraClientId")>`.

If you have an authentication token instead of OAuth2 credentials, specify `CONNECT_KEY: [auth token secret]` instead of `CLIENT_ID` and `CLIENT_SECRET`.

:::

<details>
<summary>YAML example</summary>

The following YAML example describes a `Plugin` step that uses the Jira plugin to update the **Deployment** field in Jira when there is a successful deployment to the production environment.

```yaml
              - step:
                  type: Plugin
                  name: Update Jira Deployment
                  identifier: updateJiraDeployment
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/jira
                    settings:
                      PROJECT: MYT
                      CLIENT_ID: <+secrets.getValue("jiraClientId")>
                      CLIENT_SECRET: <+secrets.getValue("jiraClientSecret")>
                      INSTANCE: myorg
                      LOG_LEVEL: debug
                      STATE: success
                      ENVIRONMENT_NAME: production
```

</details>

```mdx-code-block
  </TabItem>
</Tabs>
```

:::tip

For more information about **Plugin** step settings, go to the [Plugin step settings reference](../../ci-technical-reference/plugin-step-settings-reference.md).

:::

## Run your pipeline <!--Add webhook trigger and run pipeline-->

After adding the **Plugin** step(s), save and run the pipeline. If you set `LOG_LEVEL: debug`, you can see the Jira response in the build logs.

After the build runs, you can see updates to **Build** and **Deployment** information on the Jira issue that triggered the build. If you drill down into these details, you can find links to the build in Harness.

:::info

<!-- how does it know to update the ticket? If webhook trigger required, include this in the steps above.-->
Pipelines that run on webhook triggers must have the Jira ticket number in the commit message to update the Jira ticket.

:::

<!-- ![](./static/ci-jira-int-ticket-details.png) -->

<docimage path={require('./static/ci-jira-int-ticket-details.png')} />
