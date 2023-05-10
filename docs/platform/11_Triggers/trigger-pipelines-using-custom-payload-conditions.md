---
title: Trigger pipelines using Git event payload conditions
description: You can trigger pipelines in response to Git events.
sidebar_position: 5
helpdocs_topic_id: 10y3mvkdvk
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
---

You can trigger pipelines in response to Git events that match specific payload conditions you set up in a Harness trigger. For example, when a pull request or push event occurs on a Git repo and your trigger settings match the payload conditions, a CI or CD pipeline can run.

This topic demonstrates how to create a custom trigger for GitHub payload conditions. It covers payload conditions in detail. For a general overview of creating Git event triggers, go to [Trigger pipelines using Git Events](triggering-pipelines.md). For general reference information, go to the [Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md). For information about the Harness Git Experience, go to the [Harness Git Experience Overview](../10_Git-Experience/git-experience-overview.md)

This topic assumes you're familiar with [Harness' key concepts](../../getting-started/learn-harness-key-concepts.md) and either [creating CD pipelines](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart) or [creating CI pipelines](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md).

:::info

Currently, Harness supports Git-based triggers for the most common Git providers. You can use a custom trigger for other repo providers.

:::

## Step 1: Add a trigger to a pipeline

1. Go to your pipeline in Harness.
2. Select **Triggers**.
3. Select **New Trigger**.
4. Choose your SCM provider, such as **GitHub** or **BitBucket**. Select **Custom** if you are using a different provider.

## Step 2: Configure the trigger

:::caution

All triggers in a Harness account have the same URL: `https://app.harness.io/gateway/ng/api/webhook?accountIdentifier=ACCOUNT_ID`. This means that you must set up your trigger conditions carefully to ensure that triggers start builds for relevant events only.

:::

On the trigger's **Configuration** tab, specify the following:

