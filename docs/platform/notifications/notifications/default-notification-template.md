---
title: Default Notification Template
sidebar_label: Default Notification Template
description: Set default notification templates at any scope to ensure consistent notifications for pipeline events across all channels.
keywords:
  - default notification template
  - default template set
  - notification template
  - pipeline notifications
  - template selection priority
  - notification management
  - notification rule
tags: 
  - notifications
  - templates
  - account-settings
  - organization-settings
  - project-settings
  - harness-notifications
sidebar_position: 3
redirect_from:
    - /docs/platform/notifications/default-notification-template
---

Default notification templates apply automatically when a <a href="/docs/platform/notifications/notifications/centralised-notification" target="_blank">notification rule</a> does not specify a template of its own. Use them to keep notification content consistent and complete across every rule without selecting a template each time you create one.

You configure default templates at the **Account**, **Organization**, or **Project** scope, and separately for each event type and channel type, so you control notification content at the granularity you need.

:::note
Currently, this feature is behind the feature flag `PL_DEFAULT_NOTIFICATION_TEMPLATE_SET_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Watch an interactive walkthrough](#watch-an-interactive-walkthrough) of the end-to-end setup.
- [Navigate to the default template sets page](#step-1-navigate-to-the-default-template-sets-page) at the scope you want to configure.
- [Create a default template set](#step-2-create-a-default-template-set) with a name, description, and tags.
- [Configure the resource and channel type](#step-3-configure-the-resource-and-channel-type) that the template set applies to.
- [Define event and template combinations](#step-4-define-event-and-template-combinations) for each pipeline event you want to cover.
- [Trace the template selection priority](#template-selection-priority) that Harness follows when it resolves a template at runtime.

---

## Before you begin

Before you configure a default notification template, ensure you have the following:

- **Feature flag enablement**: The `PL_DEFAULT_NOTIFICATION_TEMPLATE_SET_SUPPORT` feature flag enabled on your account.
- **Harness account access**: Permissions to view and edit notification settings at the target scope. For more information, see <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>.
- **Target scope access**: Access to the **Account**, **Organization**, or **Project** where the defaults apply.
- **Notification templates**: At least one <a href="/docs/platform/templates/customized-notification-template" target="_blank">notification template</a> available at or above that scope.

---

## Watch an interactive walkthrough

Step through the walkthrough to see the full flow before you configure your own set. 
The example sets up a default email notification template for pipeline events at the **Account** scope.

<div style={{position: 'relative', paddingBottom: 'calc(50.3472% + 41px)', height: '0px', width: '100%'}}>
  <iframe
    src="https://demo.arcade.software/fQTJP2AsYuQIoGCCfxOf?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
    title="Set Up a Default Email Notification Template for Pipeline Events"
    frameBorder="0"
    loading="lazy"
    allowFullScreen
    allow="clipboard-write; autoplay"
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light'}}
  />
</div>

---

## Step 1: Navigate to the default template sets page

Start at the scope where you want the defaults to apply, because a default template set is scoped to the **Account**, **Organization**, or **Project** you create it in.

1. Navigate to **Settings** at your desired scope (**Account**, **Organization**, or **Project**).

2. In the **Notifications and alerts** section, select **Default Template Sets**.


---

## Step 2: Create a default template set

Create a template set to group the event and template combinations that share a single resource type and channel type.

1. Click **+ Default Template Set**.

2. In **Overview**, enter a name for the template set, then add an optional description and tags.

3. Click **Continue**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/default-nt-1.gif')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Step 3: Configure the resource and channel type

The resource type and channel type together determine which notifications the set applies to, so set them before you map events to templates.

1. **Resource Type**: Automatically set to **Pipeline**, currently the only supported resource.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/resource-notification-type.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

2. **Channel Type**: Select one from the dropdown, then click **Continue**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/channel-notification-type.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Step 4: Define event and template combinations

Map each pipeline event to the template you want Harness to use when a rule for that event does not name a template.

1. Select one or more pipeline events from the **Select Pipeline Events** dropdown.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/select-pipeline-event.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

2. Click **Select Template**, then select the template to serve as the default for the selected event type. If the template includes runtime input variables, provide the required values. Repeat this process for additional event and template combinations as needed.

3. Click **Submit**.  
The template set appears on the **Default Template Sets** page with a summary of the configured events and templates.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('../static/default-template-set.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Template selection priority

More than one template can match the same event and channel type combination. Use the priority order below to predict which template a notification uses, or to explain one that arrives with unexpected content.

Harness resolves each event and channel type combination in this order:

1. **Template selected in notification rule**: If you specify a template when you create or edit a notification rule, Harness uses that template.

2. **Default template by scope**: If the rule specifies no template, Harness searches for default templates starting at the current scope and moving up the hierarchy: **Project**, then **Organization**, then **Account**.

3. **Built-in template**: If no custom or default templates are available, Harness uses the built-in static template.

This hierarchy sends notifications with appropriate content even when no specific template is configured.

### Examples of template selection priority

The following examples show how the priority order resolves in different scenarios, from basic to more advanced use cases.

<details>
<summary>Case 1: Default notification template available at the Project scope</summary>

Consider the following setup across different scopes:

- **Project P**: Default template "Template A" configured for Pipeline Success and Email.
- **Organization**: Default template "Template B" configured for Pipeline Success and Email.
- **Account**: Default template "Template C" configured for Pipeline Success and Email.

You create a notification rule at Project P for:

- **Event Type**: Pipeline Success
- **Channel**: Email
- **Template**: None selected in the notification rule

Harness selects the template in the following order:

1. **Rule-level template**: No template is specified in the notification rule, so Harness proceeds to check for default templates.
2. **Project scope**: Harness finds "Template A" configured for Pipeline Success and Email at Project P and uses it. The search stops here.

**Result**: The notification uses "Template A" because Harness found it at the **Project** scope, which has the highest priority after rule-level templates. Templates at higher scopes ("Template B" and "Template C") are not considered, because a match exists at the current scope.

</details>

<details>
<summary>Case 2: Default notification template available only at the Account scope</summary>

Consider the following setup across different scopes:

- **Project P**: No default template configured for Pipeline Success and Email.
- **Organization**: No default template configured for Pipeline Success and Email.
- **Account**: Default template "Template C" configured for Pipeline Success and Email.

You create a notification rule at Project P for:

- **Event Type**: Pipeline Success
- **Channel**: Email
- **Template**: None selected in the notification rule

Harness selects the template in the following order:

1. **Rule-level template**: No template is specified in the notification rule, so Harness proceeds to check for default templates.
2. **Project scope**: No default template exists for Pipeline Success and Email, so the search continues to the next scope level.
3. **Organization scope**: No default template exists for Pipeline Success and Email, so the search continues to the next scope level.
4. **Account scope**: Harness finds the default template "Template C" for Pipeline Success and Email. The search stops here.

**Result**: The notification uses "Template C" because it is the only matching default template available, at the **Account** scope. If no template were available at any scope, Harness would fall back to the built-in static template.

</details>

<details>
<summary>Case 3: Template explicitly selected in the notification rule</summary>

Consider the following setup across different scopes:

- **Project P**: Default template "Template A" configured for Pipeline Success and Email.
- **Organization**: Default template "Template B" configured for Pipeline Success and Email.
- **Account**: Default template "Template C" configured for Pipeline Success and Email.

You create a notification rule at Project P for:

- **Event Type**: Pipeline Success
- **Channel**: Email
- **Template**: "Custom Template X" explicitly selected in the notification rule

Harness selects the template in the following order:

1. **Rule-level template**: "Custom Template X" is specified in the notification rule, so it takes priority over all default templates.

**Result**: The notification uses "Custom Template X" because you selected it explicitly in the notification rule, regardless of any default templates configured at any scope.

</details>

---

## Related articles

- <a href="/docs/platform/templates/customized-notification-template" target="_blank">Custom notification templates for pipeline notifications</a>: Create the templates that a default template set references.
- <a href="/docs/platform/notifications/notifications/centralised-notification" target="_blank">Centralised notification</a>: Configure the notification rules that consume default templates.
- <a href="/docs/platform/notifications/notifications-overview" target="_blank">Notifications</a>: Enable and manage notification channels at the account level.
- <a href="/docs/platform/notifications/notifications/configure-notifications" target="_blank">Configure notifications</a>: Set up pipeline notifications for Slack, Microsoft Teams, email, and webhooks.
