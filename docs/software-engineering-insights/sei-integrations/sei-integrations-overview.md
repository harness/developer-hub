---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 1
---

In order to calculate metrics, you must integrate your SDLC tools with SEI.

SEI integrations are handled through SEI integrations. SEI integrations contain the information necessary for the Harness Platform and modules to integrate and work with SDLC tools, such as Git providers, issue management systems, communication tools, and more. For example, an SEI GitHub integration authenticates through a GitHub account to collect data about activity in your teams' GitHub repos (such as PRs, commits, and merges).

To integrate a tool with SEI, you can use either an application-specific SEI integration the generic SEI integration.

:::info
Please note that after adding an integration, it may take up to 24 hours for the data to be fully reflected on SEI. This means that any widgets you configure on Insights using this integration may not display data until the synchronization is completed.
:::

## Application-specific SEI integrations

* [Azure DevOps Services](./automated-integrations/sei-integration-azure-devops)
* [Bitbucket](./automated-integrations/sei-integration-bitbucket)
* [Checkmarx SAST](./other-integrations/sei-integration-checkmarx)
* [Circle CI](./automated-integrations/sei-integration-circleci)
* [Coverity](./other-integrations/sei-integration-coverity)
* [Drone CI](./automated-integrations/sei-integration-droneci)
* [Gerrit](./other-integrations/sei-integration-gerrit)
* [GitHub](./automated-integrations/sei-integration-github)
* [GitLab](./automated-integrations/sei-integration-gitlab)
* [Harness NG](./automated-integrations/sei-integration-harnessng)
* [Helix Core Server](./other-integrations/sei-integration-helix)
* [Jira](./automated-integrations/sei-integration-jira)
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

For information about custom CI/CD and Jenkins integrations, go to [Other SEI integrations](./other-integrations/sei-integration-checkmarx).

:::tip

In addition to SEI integrations, you can [import CSV files](../sei-propels-scripts/tables) and display the data in [Table reports](../sei-propels-scripts/table-reports).

:::
