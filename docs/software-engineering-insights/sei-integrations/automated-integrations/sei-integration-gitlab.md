---
title: SEI GitLab Cloud integration
description: Integrate SEI with GitLab Cloud.
sidebar_position: 100
sidebar_label: GitLab Cloud
---

GitLab is a DevOps platform that provides Git repos, CI/CD pipelines, issue management, and more.

To integrate SEI with Gitlab, you must choose your Gitlab Account type. SEI supports connecting with the following:

* Gitlab Cloud
* Gitlab Enterprise

To integrate with Gitlab Enterprise, go to [Connect with Gitlab Enterprise](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab-enterprise).

## Configure authentication

The SEI GitLab integration can use either OAuth or personal access token authentication.

For OAuth, your account must have the **Reporter** role or higher.

If you can't use OAuth, you must create a GitLab personal access token to configure the SEI GitLab integration.

1. Log in to your GitLab account and create a personal access token. For instructions, go to the GitLab documentation on [Personal Access Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
2. Select the `api` scope with complete read/write API access.
3. Copy the token somewhere that you can retrieve it when you configure the integration.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Connect with Gitlab Cloud

<Tabs>
  <TabItem value="oauth" label="Using OAuth" default>

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab Cloud** integration, and select **Install**.

  To integrate with an on-premises, privately-hosted GitLab instance, install the **GitLab Enterprise** integration with API key (personal access token) authentication and an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

4. Select the authentication medium as OAuth and select **Authorize** and follow the prompts to grant access to GitLab.
5. In **Integration Name**, enter a name for the integration.
6. Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.


</TabItem>
  <TabItem value="pat" label="Using PAT">

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab Cloud** integration, and select **Install**.

  To integrate with an on-premises, privately-hosted GitLab instance, install the **GitLab Enterprise** integration with API key (personal access token) authentication and an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

4. Select the authentication medium as Using Personal Access Token (PAT).
   1. In **Integration Name**, enter a name for the integration.
   2. Paste the previously generated Personal Access Token.
5. Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.

</TabItem>
</Tabs>

## Connect with Gitlab On-Prem

To integrate SEI with GitLab Enterprise, you have two options based on the accessibility of your GitLab instance:

Private on-premise GitLab Integration: Integration with a private instance of GitLab using an API key.
Public on-premise GitLab Integration: Integration of on-premise instance of GitLab that is publicly accessible using an API key.

<Tabs>
  <TabItem value="private-cloud" label="Private Cloud" default>

The steps for configuring the integration with Gitlab Private Cloud using the **Ingestion Satellite** is similar to configuring the integration on cloud using the **Personal Access Token**, with the exception of using satellite to communicate with the Gitlab server.

1. In **Integration Name**, enter a name for the integration.
2. Add a **Description** for the integration. (Optional)
3. In the **URL** field, add the URL where your Gitlab repository is deployed.
4. Enter the **Personal Access Token** that you previously generated for the Gitlab account.
5. If applicable, configure **Additional Options**:
   1. **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
   2. **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
   3. **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
   4. **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
   5. **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
6. Click on **Download YAML File** and save the `satellite.yml` file. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

If you experience any issues while configuring the integration using the Ingestion Satellite, refer to the [Ingestion Satellite Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

Here’s a sample `satellite.yml` file:

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the Environment of your Harness Account.
integrations:
  - id: '<INTEGRATION_ID>' # For ex: 4691
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

Use the following optional metadata fields to optimize the ingestion functionality while configuring the integration using the Ingestion Satellite:

| Name | Field | Values | Properties |
| - | - | - | - |
| Check Project Membership | `check_project_membership` | The supported values are True/False. By default, this field is set to `True`. | When set to `True`, SEI selectively considers projects based on token owner membership. For self-hosted Gitlab instances, switching to `False` enables SEI to fetch all projects, regardless of the membership. You should never disable this for cloud Gitlab instances. |
| Fetch PR Patches | `fetch_pr_patches` | The supported values are `True/False` | This field determines whether to retrieve patches or file differentials for Pull Requests (PRs). | 
| Fetch Commit Patches | `fetch_commit_patches` | The supported values are `True/False` | This field governs the inclusion of commit patches or file differentials in the data. |
| Fetch Pipelines | `fetch_pipelines` | The supported values are `True/False` | This field specifies whether to fetch pipeline data. |
| PR Commit Limit | `pr_commit_limit` | Default value: 250 | This field sets a cap on the number of commits fetched per Pull Request. |

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).
