---
title: SEI integrations overview
description: Learn about SEI integration options and support.
sidebar_position: 10
---

In order to calculate metrics, you must integrate your SDLC tools with SEI.

SEI integrations are handled through SEI connectors. SEI connectors contain the information necessary for the Harness Platform and modules to integrate and work with SDLC tools, such as Git providers, issue management systems, communication tools, and more. For example, an SEI GitHub connector authenticates through a GitHub account to collect data about activity in your teams' GitHub repos (such as PRs, commits, and merges).

SEI connectors are similar to Harness connectors, but they are specific to SEI data ingestion. For general information about Harness connectors, go to the Harness Platform documentation on [connectors](/docs/category/connectors).

To integrate a tool with SEI, you can use either an application-specific SEI connector the generic SEI connector.

## Application-specific SEI connectors

* [Azure DevOps Services](./sei-connector-azure-devops.md)
* [Bitbucket](./sei-connector-bitbucket.md)
* [Checkmarx SAST](./sei-connector-checkmarx.md)
* [Circle CI](./sei-connector-circleci.md)
* [Coverity](./sei-connector-coverity.md)
* [Drone CI](./sei-connector-droneci.md)
* [Gerrit](./sei-connector-gerrit.md)
* [GitHub](./sei-connector-github.md)
* [GitLab](./sei-connector-gitlab.md)
* [Harness NG](./sei-connector-harnessng.md)
* [Helix Core Server](./sei-connector-helix.md)
* [Jira](./sei-connector-jira.md)
* [Microsoft Teams](./sei-connector-ms-teams.md)
* [PagerDuty](./sei-connector-pagerduty.md)
* [PostgreSQL](./sei-connector-postgresql.md)
* [Salesforce](./sei-connector-salesforce.md)
* [Slack](./sei-connector-slack.md)
* [Snyk](./sei-connector-snyk.md)
* [SonarQube](./sei-connector-sonarqube.md)
* [Splunk](./sei-connector-splunk.md)
* [Tenable](./sei-connector-tenable.md)
* [TestRail](./sei-connector-testrail.md)
* [Zendesk](./sei-connector-zendesk.md)

## Generic SEI connector (other integrations)

Use the [generic SEI connector](./sei-connector-generic.md) for integrations that don't have an application-specific SEI connector or when your configuration doesn't support the application-specific SEI connector, including:

* On-premise tools and integrations that use *Ingestion Satellites*.
* The *Job Reporter plugin* for Jenkins.
* Custom CI/CD integrations.
* Other tools that don't have an application-specific SEI connector.
