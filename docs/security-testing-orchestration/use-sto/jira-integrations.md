---
title: Create Jira tickets for detected issues
description: You can easily create Jira tickets for any issue detected during an STO build.
sidebar_position: 200
---

```mdx-code-block
import create_ticket from './static/jira-integration-02-create-ticket.png'
import ticket_num from './static/jira-integration-03-ticket-num-in-issue-details.png'
import issue_link from './static/jira-integration-04-link-in-jira-ticket.png'
import ticket_summary from './static/jira-integration-05-ticket-summary.png'
```


You can easily create Jira tickets for issues detected during an STO build. This topic describes how to set up this integration

:::note
* This feature is not supported in Self-Managed Enterprise Edition.
* This feature is behind the Feature Flag `STO_JIRA_INTEGRATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

## Set up the Jira integration

1. Create an API key for your Jira account. For more information, go to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) in the Atlassian documentation.

2. Create a Jira connector as described in [Connect to Jira](/docs/platform/7_Connectors/connect-to-jira). Note the following:
    * Create your connector at the Account level.
    * Create a [text secret](/docs/platform/security/add-use-text-secrets/) for your Atlassiant API key. 

3. Go to the **Account Settings** &gt; **Tickets** page and select the following: 
   
    1. The Jira connector you just created.
 
    2. The default Jira project where you want to create your tickets. (You can select a different project when you create a ticket.)

       ![](./static/jira-integration-00-select-connector.png)

## Create a Jira ticket from a detected issue

:::note
You can only create Jira tickets for [targets](/docs/security-testing-orchestration/onboard-sto/tutorial-1-standalone-workflows#viewing-security-test-results) that have [baselines](http://localhost:3000/docs/security-testing-orchestration/onboard-sto/tutorial-1-standalone-workflows#setting-baselines) specified.
:::

1. Go to the **Pipeline Execution** &gt; **Security Tests** page with the detected issue. 

2. Click on the issue to select it. Then click **Create Ticket**. 

   ![](./static/jira-integration-01-create-ticket.png)

3. In **Create Ticket in Jira**, set the options as follows:

    1. **Scope** Create a separate ticket for each target in the project (**This target**), or create one ticket for the issue across all targets in the project (**This project**).

    2. **Jira Project** The Jira project for the ticket. The Jira connector populates this list based on the projects in your Jira account.

    3. **Issue Type** The Jira ticket type. 

    4. **Title** The Jira ticket title. 

    5. **Notes** Any notes you want to add to the ticket. 

       ```mdx-code-block
       <img src={create_ticket} alt="Create Jira Ticket options" height="50%" width="50%" />
       ```

4. Click **Create**. The Jira connector sends the request to the Jira API and Jira creates the ticket. 


Note the following: 

   * In the Issue Details pane, the **Create Ticket** button is replace with the Jira ticket number.
   
      ```mdx-code-block
      <img src={ticket_num} alt="Jira ticket number in STO UI" height="50%" width="50%" />
      ```

   * The Jira ticket includes a link back to the issue in the STO UI.
   
      ```mdx-code-block
      <img src={issue_link} alt="STO issue link in Jira ticket" height="50%" width="50%" />
      ```

   * The link in the Jira ticket points back a **Ticket Summary** that shows all detected issues tracked by the ticket.
   
      ```mdx-code-block
      <img src={ticket_summary} alt="STO issue link in Jira ticket" height="75%" width="75%" />
      ```




