---
title: Connect to Jira
description: Connect Harness to Jira as a Harness Jira Connector.
# sidebar_position: 2
helpdocs_topic_id: e6s32ec7i7
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

You can connect Harness to Jira using a Harness Jira Connector. This Connector allows you to create and update Jira issues, and to use Jira issues in Approval steps.

Looking for How-tos? See [Create Jira Issues in CD Stages](https://docs.harness.io/article/yu40zr6cvm-create-jira-issues-in-cd-stages), [Update Jira Issues in CD Stages](https://docs.harness.io/article/urdkli9e74-update-jira-issues-in-cd-stages), and [Adding Jira Approval Stages and Steps](../9_Approvals/adding-jira-approval-stages.md).

### Before you begin

* [Learn Harness' Key Concepts](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)

### Limitations

* Your Jira REST API account must have permissions to create and edit issues in the relevant Jira projects. The **Administer Jira** permission includes all relevant permissions (as does the **Administrator** or **Member** permission on [Jira next-gen](https://confluence.atlassian.com/jirasoftwarecloud/overview-of-permissions-in-next-gen-projects-959283605.html)).  
For details, see Atlassian's documentation on [Operation Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#permissions), [Issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#api-group-Issues), and [Managing Project Permissions](https://confluence.atlassian.com/adminjiracloud/managing-project-permissions-776636362.html#Managingprojectpermissions-Projectpermissionsoverview).
* When you set up the Jira Connector, **Username** requires the **full email address** you use to log into Jira.

### Step: Add Jira Connector

You can add a Jira Connector at the Project, Org, or Account level. We'll cover Projects here. The process is the same for Org and Account.

You can also add the Jira Connector when setting up the Jira Create, Jira Approval, or Jira Update steps. We'll cover adding it to the Project's Connectors here.

Open a Harness Project.

In **Project Setup**, click **Connectors**.

Click **New Connector**, and then click **Jira**. The Jira Connector settings appear.

In **Name**, enter a name for this connection. You will use this name to select this connection in Jira steps.

Click **Continue**.

In **URL**, enter the base URL by which your users access your Jira applications. For example: `https://mycompany.atlassian.net`.

In Jira, the base URL is set to the same URL that Web browsers use to view your Jira instance. For details, see [Configuring the Base URL](https://confluence.atlassian.com/adminjiraserver071/configuring-the-base-url-802593107.html) from Atlassian.If you are using on-premises Jira server with HTTPS redirects enabled, use the HTTPS URL to ensure the [JIRA client follows redirects](https://confluence.atlassian.com/adminjiraserver/running-jira-applications-over-ssl-or-https-938847764.html#:~:text=If%20you%20want%20to%20only,to%20the%20corresponding%20HTTPS%20URLs.).Enter your credentials. For username, use the **full email address** you use to log into Jira.

For **API Key**, use a Harness [Text Secret](../6_Security/2-add-use-text-secrets.md). See [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) from Atlassian.

Click **Continue**.

Select the Harness Delegate(s) to use when making a connection to Jira using this Connector.

Click **Save and Continue**.

Harness tests the connection.

![](./static/connect-to-jira-42.png)
Click **Finish**.

The Jira Connector is listed in Connectors.

### See also

* [Create Jira Issues in CD Stages](https://docs.harness.io/article/yu40zr6cvm-create-jira-issues-in-cd-stages)
* [Update Jira Issues in CD Stages](https://docs.harness.io/article/urdkli9e74-update-jira-issues-in-cd-stages)
* [Adding Jira Approval Stages and Steps](../9_Approvals/adding-jira-approval-stages.md)
* [Adding Jira Approval Stages](../9_Approvals/adding-jira-approval-stages.md)

