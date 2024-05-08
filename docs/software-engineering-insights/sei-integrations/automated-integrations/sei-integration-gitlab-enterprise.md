---
title: SEI GitLab Enterprise integration
description: Integrate SEI with GitLab Enterprise.
sidebar_position: 105
sidebar_label: GitLab Enterprise
---

GitLab Enterprise is a commercial, self-hosted version of the GitLab platform.

It offers advanced features and support for organizations, making it suitable for large enterprises and businesses that require enhanced security, scalability, and customization options for their software development and DevOps workflows.

Use the SEI Gitlab Enterprise integration to integrate SEI with Gitlab Enterprise.

To integrate SEI with GitLab Enterprise, you have two options based on the accessibility of your GitLab instance:

* **Private on-premise GitLab Integratio**n: Integration with a private instance of GitLab using an API key.
* **Public on-premise GitLab Integration**: Integration of on-premise instance of GitLab that is publicly accessible using an API key.

## Configure the authentication

SEI communicates with GitLab Enterprise by setting up authentication using a **Personal Access Token (PAT)**. you must create a GitLab personal access token to configure the **SEI Gitlab integration**. To learn more on this, Go to [Configuring the authentication](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab#configure-authentication).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configue the integration

<Tabs>
  <TabItem value="private-onprem" label="Private On-Prem" default>

The private on-premise integrations are configured using a SEI Satellite. Follow the instructions to download the Satellite configuration file.

1. Select **Integrations** under **Settings**.
2. Select **Available Integrations**, locate the **GitLab Enterprise** integration, and select **Install**.
3. Select **Private on-premise** GitLab Integration
4. In Integration **Name**, enter a name for the integration.
5. Add a **Description** for the integration. (Optional)
6. In the **URL** field, add the URL where your Gitlab Application instance is deployed.
7. Enter the **Personal Access Token** in the API key section.
8. Add the **Tags** for the integration
9. If applicable, configure Additional Options:
   1. **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
   2. **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
   3. **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
   4. **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
   5. **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
10. Select **Next** and click on **Download Config** and save the `satellite.yml` file. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you experience any issues while configuring the integration using the Ingestion Satellite, refer to the [Ingestion Satellite Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample `satellite.yml` file:

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the Environment of your Harness Account.
integrations:
  - id: '<INTEGRATION_ID>' # For ex: 4692
    application: gitlab
    url: '<GITLAB_INSTANCE_URL>'
    api_key: <GITLAB_PAT>
    metadata:
      fetch_prs: true
      fetch_issues: true
      fetch_projects: true
      fetch_commits: true
      fetch_commit_files: true
      fetch_users: true

```

Use the following are optional metadata to optimize the ingestion functionality while configuring the integration using the Ingestion Satellite:

| Name | Field | Values | Properties |
| - | - | - | - |
| Check Project Membership | `check_project_membership` | The supported valuesa are True/False. By default, this field is set to `True`. | When set to `True`, SEI selectively considers projects based on token owner membership. For self-hosted Gitlab instances, switching to `False` enables SEI to fetch all projects, regardless of the membership. You should never disable this for cloud Gitlab instances. |
| Fetch PR Patches | `fetch_pr_patches` | The supported values are `True/False` | This field determines whether to retrieve patches or file differentials for Pull Requests (PRs). | 
| Fetch Commit Patches | `fetch_commit_patches` | The supported values are `True/False` | This field governs the inclusion of commit patches or file differentials in the data. |
| Fetch Pipelines | `fetch_pipelines` | The supported values are `True/False` | This field specifies whether to fetch pipeline data. |
| PR Commit Limit | `pr_commit_limit` | Default value: 250 | This field sets a cap on the number of commits fetched per Pull Request. |

</TabItem>
  <TabItem value="public-onprem" label="Public On-Prem">

1. Select **Integrations** under **Settings**.
2. Select **Available Integrations**, locate the **GitLab Enterprise integration**, and select **Install**.
3. Select **Public On-Premise** GitLab Integration
4. In Integration **Name**, enter a name for the integration.
5. Add a **Description** for the integration. (Optional)
6. In the **URL** field, add the URL where your Gitlab repository is deployed.
7. Enter the **Personal Access Token** in the API key section.
8. Add the **Tags** for the integration
9. If applicable, configure **Additional Option**s:
   1. **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
   2. **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
   3. **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
   4. **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
   5. **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
10. Finish the configuration and click on **Submit**.

</TabItem>
</Tabs>