* **Name** and **Description**.
* **Payload Type:** This should match your SCM provider.
* **Connector:** A [code repo connector](/docs/category/code-repo-connectors) for your SCM provider. A connector is required for all Git trigger types except **Custom**. In the connector's credentials, make sure API access is enabled. For **Custom** triggers, you must set up the external tool to send payloads to to the trigger URL. Refer to your tool's documentation for instructions on sending payloads.
* **Event:** Select the [Git event type for the webhook](/docs/platform/Pipelines/w_pipeline-steps-reference/triggers-reference#event-and-actions). For some event types, you must also select **Actions** settings for the webhook, or you can select **Any Actions**.
* **Auto-abort Previous Execution:** Use this option if you want new triggering events to override active pipeline executions. When a newer triggering event is detected, any active builds on the same branch are aborted before the new build begins.

## Step 3: Set trigger conditions

**Conditions** specify trigger criteria in addition to events and actions. They help form the overall set of criteria to trigger a pipeline based on changes in a given source. Conditions can use Harness built-in expressions for accessing trigger settings, Git payload data, and headers.

<details>
<summary>Branches and Changed Files</summary>

You can configure Triggers based on the source branches, target branches, and changed files in a Git merge.

If you want to specify multiple paths, use the **Regex** operator. You can also use a regex to specify all files in a parent folder, such as `ci/*`. This is shown in the **Changed Files** row in the following screenshot.

![](./static/trigger-pipelines-using-custom-payload-conditions-30.png)

:::info

The **IN** and **NOT IN** operators do not support Regex.

:::

</details>

<details>
<summary>Header Condition</summary>

In the Header condition, enter the Git Webhook Header data that matches your value.

The header expression format is `<+trigger.header['key-name']>`, for example `<+trigger.header['X-GitHub-Event']>`.

For more Harness trigger expressions, go to [Built-in Git Trigger and Payload Expressions](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md#built-in-git-trigger-and-payload-expressions).

</details>

<details>
<summary>Payload Condition</summary>

Conditions based on the values of the JSON payload. Harness treats the JSON payload as a data model and parses the payload and listens for events on a JSON payload key.

To reference payload values, you use `<+eventPayload.[path-to-key-name]`, for example `<+eventPayload.repository.full_name>`.

For details on Payload Condition, go to [Payload Condition in the Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md#payload-conditions).

</details>

<details>
<summary>JEXL Condition</summary>

JEXL expressions, such as `<+eventPayload.repository.owner.name> == "repositoryOwnerName"` are also supported. Here are some examples of JEXL triggers:

* `<+trigger.payload.pull_request.diff_url>.contains("triggerNgDemo")`
* `<+trigger.payload.pull_request.diff_url>.contains("triggerNgDemo") || <+trigger.payload.repository.owner.name> == "wings-software"`
* `<+trigger.payload.pull_request.diff_url>.contains("triggerNgDemo") && (<+trigger.payload.repository.owner.name> == "wings-software" || <+trigger.payload.repository.owner.name> == "harness")`

For details on trigger settings, go to the [Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md).

</details>

If you select multiple conditions, the conditions are ANDed together (Boolean AND operation). All conditions must match an event payload for it to execute the trigger. If you select any one condition, the trigger executes based on the condition you entered.

![](./static/trigger-pipelines-using-custom-payload-conditions-31.png)

## Step 4: Set pipeline input

Pipelines often have [Runtime Inputs](../20_References/runtime-inputs.md), such as codebase branch names or artifact versions and tags.

1. Provide values for the inputs or use [Input Sets](../8_Pipelines/input-sets.md).
2. Select **Create Trigger**.

## Step 5: Register the webhook in the Git provider

For all Git providers supported by Harness, non-custom webhooks are automatically created in the repo. For details about automatically-registered Git events, go to the [Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md).

However, when you create or edit the custom webhook trigger, you need to copy the webhook URL and add it to your repo webhooks.

:::info Required permissions

To configure a functioning Git event webhook trigger:

* You must have the appropriate level of access to configure repo webhooks in your Git provider.
* The personal access token use for [code repo connector](/docs/category/code-repo-connectors) authentication must have the appropriate scopes.

For example, for GitHub, you must be a repo admin and the GitHub personal access token used in the pipeline's GitHub connector must include all `repo`, `user`, and `admin:repo_hook` options for **Scopes**.

![GitHub personal access token scopes.](./static/trigger-pipelines-using-custom-payload-conditions-32.png)

For information about other provider's token scopes, go to:

* [GitLab - Personal access token scopes](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-token-scopes)
* [Bitbucket Cloud - Repository access token permissions](https://support.atlassian.com/bitbucket-cloud/docs/repository-access-token-permissions/)
* [AWS - Permissions for actions on triggers](https://docs.aws.amazon.com/codecommit/latest/userguide/auth-and-access-control-permissions-reference.html#aa-triggers)

:::

1. Go to your pipeline in Harness and select **Triggers**.
2. Select your custom webhook.
3. Select the link icon to copy the webhook URL.

   ![](./static/trigger-pipelines-using-custom-payload-conditions-33.png)

4. Log in to your repo in your SCM provider and navigate to the repo's webhook settings.
5. Create a new webhook and paste the webhook URL you copied from Harness.
6. Make sure that the content type for outbound requests is **Application/json**.
7. Make sure that **Enable verification** is enabled.
8. Select the events that you would like to trigger this webhook. The following example selected **Just the push event**, which means that this webhook is only triggered if there is a push event.
9. Select **Update webhook**.

![](./static/trigger-pipelines-using-custom-payload-conditions-34.png)

For more information about manual webhook registration, go to the [Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md).

## Step 6: Test the trigger

To test the trigger, make a change in the repo and push the changes to GitHub.

In your Git repo, you can see that the request and response were successful.

![](./static/trigger-pipelines-using-custom-payload-conditions-35.png)

Note that the webhook conditions specified in [Step 3](#step-3-set-trigger-conditions) match the payload data. As a result, the pipeline was triggered.

In Harness, view the **Pipeline execution**. In Harness CI, click **Builds** (1). You can see the source branch (2), target branch (3), and the push request comment and number (4).

![](./static/trigger-pipelines-using-custom-payload-conditions-36.png)

Select the push request number to go to your repo at the push request event.

If you open the trigger in the pipeline, you'll see a status in **Last Activation Details**.

![](./static/trigger-pipelines-using-custom-payload-conditions-37.png)

Activation indicates that the trigger was successful in requesting pipeline execution.

### Troubleshooting

If a build does not start in response to an incoming event, do the following:

* Check the execution history (select **Execution History** in the top right of the Pipeline Studio).
* Verify that the runtime inputs are correct.
* Check the payloads sent from the Git provider and compare the relevant fields with your trigger conditions. For example, in GitHub you can view the full payload of each event sent from a specific webhook.
