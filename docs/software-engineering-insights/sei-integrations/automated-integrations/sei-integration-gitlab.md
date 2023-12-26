---
title: SEI GitLab Cloud integration
description: Integrate SEI with GitLab Cloud.
sidebar_position: 100
sidebar_label: GitLab Cloud
---

GitLab is a DevOps platform that provides Git repos, CI/CD pipelines, issue management, and more.

SEI supports two integrations to integrate SEI with GIthub.

* Gitlab Cloud
* Gitlab Enterprise

To integrate with Gitlab Enterprise, use the [SEI Gitlab Enterprise integration](./set-integration-gitlab-enterprise).

## Configure authentication

The SEI GitLab integration can use either OAuth or personal access token authentication.

For OAuth, your account must have the **Reporter** role or higher.

If you can't use OAuth, you must create a GitLab personal access token to configure the SEI GitLab integration.

1. Log in to your GitLab account and create a personal access token. For instructions, go to the GitLab documentation on [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
2. Select the `api` scope with complete read/write API access.
3. Copy the token somewhere that you can retrieve it when you configure the integration.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Configure the integration


<Tabs>
  <TabItem value="cloud" label="Cloud" default>


1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **GitLab Cloud** integration, and select **Install**.

  To integrate with an on-premises, privately-hosted GitLab instance, install the **GitLab Enterprise** integration with API key (personal access token) authentication and an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

4. Select an authentication method for the integration:

   * To use OAuth, select **Authorize** and follow the prompts to grant access to GitLab.
   * To use a personal access token, enter the **URL** for your GitLab instance and paste your **Access Token**.

5. In **Integration Name**, enter a name for the integration.
6. Finish configuration and save the integration.


</TabItem>
  <TabItem value="satellite" label="Satellite">


The steps for configuring the integration using **Satellite** is similar to configuring the integration on cloud using the **PAT**, with the exception of using satellite to communicate** with the Gitlab server.

Make sure to select the satellite integration checkbox while configuring the integration.

1. Enter the **Personal Access Token** and click **Next**.
2. In **Integration Name**, enter a name for the integration.
3. Add a **description** for the integration. (Optional)
4. In the **URL** field, add the URL where your Gitlab repository is deployed. 
   
   For example, if your Gitlab is deployed on a **virtual machine (VM)**, add the URL in the format: `https://\<GITLAB_INSTANCE_URL>`.

5. If applicable, configure **Additional Options**:
   1. **Fetch PRs**: Allow SEI to ingest PR data from Gitlab.
   2. **Fetch Issues**: Allow SEI to ingest data from Gitlab Issues.
   3. **Fetch Projects**: Allow SEI to ingest data from Gitlab Projects.
   4. **Fetch Commits**: Allow SEI to ingest commit metadata from Gitlab.
   5. **Fetch Commit Files**: Allow SEI to ingest data within commits from Gitlab.
6. Select **Next** and click on **Download Config** and save the `satellite.yml` file. Update it following the instructions [here](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

Here’s a sample `satellite.yml` file:

```yaml
satellite:
  tenant: <ACCOUNT_ID>
  api_key: <ACCOUNT_API_KEY>
  url: 'https://app.harness.io/gratis/sei/api' # Note that this URL is relative to the environment you are using.
integrations:
  - id: '<INTEGRATION_ID>' # For ex: 4691
    application: gitlab
    url: '[https://<GITLAB_INSTANCE_URL](https://<GITLAB_INSTANCE_URL)'
    metadata:
      fetch_prs: true
      fetch_issues: true
      fetch_projects: true
      fetch_commits: true
      fetch_commit_files: true
    authentication: apikey

```

While configuring the integration using satellite, the following are optional metadata fields that are supported to optimize the ingestion functionality:

1. **Check Project Membership (check_project_membership)**
   * Default: True
   * When set to True, SEI selectively considers Gitlab projects based on token owner membership.
   * For self-hosted Gitlab instances, switching to False enables fetching ALL projects, regardless of membership.
   * **Caution:** Never disable this for cloud Gitlab instances.
2. **Fetch PR Patches (fetch_pr_patches)**
   * Supported values: True/False
   * Determines whether to retrieve patches or file differentials for Pull Requests (PRs).
3. **Fetch Commit Patches (fetch_commit_patches)**
   * Supported values: True/False
   * Governs the inclusion of commit patches or file differentials in the data.
4. **Fetch Pipelines: (fetch_pipelines)**
   * Supported values: True/False
   * Specifies whether to fetch pipeline data.
5. **PR Commit Limit (pr_commit_limit)**
   * Default value: 250
   * Sets a cap on the number of commits fetched per Pull Request.

If you encounter any issues during the integration process, go to the Satellite integration [Troubleshooting and FAQs](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).


</TabItem>
</Tabs>
