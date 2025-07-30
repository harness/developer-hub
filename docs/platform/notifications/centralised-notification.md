---
title: Centralised notification
description: Configure notifications based on specific rules and conditions in pipelines, delegates, and other Harness components to keep teams informed of critical events.
sidebar_position: 3
---

import PipeEvents from './static/set_pipeline_events.png';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import React from 'react';

:::info Prerequisites
Before you begin, ensure you have the **`PL_CENTRAL_NOTIFICATIONS`** feature flag enabled.
Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.
:::

## Overview

Harness Centralised Notifications allow you to send notifications based on rules and conditions across pipelines and delegates. You can configure and manage alerts to stay informed about critical events in your Harness environment.

You can configure centralised notifications for:

- **Pipelines**: Get notified about pipeline events like success, failure, or stage completion
- **Delegates**: Receive alerts when delegates disconnect, expire, or are about to expire

## Pipeline Notifications

:::info Prerequisites
Before you begin, ensure you have the **`PIPE_CENTRALISED_NOTIFICATION`** feature flag enabled. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.
:::

Centralised Notifications for pipelines allow you to configure notifications for multiple pipelines at once instead of setting them up individually. You can create rules that apply to all organisations or specified organisations.

These notifications are beneficial for tracking pipeline start, success, and failure events, as well as stage-level events (start, success, failure). This helps you monitor pipeline health and quickly identify issues across your deployment processes.

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
   - Choose existing channels or [create new ones](/docs/platform/notifications/notification-settings#configure-new-channels-to-sent-notification)
   - Click **Submit** to save your configuration
</TabItem>
</Tabs>

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
     - **Delegate Disconnected**: Immediate notification when disconnection occurs
     - **Delegate Expired**: Daily notification for expired delegates
     - **Delegate Expires in [X] Weeks**: Advance warning (1-4 weeks)
   - Click **Continue**

4. **Configure Channels**
   - Select notification channels.
   - Choose existing channels or [create new ones](/docs/platform/notifications/notification-settings#configure-new-channels-to-sent-notification)
   - Click **Submit** to save your configuration.
</TabItem>
</Tabs>












