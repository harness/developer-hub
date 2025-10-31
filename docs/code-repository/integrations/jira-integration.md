---
title: Harness Code Repository for JIRA Integration
description: The Harness Code Repository for JIRA app enables visibility between your code and issue tracking workflows. It links Harness repositories with JIRA issues so that branches, commits, and pull requests show up in JIRA under the Development panel.
sidebar_position: 10
---

The Harness Code Repository for JIRA app enables visibility between your code and issue tracking workflows. It links Harness repositories with JIRA issues so that branches, commits, and pull requests show up in JIRA under the Development panel.

Marketplace link: [Harness Code Repository for JIRA](https://marketplace.atlassian.com/apps/1235560/harness-code-repository-for-jira)

## Prerequisites

Before configuring the integration, ensure you have:

- [A Harness Access Token](/docs/platform/automation/api/add-and-manage-api-keys/). Note: The Harness user whose access token is being used must have **Account Admin** permissions on the account.
- The Harness Base URL (e.g., `https://app.harness.io` or your custom domain).
- JIRA Admin Permissions (You must be a JIRA admin or work with someone who has admin access to complete the integration).

## Installation and Setup
1. Install the App
From the Atlassian Marketplace:
- Go to Harness Code Repository for JIRA
- Click **Get it now** and follow the prompts to install the app in your JIRA instance.
2. Configure the App
After installation, you’ll be prompted to enter the following:
- Harness Access Token
- Harness Base URL
3. Select Repository Scope
After authentication, you can select a repository to link with JIRA. Use one of the following scope options:
- Account-level
- Organization-level
- Project-level

Once a repository is connected, you'll see it listed under the Harness Code Repository Configuration section. Use the `...` menu to either configure the connection or disconnect it.

:::note
- One Account/Org/Project can only be integrated with a single Jira instance at a time.
- To connect to a different Jira instance, delete the existing configuration and create a new one.
- You cannot change the scope of an existing configuration (e.g., from project to org or account).
- If the configuration was created at the project scope, you can still add or remove projects within that scope.
- To change scopes entirely, delete the current configuration and create a new one at the desired scope.
:::

## How it Works
Once the integration is configured:
- Use the JIRA issue key (e.g., PROJ-123) in the title or the description of your pull request in Harness.
- The PR, along with any linked commits and branches, will automatically appear in the JIRA Development panel under:
    - Branches
    - Commits
    - Pull Requests
- The PR author, PR summary, PR status, PR reviewer and other details will appear under the respective pull requests.
- These entries will link back to the corresponding objects in the Harness Code Repository.
- When a PR is merged or closed in Harness, the status will be reflected in JIRA.
