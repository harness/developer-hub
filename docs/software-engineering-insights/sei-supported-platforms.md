---
title: What's supported by Harness SEI
description: Platforms and technologies supported by Harness SEI
sidebar_label: What's supported
sidebar_position: 1
---

# What's supported

SEI integrates with a number of third-party providers to provide a centralized visibility on engineering work.

## Integrations for SEI

SEI supports a number of plugins to integrate your dashboard with third-party providers. Please find the growing list of [supported third-party integrations](/docs/software-engineering-insights/sei-integrations/sei-integrations-overview)

The following table lists SEI support for platforms, repos, registries, and related technologies.

| **Type of integration** | **SCM** | **CI/CD** | **Security** | **Issue Tracking and Management** | **Communication and collaboration** | **Others** |
| -- | -- | -- | -- | -- | -- | -- |
| Automated | <ul><li>Bitbucket</li><li>GitHub</li><li>Gitlab</li><li>Azure Repos</li></ul> | <ul><li>CircleCI</li><li>Drone</li><li>Jenkins</li><li>Harness</li><li>Azure Pipelines</li></ul> | <ul><li>Sonarqube</li></ul> | <ul><li>Jira</li><li>Azure Boards</li><li>Rally Software (BETA)</li></ul> | <ul><li>Slack</li></ul> | <ul><li>TestRail</li></ul> |
| Other | <ul><li>Perforce Helix Server</li><li> Gerrit</li></ul> | <ul><li>Github Actions</li></ul> | <ul><li>Checkmarx</li><li>Snyk</li><li>Tenable</li><li>Coverity</li></ul> |  | <ul><li>Microsoft Teams</li></ul> | <ul><li>Pagerduty</li><li>ServiceNow</li><li>PostgreSQL</li><li>Salesforce</li><li>Splunk</li><li>Zendesk</li></ul> |

:::info Note:

The integrations categorized under the **Others** label are now available with basic support, and we are actively working towards expanding their capabilities in the near future.

:::

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).

## Harness SEI features

For highlights of key SEI features, go to [Harness SEI overview](/docs/software-engineering-insights/get-started/overview) and [Harness SEI key concepts](/docs/software-engineering-insights/get-started/sei-key-concepts).

For information about upcoming and recently released features, go to the [SEI release notes](/release-notes/software-engineering-insights).

### Harness SEI early access features

Some Harness SEI features are released behind feature flags to get feedback from a subset of customers before releasing the features to general availability.

You can opt-in to the early access (beta) features for Harness SEI described in the following table. Contact [Harness Support](mailto:support@harness.io) to enable specific early access features in your Harness account. Include the feature flag or name with your request.

For more information about early access features, including early access features for the Harness Platform, delegate, and other Harness modules, go to [Early access features](/release-notes/early-access).

:::note

To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io). For the status of a feature flag, please note [Beta, GA, Limited GA Feature Categorization](/docs/platform/get-started/release-status.md) in the descriptions below.

:::

