---
title: Harness IDP vs Self Managed Backstage - In-depth Feature Comparison
description: All the features that are available in Harness IDP and the differentiator against Self Managed Backstage
sidebar_position: 2
---

The following tables compare feature availability between Harness IDP and Self-Managed Backstage for various features like [Software Catalog](https://developer.harness.io/docs/category/software-catalog), [Workflows](https://developer.harness.io/docs/category/self-service-flows), [Plugins](https://developer.harness.io/docs/category/plugins), [Scorecards](https://developer.harness.io/docs/category/scorecards), [Governance](https://developer.harness.io/docs/category/governance) and [Platform](/docs/platform/get-started/key-concepts.md).


## Software Catalog

| **Software Catalog**        | **Self Managed Backstage** | **Harness IDP** | Notes                                                                                                                   |
| --------------------------- | -------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Entity definition as Code   | Yes                        | Yes             |                                                                                                                         |
| Favorites/bookmark entities | Yes                        | Yes             |                                                                                                                         |
| Catalog Dependency graph    | Yes                        | Yes             |                                                                                                                         |
| Custom Entity Types         | Yes                        | Yes             | [Docs](/docs/internal-developer-portal/layout-and-appearance/catalog#understanding-catalog-entity-kinds-and-types)      |
| Custom Entity Kinds         | Limited                    | No              | Backstage does not recommend creating custom entity Kinds, since the existing Kinds are sufficient for major use-cases. |
| Custom Catalog Processors   | Yes                        | Alternative     | [See Catalog Ingestion API](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api-tutorial.md)                                  |
| Custom Entity Providers     | Yes                        | No              |                                                                                                                         |
| Automated Service Discovery | No                         | Roadmap         |                                                                                                                         |


## Workflows

| **Workflows**                                                                      | **Self Managed Backstage** | **Harness IDP** | Notes                                                                                                                                                                  |
| ---------------------------------------------------------------------------------- | -------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Config-driven UI for each workflow/template                                        | Yes                        | Yes             |                                                                                                                                                                        |
| API response based custom dropdown pickers                                         | Yes                        | Roadmap         |                                                                                                                                                                        |
| UI based pipeline orchestrator                                                     | No                         | Yes             |                                                                                                                                                                        |
| UI based input form editor                                                         | Yes                        | Yes             |                                                                                                                                                                        |
| Write custom action/step                                                           | Limited                    | Yes             | Possible via custom steps in Harness Pipelines                                                                                                                         |
| Isolation of infrastructure for executions                                         | No                         | Yes             | Backstage Scaffolder tasks execute on the same infrastructure as the Backstage app. Any changes to the Backstage app infrastructure can kill existing scaffolder runs. |
| Granular access control of workflows                                               | No                         | Yes             | Requires Permission policy to be written via code.                                                                                                                     |
| Native integration with Jira/Slack/ServiceNow/etc.                                 | No                         | Yes             |                                                                                                                                                                        |
| Integration with other orchestrators (GitHub Actions, Azure DevOps, Jenkins, etc.) | No                         | Limited         |                                                                                                                                                                        |
| Long running processes as part of the step                                         | No                         | Yes             |                                                                                                                                                                        |
| Support for human interaction during execution                                     | No                         | Yes             |                                                                                                                                                                        |
| Define failure Strategy or Conditional executions                                  | Limited                    | Yes             |                                                                                                                                                                        |
| Scheduled execution                                                                | No                         | Yes             |                                                                                                                                                                        |
| Custom UI field extensions                                                         | Limited                    | No              |                                                                                                                                                                        |

## Plugins

| **Plugins**                            | **Self Managed Backstage** | **Harness IDP** |
| -------------------------------------- | -------------------------- | --------------- |
| Install and configure plugins          | Yes                        | Yes             |
| Customize Catalog layout using plugins | Yes                        | Yes             |
| Write custom frontend plugins          | Yes                        | Yes             |
| Write custom backend plugins           | Yes                        | No              |


## Scorecards

| **Scorecards**                                | **Self Managed Backstage** | **Harness IDP** | **Notes**                                                                              |
| --------------------------------------------- | -------------------------- | --------------- | -------------------------------------------------------------------------------------- |
| Service Scorecards                            | Limited                    | Yes             |                                                                                        |
| Custom checks                                 | No                         | Yes             |                                                                                        |
| Parsing support for file-content based checks | No                         | Yes             |                                                                                        |
| Custom Data Source                            | No                         | Yes             | [See Catalog Ingestion API](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api-tutorial) |

## Governance and Security

| **Governance and Security**                              | **Self Managed Backstage** | **Harness IDP** |
| -------------------------------------------------------- | -------------------------- | --------------- |
| Approval gates via Jira/ServiceNow/etc. for workflows    | No                         | Yes             |
| Role Based Access Control                                | No                         | Yes             |
| Open Policy Agent based Policies                         | No                         | Yes             |
| Audit Trails                                             | No                         | Yes             |
| Integration with Secret Managers (AWS, GCP, Vault, etc.) | No                         | Yes             |

## Platform

| **Platform**                                                                            | **Self Managed Backstage** | **Harness IDP** |
| --------------------------------------------------------------------------------------- | -------------------------- | --------------- |
| User and Group Management UI                                                            | No                         | Yes             |
| Ingestion of Users, User Groups and Roles from different sources (LDAP, AD, SCIM, etc.) | Limited                    | Yes             |
| Single Sign-On                                                                          | Limited                    | Yes             |
| Custom Dashboards for Key Adoption Insights                                             | No                         | Yes             |
| Scheduled executive reports                                                             | No                         | Yes             |
| Alerting based on metrics trends                                                        | No                         | Yes             |
| Project and Org based hierarchy of entities                                             | No                         | Limited         |


## Miscellaneous

| **Miscellaneous**                    | **Self Managed Backstage** | **Harness IDP** |
| ------------------------------------ | -------------------------- | --------------- |
| Customize UI theme colors            | Yes                        | Roadmap         |
| AI assisted onboarding and workflows | No                         | Roadmap         |


## All Backstage customizations and their availability in Harness IDP

| **All Backstage customizations and their availability in Harness IDP** | **Self Managed backstage** | **Harness IDP** | Note there are no interfaces for these customizations, and all of these require you to implement it yourself using code                                                                       |
|--------------------------------------------------------------------|------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Add or remove plugins                                              | Yes                    | Yes         |                                                                                                                                                                                               |
| Write your own plugins                                             | Yes                    | Yes         | Frontend and Proxy backend only. Custom backends should be hosted by customers internally as a separate service or lambda.                                                                    |
| Write your own workflow actions                                    | Yes                    | Yes         | Via a custom step in the Harness pipeline (run any docker container or a script)                                                                                                              |
| Custom UI pickers in Scaffolder (Field Extensions)                 | Yes                    | Yes         | [Supported Workflow UI Pickers](https://developer.harness.io/docs/internal-developer-portal/flows/custom-extensions)                                                                          |
| Catalog Dependency graph                                           | Yes                    | Yes         |                                                                                                                                                                                               |
| Custom entity providers                                            | Yes                    | Roadmap     |                                                                                                                                                                                               |
| Custom entity kinds                                                | Limited                | Roadmap     |                                                                                                                                                                                               |
| Custom catalog processors                                          | Yes                    | Roadmap     |                                                                                                                                                                                               |
| Custom home page                                                   | Yes                    | Partial     | [Homepage Customisations](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization)                                                          |
| Custom side bar                                                    | Yes                    | Yes         | [Sidebar Customisations](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/sidenav)                                                                           |
| Custom colors and themes                                           | Yes                    | Roadmap     |                                                                                                                                                                                               |
| Custom entity page layout                                          | Yes                    | Yes         | [Layout of Catalog Entity Pages](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/catalog)                                                                   |
| Custom workflows home page                                         | No                     | Yes         | [Workflows Homepage Customization](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/workflows-page-customization)                                            |
| Search - bring your own index                                      | Yes                    | No          |                                                                                                                                                                                               |
| Search results UI                                                  | Yes                    | No          |                                                                                                                                                                                               |
| Custom permissions policy using Backstage permissions framework    | Yes                    | Limited     | [Role-based access control (RBAC)](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles) ,  [Governance](https://developer.harness.io/docs/category/governance-2) |


### How does Harness IDP compare against Self managed Backstage in terms of extensibility and flexibility?

In Harness IDP we offer the support for [custom plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) wherein you could build your own [backstage frontend plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin#introduction) and upload the package in IDP or provide the link to their published package on npm registry.

We support the code customers write and build and deploy it to the IDP on their behalf. This solves most of the use cases customers have that could be supported by extensibility. We are yet to receive the support for [dynamic frontend plugins](https://github.com/backstage/backstage/tree/master/beps/0002-dynamic-frontend-plugins) on Backstage, which is just on the proposal phase also it would be supported along with the new backend and frontend system, most plugins we see in the [Backstage Plugins marketplace](https://backstage.io/plugins) are built out of legacy backend system because that's what most adopters of Backstage are running. Today we support almost all the plugins from marketplace required by our customers and are open for customers request to enable any plugin, usually within one week, that's already on backstage marketplace but isn't available in Harness IDP.

Harness IDP doesn't yet support [custom entity provider](https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers) and [custom catalog processors](https://backstage.io/docs/features/software-catalog/external-integrations#custom-processors) but even on Backstage world these are complex code-level customizations which require good knowledge of typescript to implement.

A direct implementation of the custom entity providers and processors would require us to run customer's code on our backend which poses serious security risks. Hence we have worked on providing workarounds to solve the customer use cases that would otherwise require building out custom providers and processor on self managed backstage, for example the custom catalog processors are used to update the entity definitions on the fly (not YAML based), which is done using our [Ingestion API in Harness IDP](https://www.harness.io/blog/introducing-new-catalog-ingestion-apis-to-make-harness-idp-truly-yours)
