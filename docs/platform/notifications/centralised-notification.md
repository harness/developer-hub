---
title: Centralised notification
description: Configure notifications based on specific rules and conditions in pipelines, delegates, and other Harness components to keep teams informed of critical events.
sidebar_position: 3
---

import PipeEvents from './static/set_pipeline_events.png';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Note
Currently, the Centralised Notification feature is behind the feature flag `PL_CENTRAL_NOTIFICATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable them.
:::

Harness Centralized Notifications enable you to send notifications based on rules and conditions across pipelines, delegates, and other Harness entities. With notifications management, you can easily configure and manage alerts to stay informed about critical events.

Centralized notifications can be configured for the following resource types:

1. Pipeline 
2. Delegate 

This article explains how to configure notifications for Pipelines and Delegates in Harness across different [scopes](/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes).

This guide uses the Account scope as an example, but the steps apply similarly to Organization and Project scopes. To configure notifications, follow the steps below.

1. Navigate to **Account Settings** → **General**, select **Notifications Management**. 

        ![account-level-notification](./static/organization-setting-notification-management.png)

2. In the **Overview** section, provide a **Notification Name** and click **Continue**. Then, select the appropriate **Resource Type**. Depending on your selection, proceed with either the **Pipeline** or **Delegate** tab.

        ![](./static/new-notification-setup.png)

## Centralized notification

<Tabs>
<TabItem queryString="pipeline" value="Pipeline" Label="pipeline" default>

### Configure Notifications for Pipelines

:::info Note
  Pipeline specific notifications are behind `PIPE_CENTRALISED_NOTIFICATION`. 
:::

3. Select **Pipeline** as the **Resource Type** in the **Resources** section.

        ![](./static/resource_type.png)

   Next, choose the project scope: **All Projects** under the Organization, or **Specified Project** to target particular projects

   Click **Continue** to move to the condition setup.

        ![](./static/pipeline-resource.png)

4. Click **+ Add Condition** to define when notifications should be triggered based on pipeline events.

        ![](./static/resource-pipeline-condition.png)

   :::info Note
   Stage start, success, and failure events apply to all stages in a pipeline. For more granular control (such as specific stages), consider using [pipeline-level notifications](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events.md).
   :::

   Provide a **Condition Name**, select relevant **Pipeline Events**, and click **Continue** to choose the notification channel.

   <img src={PipeEvents} width="500"/>

   - Optionally you can add **Notification Template** to get custom notifications based on the event. To learn more, go to [Custom Notification templates for Pipeline Notifications](/docs/platform/templates/customized-notification-template).

        ![](./static/notification-template.png)   

</TabItem>

<TabItem value="Delegate" label="Delegate">

### Centralized Notifications for Delegates

3. Choose **Delegate** as the **Resource Type**.

   You can either notify: **All Delegates**, or Only Delegates that match specific **tags** (up to five supported)

   ![delegate-resource-type](./static/delegate-resource-type.png)

4. Click **+ Add Condition** to set up alerts based on delegate events.

   ![delegate-condition](./static/delegate-condition.png)

   Enter a **Condition Name**, and select from the following **Delegate Events**:

        * Delegate Disconnected
        * Delegate Expired
        * Delegate Expiring in 1 to 4 Weeks

   Proceed by clicking **Continue** to configure your notification channel.

</TabItem>
</Tabs>

5. Under **Set Channels**, **Select Channels** where you want notification to be sent.

        ![](./static/select-channels.png)

        Navigate **Select Channel** you can choose the already created channel at that scope, or you can create a [**New Channel**](/docs/platform/notifications/notification-settings.md).

6. Select **Submit** to save your notification configuration.

     ![](./static/submit-notification.png)