<table>
    <tr>
        <td><b>Flag</b></td>
        <td><b>Description</b></td>
    </tr>
    <tr>
        <td>SEI_SHOW_TRELIS_NEW_INTERVAL</td>
        <td>Enables Trellis Profile configuration using <a href="/docs/software-engineering-insights/early-access/profiles/sei-trellis-factors">Trellis Factors</a> at the Central Profile. This feature is in BETA. </td>
    </tr>
    <tr>
        <td>SEI_NEW_COLLECTION_TREE</td>
        <td>Enable this feature if you want to use the new user experience for Collection Navigation under the Insights</td>
    </tr>
    <tr>
        <td>RALLY</td>
        <td>Enables access to the SEI Rally integration used for integrating SEI with the Rally Software</td>
    </tr>
    <tr>
        <td>SEI_THEME_BASED_DORA</td>
        <td>Enables you to configure the DORA profile to establish a theme-based correlation between Pull Requests and Deployments. </td>
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
        <td>SEI_SHOW_ALL_METRICS</td>
        <td>Allows you to configure the Sprint Metrics Percentage Trend report using the new Sprint metrics</td>
    </tr>
    <tr>
        <td>SEI_SERVICE_NOW</td>
        <td>Integrate SEI with the ServiceNow Platform. This integration is still under development.</td>
    </tr>
    <tr>
        <td>SEI_NEW_BA_PROFILES</td>
        <td>Enable this flag to access the new [Business Alignment profile](/docs/software-engineering-insights/early-access/profiles/sei-business-alignment-profile).</td>
    </tr>
    <tr>
        <td>SEI_NEW_BA_COMBINED_WIDGET</td>
        <td>Enable this flag to access the new [Business Alignment report](/docs/software-engineering-insights/early-access/metrics-reports/sei-business-alignment-report).</td>
    </tr>
    <tr>
        <td>SEI_BA_INCLUDE_UNRESOLVED_ISSUES</td>
        <td>Allows you to use the [Business Alignment report](/docs/software-engineering-insights/early-access/metrics-reports/sei-business-alignment-report) to calculate alignment metrics for tickets that are in the In Progress status category and those that have been resolved (i.e., Done status category) within a specific duration of time.</td>
    </tr>
    <tr>
        <td>SEI_IS_AZURE_NEW_ONB_ENABLED</td>
        <td>Access the new [Azure DevOps integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops) onboarding with PAT authentication</td>
    </tr>
    <tr>
        <td>SEI_ENABLE_TOPICS_SUPPORT_FOR_GITHUB</td>
        <td>Configure Github Topics as an integration filter in the Collection definition</td>
    </tr>
</table>

<!-- missing SHOW_DIAGNOSTIC_TILE. Enabling this feature will allow you to access the new **Diagnostics** page which comprises of two sections: **Jobs status** and **Satellite status**, providing users with the most up-to-date health status information for both Jobs and Ingestion Satellite. SEI-5818 -->

<!-- Please don't use fixed width for tables. It breaks mobile browsing and small desktop windows. -->

### Harness SEI features promoted to GA

Features promoted to general availability (GA) are removed from the early access features table and announced as new features in the SEI release notes. The SEI release notes also include features released directly to GA. 

Here are some SEI early access features that were recently promoted to GA:

<table>
    <tr>
        <td><b>Flag</b></td>
        <td><b>Description</b></td>
        <td><b>GA date</b></td>
    </tr>
    <tr>
        <td>SEI_SHOW_DIAGNOSTIC_TILE</td>
        <td>A new **Diagnostics** page is added with two dedicated sections: **Jobs status** and **Satellite status**, providing users with the most up-to-date health status information for both Jobs and Ingestion Satellite</td>
        <td>April 2024</td>
    </tr>
    <tr>
        <td>SEI_EASY_ONBOARDING_JIRA</td>
        <td>Enables access to the new user experience for connecting to [Jira Cloud](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-jira-integration#connect-with-jira-cloud) & [Data Center](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-jira-integration#connect-with-jira-software-data-center) using the [Jira Connect App](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-jira-integration#configure-the-integration-using-the-jira-connect-app)</td>
        <td>April 2024</td>
    </tr>
    <tr>
        <td>SEI_EASY_ONBOARDING_GITHUB</td>
        <td>Enables access to the new user experience for connecting to [GitHub Organization (Cloud)](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-integration#connect-with-github-cloud) & [GitHub Enterprise Server](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-integration#connect-with-github-enterprise-server) using the [SEI GitHub App](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-integration#configure-the-integration-using-the-github-app)</td>
        <td>April 2024</td>
    </tr>
    <tr>
        <td>SEI_SHOULD_ENABLE_REAUTH</td>
        <td>Enables access to new re-authorization user experience for a [GitHub integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-integration)</td>
        <td>April 2024</td>
    </tr>
</table>