---
title: Configure FireHydrant as a change source
sidebar_label: FireHydrant
description: Configure FireHydrant as a change source to monitor incidents.
sidebar_position: 50
---

You can accelerate incident triage by configuring FireHydrant with Harness SRM. Imagine a scenario where a critical incident occurs within your system. Integrating FireHydrant's incident reporting with SRM's health reports provides the incident response team with clearer insights into the incident.

Here's how it works: When an incident is announced using FireHydrant, a real-time alert is sent to both a designated Slack channel and SRM. Immediately after receiving the FireHydrant's incident report, SRM quickly sends a real-time health report from the affected service to that very same Slack channel. SRM's health report offers insights based on data from the past hour:

- Monitored service particulars like organization, account, and project info.

- Change events – deployments, alerts, chaos events, and feature flag changes.

- Service health score – a quick snapshot of the service's health.

- SLO performance – SLO name, target, actual performance, and the rate at which your error budget is being used.


Sample message sent by SRM to the Slack channel

<docimage path={require('./static/firehydrant-slack-message.png')} />

Together with the FireHydrant's incident information and SRM's health report, the incident response team can quickly figure out how bad the incident is, see how the rest of the service is doing, and make quick decisions.


You can configure FireHydrant to send alerts in the following ways when an incident is declared:

