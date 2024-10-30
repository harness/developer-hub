---
title: Connect with GitLab Private Cloud
description: Integrate SEI with GitLab Private Cloud
sidebar_position: 15
sidebar_label: Connect with GitLab Private Cloud
---

GitLab Private Cloud is a managed, self-hosted version of GitLab. To connect with GitLab Cloud, go to [Connect with GitLa Cloud](/docs/software-engineering-insights/sei-integrations/gitlab/sei-integration-gitlab).

To connect Harness SEI with Github Private Cloud, you'll need to use the [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/run-the-satellite-container).

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
  url: 'https://app.harness.io/gratis/sei/api'
  # Note that this URL is relative to the Environment of your Harness Account.

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