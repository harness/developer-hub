---
title: Centralised notification
description: Configure notifications based on specific rules and conditions in pipelines, delegates, GitOps applications, and other Harness components to keep teams informed of critical events.
sidebar_position: 5
redirect_from:
- /docs/platform/notifications/centralised-notification
---

import PipeEvents from '../static/set_pipeline_events.png';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import React from 'react';

Harness centralised notifications allow you to send notifications based on rules and conditions across pipelines, delegates, GitOps applications, and AI Test Automation. You can configure and manage alerts to stay informed about critical events in your Harness environment.

You can configure centralised notifications for:

- **Pipelines:** Get notified about pipeline events like success, failure, or stage completion.
- **Delegates:** Receive alerts when delegates disconnect, expire, or are about to expire.
- **GitOps Applications:** Get notified about application sync and health events, such as sync success/failure, out-of-sync drift, and health degradation.
- **AI Test Automation:** Get notified when Playwright test runs complete, fail, or are aborted.

## Pipeline Notifications

:::info Prerequisites
Before you begin, ensure you have the following feature flags enabled. Contact [Harness Support](mailto:support@harness.io) to enable them.

- **`PIPE_CENTRALISED_NOTIFICATION`**: Required for centralized pipeline notifications.
- **`PIPE_PIPELINE_RESUME_NOTIFICATION`**: Required for the Pipeline Resumed event.
:::

Centralised Notifications for pipelines allow you to configure notifications for multiple pipelines at once instead of setting them up individually. You can create rules at different scopes—Account, Organisation, or Project—with each scope providing appropriate targeting options for the pipelines within its hierarchy.

These notifications are beneficial for tracking pipeline start, success, and failure events, as well as stage-level events (start, success, failure). This helps you monitor pipeline health and quickly identify issues across your deployment processes.

You can also configure the **Waiting for User Action** event in centralized notification rules. This event fires whenever a pipeline pauses for user input, such as an Approval step, Manual Intervention, or runtime execution input. When you add this event as a condition in a centralized notification rule, alerts are sent across all pipelines that match the rule's scope—without requiring per-pipeline configuration.

### Configuration Steps

<Tabs>
<TabItem value="Interactive">
        <iframe 
        src="https://app.tango.us/app/embed/c90eaf8d-dfb7-48f1-9c61-761d985cd673" 
        style={{ minHeight: "640px" }} 
        sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
        title="Centralised Notification for Pipeline" 
        width="100%" 
        height="100%" 
        referrerPolicy="strict-origin-when-cross-origin" 
        frameBorder="0" 
        allowFullScreen 
        />
</TabItem>

<TabItem value="Manual">
1. **Access Notification Management**
   - Navigate to **Account Settings** → **General** → **Notifications Management**
   - Click **+ New Notification** to create a new rule

2. **Set up Pipeline Notification Rule**
   - Provide a **Notification Name** and click **Continue**
   - Select **Pipeline** as the **Resource Type**
   - Choose your scope: **All Organizations** or **Specified Organizations**
   - Click **Continue**

3. **Set Conditions**
   - Click **+ Add Condition** to specify when notifications trigger
   - Enter a **Condition Name**
   - Select relevant **Pipeline Events** (start, success, failure, etc.)
   - (Optional) Add a custom **Notification Template**
   - Click **Continue**

