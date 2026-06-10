---
title: What's supported by Harness AI DLC Insights
description: Platforms and technologies supported by Harness AI DLC Insights
sidebar_label: What's Supported
sidebar_position: 1
---

# What's supported

SEI integrates with a number of third-party providers to provide a centralized visibility on engineering work.

## Harness SEI supported platforms and technologies

Harness SEI supports a variety of platforms, repos, tools, and related technologies. The following sections list entities or providers with first-class support in Harness SEI. Please find the growing list of [supported third-party integrations](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/sei-integrations-overview)

### Issue Management Platform

* [Azure Boards](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/azure-devops/sei-integration-azure-devops)
* [Jira](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/jira/sei-jira-integration)

### Source Code Management (SCM)

* [Azure Repos](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/azure-devops/sei-integration-azure-devops)
* [Bitbucket](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/bitbucket/sei-bitbucket-cloud)
* [GitHub](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github/sei-github-integration)
* [GitLab Cloud](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/gitlab/sei-integration-gitlab)
* [GitLab Enterprise](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/gitlab/sei-integration-gitlab)

### CI/CD

* [Jenkins](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/jenkins/jenkins-plugin)
* [Harness Continuous Delivery & GitOps and Continuous Integration](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/harness-cicd/sei-integration-harnesscicd)
* [Azure Pipelines](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/azure-devops/sei-integration-azure-devops)
* [GitHub Actions](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github-actions/sei-github-actions)

### BETA

* [SonarQube](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/beta-integrations/sonarqube/sei-integration-sonarqube)
* [PagerDuty](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/beta-integrations/sei-integration-pagerduty)
* [ServiceNow](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/beta-integrations/servicenow/sei-servicenow)

Use the [Ingestion Satellites](/docs/software-engineering-insights/propelo-sei/setup-sei/sei-ingestion-satellite/satellite-overview) service within your local network or VPC to connect your artifacts, issue management, collaboration tools, source code managers, and other providers to Harness SEI.

:::info Note:

The integrations categorized under the **BETA** label are now available with basic support, and we are actively working towards expanding their capabilities in the near future.

:::

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).

## Harness SEI features

For highlights of key SEI features, go to [Harness SEI overview](/docs/software-engineering-insights/propelo-sei/get-started/overview) and [Harness SEI key concepts](/docs/software-engineering-insights/propelo-sei/get-started/sei-key-concepts).

For information about upcoming and recently released features, go to the [SEI release notes](/release-notes/ai-dlc-insights).

### Harness SEI early access features

Some Harness SEI features are released behind feature flags to get feedback from a subset of customers before releasing the features to general availability.

You can opt-in to the early access (beta) features for Harness SEI described in the following table. Contact [Harness Support](mailto:support@harness.io) to enable specific early access features in your Harness account. Include the feature flag or name with your request.

:::note
To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io). For the status of a feature flag, please note [Beta, GA, Limited GA Feature Categorization](/docs/platform/get-started/overview#feature-lifecycle) in the descriptions below.
:::

<table>
    <tr>
        <td><b>Flag</b></td>
        <td><b>Description</b></td>
    </tr>
    <tr>
        <td>SEI_SHOW_TRELIS_NEW_INTERVAL</td>
        <td>Enables Trellis Profile configuration using <a href="/docs/software-engineering-insights/propelo-sei/get-started/early-access/profiles/sei-trellis-factors">Trellis Factors</a> at the Central Profile. This feature is in BETA. </td>
    </tr>
    <tr>
        <td>SEI_MTTR_PAGERDUTY_ENABLED</td>
        <td>Enables you to measure the incident recovery time using the DORA MTTR report for the PagerDuty integration.</td>
    </tr>
    <tr>
        <td>SEI_SHOW_HISTORICAL_FILTERS</td>
        <td>Allows you to configure the Issue Backlog Trend report to display historical data for the current issues</td>
    </tr>
    <tr>
        <td>SEI_SERVICE_NOW</td>
        <td>Integrate SEI with the ServiceNow Platform. This integration is still under development.</td>
    </tr>
    <tr>
        <td>SEI_BA_INCLUDE_UNRESOLVED_ISSUES</td>
        <td>Allows you to use the [Business Alignment report](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/sei-business-alignment) to calculate alignment metrics for tickets that are in the **In Progress status category** and those that have been resolved (i.e., Done status category) within a specific duration of time.</td>
    </tr>
    <tr>
        <td>SEI_GITHUB_REPO_SELECTION_ENABLED</td>
        <td>Adds support for selecting the repositories to be ingested into the system before creating the GitHub integration.</td>
    </tr>
</table>
