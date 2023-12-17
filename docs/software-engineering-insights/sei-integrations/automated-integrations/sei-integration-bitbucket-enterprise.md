---
title: SEI Bitbucket enterprise integration
description: Integrate SEI with Bitbucket enterprise.
sidebar_position: 30
sidebar_label: Bitbucket enterprise
---

Bitbucket is a web-based version control repository hosting service, for source code and development projects that use either Mercurial or Git revision control systems.

Use the SEI Bitbucket integration to integrate SEI with Bitbucket Cloud or Bitbucket Enterprise.

## Requirements

The following permissions and settings are required to use the SEI Bitbucket integration:

* You have a Bitbucket account.
* Your role is **Member** or higher.

## Configure the integration

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="private-onprem" label="Private On-Prem" default>
```

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **Integrations** under **Settings**.
3. Select **Available Integrations**, and locate the **Bitbucket Enterprise** integration, and select **Install**
4. Select Install.
5. Configure and **save** the integration.
   * Provide a **name** for the integration.
   * The **Description** and **Tags** are optional.
   * Enter the **URL** for the **Bitbucket private instance** in the format `https://bitbucket.org/<teamName_or_username>/<repo-name>/src`
   * Enter your **username**
   * Enter the **Bitbucket API Key**. To generate an API key for your Bitbucket instance, go to [Managing API tokens for Bitbucket](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).&#x20;
   * Enter **tags** and the **list of repositories** you want to ingest. You can leave this option blank if you want to ingest all the repositories from organizations accessible to the token user.
   * You can select the **filters** to define the type of data you want to ingest. The available options are **Fetch Commits**, **Fetch PRs**, **Fetch PRs Reviews**, **Fetch Commits Fields**.
   * Download the `satellite.yml` file and update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you encounter any issues during the integration process, go to the [Satellite integration Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample satellite.yaml file generated for the Bitbucket enterprise integration:

```yaml
satellite:
  tenant: foo
  api_key: <sei-api-key>
  url: 'https://testapi1.propelo.ai'
integrations:
  - id: '4675'
    application: bitbucket_server
    url: 'https://bitbucket.org/<teamName_or_username>/<repo-name>/src'
    username: dhruba-docs
    api_key: <bitbucket-api-key>
    metadata:
      fetch_prs: true
      fetch_pr_reviews: true
      fetch_commits: true
      fetch_commit_files: true
      repos: docs-repo
    satellite: true

```

```mdx-code-block
  </TabItem>
  <TabItem value="public-onprem" label="Public On-Prem">
```
The steps for configuring the public on-premises integration for Bitbucket is similar to the private on-premises integration, with the exception of using satellite to communicate with the Bitbucket server. Instead, the public on-premises integration directly uses the credentials provided by the user to authenticate with the Bitbucket server.


```mdx-code-block
  </TabItem>
</Tabs>
```