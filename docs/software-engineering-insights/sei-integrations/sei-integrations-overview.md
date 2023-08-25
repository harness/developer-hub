---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 10
---

In order to calculate metrics, you must integrate your SDLC tools with SEI.

SEI integrations are handled through SEI integrations. SEI integrations contain the information necessary for the Harness Platform and modules to integrate and work with SDLC tools, such as Git providers, issue management systems, communication tools, and more. For example, an SEI GitHub integration authenticates through a GitHub account to collect data about activity in your teams' GitHub repos (such as PRs, commits, and merges).

To integrate a tool with SEI, you can use either an application-specific SEI integration the generic SEI integration.

## Application-specific SEI integrations

* [Azure DevOps Services](./sei-integration-azure-devops.md)
* [Bitbucket](./sei-integration-bitbucket.md)
* [Checkmarx SAST](./sei-integration-checkmarx.md)
* [Circle CI](./sei-integration-circleci.md)
* [Coverity](./sei-integration-coverity.md)
* [Drone CI](./sei-integration-droneci.md)
* [Gerrit](./sei-integration-gerrit.md)
* [GitHub](./sei-integration-github.md)
* [GitLab](./sei-integration-gitlab.md)
* [Harness NG](./sei-integration-harnessng.md)
* [Helix Core Server](./sei-integration-helix.md)
* [Jira](./sei-integration-jira.md)
* [Microsoft Teams](./sei-integration-ms-teams.md)
* [PagerDuty](./sei-integration-pagerduty.md)
* [PostgreSQL](./sei-integration-postgresql.md)
* [Salesforce](./sei-integration-salesforce.md)
* [Slack](./sei-integration-slack.md)
* [Snyk](./sei-integration-snyk.md)
* [SonarQube](./sei-integration-sonarqube.md)
* [Splunk](./sei-integration-splunk.md)
* [Tenable](./sei-integration-tenable.md)
* [TestRail](./sei-integration-testrail.md)
* [Zendesk](./sei-integration-zendesk.md)

On-prem integrations and tools without application-specific integrations require [Ingestion Satellites](./sei-integration-satellite.md).

## Other integrations

For information about custom CI/CD and Jenkins integrations, go to [Other SEI integrations](./sei-integration-other.md).

:::tip

In addition to SEI integrations, you can [import CSV files](../sei-propels-scripts/tables.md) and display the data in [Table reports](../sei-propels-scripts/table-reports.md).

:::
