---
title: SEI GitLab integration
description: Integrate SEI with GitLab Cloud/Enterprise.
sidebar_position: 100
sidebar_label: GitLab
redirect_from:
  - docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab       
---

GitLab is a DevOps platform that provides Git repos, CI/CD pipelines, issue management, and more.

To integrate SEI with Gitlab, you must choose your Gitlab Account type. SEI supports connecting with the following:

* Gitlab Cloud
* Gitlab Private Cloud
* Gitlab Enterprise

To integrate with Gitlab Enterprise, go to [Connect with Gitlab Enterprise](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab).

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

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab** integration, and select **Install**.
4. Choose the type of **Gitlab Account** as **Cloud**.

<Tabs>
  <TabItem value="oauth" label="Using OAuth" default>

* Select the authentication medium as **Using OAuth** and follow the prompts to grant access to GitLab.
* In **Integration Name**, enter a name for the integration.
* Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.

</TabItem>
  <TabItem value="pat" label="Using Personal Access Token">

This authentication method is simple to set up and is suitable for various API interactions. Note that the access token needs periodic renewal based on the timeline of the generated token. 

* Select the authentication medium as **Using Personal Access Token (PAT)**.
* In **Integration Name**, enter a name for the integration.
* Paste the previously generated Personal Access Token.
* Click on **Validate Connection** to run the pre-flight checks and validate the connection. Once successful, you'll have the integration set up under the **Your Integrations** tab.

</TabItem>
</Tabs>

## Connect with Gitlab Private Cloud

To connect Harness SEI with Github Private Cloud, you'll need to use the [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/run-the-satellite-container).

Follow the steps below to configure the integration:

1. In your **Harness Project**, go to the **SEI Module**, and select **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab** integration, and select **Install**.
4. Choose the type of **Gitlab Account** as **Gitlab Satellite** and select the **Gitlab Private Cloud** option.
5. In **Integration Name**, enter a name for the integration.
6. Add a **Description** for the integration. (Optional)
7. In the **URL** field, add the URL where your Gitlab repository is deployed.
8. Enter the **Personal Access Token** that you previously generated for the Gitlab account.
9. If applicable, configure **Additional Options**:
   1. **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
   2. **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
   3. **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
   4. **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
   5. **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
10. Click on **Download YAML File** and save the `satellite.yml` file. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

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

## Connect with Gitlab On-Prem

To integrate SEI with GitLab Enterprise, you have two options based on the accessibility of your GitLab instance:

* **Private On-Premise GitLab (Gitlab Enterprise On-Prem):** Integrate Harness SEI with the private instance of GitLab using the Ingestion Satellite.
* **Public On-Premise GitLab:** Integrate Harness SEI with the on-premise instance of GitLab that is publicly accessible using the Personal Access Token.

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

## Supported metadata fields

Use the following optional metadata fields to optimize the ingestion functionality while configuring the integration using the Ingestion Satellite:

| Name | Field | Values | Properties |
| - | - | - | - |
| Check Project Membership | `check_project_membership` | The supported values are True/False. By default, this field is set to `True`. | When set to `True`, SEI selectively considers projects based on token owner membership. For self-hosted Gitlab instances, switching to `False` enables SEI to fetch all projects, regardless of the membership. You should never disable this for cloud Gitlab instances. |
| Fetch PR Patches | `fetch_pr_patches` | The supported values are `True/False` | This field determines whether to retrieve patches or file differentials for Pull Requests (PRs). | 
| Fetch Commit Patches | `fetch_commit_patches` | The supported values are `True/False` | This field governs the inclusion of commit patches or file differentials in the data. |
| Fetch Pipelines | `fetch_pipelines` | The supported values are `True/False` | This field specifies whether to fetch pipeline data. |
| PR Commit Limit | `pr_commit_limit` | Default value: 250 | This field sets a cap on the number of commits fetched per Pull Request. |

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).
