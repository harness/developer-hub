---
title: Integrate flags with Jira
description: View Jira issues for a specific Harness feature flag.
sidebar_position: 90
redirect_from:
  - /docs/feature-flags/integrate-feature-flag-with-jira
---

With **Harness Feature Flags for Jira**, teams can use feature flags more quickly and easily from a single place.

Integrating your flags with Jira provides these benefits:

- Have full visibility for everyone who needs it. Keep Dev, Support, Ops, and Product all in the loop by connecting flags to Jira tickets. 

- See the ticket status, who to ask, and where to find more information without having to use an instant messaging app or email, or comment back and forth in a Jira ticket.

- Make a new flag as you create your Jira ticket, or link your Jira ticket from Harness as you create a flag. 

- Find and manage flags easily in Jira tickets. When work is ready to roll out, let your team members jump directly from a Jira ticket to the flag they want to control.

- See all the Jira tickets linked to a flag in Harness.

## Configure the integration

Before you can link a feature flag with a Jira issue for the first time, you must install the Harness Feature Flags for Jira app from the Atlassian Marketplace, and then configure the connection between Harness Features Flags and Jira. You only have to do this once. 

:::info note
When you configure a Jira integration, it applies only to a specific combination of: Harness **project**, **organization**, and **environment**.
:::

### Step 1: Get a token from Harness

You must get an access token from an account-level service account API key in Harness.

To get a token from Harness:

1. In the left pane on Harness, select **Account Settings > Access Control > Service Accounts**. Note that this can only be done by someone with account-level permissions.

2. Select a service account, or [create one](/docs/platform/role-based-access-control/add-and-manage-service-account) if needed. 

3. In the service account page, under **API Keys**, select **+ Token** for the API key you want to use.

    ![Add token from a service account](./static/jira-add-token-from-service-account.png) 

4. Fill out the **New Token** form, and then select **Generate Token**.

5. Copy the value of the token and then select **Close**.

    You need this token to provide it in Jira in [Step 2](#step-2-add-the-feature-flags-app-in-jira) below.

The permissions you need to grant to the service account are:

- **"Account Viewer"** 
- **"Flag Manager"**



### Step 2: Add the Feature Flags app and token in Jira

In this step, you install the Feature Flags for Jira app, and then provide the token you generated in [Step 1](#step-1-get-a-token-from-harness) above.

To add the Feature Flags app and token in Jira:

1. Log in to your Jira instance. 
2. On the **Apps** menu,  choose **Explore more apps**.
3. Find and select the **Harness Feature Flags for Jira**, or go directly to this [Atlassian Marketplace link](https://marketplace.atlassian.com/apps/1227514/harness-feature-flags-for-jira?tab=overview&hosting=cloud).
4. Select **Get it now** to install the app.
5. Once the app is installed, go to **Apps > Manage apps**, and then find the app.

    ![Manage apps page in Jira](./static/jira-config1-manage-apps.png)

6. Expand the Feature Flags for Jira app and then select **Configure**.

    ![Configure button for the Feature Flags for Jira app in Jira](./static/jira-config2-config-button.png)

7. In the configuration page, paste the **Harness Token** you copied from Harness, and then provide the **Organization**, **Project**, and **Environment** this integration applies to.

    ![](./static/jira-config3-ff-paste-token.png) 

    :::info note
    This Jira integration applies only to the project, organization, and environment you select here.
    :::

8. Select **Save**.

## Link a Jira issue to a feature flag

After you configure a Jira integration, you can link issues to flags in either Jira or in Harness.

### Link an existing flag to an issue from Jira

To link a flag while in a Jira issue: 
 
1. Go to your Jira project, and then open the issue you want to link a flag to.
2. In the right pane, scroll down to the **Releases** field. 
3. Select **Add feature flag**, and then select **Connect feature flag**.

    ![Add feature flag field in Jira](./static/jira-connectff-in-jira1.png)

4. In **Connect Harness Feature Flag to Issue**, select the flag you want to link to this Jira issue, and then select **Save**. 
    
    ![Connect Harness Feature Flag to an issue dialog](./static/jira-connectff-in-jira2.png)

    Make sure the flag you choose has an environment associated with it. Here's an example in Harness: 

    ![Flag details page with Environment selected](./static/jira-flag-environment-dropdown.png)

### Create and link a new flag to an issue from Jira

To add a flag and link it to an issue from Jira:

1. Go to your Jira project, and then open the issue you want to link a flag to.
2. In the right pane, scroll down to the **Releases** field. 
3. Select **Add feature flag**, and then select **Create feature flag**.

    You are redirected to Harness, where you can [add a flag](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag) as normal.


### Link a flag to an existing issue from Harness

To link a Jira issue while in a flag in Harness:

1. In Harness, go to **Feature Flags** and then select the flag you want to link issues to.
2. In the flag's **Jira Issues** section, select **+ New Jira Issue**.

    ![Jira issues section of a feature flag](./static/jira-ff-with-jira-list.png)

3. In **Add Jira Issue**, enter the **exact** Jira issue number/ID, and then select **Add**.

    Note that search results do not find partial issue numbers or IDs.

    Once you link this issue, it appears in the **Jira Issues** section of the flag, and the flag is added to the issue in Jira. The flag and its current status (`On` or `Off`) are displayed in the **Releases** field in Jira.

    ![Flag appears in Jira with status ON](./static/jira-newflag-in-jira.png)


## View flags and linked issues in Harness and Jira

### View flag details in a Jira issue

From a Jira issue, you can see details about any linked flags, including the environment name, status, rollout details, and when it was last updated.

To view flag details in a Jira issue:

1. Go to your Jira project, and then open the issue that contains the flag.
2. In the right pane, scroll down to the **Releases** field.

    ![Jira issue with 2 flags](./static/jira-flag-status-2flags.png)

    You may have more than one flag linked to this issue. 

3. Select the status shown.

    A details page appears, listing connected flags. You can select a flag's name to be redirected to that flag in Harness.

### View linked Jira issues in a flag

You can see any Jira issues connected to a flag by selecting the flag in Harness and looking at its **Jira Issues** section.

![The Jira Issues section of a flag](./static/jira-flag-issues-section.png)