- [Send real-time alerts to Harness SRM and a designated Slack channel in your workspace.](#method-1)

- [Send real-time alerts to Harness SRM, create a new Slack channel for each incident, and invite Slack users and user groups to that incident channel.](#method-2)


## Prerequisite

To enable FireHydrant to send incident reports to your designated Slack channels, you'll need to integrate your Slack workspace with FireHydrant. To learn how to integrate a Slack workspace with FireHydrant, go to [Integrating with Slack]( https://firehydrant.com/docs/integration-guides/integrating-with-slack/).


## Method 1

You can configure FireHydrant to send real-time notifications to both Harness SRM and a specific Slack channel within your workspace.

### Add FireHydrant as a change source

To add FireHydrant as a change source to a monitored service:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.

2. Locate the monitored service for which you want to add a custom change source, select the three vertical dots next to it, and then select **Edit service**.  
   The Configurations page appears.

3. On the **Configurations** page, go to the **Change Sources**, and select **+ Add New Change Source**. 

4. On the Edit Change Source page, under **Select Change Source**, choose **Incident** as **Provider Type**, and then select **Custom**.

5. Enter a name for the change source. For example, FireHydrant.

6.  Select **Submit**.  
    The custom incident change source gets added to the monitored service. A webhook URL and cURL commands are generated.

    <docimage path={require('./static/add-firehydrant-change-source.png')} />


### Copy webhook URL

To configure your FireHydrant runbook for sending incident reports to a monitored service in SRM, you'll need to obtain a webhook from that specific SRM monitored service.

To copy the webhook URL from a monitored service:

1. From the list of monitored services, select the monitored service for which you have created the FireHydrant incident custom incident change source, and then go to the **Configuration** tab.  

2. On the **Configurations** page, go to the **Change Sources** tab. In the **Change Sources** section, a list of change sources that have been added to the monitored service is displayed. The list also displays webhook URLs and cURL commands next to each change source.

3. Locate the FireHydrant incident change source that you want to configure with the FireHydrant runbook, and then copy the webhook URL.


### Add Webhook Step to the FireHydrant runbook

You need to configure the FireHydrant runbook so that it can send the information related incident to a monitored service in Harness SRM.

To configure the runbook:

1. In your FireHydrant account, open the runbook you want to set up with Harness SRM monitored service.
   
2. Add a Send Webhook step with the following settings:
   
   - **Endpoint**: Paste the webhook URL you copied in Harness SRM monitored service. For example:
  
```
 https://app.harness.io/cv/api/account/-xxxxxx12345xxxx/org/default/project/Demo/webhook/custom-change?monitoredServiceIdentifier=custom_change_prod&changeSourceIdentifier=Fire_Hydrant
```

   
   - **JSON Payload**: Use a JSON string in the following format for transmitting data to your endpoint:
  

      ```
            {
            "eventIdentifier": "{{ incident.id }}",
            "user": "{{ incident.created_by.email }}",
            "startTime": "{{ incident.started_at | date: "%s" | times: 1000 }}",
            "endTime": "{{ incident.started_at | date: "%s" | times: 1000 }}",
            "eventDetail": {
               "description": "{{ incident.name }}",
               "externalLinkToEntity": "{{ incident.private_status_page_url }}",
               "name": "{{ incident.name }}",
               "webhookUrl": "<webhook url of your slack channel> "
            }
            }
      ```
  
   - JSON Headers: Input your Harness API Personal Account Token in the following format:
  

      ```
         {
         "X-API-KEY": "<your Harness API PAT key>"
         }
      ```

  
1. Select **Add Step** to save the runbook.

To learn more about adding a webhook step to a FireHydrant runbook, go to [Sending a webhook from a Runbook]( https://firehydrant.com/docs/configuring-firehydrant/sending-a-webhook-from-a-runbook/).


### Add Slack channels to the FireHydrant runbook

Optionally, you can include a **Notify Channel** step in the FireHydrant runbook to enable FireHydrant to send incident notifications through Slack.

To add the Notify Channel step:

1. In your FireHydrant runbook, select **Add Step**.

2. Choose **Notify Channel** under **Slack**.

3. Enter the Slack channel names, separated by commas.

For more information on adding the **Notify Channel** step to your Firehydrant runbook, go to [Notifying a chatops channel]( https://firehydrant.com/docs/configuring-firehydrant/notifying-a-chatops-channel/).


## Method 2

You can configure FireHydrant to send real-time alerts to Harness SRM and also dynamically create a dedicated Slack channel for each incident.


### Create a Slack app in your workspace

To enable FireHydrant to seamlessly send incident notifications to a Slack channel, you must create a Slack app in your workspace and generate the authorization token. To know how to create a Slack app and generate authorization token, go to [Slack API Quickstart Guide](https://api.slack.com/start/quickstart).


### Add FireHydrant as a change source

To add FireHydrant as a change source to a monitored service:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.

2. Locate the monitored service for which you want to add a custom change source, select the three vertical dots next to it, and then select **Edit service**.  
   The Configurations page appears.

3. On the **Configurations** page, go to the **Change Sources**, and select **+ Add New Change Source**. 

4. On the Edit Change Source page, under **Select Change Source**, choose **Incident** as **Provider Type**, and then select **Custom**.

5. Enter a name for the change source. For example, FireHydrant.

6. Enter the Slack app **Authorization Token** you generated.

   For enhanced security, consider storing the authorization token in a Harness Secret, and then enter the Harness Security information in the **Authorization Token** field using the following formats:

   - If you've created a Harness Secret at the project level: <+secrets.getValue(‘YourSecretId’)>
   - If you've created a Harness Secret at the account level: <+secrets.getValue(‘account.YourSecretId’)>

  
   :::info important
   Ensure to include 'Bearer' before the authorization token. Here's an example:

      `Bearer <your-slack-app-authorization-token)>`
   :::


7.  Select **Submit**.  
    The custom incident change source gets added to the monitored service. A webhook URL and cURL commands are generated.

    <docimage path={require('./static/add-firehydrant-change-source.png')} />


### Configure FireHydrant runbook to send incident reports

You need to configure the FireHydrant runbook so that it creates a channel in your Slack workspace whenever an incident is declared and sends the incident reports to a monitored service in Harness SRM.

To configure the runbook:

1. In your FireHydrant account, open the runbook you want to set up with Harness SRM monitored service.
   
2. Add a **Create or Rename Incident Channel** step type. The purpose of this step is to create or rename channel in your Slack workspace. If channel does not exist, this step creates a new incident channel. If the channel already exists, or if this step has been run previously either in the same runbook or in aa different runbook, then subsequent runs rename the channel.

To learn more, go to [Create or Rename Incident Channel](https://firehydrant.com/docs/configuring-firehydrant/create-an-incident-channel-in-your-chatops-tool#create-or-rename-incident-channel).

3. Add an **Invite to incident channel** step type. The purpose of this step is to automatically invite Slack users and user groups to the incident channel. You can add multiple users and groups by separating them with commas. For example, `@this-group, patchy@example.com, @that-group, @patchys_buddy`.

To learn more, go to [Invite to Incident channel](https://firehydrant.com/docs/configuring-firehydrant/invite-to-incident-channel/).

4. Add a Send Webhook step with the following settings:
   
   - **Endpoint**: Paste the webhook URL you copied in Harness SRM monitored service. For example:
  
      ```
      https://app.harness.io/cv/api/account/-xxxxxx12345xxxx/org/default/project/Demo/webhook/custom-change?monitoredServiceIdentifier=custom_change_prod&changeSourceIdentifier=Fire_Hydrant
      ```
   
   - **JSON Payload**: Use a JSON string in the following format for transmitting data to your endpoint:
  

            {
            "eventIdentifier": "{{ incident.id }}",
            "user": "{{ incident.created_by.email }}",
            "startTime": "{{ incident.started_at | date: "%s" | times: 1000 }}",
            "endTime": "{{ incident.started_at | date: "%s" | times: 1000 }}",
            "eventDetail": {
               "description": "{{ incident.name }}",
               "externalLinkToEntity": "{{ incident.private_status_page_url }}",
               "changeEventDetailsLink": "{{ incident.incident_url }}",
               "name": "{{ incident.name }}",
               "channelId": "{{ incident.channel_id}}"
            }
            }    

   - JSON Headers: Input your Harness API Personal Account Token in the following format:
  
      {
      "X-API-KEY": "<your Harness API PAT key>"
      }

  
  To learn more about adding a webhook step to a FireHydrant runbook, go to [Sending a webhook from a Runbook]
  (https://firehydrant.com/docs/configuring-firehydrant/sending-a-webhook-from-a-runbook/).

5. Select **Add Step** to save the runbook.

To learn more about FireHydrant runbook and steps, go to [An introduction to Runbooks](https://firehydrant.com/docs/configuring-firehydrant/an-introduction-to-runbooks/).


## Declare an incident

When you declare an incident using FireHydrant and select the corresponding runbook, the following actions take place:

1. FireHydrant sends an incident alert directly to the Slack channel you've configured in the runbook.
   
2. Simultaneously, Harness SRM sends a comprehensive health report to the same Slack channel configured in the runbook.

This helps you receive incident alerts along with service health updates in your designated Slack channel.
By combining the FireHydrant incident information and SRM's health report, your team can swiftly gauge the incident's impact, assess the overall service health, and make prompt decisions.
