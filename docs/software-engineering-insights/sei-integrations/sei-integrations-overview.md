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

## Generic SEI integration (other integrations)

Use the [generic SEI integration](./sei-integration-generic.md) for integrations that don't have an application-specific SEI integration or when your configuration doesn't support the application-specific SEI integration, including:

* On-premise tools and integrations that use *Ingestion Satellites*.
* The *Job Reporter plugin* for Jenkins.
* Custom CI/CD integrations.
* Other tools that don't have an application-specific SEI integration.
