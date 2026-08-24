---
title: Centralised notification
sidebar_label: Centralised Notification
description: Configure notifications based on specific rules and conditions in pipelines, delegates, GitOps applications, and other Harness components to keep teams informed of critical events.
keywords:
  - centralised notification
  - centralized notification
  - notification rule
  - pipeline notifications
  - delegate notifications
  - GitOps application notifications
  - artifact registry notifications
  - service account token notifications
  - notification channels
  - notification conditions
tags:
  - notifications
  - account-settings
  - organization-settings
  - project-settings
  - harness-notifications
sidebar_position: 5
redirect_from:
- /docs/platform/notifications/centralised-notification
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Centralised notifications send alerts based on rules and conditions that you define once and apply to many resources at the same time. Instead of configuring notifications on each pipeline, delegate, or application, you create a rule at the **Account**, **Organization**, or **Project** scope and Harness applies it to every resource that matches the rule.

Each rule combines three things: the resources it watches, the conditions that trigger it, and the channels it delivers to. You can create rules for pipelines, delegates, AI Test Automation, Artifact Registry, GitOps applications, and service account tokens.

:::note
Currently, this feature is behind the feature flag `PL_CENTRAL_NOTIFICATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Connect channels to user groups](#notification-channels-and-user-groups) correctly so that notifications actually reach their recipients.
- [Create pipeline notification rules](#pipeline-notifications) for pipeline and stage events across many pipelines at once.
- [Create AI Test Automation notification rules](#ai-test-automation-notifications) for Playwright run outcomes.
- [Create delegate notification rules](#delegate-notifications) for disconnection, expiration, and blocked registration events.
- [Create Artifact Registry notification rules](#artifact-registry-notifications) for dependency firewall and lifecycle policy events.
- [Create GitOps application notification rules](#gitops-application-notifications) for sync and health events.
- [Create service account token notification rules](#service-account-token-notifications) to stay ahead of token expiration.

---

## Before you begin

Before you create a notification rule, ensure you have the following:

- **Feature flag enablement**: The `PL_CENTRAL_NOTIFICATIONS` feature flag enabled on your account, plus any resource-specific flag listed in the section you follow.
- **Notification rule permissions**: View and Create/Edit permissions on notification rules at the scope where you create the rule. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to configure roles.
- **Resource view permissions**: View permission on the resource type the rule watches, such as pipelines, delegates, or service accounts.
- **A notification channel**: At least one channel at or above the rule scope. Go to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-new-channels" target="_blank">Configure new channels</a> to create one.

---

## Notification channels and user groups

A notification rule delivers through a channel, and a channel can target either an email address that you enter directly or a Harness user group. Understanding this difference matters, because the two options fail in different ways.

When a channel targets a user group, Harness delivers the notification through the channels configured in that group's **Notification Preferences**.

:::warning
A channel that is configured for a user group does not send a notification until that group has a notification preference configured for the channel type you selected. Harness does not report an error in this case, so the rule appears to be configured correctly but no notification arrives.

Add the preference to the user group before you rely on the rule. Go to <a href="/docs/platform/role-based-access-control/add-user-groups#edit-notification-preferences" target="_blank">Edit notification preferences</a> to add a channel to a user group.
:::

Channels that specify an email address directly do not depend on user group notification preferences, so they deliver as soon as you enable the rule. If a rule delivers to a directly configured email address but not to a user group, check the notification preferences of that group first.

This requirement applies to every resource type in this topic, including pipelines, delegates, Artifact Registry, GitOps applications, and service account tokens.

---

## Pipeline notifications

Pipeline notification rules track pipeline health across many pipelines at once, so you do not configure a notification strategy on each pipeline individually. Create the rule at the **Account**, **Organization**, or **Project** scope, and each scope offers the targeting options that apply to the pipelines below it.

Use these rules for pipeline start, success, and failure events, as well as stage-level start, success, and failure events. This helps you monitor pipeline health and quickly identify issues across your deployment processes.

You can also configure the **Waiting for User Action** event, which fires whenever a pipeline pauses for user input, such as an Approval step, Manual Intervention, or runtime execution input. When you add this event as a condition, Harness sends alerts for every pipeline that matches the rule scope, with no per-pipeline configuration.

:::note
Pipeline notification rules require two additional feature flags. Contact [Harness Support](mailto:support@harness.io) to enable them.

- `PIPE_CENTRALISED_NOTIFICATION`: Required for centralised pipeline notifications.
- `PIPE_PIPELINE_RESUME_NOTIFICATION`: Required for the **Pipeline Resumed** event.
:::

Follow the interactive walkthrough to see the flow end to end, or the manual steps for the same configuration.

<Tabs>
<TabItem value="interactive" label="Interactive" default>

<!--ARCADE EMBED START-->
<div style={{ position: 'relative', paddingBottom: 'calc(49.7658% + 41px)', height: '0', width: '100%' }}><iframe src="https://demo.arcade.software/aYOIEj84Gc8VyIU55OvG?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true" title="Set Up a Pipeline Success Notification" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write; autoplay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', colorScheme: 'light' }}></iframe></div>
<!--ARCADE EMBED END-->

</TabItem>

<TabItem value="manual" label="Manual">

1. **Open Notification Rules**
   - Navigate to **Account Settings**, then under **Notifications and alerts**, select **Notification Rules**.
   - Click **+ New Notification** to open the **New Notification Setup** wizard.

2. **Name the rule (Overview)**
   - Enter a **Notification Name**, then click **Continue**.

3. **Select pipelines (Resources)**
   - From **Select Resource Type**, select **Pipeline**.
   - Under **Select Organizations**, select **All Organizations** or **Specified Organizations**.
   - Click **Continue**.

4. **Define conditions (Conditions)**
   - Click **+ Add Condition**.
   - Enter a **Condition Name**. Harness derives the condition **Id** from the name, and you can edit the **Id** before you save.
   - Open the **Select Pipeline Events** dropdown and select the events you want to be alerted on: **Pipeline Start**, **Pipeline Success**, **Pipeline Failed**, **Stage Start**, **Stage Success**, **Stage Failed**, **Trigger Failed**, **Waiting for User Action**, or **Pipeline Resumed**.
   - Click **Apply**, then click **Continue**.

5. **Select a template (Template (optional))**
   - Click **Select Template** to define the notification content with a <a href="/docs/platform/templates/customized-notification-template" target="_blank">custom notification template</a>, or click **Continue** to use the default template.

6. **Configure channels (Channels)**
   - Click **Select Channels**, then select an existing channel, or click **New Channel** to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-new-channels" target="_blank">create one</a>.
   - Click **Apply Selected** to confirm the delivery channels.
   - If a channel targets a user group, confirm that the group has a matching notification preference. Go to [Notification channels and user groups](#notification-channels-and-user-groups) to review this requirement.
   - Keep **Enable on Save** turned on to activate the rule immediately.
   - Click **Submit** to save the rule.

</TabItem>
</Tabs>

---

## AI Test Automation notifications

AI Test Automation notification rules alert you when Playwright test runs finish, so test failures reach your team without anyone watching the run list. Create the rule with the same steps as [Pipeline notifications](#pipeline-notifications), but select **AI Test Automation** as the resource type in the **Resources** step.

The following events are available:

- **Playwright Run Completed**
- **Playwright Run Failed**
- **Playwright Run Aborted**

Go to <a href="/docs/ai-test-automation/suites/playwright-builds#set-up-notifications-for-playwright-runs" target="_blank">Set up notifications for Playwright runs</a> to complete the AI Test Automation side of the setup.

---

## Delegate notifications

Delegate notification rules give you proactive monitoring of Harness delegates, so you learn about connectivity and version problems before a deployment fails because of them. Rules configured at higher scopes apply automatically to delegates at lower scopes, based on your rule configuration.

Use these rules to track delegate disconnection, expiration, expiring soon, and blocked registration events.

Follow the interactive walkthrough to see the flow end to end, or the manual steps for the same configuration.

<Tabs>
<TabItem value="interactive" label="Interactive" default>

<!--ARCADE EMBED START-->
<div style={{ position: 'relative', paddingBottom: 'calc(49.7658% + 41px)', height: '0', width: '100%' }}><iframe src="https://demo.arcade.software/xUBFUImsw0jvkZ2TtRT1?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true" title="Set Up a Delegate Disconnection Notification Rule" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write; autoplay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', colorScheme: 'light' }}></iframe></div>
<!--ARCADE EMBED END-->

</TabItem>

<TabItem value="manual" label="Manual">

1. **Open Notification Rules**
   - Navigate to **Account Settings**, then under **Notifications and alerts**, select **Notification Rules**.
   - Click **+ New Notification** to open the **New Notification Setup** wizard.

2. **Name the rule (Overview)**
   - Enter a **Notification Name**, then click **Continue**.

3. **Select delegates (Resources)**
   - From **Select Resource Type**, select **Delegate**.
   - Select **Select All Delegates** to monitor every delegate in the scope, or **Only use Delegates with all of the following tags** to target delegates by tag.
   - If you target delegates by tag, enter up to five tags in **Select Delegates**.
   - Click **Continue**.

4. **Define conditions (Conditions)**
   - Click **+ Add Condition**.
   - Enter a **Condition Name**. Harness derives the condition **Id** from the name, and you can edit the **Id** before you save.
   - Open the **Add Events** dropdown and select the delegate events you want to be alerted on:
     - **Delegate Disconnected**: Notifies you when a delegate unexpectedly loses connection to the Harness Platform. This helps you identify connectivity issues that may impact your deployments. This event does not trigger for normal delegate shutdowns.
     - **Delegate Expired**: Sends a daily notification when your delegate version reaches the end of its support lifecycle. Upgrade your delegate to continue operations. Go to <a href="/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#delegate-expiration-support-policy" target="_blank">Delegate expiration support policy</a> to review the policy.
     - **Delegate Expires in [X] Weeks**: Sends an advance warning 1 to 4 weeks before your delegate version expires, so you have time to plan and schedule upgrades.
     - **Delegate Registration Blocked**: Notifies you when a delegate is prevented from registering with your account.
   - Click **Apply**, then click **Continue**.

5. **Configure channels (Channels)**
   - Click **Select Channels**, then select an existing channel, or click **New Channel** to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-new-channels" target="_blank">create one</a>.
   - Click **Apply Selected** to confirm the delivery channel.
   - If a channel targets a user group, confirm that the group has a matching notification preference. Go to [Notification channels and user groups](#notification-channels-and-user-groups) to review this requirement.
   - Keep **Enable on Save** turned on to activate the rule immediately.
   - Click **Submit** to save the rule.

</TabItem>
</Tabs>

:::note
The **Delegate Disconnected** notification alerts you about unexpected connectivity issues only. Planned delegate shutdowns during maintenance or scaling operations do not trigger this notification.
:::

---

## Artifact Registry notifications

Artifact Registry notification rules alert teams when dependency firewall and lifecycle policy events occur, without a rule per registry. These rules are scoped at the organization level and apply to every project under the organizations you select. Project-level scoping is not available for Artifact Registry rules.

The following Artifact Registry events are available as conditions:

- **Dependency Firewall Exemption Requested**: Fires when a developer submits a new exemption request from the **Policy Violations** tab.
- **Dependency Firewall Exemption Status Changed**: Fires when an existing exemption transitions to `APPROVED` or `REJECTED`.
- **Lifecycle Policy Execution Completed**: Fires when a scheduled cleanup rule finishes executing.
- **Lifecycle Policy Dry Run Execution Completed**: Fires when a dry run, either manual or scheduled, finishes.

Go to <a href="/docs/artifact-registry/dependency-firewall/exemptions" target="_blank">Dependency exemptions</a> to review the exemption workflow, and <a href="/docs/artifact-registry/lifecycle-rules/overview" target="_blank">Lifecycle rules</a> to review lifecycle policies.

1. **Open Notification Rules**
   - Navigate to **Account Settings**, then under **Notifications and alerts**, select **Notification Rules**.
   - Click **+ New Notification** to open the **New Notification Setup** wizard.

2. **Name the rule (Overview)**
   - Enter a **Notification Name**, then click **Continue**.

3. **Select organizations (Resources)**
   - From **Select Resource Type**, select **Artifact Registry**.
   - Select your scope: **All Organizations** or **Specified Organizations**.
   - Click **Continue**.

   <DocImage
     path={require('./static/artifact-registry/ar-notification-resources.png')}
     alt="Artifact Registry notification rule wizard with Resource Type set to Artifact Registry and a scope selection"
     title="Artifact Registry notification rule: resource and scope"
     width="100%"
   />

4. **Define conditions (Conditions)**
   - Click **+ Add Condition**.
   - Enter a **Condition Name**.
   - From **Select Artifact Registry Events**, select the relevant events: **Dependency Firewall Exemption Requested**, **Dependency Firewall Exemption Status Changed**, **Lifecycle Policy Execution Completed**, or **Lifecycle Policy Dry Run Execution Completed**.
   - Click **Apply**, then click **Continue**.

   <DocImage
     path={require('./static/artifact-registry/ar-notification-conditions.png')}
     alt="Conditions step of the Artifact Registry notification wizard with the Dependency Firewall events selected"
     title="Artifact Registry notification rule: conditions"
     width="100%"
   />

5. **Configure channels (Channels)**
   - Select an existing channel, or click **New Channel** to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-new-channels" target="_blank">create one</a>.
   - If a channel targets a user group, confirm that the group has a matching notification preference. Go to [Notification channels and user groups](#notification-channels-and-user-groups) to review this requirement.
   - Keep **Enable on Save** turned on to activate the rule immediately.
   - Click **Submit** to save the rule.

---

## GitOps application notifications

GitOps application notification rules give you visibility into sync and health events across your GitOps environment, without notifications on individual applications or pipelines. All five notification channels are supported: Slack, Microsoft Teams, email, webhooks, and PagerDuty.

The following events are available for GitOps application notification rules:

| Event | Description |
|-------|-------------|
| **Application Sync Succeeded** | Fires when a sync operation completes successfully. |
| **Application Sync Failed** | Fires when a sync operation fails. |
| **Application Out Of Sync** | Fires when the live cluster state of an application drifts from the desired Git state. |
| **Application Health Degraded** | Fires when the health status of an application changes to degraded. |

:::note
Custom notification templates are not supported for GitOps application notifications. These notifications always use the default template.
:::

1. **Open Notification Rules**
   - Navigate to **Account Settings**, then under **Notifications and alerts**, select **Notification Rules**.
   - Click **+ New Notification** to open the **New Notification Setup** wizard.

2. **Name the rule (Overview)**
   - Enter a **Notification Name**, then click **Continue**.

3. **Select organizations (Resources)**
   - From **Select Resource Type**, select **GitOps Application**.
   - Select your scope: **All Organizations** or **Specified Organizations**.
   - Click **Continue**.

4. **Define conditions (Conditions)**
   - Click **+ Add Condition**.
   - Enter a **Condition Name**.
   - Select the relevant GitOps events: **Application Sync Succeeded**, **Application Sync Failed**, **Application Out Of Sync**, or **Application Health Degraded**.
   - Click **Continue**.

5. **Configure channels (Channels)**
   - Select an existing channel, or click **New Channel** to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-new-channels" target="_blank">create one</a>.
   - If a channel targets a user group, confirm that the group has a matching notification preference. Go to [Notification channels and user groups](#notification-channels-and-user-groups) to review this requirement.
   - Click **Submit** to save the rule.

---

## Service account token notifications

Service account token notification rules alert you when tokens are created, updated, rotated, deleted, or nearing expiration. Expired tokens cause pipeline and automation failures, so advance warning gives you time to rotate or renew a token before it disrupts your workflows.

:::note
Currently, this feature is behind the feature flag `PL_SERVICE_ACCOUNT_NOTIFICATION`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

You can configure notifications for an existing service account or create a new one. Go to <a href="/docs/platform/role-based-access-control/add-and-manage-service-account#create-a-service-account" target="_blank">Create a service account</a> to create one.

Keep the following behavior in mind before you create a rule:

- When a service account is deleted, Harness updates its notification rules asynchronously. If the deleted service account was the only one in a rule, Harness removes that rule automatically.
- All timestamps in notification messages are in UTC.

Follow the interactive walkthrough to see the flow end to end, or the manual steps for the same configuration.

<Tabs>
<TabItem value="interactive" label="Interactive" default>

<!--ARCADE EMBED START-->
<div style={{ position: 'relative', paddingBottom: 'calc(49.7658% + 41px)', height: '0', width: '100%' }}><iframe src="https://demo.arcade.software/u0vZFpgYv1R5hC7JEjEz?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true" title="Set Up Token Expiration Notifications for Service Accounts" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write; autoplay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', colorScheme: 'light' }}></iframe></div>
<!--ARCADE EMBED END-->

</TabItem>

<TabItem value="manual" label="Manual">

1. **Open Notification Rules**
   - Navigate to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the scope you want, then under **Notifications and alerts**, select **Notification Rules**.
   - Click **+ New Notification** to open the **New Notification Setup** wizard.

2. **Name the rule (Overview)**
   - Enter a **Notification Name**, for example `SA Token Expiration Alerts`, then click **Continue**.

3. **Select service accounts (Resources)**
   - From **Select Resource Type**, select **Service Account**.
   - Select **All Service Accounts** to monitor every account in the scope, or **Specified Service Accounts** to target accounts by name. You can select service accounts only at the current scope.
   - For specified accounts, click **Select Service Account(s)**, select the accounts, then click **Apply Selected**.
   - Click **Continue**.

4. **Define conditions (Conditions)**
   - Click **+ Add Condition**. One rule can have multiple conditions.
   - Enter a **Condition Name**, for example `Critical Expiration Warnings`.
   - Open the **Add Events** dropdown and select the events you want notifications for:
     - **Token Created**: A new service account token is generated.
     - **Token Edited**: An existing token or its settings are updated.
     - **Token Deleted**: A token is permanently removed.
     - **Token Expired**: A token reaches its expiration date and can no longer be used.
     - **Token Rotated**: A token is replaced with a new one.
     - **Token Expires in 1 to 4 weeks**: Set the number of weeks before expiration. Harness sends notifications daily during the selected week. For example, if you select 4 weeks, you receive a daily notification during the fourth week before the token expires.
     - **Token Expires in 1 day**: A final reminder sent one day before expiration.
   - Click **Apply**, then click **Continue**.

5. **Configure channels (Channels)**
   - Click **Select Channels**, then select an existing channel, or click **New Channel** to <a href="/docs/platform/notifications/notifications/configure-notifications#configure-new-channels" target="_blank">create one</a>.
   - Click **Apply Selected** to confirm the delivery channels.
   - If a channel targets a user group, confirm that the group has a matching notification preference. Go to [Notification channels and user groups](#notification-channels-and-user-groups) to review this requirement.
   - Keep **Enable on Save** turned on to activate the rule immediately.
   - Click **Submit** to save the rule.

</TabItem>
</Tabs>

---

## Related articles

- <a href="/docs/platform/notifications/notifications/configure-notifications" target="_blank">Configure notifications</a>: Create the notification channels that a rule delivers to.
- <a href="/docs/platform/notifications/notifications/default-notification-template" target="_blank">Default notification template</a>: Apply a template automatically when a rule does not specify one.
- <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates</a>: Customize the content of a notification based on the event that triggers it.
- <a href="/docs/platform/role-based-access-control/add-user-groups#edit-notification-preferences" target="_blank">Edit notification preferences</a>: Configure the channel preferences that a user group needs before it receives notifications.
- <a href="/docs/platform/notifications/notifications-overview" target="_blank">Notifications</a>: Review the supported channels and account-level notification controls.
