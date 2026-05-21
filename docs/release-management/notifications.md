---
title: Notifications
slug: /release-orchestration/notifications
description: Configure notifications for release events in Release Orchestration
sidebar_position: 1
---

import DocImage from '@site/src/components/DocImage';

Release Orchestration allows you to configure notifications for key release lifecycle events. You can set up conditional notifications that trigger based on release events like start, completion, or failures, and route them to Slack channels.

## Notification Setup Workflow

Setting up notifications involves a four-step process where you define the notification name, select resources to monitor, configure event conditions, and choose notification channels.

### Step 1: Overview

Start by creating a new notification setup from your Release Orchestration account settings or project settings.

1. Navigate to **Account Settings** or **Project Settings**
2. Select **Notifications**
3. Click **New Notification Setup**
4. Provide a **Notification Name** (e.g., "ReleaseNotification")
5. Click **Continue**

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-1.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

The notification name helps you identify and manage your notification rules. Choose a descriptive name that reflects what events you are monitoring.

### Step 2: Resources

Select which resources this notification should monitor.

1. Choose **Resource Type**: Select **Release Orchestration** from the dropdown

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-2.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

2. Select **Release Groups**:
   - **All Release Groups**: Monitor all releases in your account/project
   - **Select Release Groups**: Choose specific release groups to monitor

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-3.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

Click **Continue** to proceed to conditions setup.

### Step 3: Conditions

Define which release events should trigger notifications. You can create multiple conditions that monitor different events.

1. Click **+ Add Condition** to create a new condition
2. Provide a **Condition Name** (e.g., "Release complete" or "Release status")

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-4.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

3. Select **Release Management Events** from the dropdown

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-5.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

4. Choose which events to monitor:
   - **Release Start**: Triggered when a release execution starts
   - **Release End**: Triggered when a release completes successfully
   - **Release Burned**: Triggered when a release fails or is terminated
   - **Release Input Waiting**: Triggered when a release pauses waiting for manual input
   - **Phase Start**: Triggered when a phase execution begins
   - **Phase End**: Triggered when a phase completes
   - **Activity On Hold**: Triggered when an activity is placed on hold
   - **Task Output Waiting**: Triggered when a task is waiting for output

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-6.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

You can select multiple events in a single condition. The notification will trigger when any of the selected events occur.

Click **Apply** to save the condition, then **Continue** to configure notification channels.

### Step 4: Channels

Select where notifications should be sent when your conditions are met.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ro-notify-7.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

1. Choose from existing Slack notification channels configured in your account
2. Currently, **Slack** is the supported notification channel for Release Orchestration events

3. Toggle **Enable on Save** to activate the notification immediately
4. Click **Submit** to create the notification setup

:::info
Release Orchestration currently supports Slack notifications. Ensure you have configured at least one Slack notification channel in your account settings before setting up release notifications.
:::

## Release Events

Release Orchestration supports notifications for the following event types:

### Release-Level Events

**Release Start**  
Triggered when a release execution begins. Use this to notify stakeholders that a deployment has started.

**Release End**  
Triggered when a release completes successfully. This indicates all phases and activities finished without errors.

**Release Burned**  
Triggered when a release fails or is terminated. This includes execution failures, manual cancellations, and timeout scenarios.

**Release Input Waiting**  
Triggered when a release pauses waiting for manual input, such as approval steps or manual activity execution.

### Phase-Level Events

**Phase Start**  
Triggered when any phase within a release begins execution. This helps track progress through different deployment stages.

**Phase End**  
Triggered when a phase completes, either successfully or with errors. This marks the completion of a major deployment stage.

### Activity-Level Events

**Activity On Hold**  
Triggered when an activity is placed on hold, typically due to manual intervention requirements or upstream dependencies.

**Task Output Waiting**  
Triggered when a task completes but downstream activities are waiting for its output before proceeding.

## Notification Channels

Before setting up release notifications, ensure you have configured Slack notification channels in your account settings.

**Slack** is currently the supported notification channel for Release Orchestration. You can post notifications to Slack channels or direct messages. Each Slack channel can be reused across multiple notification rules, making it easy to send different event types to the same destination.

To configure Slack channels:
1. Navigate to **Account Settings** > **Notifications**
2. Set up Slack integration with your workspace
3. Configure channels or users to receive notifications
4. Use these channels when setting up release notification rules

## Use Cases

### Production Release Monitoring

Configure notifications to track production deployments:
- Monitor **Release Start** to know when production deployment begins
- Monitor **Release End** to confirm successful completion
- Monitor **Release Burned** for immediate alerts on deployment failures
- Send to Slack channel for team visibility and real-time alerts

### Approval and Input Tracking

Set up notifications for manual intervention requirements:
- Monitor **Release Input Waiting** for approval steps
- Monitor **Activity On Hold** for blocked activities
- Send to Slack channels where stakeholders can see when input is needed

### Multi-Phase Deployment Tracking

Track progress through complex multi-stage deployments:
- Monitor **Phase Start** and **Phase End** for each deployment stage
- Send to Slack for real-time progress updates
- Use different channels for different phases (e.g., test vs. production phases)

## Best Practices

**Group Related Events**  
Create separate notification rules for related events rather than combining all events in one rule. For example, create one rule for release lifecycle events (start, end, burned) and another for input/approval events.

**Use Descriptive Names**  
Give your notification setups and conditions clear, descriptive names that explain what they monitor. This makes it easier to manage multiple notification rules.

**Target Appropriate Channels**  
Route different event types to appropriate Slack channels based on urgency:
- Critical failures → Dedicated on-call or incident Slack channel
- Release status updates → Team release channel
- Approval requests → Stakeholder Slack channel or direct messages
- General notifications → Shared team channel

**Scope Notifications Appropriately**  
Use "Select Release Groups" to limit notifications to specific release groups rather than monitoring all releases. This prevents notification fatigue and ensures teams only see relevant events.

**Test Before Production**  
Create test notification rules in non-production projects first to validate event triggers and channel configurations before applying to production releases.

## Related Topics

- [Release Overview](./releases/overview.md) - Learn about releases and their lifecycle
