---
title: SEI GitHub Enterprise integration
description: Integrate SEI with GitHub Enterprise
sidebar_position: 95
sidebar_label: GitHub Enterprise
---

GitHub Enterprise is a self-hosted, on-premises version of GitHub.&#x20;

It provides organizations with the tools and features of GitHub, but allows them to host and manage their repositories and collaboration tools within their own infrastructure for enhanced security and control.

Use the SEI Github Enterprise integration to integrate SEI with Github Enterprise.

## Configure the authentication

SEI communicates with Github Enterprise by setting up authentication using a **Personal Access Token (PAT)**. you must create a GitHub personal access token to configure the SEI GitHub integration. To learn more on this, Go to [Configuring the authentication](./sei-integration-github#configure-authentication).

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Configure the integration

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Cloud" default>
```

1. Select **Integrations** under **Settings**.
2. Select **Available Integrations**, locate the **GitHub Enterprise** integration.
3. Select **Install**.
4. Add the **username** & Paste the **personal access token** in the **PAT** **section**. (Note: You can add multiple PATs for the same integration)
5. In the **URL** field, add the URL where your GitHub repository is deployed.&#x20;
6. Select repositories to associate with the integration or select **Ingest All Repos** to associate all current and future repos in your GitHub organization.
7. If applicable, configure **Additional Options**:
   1. **Fetch PRs**: Allow SEI to ingest PR data from GitHub.
   2. **Fetch Issues**: Allow SEI to ingest data from GitHub Issues.
   3. **Fetch Projects**: Allow SEI to ingest data from GitHub Projects.
   4. **Fetch Commits**: Allow SEI to ingest commit metadata from GitHub.
   5. **Fetch Commit Files**: Allow SEI to ingest data within commits from GitHub.
   6. **Connect via GitHub webhook**: Select this option if you want GitHub to push data to SEI through a webhook, rather than SEI pulling data from GitHub. This is an advanced configuration and only recommended if you are confident about using this configuration.
8. In Integration **Name**, enter a name for the integration.
9. Finish configuration and **Save** the integration.

```mdx-code-block
  </TabItem>
  <TabItem value="satellite" label="Satellite">
```

The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud, with the exception of using satellite to communicate with the Github enterprise server.

Make sure to select the satellite integration checkbox while configuring the integration.

Here’s a sample `satellite.yml` file:

```
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api'
integrations:
  - id: '<INTEGRATION_ID>'
    application: github_enterprise
    url: 'https://api.github.com'
    metadata:
      repos: <REPOSITORIES>
      is_push_based: true
      fetch_commits: true
      fetch_prs: true
      fetch_issues: true
      fetch_projects: true
      fetch_commit_files: true
      auto_register_webhook: true
    authentication: multiple_api_keys
    keys:
      - api_key: <GITHUB_PAT_1>
        user_name: <GITHUB_USERNAME>
      - api_key: <GITHUB_PAT_2>
        user_name: <GITHUB_USERNAME>

```

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

```mdx-code-block
  </TabItem>
</Tabs>
```