---
title: Integrate Feature Flags with Jira
description: View Jira issues for a specific Harness feature flag.
# sidebar_position: 100
---

With **Harness Feature Flags for Jira**, teams can use feature flags more quickly and easily from a single place.

Integrating your flags with Jira provides these benefits:

- Have full visibility for everyone who needs it. Keep Dev, Support, Ops, and Product all in the loop by connecting flags to Jira tickets. See the ticket status, who to ask, and where to find more information without having to use an instant messaging app or email, or comment back and forth in a Jira ticket.

- Make a new flag as you create your Jira ticket, or link your Jira ticket from Harness as you create a flag. 

- Find and manage flags easily in Jira tickets. When work is ready to roll out, let your team members jump directly from a Jira ticket to the flag they want to control.

- See all the Jira tickets linked to a flag in Harness.

## Configure the integration

Before you can link a feature flag with a Jira issue for the first time, you must install the Harness Feature Flags for Jira app from the Atlassian Marketplace, and then configure the connection between Harness Features Flags and Jira. You only have to do this once. 

### Get a token from Harness

1. Go to your instance of Harness Feature Flags.
1. In the left pane, at the bottom, select your user profile. 
1. Under **My API Keys**, select the token for the API key you want to use, and then copy the value. 
1. Go to Jira, and then from the **Apps** menu, select **Harness Feature Flag Addon**.
1. On the **API Key** screen, enter the API key token that you copied in step 8, and then select **Save**.

### Add the Feature Flags app in Jira

1. Log in to your Jira instance. 
1. Select the **Apps** menu, and then select **Explore more apps**.
1. Search for **Harness Feature Flag**.
1. Select the **Harness Feature Flags for Jira** app.
1. Select **Get it now** to start the installation.

## Link a Jira issue to a feature flag

### Link a flag to an issue from Jira

To link a flag while in a Jira issue: 
 
1. Go to your Jira project. 
2. Open the issue to which you want to link a feature flag.
3. In the right pane, scroll down to the **Releases** field. 
4. Select **Add feature flag**, and then select **Connect feature flag**.
5. In **Harness Flag URL**, paste the URL for the flag you want to link to this Jira issue, and then select **Save**. 
    To locate the URL for the flag, go to your instance of Harness Feature Flags and select the flag. Copy the entire URL for the flag. Make sure the flag you choose has an environment associated with it. 

### Link a flag to an issue from Harness

To link a Jira issue while in a flag:

1. In Harness, go to Feature Flags
1.
1.


## View information about a feature flag from a Jira issue

From within a Jira issue, you can see details about a linked feature flag, including the environment name, status, rollout details, and when it was last updated. 

1. Go to your Jira project.
2. Open the issue that contains the feature flag.
3. In the right pane, scroll down to the **Releases** field.
4. Select the box with the right arrow next to the name of the feature flag. 

![](./static/jira-to-ff-details.png)



