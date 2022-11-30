---
title: Jira Connector Settings Reference
description: This topic describes the settings and permissions for the Jira Connector.
# sidebar_position: 2
helpdocs_topic_id: ud8rysntnz
helpdocs_category_id: r8mi3j15it
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the settings and permissions for the Jira Connector.

You can connect Harness to Jira using a Harness Jira Connector. This Connector allows you to create and update Jira issues, and to use Jira issues in Approval steps.

For instructions on how to set up this Connector, see [Connect to Jira](../../7_Connectors/connect-to-jira.md).

Looking for How-tos? See [Create Jira Issues in CD Stages](https://docs.harness.io/article/yu40zr6cvm-create-jira-issues-in-cd-stages), [Update Jira Issues in CD Stages](https://newdocs.helpdocs.io/article/urdkli9e74-update-jira-issues-in-cd-stages), and [Adding Jira Approval Stages and Steps](../adding-jira-approval-stages.md).

### Limitations

Your Jira REST API account must have permissions to create and edit issues in the relevant Jira projects. The **Administer Jira** permission includes all relevant permissions (as does the **Administrator** or **Member** permission on [Jira next-gen](https://confluence.atlassian.com/jirasoftwarecloud/overview-of-permissions-in-next-gen-projects-959283605.html)).

For details, see Atlassian's documentation on [Operation Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#permissions), [Issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#api-group-Issues), and [Managing Project Permissions](https://confluence.atlassian.com/adminjiracloud/managing-project-permissions-776636362.html#Managingprojectpermissions-Projectpermissionsoverview).

### Name

Enter a name for this Connector. You will use this name to select the Connector in Pipeline steps and settings.

### URL

Enter the base URL by which your users access your Jira applications. For example: `https://mycompany.atlassian.net`.

In Jira, the base URL is set to the same URL that Web browsers use to view your Jira instance. For details, see [Configuring the Base URL](https://confluence.atlassian.com/adminjiraserver071/configuring-the-base-url-802593107.html) from Atlassian.If you are using the on-premises Jira server with HTTPS redirects enabled, use the HTTPS URL to ensure the [JIRA client follows redirects](https://confluence.atlassian.com/adminjiraserver/running-jira-applications-over-ssl-or-https-938847764.html#:~:text=If%20you%20want%20to%20only,to%20the%20corresponding%20HTTPS%20URLs.).

### Credentials

Enter your credentials. For **API Key**, use a Harness [Text Secret](../../6_Security/2-add-use-text-secrets.md). See [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) from Atlassian.

### See also

* [Create Jira Issues in CD Stages](https://docs.harness.io/article/yu40zr6cvm-create-jira-issues-in-cd-stages)
* [Update Jira Issues in CD Stages](https://docs.harness.io/article/urdkli9e74-update-jira-issues-in-cd-stages)
* [Using Jira Approval Steps in CD Stages](https://newdocs.helpdocs.io/article/urdkli9e74-update-jira-issues-in-cd-stages)
* [Adding Jira Approval Stages](../adding-jira-approval-stages.md)

