---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 1
---

In order to calculate metrics, you must integrate your SDLC tools with SEI.

Interactions with third-party systems on Harness SEI are managed through the SEI integrations. SEI integrations contain the information necessary for the Harness Platform and modules to integrate and work with SDLC tools, such as Git providers, issue management systems, communication tools, and more.

For example, an SEI GitHub integration authenticates through a GitHub account to collect data about activity in your teams' GitHub repos (such as PRs, commits, and merges).

You can use any application-specific integration supported by Harness SEI to integrate your tool with SEI. If you need to connect a CI/CD tool that currently lacks integration support from SEI, you have the option to create a custom CI/CD integration separately.

:::info
Please note that after adding an integration and for each subsequent data sync, it may take up to 24 hours for the data to be fully reflected on SEI. This means that any widgets you configure on Insights using this integration may not display data until the synchronization is completed.
:::

![](./static/integrations-overview.png)

## Integration Mapping

Integration mapping refers to the process of associating existing or new integrations with your current project. After creating the project, you can proceed to set up and map integrations to it. It's important to associate the integrations correctly with the project in order to ensure that the widgets on the Insight display accurate data.

1. To map integrations, go to the **Integration Mapping tab** within the SEI module.
2. Click on **Map Integrations** and select any existing integrations or create new ones as per the requirement.

## Harness SEI supported platforms and technologies

Harness SEI supports a variety of platforms, repos, tools, and related technologies. The following sections list entities or providers with first-class support in Harness SEI.

### Issue Management Platform

* [Azure Boards](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops)
* [Jira](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-jira-integration)
* [Rally Software](/docs/software-engineering-insights/early-access/integrations/sei-integration-rally)

### Source Code Management (SCM)

* [Azure Repos](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops)
* [Bitbucket](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-bitbucket)
* [GitHub](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-integration)
* [GitLab Cloud](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab)
* [GitLab Enterprise](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab)
* [Perforce Helix Server](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-helix)
* [Gerrit](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-gerrit)

### CI/CD

* [Circle CI](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-circleci)
* [Drone CI](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-droneci)
* [Jenkins](/docs/software-engineering-insights/sei-integrations/semi-automated-integrations/jenkins-plugin)
* [Harness NG](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng)
* [Azure Pipelines](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops)
* [GitHub Actions](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-actions)

### Security

* [SonarQube](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-sonarqube)
* [Checkmarx](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-checkmarx)
* [Tenable](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-tenable)
* [Coverity](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-coverity)
* [Snyk](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-snyk)

### Communication & Collaboration

* [Slack](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-slack)
* [Microsoft Teams](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-ms-teams)

### Incident Monitoring

* [PagerDuty](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-pagerduty)
* [ServiceNow](/docs/software-engineering-insights/early-access/integrations/sei-integration-servicenow)

### Others

* [TestRail](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-testrail)
* [PostgreSQL](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-postgresql)
* [Salesforce](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-salesforce)
* [Splunk](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-splunk)
* [Zendesk](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-zendesk)

On-prem integrations and tools without application-specific integrations require [Ingestion Satellites](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

:::info
Some SEI integrations require whitelisting certain Harness IP addresses in order to allow communication between the Harness Platform and the integrated third-party system. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integrations can work correctly, please refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall depending on the specific integration.
:::

## Custom CI/CD integrations

SEI supports custom CI/CD integrations through webhooks. You can use this for CI/CD tools that don't have a dedicated SEI integration. For information about custom CI/CD, go to [Custom CI/CD Integrations](/docs/software-engineering-insights/sei-integrations/semi-automated-integrations/sei-custom-cicd-integrations).

:::tip

In addition to SEI integrations, you can [import CSV files](/docs/software-engineering-insights/sei-propels-scripts/tables) and display the data in [Table reports](/docs/software-engineering-insights/sei-propels-scripts/table-reports).

:::

## Integration Monitoring

To monitor and track the health status of an integration, you can go to **Integration Monitoring**.

Here's how you can verify the integration status:

1. Go to the **Integrations** tab under the **Data Settings** and select **Your Integrations**.

![](./static/integrations-tab.png)

2. Click on the Integration for which you want to verify the status.
3. Select the **Monitoring** tab.

![](./static/integration-monitoring.png)

This page allows you to monitor the integration's current status, which could be either **HEALTHY**, **UNKNOWN**, or **FAILED**. 

You can review previous ingestion activities in the **Ingestion Logs** section and view their respective statuses.
You can also access additional details such as the Ingestion Task Start Time, Time taken to Complete the Ingestion Task, and Number of Retries for the Ingestion Scan.

## Delete an integration

To delete an integration:

* Go to the **Integrations** tab under the **Data Settings** and select **Available Integrations**.

![](./static/delete-integration1.png)

* Click on the delete icon next to the integration you want to remove.

![](./static/delete-integration2.png)

* A confirmation dialog box will appear. Click **Yes** to proceed.
  
![](./static/delete-integration3.png)

The integration status will change to Deleting. The deletion process is scheduled, and once complete, the integration will no longer be listed in the **Available Integrations** tab.

![](./static/delete-integration4.png)

:::warning
Note that deleting an integration will impact all collections and profiles associated with it.
:::