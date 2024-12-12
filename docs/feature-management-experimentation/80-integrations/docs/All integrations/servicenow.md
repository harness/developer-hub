---
title: ServiceNow
sidebar_label: ServiceNow
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/5524203735181-ServiceNow </button>
</p>

**Note: The ServiceNow integration is in beta.**

The ServiceNow integration enables enterprise organizations to improve operational efficiencies by streamlining and automating change management processes. Specifically, it allows you to manage projects, teams and customer interactions by customizing approvals, which helps reduce errors and ensure compliance without slowing your release process. With this integration:

* If your organization manages changes in ServiceNow, when you make required approvals in Split, all approvals are forwarded to ServiceNow so that change requests are recorded and approved in one place.
* If you’re an approver, you can manage your approvals.
* If you’re an engineer, any change you make is quickly recorded and approved. This integration also lets you know when your changes are approved.

# Supported version

The following is the supported ServiceNow version:

Service Now ITSM Pro product/plan
Platform version: Rome / SanDiego / Tokyo versions
DevOps plugin: 1.35.1

# Setting up in Split

## Create a Split token
To start connecting the ServiceNow integration to the Split application, you need to generate and copy a Split token so you can paste it into the ServiceNow integration.

To create your Split token, do the following:

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find ServiceNow in the integrations list and click **Add**. The Connect to ServiceNow DevOps page appears.
4. Enter a user friendly name for the integration and click **Save**. The Split token is created once you save the settings page. 
5. Copy your Split token. You need the token to configure your Split extension in ServiceNow integration.
  **Note: This field is not editable.**

From here, you can either configure your environment within Split for ServiceNow approvals or go to ServiceNow to finish setting up your integration.

## Configure your Split environment for ServiceNow approval (optional)

You can configure your Split environment so approvals only occur on the ServiceNow side.

To configure your Split environment, do the following:

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Select **Projects** to see the projects in your Split account. 
3. For one of the projects, click **View**. The environments associated with this project display.
4. Within the Environments tab, click **Edit** on the desired environment (e.g. Prod-client). The Edit environment page appears.
5. In the Change permissions section, select **Require approval for changes**, then select Restrict who can approve.
6. On the Approvers menu list, in the first field, select Integration and in the second field, select **ServiceNow, ServiceNow DevOps**.
7. Click the **Save** button. This takes you back to the selected project page. Now when you make a change to a feature flag or segment in the Split application, the approver is automatically set to the ServiceNow integration.  View this in the Change summary page under the Approvers field. 
  
# Set up in ServiceNow DevOps

## Create a ServiceNow DevOps tool for Split
After setting up the Split application, you can set up the integration in ServiceNow DevOps by doing the following: 

1. From the ServiceNow store, install the [DevOps Feature Flag Integration](https://store.servicenow.com/$appstore.do#!/store/application/632860a753a301104a6eddeeff7b1266/) (if not already installed).
2. In the ServiceNow application, at the top left of the page, select **All** to access the navigation.
3. Search for tools and select **Create New**. The Create DevOps tool page appears.
4. In the tool page, enter the following:
    * In the Tool name field, enter a human recognizable name (e.g., splitdemotool).
    * In the Tool integration field, enter **Split IO** and select the provided option. 
    * In the Tool URL field, enter **https://api.split.io **.
    * In the Tool username field, optionally enter any username you want.
    * In the Tool password/Access token field, paste the Split token you generated when you set up ServiceNow in the Split application.
5. Click the **Submit** button. A new DevOps tool is created in the ServiceNow application. From here, refer to the Connection status field to see if  the tool is connected to Split.
 **Note: When you create a tool, it can take up to a minute.**

## Add a webhook for the ServiceNow DevOps tool
Once you connect to the Split application, you need to configure your new tool to receive notifications from Split when you or others make changes to feature flags and segments.

To add a webhook, do the following:

1. In the ServiceNow application, from the left navigation select **Feature flag tools**. The DevOps tools page appears with the extension you created.
2. From this page, select the Split tool and click the **Configure** button. The message *Webhook is configured successfully* appears at the top of the screen.
3. Switch back to the Split Platform under the ServiceNow DevOps Integration that was just configured, and ensure that it is now set to **Active**.
4. Within ServiceNow, to get your data from the Split application to display on the ServiceNow view, click the **Discover** button. This populates the Split projects, environments, feature flags (if any), and segments (if any) on the DevOps tool page.

___Troubleshooting tip:___ If all the projects, environments, and feature flags are not loaded correctly or some are missing. Please reload the page and wait for all of them to appear. If they still don't appear, then please remove the webhook from both ServiceNow and Split and add it again by following the steps mentioned above.

## Add an approval group in ServiceNow (optional)

After configuring your ServiceNow tool, you can optionally preconfigure an environment to assign change requests to a specific Change Approval Group by doing the following:

1. In the left navigation, click **All**, then under DevOps, select **Environment**. The Environments page appears. 
2. In the Name column, select the desired environment that has the approval workflow attached within the Split Platform. The Environment page appears.
3. In the Edit Environment page, set the Change Model field to Normal. Optionally, set the Change Type field to Normal if not already set and click the **Update** button.
4. In the Change approval group field, select the desired approval group and click the **Update** button. The Environment page redisplays with the environment now configured and all Split change requests for a given environment are assigned to the selected approval group.
