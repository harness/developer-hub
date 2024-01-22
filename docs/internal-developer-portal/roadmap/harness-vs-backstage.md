---
title: Harness IDP vs Self Managed Backstage - In-depth Feature Comparison
description: All the features that are available in Harness IDP and the differentiator against Self Managed Backstage
sidebar_position: 2
---

## Introduction

The following tables gives a detailed feature availability comparison between Harness IDP and Self-Managed Backstage for various features like [Software Catalog](https://developer.harness.io/docs/category/software-catalog), [Workflows](https://developer.harness.io/docs/category/self-service-flows), [Plugins](https://developer.harness.io/docs/category/plugins), [Scorecards](https://developer.harness.io/docs/category/scorecards), [Governance](https://developer.harness.io/docs/category/governance) and [Platform](https://developer.harness.io/docs/get-started/harness-platform-architecture). 

## Software Catalog

| **Software Catalog**          | **Self Managed Backstage**  | **Harness IDP**  |
|-------------------------------|-----------------------------|------------------|
| Entity definition as Code     | Yes                         | Yes              |
| Favorites/bookmark entities   | Yes                         | Yes              |
| Catalog Dependency graph      | Yes                         | Yes              |
| Custom entity providers       | Yes                         | Roadmap          |
| Custom entity kinds           | Limited                     | Roadmap          |
| Custom catalog processors     | Yes                         | Roadmap          |
| Automated Service Discovery   | No                          | Roadmap          |


## Workflows

| **Workflows**                                      |  **Self Managed Backstage** | **Harness IDP**  |
|----------------------------------------------------|-----------------------------|------------------|
| Customizable UI for each workflow/template         | Yes                         | Yes              |
| Custom UI fields                                   | Limited                     | Roadmap          |
| UI based input form editor                         | Yes                         | Yes              |
| UI based orchestrator                              | No                          | Yes              |
| Write custom action/step                           | Limited                     | Yes              |
| Declare and use variables                          | No                          | Yes              |
| Isolation of infrastructure for executions         | No                          | Yes              |
| Granular access control of workflows               | No                          | Yes              |
| Native integration with Jira/Slack/ServiceNow/etc.                                 | No          | Yes               |
| Integration with other orchestrators (GitHub Actions, Azure DevOps, Jenkins, etc.) | No          | Limited           |
| Long running processes as part of the step                                         | No          | Yes               |
| Support for human interaction during execution                                     | No          | Yes               |
| Define failure Strategy or Conditional executions                                  | Limited     | Yes               |
| Scheduled execution                                                                | No          | Yes               |


## Plugins

| **Plugins**                                 | **Self Managed Backstage**  | **Harness IDP**   |
|---------------------------------------------|-----------------------------|-------------------|
| Install and configure plugins               | Yes                         | Yes               |
| Customize catalog layout using plugins      | Yes                         | Yes               |
| Write custom plugins                        | Yes                         | Yes               |


## Scorecards

| **Scorecards**                                  | **Self Managed Backstage**  | **Harness IDP**   |
|-------------------------------------------------|-----------------------------|-------------------|
| Service Scorecards                              | Limited                     | Yes               |
| Custom checks                                   | No                          | Yes               |
| Parsing support for file-content based checks   | No                          | Yes               |
| Custom Data Source                              | No                          | Roadmap           |


## Governance

| **Governance**                                           | **Self Managed Backstage**     |**Harness IDP**    |
|----------------------------------------------------------|--------------------------------|-------------------|
| Approval gates via Jira/ServiceNow/etc. for workflows    | No                             | Yes               |
| Role Based Access Control                                | No                             | Yes               |
| Open Policy Agent based Policies                         | No                             | Yes               |
| Audit Trails                                             | No                             | Yes               |


## Platform

| **Platform**                                             | **Self Managed Backstage**  | **Harness IDP**   |
|----------------------------------------------------------|-----------------------------|-------------------|
| User and Group Management UI                             | No                          | Yes               |
| Ingestion of Users, User Groups and Roles from different sources (LDAP, AD, SCIM, etc.)| Limited           | Yes                 |
| Single Sign-On                                           | Limited                     | Yes               |
| Custom Dashboards for Key Adoption Insights              | No                          | Yes               |
| Scheduled executive reports                              | No                          | Yes               |
| Alerting based on metrics trends                         | No                          | Yes               |
| Project and Org based hierarchy of entities              | No                          | Limited           |


## Miscellaneous

| **Miscellaneous**                                        | **Self Managed Backstage**  | **Harness IDP**   | 
|----------------------------------------------------------|-----------------------------|-------------------|
| Customize UI theme colors                                | Yes                         | No                |
| AI assisted onboarding and workflows                     | No                          | Roadmap           |
|                                                          |                             |                   |
