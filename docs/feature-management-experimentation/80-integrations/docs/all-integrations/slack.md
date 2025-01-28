---
title: Slack
sidebar_label: Slack
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020997851-Slack <br /> ✘ images still hosted on help.split.io </button>
</p>

**Note: The following Slack integration is in beta. If you'd like to be included in this, contact [support@split.io](mailto:support@split.io).**

The Slack integration allows teams to stay up to date on changes they care about in Split. By combining Split's rollout capabilities with Slack, you can:

* Keep your team notified about feature flag and segment changes
* Subscribe to the changes you care about by filtering notifications by Split project, environment, type (e.g., feature flag and segment), and action (e.g., create, update, delete)

With this integration, as a Slack user, you can subscribe channels to notifications based on filters that they set. Once these filters are set up by that user, any Slack user in that channel can see any event that exists that meets the filter criteria in that channel. In addition, you can see notifications relevant to you, specifically in the Split Slack App on the messages tab.

**Note: If you are having trouble completing the integration, contact [support@split.io](mailto:support@split.io).**

# Setting up in Split

To start, first set up in Split by doing the following:

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Locate Slack App in the integrations list and click **Add**.
4. Click **Save**.

<p>
  <img src="https://help.split.io/hc/article_attachments/10120239843853" alt="new-integration.png" />
</p>

5. Navigate back to the newly created integration. The token and Add to Slack button display. 
6. Click **Add to Slack** button. This takes you into the Slack OAuth flow.
7. In the Slack authorization page, you see a page with the message explaining the permissions required by the Split Slack app. Click the **Allow** button. You’re prompted to open Slack. 

  <p>
    <img src="https://help.split.io/hc/article_attachments/10120297377805" alt="slack-authorization.png" width="371" />
  </p>

The Slack installation flow is complete and Slack is now open with a new app installed.

# Setting up in Slack

To set up in Slack, do the following:

1. When you open Slack, a welcome message indicating that you successfully installed the Split app on the Slack workspace appears in the App’s home section:

   <p>
     <img src="https://help.split.io/hc/article_attachments/10120358348813" alt="welcome-message.png" />
   </p>

2. Click the **Configure** button. The Configure Split App modal appears.

   <p>
      <img src="https://help.split.io/hc/article_attachments/10120454587149" alt="configure-split-app.png" width="523" />
   </p>

3. Enter the Split token that you generated when you set up on the Split side and click the **Submit** button. Slack displays the following:

   <p>
     <img src="https://help.split.io/hc/article_attachments/9947575225613" alt="slack-notifications.png" />
   </p>

# Using Split commands

You can interact with the Slack app to initiate initial configuration, subscription management, and help documentation using the following commands:

* /split configure
* /split subscribe
* /split subscriptions
* /split help


## Using the configure command

**Note: Only admins have access to the Split token that is needed to enter in the configure modal.**

Use the `/split configure` command to display the Configure Split app modal. When you enter your Split token and submit it here, this links the Slack app with your Split account. Note that you only need to use this command if you didn’t previously click the Configure button in the welcome message.

**Note: If there is a problem with the token validation, an error message displays when you click the Submit button.**

## Create a channel subscription

Use the `/split subscribe` command to create a channel subscription, which subscribes your Slack channel to Split notifications. The Channel menu list is pre-selected with the current channel. However, a user can select a different channel if desired. Optionally select your desired filter criteria and click **Submit** to create the channel subscription. 

<p>
  <img src="https://help.split.io/hc/article_attachments/10120218112525" alt="channel-subscription.png" />
</p>

**Note: If you select a private channel, you get an error message indicating that the channel is private.**

# Managing subscriptions

The `/split subscriptions` command lists out the available subscriptions within the current channel, displaying a filter summary for each, and allows you to edit and delete subscriptions.

## Edit a subscription

To make a change to a subscription, click the **Edit** button next to the desired subscription. The Edit Subscription modal displays pre-populated with the subscription’s filter criteria. Make the desired changes and click the **Submit** button. You get a message indicating that the subscription is updated.


## Delete a subscription

Delete a subscription by clicking the **Delete** button next to a given subscription. You’re prompted with a confirmation message indicating that notification matching the subscription will be removed. Click the **Confirm** button to finish deleting the subscription.

# Split/Slack webhook integration

:::warning[About this webhook integration]
The following content describes how to set up the older Slack integration. The updated version above is currently in beta. If you'd like to be a part of the beta, contact <a href="mailto:earlyaccess@split.io">earlyaccess@split.io</a>.
:::

Slack makes it easy to communicate with your team and keep your colleagues up to date on changes in Split. By combining Split's rollout capabilities with Slack, you can keep your team notified as new feature flags are enabled, as well as which rollouts are modified and by which of your teammates. If you are having trouble completing the integration, contact [support@split.io](mailto:support@split.io).

# Setting up in Slack
 
1. Go to the Incoming Webhooks page in the Slack App Directory [here](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks). Make sure you're signed into Slack.

2. On this page, if you're an Owner of your Slack Workspace, click the **Add Configuration** button and proceed to step 3.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021770532/slack1.png" alt="slack1.png" />
</p>

2a. If you're not an Owner, click the **Request to Install** button and ask your Slack Workspace Owner to follow the rest of the steps in this doc.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021770512/slack2.png" alt="slack2.png" />
</p>

3. Select a channel where you would like the notifications from Split displayed and click the **Add Incoming WebHooks integration** button.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021736211/slack3.png" alt="slack3.png" />
</p>

4. On the Setup Instructions page, copy the Webhook URL.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021736191/slack4.png" alt="slack4.png" />
</p>

# Setting up in Split

1. Go to Admin Settings and click **Integrations**.

2. Click **Add** next to Slack.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021770552/slack7.png" alt="slack7.png" />
</p>

3. Paste the **Webhook URL** you copied in step 4 and click **Save**.

Split notifications should now be flowing into Slack. If you have any issues with this integration, contact [support@split.io](mailto:support@split.io).