4. **Configure Channels**
   - Select notification channels.
   - Choose existing channels or [create new ones](/docs/platform/notifications/notifications/configure-notifications#configure-new-channels-to-sent-notification)
   - Click **Submit** to save your configuration
</TabItem>
</Tabs>

## AI Test Automation Notifications

Centralised Notifications for AI Test Automation allow you to receive alerts when Playwright test runs complete, fail, or are aborted. Create a notification rule following the same steps as [Pipeline Notifications](#pipeline-notifications), but select **AI Test Automation** as the **Resource Type** in Step 2.

**Available events:**

- **Playwright Run Completed**
- **Playwright Run Failed**
- **Playwright Run Aborted**

For the AI Test Automation side of setup, go to [Set up notifications for Playwright runs](/docs/ai-test-automation/suites/playwright-builds#set-up-notifications-for-playwright-runs).

## Delegate Notifications

Central Delegate notifications provide proactive monitoring of Harness delegates, ensuring that you are immediately aware of connectivity issues and expiration. Rules configured at higher scopes automatically apply to delegates at lower scopes, based on your rule configuration.

These notifications help track delegate disconnection, expiration, and expiring soon events, allowing you to monitor delegate health and quickly identify connectivity issues that could impact your deployments.

### Configuration Steps

<Tabs>
<TabItem value="Interactive">
        <iframe 
        src="https://app.tango.us/app/embed/0e56b7e9-c812-48a0-b35c-0c3b5e9f1549" 
        style={{ minHeight: "640px" }} 
        sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
        title="Centralised Notification for Delegates" 
        width="100%" 
        height="100%" 
        referrerPolicy="strict-origin-when-cross-origin" 
        frameBorder="0" 
        allowFullScreen 
        />
</TabItem>

<TabItem value="Manual">
1. **Access Notification Management**
   - Navigate to **Account Settings** → **General** → **Notifications Management**
   - Click **+ New Notification** to create a new rule

2. **Set up Delegate Notification Rule**
   - Provide a **Notification Name** and click **Continue**
   - Select **Delegate** as the **Resource Type**
   - Choose your scope: **All Delegates** or **Specific Tags**
   - If using tags, specify up to five delegate tags
   - Click **Continue**

3. **Define Conditions**
   - Click **+ Add Condition** to specify when notifications trigger
   - Enter a **Condition Name**
   - Select **Delegate Events**:
     - **Delegate Disconnected**: Notifies you when a delegate unexpectedly loses connection to the Harness platform. This helps you identify connectivity issues that may impact your deployments. Note that this does not trigger for normal delegate shutdowns.
     - **Delegate Expired**: Daily notification when your delegate version has reached the end of its support lifecycle according to the [delegate expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#delegate-expiration-support-policy). Upgrade your delegate to continue operations.
     - **Delegate Expires in [X] Weeks**: Advance warning (1-4 weeks) before your delegate version expires, giving you time to plan and schedule upgrades. Learn more about [delegate upgrades](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#delegate-expiration-support-policy).
   - Click **Continue**

4. **Configure Channels**
   - Select notification channels.
   - Choose existing channels or [create new ones](/docs/platform/notifications/notifications/configure-notifications#configure-new-channels-to-sent-notification)
   - Click **Submit** to save your configuration.
</TabItem>
</Tabs>

:::note
The **Delegate Disconnected** notification is designed to alert you about unexpected connectivity issues. Planned delegate shutdowns during maintenance or scaling operations will not trigger this notification.
:::

## Artifact Registry Notifications

Centralised Notifications for Artifact Registry let you alert teams when key Artifact Registry events occur, without configuring rules per registry. Rules are scoped at the organization level and apply to every project under the organizations you select. Project-level scoping is not available for Artifact Registry rules today.

The following Artifact Registry events are available as conditions today:

- **Dependency Firewall Exemption Requested**: Fires when a developer submits a new exemption request from the Policy Violations tab.
- **Dependency Firewall Exemption Status Changed**: Fires when an existing exemption transitions to `APPROVED` or `REJECTED`.
- **Lifecycle Policy Execution Completed**: Fires when a scheduled cleanup rule finishes executing.
- **Lifecycle Policy Dry Run Execution Completed**: Fires when a dry run (manual or scheduled) finishes.

For background on the exemption workflow, see <a href="/docs/artifact-registry/dependency-firewall/exemptions" target="_blank">Dependency Exemptions</a>. For background on lifecycle rules, see <a href="/docs/artifact-registry/lifecycle-rules/overview" target="_blank">Lifecycle Rules</a>.

### Configuration Steps

1. **Access Notification Management**
   - Navigate to **Account Settings** > **General** > **Notifications Management**
   - Click **+ New Notification** to create a new rule

2. **Set up Artifact Registry Notification Rule**
   - Provide a **Notification Name** and click **Continue**
   - Select **Artifact Registry** as the **Resource Type**
   - Choose your scope: **All Organizations** or **Specified Organizations**
   - Click **Continue**

   <DocImage
     path={require('./static/artifact-registry/ar-notification-resources.png')}
     alt="Artifact Registry notification rule wizard with Resource Type set to Artifact Registry and a scope selection"
     title="Artifact Registry notification rule: resource and scope"
     width="100%"
   />

3. **Set Conditions**
   - Click **+ Add Condition** to specify when notifications trigger
   - Enter a **Condition Name**
   - From **Select Artifact Registry Events**, choose the relevant events:
     - **Dependency Firewall Exemption Requested**
     - **Dependency Firewall Exemption Status Changed**
     - **Lifecycle Policy Execution Completed**
     - **Lifecycle Policy Dry Run Execution Completed**
   - Click **Apply**, then **Continue**

   <DocImage
     path={require('./static/artifact-registry/ar-notification-conditions.png')}
     alt="Conditions step of the Artifact Registry notification wizard with the Dependency Firewall events selected"
     title="Artifact Registry notification rule: conditions"
     width="100%"
   />

4. **Configure Channels**
   - Choose existing channels or [create new ones](/docs/platform/notifications/notifications/configure-notifications#configure-new-channels-to-sent-notification)
   - Toggle **Enable on Save** to activate the rule immediately
   - Click **Submit** to save your configuration

## GitOps application notifications

Centralised notifications for GitOps allow you to receive alerts for application sync and health events. This gives you visibility into your GitOps environment without configuring notifications on individual applications or pipelines. All five notification channels (Slack, Microsoft Teams, email, webhooks, and PagerDuty) are supported.

### Supported events

The following events are available for GitOps application notification rules:

| Event | Description |
|-------|-------------|
| **Application Sync Succeeded** | Fires when a sync operation completes successfully. |
| **Application Sync Failed** | Fires when a sync operation fails. |
| **Application Out Of Sync** | Fires when an application's live cluster state drifts from the desired Git state. |
| **Application Health Degraded** | Fires when an application's health status changes to degraded. |

:::info Custom notification templates
Custom notification templates are not supported for GitOps application notifications. Notifications use the default template.
:::

### Configure GitOps application notifications

1. **Access Notification Management**
   - Go to **Account Settings**, then **General**, then **Notifications Management**.
   - Select **+ New Notification** to create a new rule.

2. **Set up GitOps Notification Rule**
   - Provide a **Notification Name** and select **Continue**.
   - Select **GitOps Application** as the **Resource Type**.
   - Choose your scope: **All Organizations** or **Specified Organizations**.
   - Select **Continue**.

3. **Set conditions**
   - Select **+ Add Condition** to specify when notifications trigger.
   - Enter a **Condition Name**.
   - Select the relevant **GitOps Events** (Sync Succeeded, Sync Failed, Out Of Sync, Health Degraded).
   - Select **Continue**.

4. **Configure channels**
   - Select notification channels (Slack, Microsoft Teams, email, webhooks, or PagerDuty).
   - Choose existing channels or [create new ones](/docs/platform/notifications/notifications/configure-notifications#configure-new-channels-to-sent-notification).
   - Select **Submit** to save your configuration.

---

## Service account (SA) token notifications

Service account token notifications alert you when tokens are created, updated, rotated, deleted, or nearing expiration. Since expired tokens can lead to pipeline and automation failures, it is important to stay ahead of their lifecycle.

SA token expiry notifications provide advance warnings, allowing you to rotate or renew tokens before they disrupt your workflows.

:::note Feature availability
This feature requires the `PL_SERVICE_ACCOUNT_NOTIFICATION` feature flag. Contact [Harness support](mailto:support@harness.io) to enable it.
:::

### Before you begin

Make sure you have access to a Harness account with the following permissions:

- View permission for Service accounts
- View permission for Notification channels
- View, Create/Edit permission for Notification rules

### Configure service account token notifications

:::note **Important**
* When a service account is deleted, its notification rules are updated asynchronously. If the deleted service account was the only one in a rule, that rule is automatically removed.
* All timestamps shown in notification messages are in UTC. 
:::

You can configure notifications for an existing service account or create a new one. To create a new service account, see the [Create a service account guide](https://developer.harness.io/docs/platform/role-based-access-control/add-and-manage-service-account/#create-a-service-account).

<Tabs>
<TabItem value="Interactive">
   <iframe
   src="https://app.tango.us/app/embed/4061d644-39f7-4ab2-a4fe-54f84b978eb2"
   title="Configure Harness Service Account Notifications"
   style={{ width: "100%", minHeight: "640px", border: "0" }}
   sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
   referrerPolicy="strict-origin-when-cross-origin"
   allowFullScreen
   />
</TabItem>

<TabItem value="Manual">

1. Go to **Account Settings → Notifications** (or **Organization Settings / Project Settings**, depending on the desired scope).

2. Select **+ New Notification Rule**.

3. Enter a name for the rule (for example, *SA Token Expiration Alerts*).

4. In **Resources**, choose **Service Accounts**.

5. Choose which service accounts to monitor:

   * **All service accounts** to monitor every account in the selected scope.
   * **Specific service accounts** to select individual service accounts by name. You can only select service accounts at the present scope. 

6. Select **Add Condition** to choose the events that will trigger notifications.

7. Give the condition a clear name (for example, *Critical Expiration Warnings*). You can create multiple conditions for one rule.

8. Select the events you want notifications for:

   * **Token Created:** A new service account token is generated.
   * **Token Edited:** An existing token or its settings are updated.
   * **Token Deleted:** A token is permanently removed.
   * **Token Expired:** A token has reached its expiration date and can no longer be used.
   * **Token Rotated:** A token is replaced with a new one.
   * **Token Expires in 1–4 weeks:** Choose a timeframe between 1 and 4 weeks before expiration. Notifications are sent daily during the selected week. For example, if you select _4 weeks_, you will receive a daily notification during the fourth week before the token expires.
   * **Token Expires in 1 day:** A final reminder sent one day before expiration.

9. Select an existing channel or [create a new channel](/docs/platform/notifications/notifications/configure-notifications#configure-new-channels-to-sent-notification) to receive alerts.

10. Turn on **Enable on Save** to activate the rule immediately after you click **Submit**.
</TabItem>
</Tabs>











