---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 1
---

Harness SEI integrations helps you to integrate SEI with your issue management systems, codebase, ci/cd tools, and collaboration and monitoring tools. In order to calculate metrics, you must integrate your SDLC tools with SEI.

Interactions with third-party systems on Harness SEI are managed through the SEI integrations. For example, an SEI GitHub integration authenticates through a GitHub account to collect data about activity in your teams GitHub repos (such as PRs, commits, and merges).

You can use any application-specific integration supported by Harness SEI to integrate your tool with SEI. If you need to connect a CI/CD tool that currently lacks integration support from SEI, you have the option to create a custom CI/CD integration separately.

:::info
After adding an integration, it may take up to 24 hours for data to fully sync to SEI. During this time, any widgets you set up in Insights may not display data until the sync is complete.
:::

![](./static/integrations-overview.png)

## Integration Mapping

Integration mapping refers to the process of associating existing or new integrations with your current project. After creating the project, you can proceed to set up and map integrations to it. It's important to associate the integrations correctly with the project in order to ensure that the widgets on the Insight display accurate data.

1. To map integrations, go to **Integration Mapping** in your Harness project within the SEI module.

![](./static/integration-mapping.png)

2. Click on **Map Integrations** and select any existing integrations or create new ones as per the requirement.

![](./static/map-integrations.png)

## Harness SEI supported platforms and technologies

Harness SEI supports a variety of platforms, repos, tools, and related technologies. The following sections list entities or providers with first-class support in Harness SEI.

### Issue Management Platform

* [Azure Boards](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops)
* [Jira](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-jira-integration)

### Source Code Management (SCM)

* [Azure Repos](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops)
* [Bitbucket](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-bitbucket)
* [GitHub](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-integration)
* [GitLab Cloud](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab)
* [GitLab Enterprise](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab)

### CI/CD

* [Jenkins](/docs/software-engineering-insights/sei-integrations/semi-automated-integrations/jenkins-plugin)
* [Harness Continuous Delivery & GitOps and Continuous Integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng)
* [Azure Pipelines](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops)
* [GitHub Actions](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-actions)

### BETA

* [SonarQube](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-sonarqube)
* [Slack](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-slack)
* [PagerDuty](/docs/software-engineering-insights/sei-integrations/other-integrations/sei-integration-pagerduty)
* [ServiceNow](/docs/software-engineering-insights/early-access/integrations/sei-integration-servicenow)

Use the [Ingestion Satellites](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview) service within your local network or VPC to connect your artifacts, issue management, collaboration tools, source code managers, and other providers to Harness SEI.

:::info
Some SEI integrations require whitelisting certain Harness IP addresses in order to allow communication between the Harness Platform and the integrated third-party system. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integrations can work correctly, please refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall depending on the specific integration.
:::

## Custom CI/CD integrations

SEI supports custom CI/CD integrations through webhooks. You can use this for CI/CD tools that don't have a dedicated SEI integration. For information about custom CI/CD, go to [Custom CI/CD Integrations](/docs/software-engineering-insights/sei-integrations/custom-cicd/sei-custom-cicd-integration).

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