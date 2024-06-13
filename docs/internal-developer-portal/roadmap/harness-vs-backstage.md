---
title: Harness IDP vs Self Managed Backstage - In-depth Feature Comparison
description: All the features that are available in Harness IDP and the differentiator against Self Managed Backstage
sidebar_position: 2
---

The following tables compare feature availability between Harness IDP and Self-Managed Backstage for various features like [Software Catalog](https://developer.harness.io/docs/category/software-catalog), [Workflows](https://developer.harness.io/docs/category/self-service-flows), [Plugins](https://developer.harness.io/docs/category/plugins), [Scorecards](https://developer.harness.io/docs/category/scorecards), [Governance](https://developer.harness.io/docs/category/governance) and [Platform](/docs/platform/get-started/key-concepts.md).


| **Software Catalog**          | **Self Managed Backstage**  | **Harness IDP**  |
|-------------------------------|-----------------------------|------------------|
| Entity definition as Code     | Yes                         | Yes              |
| Favorites/bookmark entities   | Yes                         | Yes              |
| Catalog Dependency graph      | Yes                         | Yes              |
| Custom entity providers       | Yes                         | Roadmap          |
| Custom entity kinds           | Limited                     | Roadmap          |
| Custom catalog processors     | Yes                         | Roadmap          |
| Automated Service Discovery   | No                          | Roadmap          |

| **Workflows**                                      |  **Self Managed Backstage** | **Harness IDP**  |
|-------------------------------|-----------------------------|------------------|
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

| **Plugins**                                 | **Self Managed Backstage**  | **Harness IDP**   |
|-------------------------------|-----------------------------|------------------|
| Install and configure plugins               | Yes                         | Yes               |
| Customize catalog layout using plugins      | Yes                         | Yes               |
| Write custom plugins                        | Yes                         | Yes               |

| **Scorecards**                                  | **Self Managed Backstage**  | **Harness IDP**   |
|-------------------------------|-----------------------------|------------------|
| Service Scorecards                              | Limited                     | Yes               |
| Custom checks                                   | No                          | Yes               |
| Parsing support for file-content based checks   | No                          | Yes               |
| Custom Data Source                              | No                          | Roadmap           |

| **Governance**                                           | **Self Managed Backstage**     |**Harness IDP**    |
|-------------------------------|-----------------------------|------------------|
| Approval gates via Jira/ServiceNow/etc. for workflows    | No                             | Yes               |
| Role Based Access Control                                | No                             | Yes               |
| Open Policy Agent based Policies                         | No                             | Yes               |
| Audit Trails                                             | No                             | Yes               |

| **Platform**                                             | **Self Managed Backstage**  | **Harness IDP**   |
|-------------------------------|-----------------------------|------------------|
| User and Group Management UI                             | No                          | Yes               |
| Ingestion of Users, User Groups and Roles from different sources (LDAP, AD, SCIM, etc.)| Limited           | Yes                 |
| Single Sign-On                                           | Limited                     | Yes               |
| Custom Dashboards for Key Adoption Insights              | No                          | Yes               |
| Scheduled executive reports                              | No                          | Yes               |
| Alerting based on metrics trends                         | No                          | Yes               |
| Project and Org based hierarchy of entities              | No                          | Limited           |

| **Miscellaneous**                                        | **Self Managed Backstage**  | **Harness IDP**   |
|-------------------------------|-----------------------------|------------------|
| Customize UI theme colors                                | Yes                         | No                |
| AI assisted onboarding and workflows                     | No                          | Roadmap           |


### How does Harness IDP compare against Self managed Backstage in terms of extensibility and flexibility?

In Harness IDP we offer the support for [custom plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) wherein you could build your own [backstage frontend plugins](http://localhost:3000/docs/internal-developer-portal/plugins/build-a-frontend-plugin#introduction) and upload the package in IDP or provide the link to their published package on npm registry. 

We support the code customers write and build and deploy it to the IDP on their behalf. This solves most of the use cases customers have that could be supported by extensibility. We are yet to receive the support for [dynamic frontend plugins](https://github.com/backstage/backstage/tree/master/beps/0002-dynamic-frontend-plugins) on Backstage, which is just on the proposal phase also it would be supported along with the new backend and frontend system, most plugins we see in the [Backstage Plugins marketplace](https://backstage.io/plugins) are built out of legacy backend system because that's what most adopters of Backstage are running. Today we support almost all the plugins from marketplace required by our customers and are open for customers request to enable any plugin, usually within one week, that's already on backstage marketplace but isn't available in Harness IDP.

Harness IDP doesn't yet support [custom entity provider](https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers) and [custom catalog processors](https://backstage.io/docs/features/software-catalog/external-integrations#custom-processors) but even on Backstage world these are complex code-level customizations which require good knowledge of typescript to implement. 

A direct implementation of the custom entity providers and processors would require us to run customer's code on our backend which poses serious security risks. Hence we have worked on providing workarounds to solve the customer use cases that would otherwise require building out custom providers and processor on self managed backstage, for example the custom catalog processors are used to update the entity definitions on the fly (not YAML based), which is done using our [Ingestion API in Harness IDP](https://www.harness.io/blog/introducing-new-catalog-ingestion-apis-to-make-harness-idp-truly-yours) 