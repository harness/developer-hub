---
title: Jira Integration
description: Integrate AI Test Automation with Jira to create and manage issues directly from test runs
sidebar_position: 30
---

# Jira Integration

The Jira integration in Harness AI Test Automation enables you to create Jira tickets directly from your test runs. This integration helps you track issues and improve collaboration between testing and development teams by allowing you to document test failures, add comments, and create Jira issues without leaving the Harness platform.

With this integration, you can:

- Create Jira tickets directly from failed test runs
- Link test failures to Jira issues for better visibility across teams
- Add comments and failure reasons alongside Jira ticket creation
- Include test execution details automatically in Jira tickets
- Manage test results and issue tracking in one place

## Prerequisites

Before you can use the Jira integration, you need to:

1. **Set up a Jira Connector in Harness**: You must have a configured and tested Jira connector in your Harness account, organization, or project.
   
   To create a Jira connector, refer to [Connect to Jira](/docs/platform/connectors/ticketing-systems/connect-to-jira).

2. **Jira Permissions**: Ensure your Jira account has the necessary permissions to create and edit issues in the relevant Jira projects.

## How It Works

The AI Test Automation provides a **Comments & Issues** panel within the test run details page. From this panel, you can:

1. Add comments to document test failures or observations
2. Create Jira tickets linked to specific test failures
3. View existing comments and linked Jira issues

## Using the Jira Integration

### Accessing the Comments & Issues Panel

1. Navigate to your **Test Runs** page in AI Test Automation
2. Select the test run you want to review
3. Click on the specific test case you want to document or create an issue for
4. On the test details screen, click on the **Comments & Issues** tab

The Comments & Issues panel displays two main sections:
- **Comment** section - For adding comments and selecting failure reasons
- **Jira Integration** section - For creating and viewing Jira tickets

<DocImage path={require('./static/jira-integratio.png')} alt="Comments & Issues Panel" title="Comments & Issues Panel" width="80%" />

### Adding Comments

The **Comment** section allows you to document test failures, observations, or any relevant information. You can anytime come and edit the information added.

To add a comment:

1. In the **Comment** section, select a reason from the **Select Reason** dropdown (optional)
2. Enter your comment in the **Add Comment** text field
3. Click **Save** to save your comment, or click **Cancel** to discard your changes

Comments are stored with the test run and can be viewed and edited by your team members at any time.

### Creating a Jira Ticket

To create a Jira ticket:

1. In the **Jira Integration** section, click the **+ Create New Jira Ticket** button
2. A dialog window will appear with the following fields:

<DocImage path={require('./static/create-issue.png')} alt="Create Jira Ticket Dialog" title="Create Jira Ticket Dialog" width="60%" />

   **Required Fields:**
   - **Project** - Select the Jira project where the issue will be created
   - **Issue Type** - Choose the type of issue (e.g., Bug, Task, Story)
   - **Summary** - Provide a brief summary of the issue
   - **Priority** - Set the priority level for the issue
   - **Description** - Provide detailed information about the test failure. If you already added a comment in the Comment section above, it will automatically populate here. Otherwise, the default description is "Test execution failed"

   **Additional Fields:**
   - Depending on your selected Project and Issue Type, additional custom fields may appear that are specific to your Jira configuration

3. Fill in the required fields and any additional fields as needed
4. Click **Create** to create the Jira ticket

:::tip
You can add a comment first to document the failure reason, and it will automatically populate in the Jira ticket's Description field. Alternatively, you can enter the description directly when creating the ticket.
:::

:::info Dynamic Fields
The available fields in the Jira ticket creation dialog are dynamically populated based on:
- Your selected Jira Project
- Your selected Issue Type
- Your Jira project's custom field configuration

The dropdown options will only be available when your Jira connector is properly configured, tested, and working.
:::

### Viewing Linked Jira Issues

Once a Jira ticket is created, it appears in the **Jira Integration** section below the "Create new Jira ticket" button. All tickets linked to this test are displayed in a table format with the following columns:

- **JIRA TICKET** - The Jira ticket ID (e.g., AI-2030). This is a clickable link that opens the ticket in Jira
- **CREATOR** - The email address of the user who created the ticket
- **ACTION** - Contains a **View Ticket** link with an external link icon to open the ticket directly in Jira

You can click either the ticket ID or the **View Ticket** link to open the full Jira issue.

#### What's Included in the Jira Ticket

When you open the Jira ticket, it automatically includes comprehensive test execution details:

<DocImage path={require('./static/jira-created.png')} alt="Jira Ticket with Test Execution Details" title="Jira Ticket with Test Execution Details" width="80%" />

The Jira ticket contains:

**Standard Jira Fields:**
- **Priority** - The priority level you selected (e.g., P3)
- **Severity** - Can be added as an additional option
- **Description** - Your provided description or the comment you added earlier

**Automated Test Execution Details:**

The integration automatically appends test execution context to the ticket description:

- **Test Name** - The name of the test that failed (e.g., "checkout liner")
- **Test Run ID** - The unique identifier for the test run (e.g., 982313)
- **Test Run Link** - A "View Test Run" link that takes you directly back to the test run in Harness AI Test Automation
- **Source Attribution** - A note indicating the ticket was "Created via AI Test Automation"

This automatic context ensures that developers have all the information they need to investigate and resolve the issue without having to manually track down test execution details.


## Troubleshooting

### Jira Connector Not Working

If you cannot see Jira projects or issue types in the dropdown:

1. Verify your Jira connector is properly configured in Harness
2. Test the Jira connector connection in **Project Setup** → **Connectors**
3. Ensure your Jira credentials have the necessary permissions
4. Check that the Harness Delegate can reach your Jira instance

### Missing Custom Fields

If expected custom fields are not appearing:

1. Verify the fields are configured for the selected Project and Issue Type in Jira
2. Ensure your Jira account has permission to view and edit those fields
3. Check that the fields are not hidden or restricted in your Jira project settings

