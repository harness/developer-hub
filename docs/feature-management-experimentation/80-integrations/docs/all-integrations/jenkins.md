---
title: Jenkins
sidebar_label: Jenkins
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044691592-Jenkins <br /> ✘ images still hosted on help.split.io </button>
</p>

Jira Software offers flexible issue and project tracking, and the Split for Jira integration allows you to connect feature flags and Jira issues from either Jira or Split, and view details in both Jira and Split. With this bidirectional connection, you can track rollouts with an associated issue in Jira and issues tied to a feature flag in Split. If you are tracking source code changes and deployments in Jira, you will be able to go from feature flag to issue to code change or deployment details in as few as three clicks.

:::info[Jira Cloud only]
This integration only works with Jira Cloud product offerings and does not work with Jira Server. 
:::

If you are having trouble completing the integration please contact us at [support@split.io](email:support@split.io).

# Setting up in Split

To set up in Split, do the following:

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Locate the Jira Cloud integration, click **Add** and select the Split project and associated environments you want to connect to Jira Cloud.

   **Note:** You can select multiple Split projects but only one environment per project.

4. Click **Save** to generate a token. The token that is generated is a Split Admin API key.

5. Click **copy** to copy the Split token to the clipboard. You can now use this token to configure the Jira Cloud.

<p>
  <img src="https://help.split.io/hc/article_attachments/360092262211" alt="jira_cloud_in_split.png" width="607" height="268" />
</p>

**Note: If your Split projects have set [project view permissions](https://help.split.io/hc/en-us/articles/12621628930445-Project-view-permissions), ensure that the projects you want to use with this integration grant access to the Admin API Key that you just generated in this section.**

# Setting up in Jira

To set up in Jira, do the following:

1. In the [Atlassian Marketplace] (https://marketplace.atlassian.com/apps/1224872/split-for-jira?hosting=cloud&tab=overview), install Split for Jira in your Jira Cloud instance.

2. Within **Apps** in Jira Cloud, and after the Split for Jira app is installed, click **Configure integration** in the side menu under Split.

3. Enter the token you copied and click **Save**.

  <p>
    <img src="https://help.split.io/hc/article_attachments/360092262251" alt="Jira_configure_integration.png" width="638" height="393" />
  </p>

With the app configured, you can connect Split feature flags to Jira issues.

# Connecting feature flags and issues
 
Once the integration is installed, you can do either of the following:
  
* **From Split:** Navigate to the Integrations tab of the feature flag and click the **Connect Jira Issue** button. Enter the desired issue number.

* **From Jira:** In the right hand column of an issue, click **More fields** to expand the section and then **Releases +**. When you click the plus sign, you can either create a feature flag or connect to an existing flag.

  <p>
    <img src="https://help.split.io/hc/article_attachments/4402634745869" alt="jira_feature_flag.png" width="290" height="156" />
  </p>

  * Selecting Create feature flag takes you to your Split account and the standard feature flag creation dialog opens, with the current Jira ticket entered. 
  * Selecting Connect feature flag takes you to a new dialog box that allows you to choose a feature flag.

  <p>
    <img src="https://help.split.io/hc/article_attachments/31167782949901" alt="jira connect split.png" />
  </p>

**Tip:** You can connect multiple flags to an issue and multiple issues to a flag.

**Note: You must select a Split project that has been configured in the Jira integration setup. A Jira instance is 1:1 with a Split account, and the integration can be configured for one or more projects.**

# Viewing your connections
 
Once you’ve connected feature flags to issues, you can do either of the following:
 
* **In Split:** You see all attached issues on the Integrations tab of each feature flag.
 
* **In Jira:** You see either the name of the flag or the number of flags to which that issue is connected. On the right hand side, it indicates if the feature flags are active in the primary environment, which is selected for each Split project when the integration is set up.
 
  If you have multiple flags, hovering over the status indicator shows the status of all flags. If you have only one flag, hovering over the status displays information about the rollout plan. 

  <p>
    <img src="https://help.split.io/hc/article_attachments/4402634550669" alt="multiple flags.png" />
  </p>

  <p>
    <img src="https://help.split.io/hc/article_attachments/4402634551437" alt="one flag.png" />
  </p>

  If you click on the flag name or the text telling you how many flags there are, a dialog box opens with a link to the flag, the primary environment, the status of each flag, and the last time the flag was saved.
 
  For Rollout details, if you only use the Default rule, it shows you the percentage that is allocated to the same treatment you chose for the Default treatment. Otherwise, it shows you the number of rules that you have on the flag. 

  <p>
    <img src="https://help.split.io/hc/article_attachments/4402634551693" alt="rollout details.png" />
  </p>

**Note: Since you can navigate to the feature flag, we no longer send and store all of the changes in Jira.**
 
# Disconnecting an issue
 
You can disconnect an issue from a feature flag, on the Integrations tab of the flag.
