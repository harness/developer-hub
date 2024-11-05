---
title: Connect with GitLab On-Prem
description: Integrate SEI with GitLab On-Prem
sidebar_position: 15
sidebar_label: Connect with  GitLab On-Prem
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate SEI with GitLab Enterprise, you have two options based on the accessibility of your GitLab instance:

* **Private On-Premise GitLab (Gitlab Enterprise On-Prem):** Integrate Harness SEI with the private instance of GitLab using the Ingestion Satellite.
* **Public On-Premise GitLab:** Integrate Harness SEI with the on-premise instance of GitLab that is publicly accessible using the Personal Access Token.

### Configure authentication

The SEI GitLab integration can use either OAuth or personal access token authentication.

For OAuth, your account must have the **Reporter** role or higher.

If you can't use OAuth, you must create a GitLab personal access token to configure the SEI GitLab integration.

1. Log in to your GitLab account and create a personal access token. For instructions, go to the GitLab documentation on [Personal Access Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
2. Select the `api` scope with complete read/write API access.
3. Copy the token somewhere that you can retrieve it when you configure the integration.

### Add the integration

Follow the steps below to configure the integration:

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab** integration, and select **Install**.

<Tabs>
  <TabItem value="private-onprem" label="Gitlab Private On-Prem" default>

Use this authentication method to integrate Harness SEI with Gitlab Enterprise (i.e. Gitlab Private On-Prem). Follow the steps below to configure the integration:

* Choose the type of **Gitlab Account** as **Gitlab Satellite** and select **Gitlab Enterprise On-Prem**.
* In **Integration Name**, enter a name for the integration.
* Add a **Description** for the integration. (Optional)
* In the **URL** field, add the URL where your Gitlab repository is deployed.
* Enter the **Personal Access Token** that you previously generated for the Gitlab account.
* If applicable, configure **Additional Options**:
  * **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
  * **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
  * **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
  * **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
  * **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
* Click on **Download YAML File** and save the `satellite.yml` file. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you experience any issues while configuring the integration using the Ingestion Satellite, refer to the [Ingestion Satellite Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample `satellite.yml` file:

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' 
  # Note that this URL is relative to the Environment of your Harness Account.

integrations:
  - id: '<INTEGRATION_ID>' 
  # For ex: 4691
    application: gitlab
    url: '<GITLAB_INSTANCE_URL>'
    metadata:
      fetch_prs: true
      fetch_issues: true
      fetch_projects: true
      fetch_commits: true
      fetch_commit_files: true
    authentication: apikey

```
</TabItem>

<TabItem value="public-onprem" label="Github Public On-Prem">

Use this authentication method to integrate Harness SEI with Gitlab Enterprise On-Prem (i.e. Gitlab Public On-Prem). Follow the steps below to configure the integration:

* Choose the type of **Gitlab Account** as **Gitlab Enterprise**
* In **Integration Name**, enter a name for the integration.
* Add a **Description** for the integration. (Optional)
* In the **URL** field, add the URL where your Gitlab repository is deployed.
* Enter the **Personal Access Token** that you previously generated for the Gitlab account.
* If applicable, configure **Additional Options**:
  * **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
  * **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
  * **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
  * **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
  * **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
* Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.

</TabItem>
</Tabs>

### Supported metadata fields

Use the following optional metadata fields to optimize the ingestion functionality while configuring the integration using the Ingestion Satellite:

| Name | Field | Values | Properties |
| - | - | - | - |
| Check Project Membership | `check_project_membership` | The supported values are True/False. By default, this field is set to `True`. | When set to `True`, SEI selectively considers projects based on token owner membership. For self-hosted Gitlab instances, switching to `False` enables SEI to fetch all projects, regardless of the membership. You should never disable this for cloud Gitlab instances. |
| Fetch PR Patches | `fetch_pr_patches` | The supported values are `True/False` | This field determines whether to retrieve patches or file differentials for Pull Requests (PRs). | 
| Fetch Commit Patches | `fetch_commit_patches` | The supported values are `True/False` | This field governs the inclusion of commit patches or file differentials in the data. |
| Fetch Pipelines | `fetch_pipelines` | The supported values are `True/False` | This field specifies whether to fetch pipeline data. |
| PR Commit Limit | `pr_commit_limit` | Default value: 250 | This field sets a cap on the number of commits fetched per Pull Request. |

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

### See also

* [Connect with GitLab Private Cloud](/docs/software-engineering-insights/sei-integrations/gitlab/sei-gitlab-private-cloud)
* [Connect with GitLab Cloud](/docs/software-engineering-insights/sei-integrations/gitlab/sei-integration-gitlab)
* [Reauthenticate](/docs/software-engineering-insights/sei-integrations/reauthenticate-integration)
* [Recommendations](/docs/software-engineering-insights/sei-integrations/gitlab/sei-gitlab-recommendations)