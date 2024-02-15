---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 1
---

In order to calculate metrics, you must integrate your SDLC tools with SEI.

SEI integrations are handled through SEI integrations. SEI integrations contain the information necessary for the Harness Platform and modules to integrate and work with SDLC tools, such as Git providers, issue management systems, communication tools, and more. 

For example, an SEI GitHub integration authenticates through a GitHub account to collect data about activity in your teams' GitHub repos (such as PRs, commits, and merges).

To integrate a tool with SEI, you can use either an application-specific SEI integration the generic SEI integration.

:::info
Please note that after adding an integration and for each subsequent data sync, it may take up to 24 hours for the data to be fully reflected on SEI. This means that any widgets you configure on Insights using this integration may not display data until the synchronization is completed.
:::

![](./static/integrations-overview.png)

## Integration Mapping

Integration mapping refers to the process of linking available or new integrations with your current project. Once you have created your project, you can start setting up and mapping integrations as an admin. To map integrations correctly ensure that you have associated the integrations with the project.

1. To map integrations, go to the **Integration Mapping tab** within the SEI module.
2. Click on **Map Integrations** and select any existing integrations or create new ones as per the requirement.

## Application-specific SEI integrations

* [Azure DevOps Services](./automated-integrations/sei-integration-azure-devops.md)
* [Bitbucket](./automated-integrations/sei-integration-bitbucket)
* [Checkmarx SAST](./other-integrations/sei-integration-checkmarx)
* [Circle CI](./automated-integrations/sei-integration-circleci)
* [Coverity](./other-integrations/sei-integration-coverity)
* [Drone CI](./automated-integrations/sei-integration-droneci)
* [Gerrit](./other-integrations/sei-integration-gerrit)
* [GitHub](./automated-integrations/sei-integration-github)
* [GitHub Actions](./automated-integrations/sei-github-actions)
* [GitHub 2.0 - BETA](./automated-integrations/sei-integration-github-easyonboarding)
* [GitLab](./automated-integrations/sei-integration-gitlab)
* [Harness NG](./automated-integrations/sei-integration-harnessng)
* [Helix Core Server](./other-integrations/sei-integration-helix)
* [Jira](./automated-integrations/sei-integration-jira)
* [Jira 2.0 - BETA](./automated-integrations/sei-integration-jira-easyonboarding)
* [Microsoft Teams](./other-integrations/sei-integration-ms-teams)
* [PagerDuty](./other-integrations/sei-integration-pagerduty)
* [PostgreSQL](./other-integrations/sei-integration-postgresql)
* [Salesforce](./other-integrations/sei-integration-salesforce)
* [Slack](./other-integrations/sei-integration-slack)
* [Snyk](./other-integrations/sei-integration-snyk)
* [SonarQube](./automated-integrations/sei-integration-sonarqube)
* [Splunk](./other-integrations/sei-integration-splunk)
* [Tenable](./other-integrations/sei-integration-tenable)
* [TestRail](./automated-integrations/sei-integration-testrail)
* [Zendesk](./other-integrations/sei-integration-zendesk)

On-prem integrations and tools without application-specific integrations require [Ingestion Satellites](../sei-ingestion-satellite/satellite-overview).

## Other integrations

For information about custom CI/CD and Jenkins integrations, go to [Other SEI integrations](./semi-automated-integrations/jenkins-plugin).

:::tip

In addition to SEI integrations, you can [import CSV files](../sei-propels-scripts/tables) and display the data in [Table reports](../sei-propels-scripts/table-reports).

:::

## Integration Monitoring

To monitor and track the health status of an integration, you can go to the **Integration Monitoring** tab. 

Here's how you can verify the integration status:

1. Go to the **Integrations** tab under the **Data Settings** and select **Your Integrations**.

![](./static/integrations-tab.png)

2. Click on the integration for which you want to verify the status.
3. Select the **Monitoring** tab.

![](./static/integration-monitoring.png)

This page allows you to monitor the integration's current status, which could be either `HEALTHY`, `UNKNOWN`, or `FAILED`. 

You can also review past ingestion activities under the **Ingestion Logs** section and view their corresponding statuses. Additionally, you can find other details such as the Ingestion Task Start Time, Time to Complete the Ingestion Task and Number of Retries for the Ingestion Scan.
