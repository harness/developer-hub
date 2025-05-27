---
title: Harness IDP vs Backstage
description: Comparison of Harness Internal Developer Portal and Self Managed Backstage including a migration guide
sidebar_position: 3
sidebar_label: Harness IDP vs Self-Managed Backstage
redirect_from:
  - /docs/internal-developer-portal/roadmap/harness-vs-backstage
---

While Harness Internal Developer Portal leverages the Backstage Open Source project, it significantly enhances the capabilities if you were to host Backstage on your own. Apart from the effort required to do so, this page compares the features of Harness IDP and Self-Managed Backstage. It also includes a migration guide at the bottom if you already have a Backstage instance running and are thinking to migrate to Harness IDP.

## Feature Comparison

### Catalog

| **Catalog**                     | **Self Managed Backstage** | **Harness IDP** | Notes                                                                                                              |
| ------------------------------- | -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| Create/Update entities via YAML | Yes                        | Yes             |                                                                                                                    |
| Create/Update entities via UI   | No                         | Yes             | With Harness Git Experience, entities can be updated bidirectionally between UI and YAML.                          |
| Create/Update entities via APIs | No                         | Yes             | See [API Docs](https://apidocs.harness.io/tag/Entities)                                                            |
| Customize Entity Page UI        | Yes (via Code)             | Yes (via YAML)  | [Docs](/docs/internal-developer-portal/layout-and-appearance/catalog)                                              |
| Custom Entity Types             | Yes                        | Yes             | [Docs](/docs/internal-developer-portal/layout-and-appearance/catalog#understanding-catalog-entity-kinds-and-types) |
| Custom Data Model               | Limited                    | Roadmap         |                                                                                                                    |
| Automated Discovery             | No                         | Roadmap         |                                                                                                                    |

### Workflows

| **Workflows**                                      | **Self Managed Backstage** | **Harness IDP** | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | -------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Software Templates and Self Service                | Yes                        | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Workflow Groups and Customizable UI                | No                         | Yes             | Organize your Self Service Workflows to recommend Golden Paths to developers and make IDP your Self Service Hub                                                                                                                                                                                                                                                                                                                                                                           |
| Custom UI Pickers                                  | Yes                        | Yes             | Using [Dynamic Workflow picker](http://localhost:3000/docs/internal-developer-portal/flows/dynamic-picker)                                                                                                                                                                                                                                                                                                                                                                                |
| Pipeline orchestrator                              | Limited                    | Yes             | Harness IDP ships with the Harness pipeline orchestrator out of the box whic his significantly more powerful than Backstage Scaffolder backend.                                                                                                                                                                                                                                                                                                                                           |
| Custom action/step                                 | Limited                    | Yes             | Scaffolder Action is a backend functionality and runs in the same environment where the IDP executes. Support for custom scaffolder action allows users to get **access to the system** and **execute malicious code** in our systems. Scaffolder actions are also limited by what they can do, what programming language to use, how to setup RBAC, etc. Harness Pipelines are already configured to support such enterprise-grade requirements with even more customisations available. |
| Isolation of infrastructure for executions         | No                         | Yes             | Backstage Scaffolder tasks execute on the same infrastructure as the Backstage app. Any changes to the Backstage app infrastructure can kill existing scaffolder runs.                                                                                                                                                                                                                                                                                                                    |
| Granular access control of workflows               | No                         | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Native integration with Jira/Slack/ServiceNow/etc. | No                         | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Long running processes as part of the step         | No                         | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Support for human interaction during execution     | No                         | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Define failure Strategy or Conditional executions  | Limited                    | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### Scorecards

| **Scorecards**                                | **Self Managed Backstage** | **Harness IDP** | **Notes**                                                                                                             |
| --------------------------------------------- | -------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| Service Scorecards                            | Limited                    | Yes             |                                                                                                                       |
| Custom checks                                 | No                         | Yes             |                                                                                                                       |
| Parsing support for file-content based checks | No                         | Yes             |                                                                                                                       |
| Custom Data Source                            | No                         | Yes             | [See Catalog Ingestion API](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api-tutorial) |

### Plugins

| **Plugins**                            | **Self Managed Backstage** | **Harness IDP** |
| -------------------------------------- | -------------------------- | --------------- |
| Install and configure plugins          | Yes                        | Yes             |
| Customize Catalog layout using plugins | Yes                        | Yes             |
| Write custom frontend plugins          | Yes                        | Yes             |
| Write custom backend plugins           | Yes                        | No              |

### Governance and Security

| **Governance and Security**                              | **Self Managed Backstage** | **Harness IDP** |
| -------------------------------------------------------- | -------------------------- | --------------- |
| Role Based Access Control                                | No                         | Yes             |
| Approval gates via Jira/ServiceNow/etc. for workflows    | No                         | Yes             |
| Role Based Access Control                                | No                         | Yes             |
| Open Policy Agent based Policies                         | No                         | Yes             |
| Audit Trails                                             | No                         | Yes             |
| Integration with Secret Managers (AWS, GCP, Vault, etc.) | No                         | Yes             |

### Platform

| **Platform**                                                                            | **Self Managed Backstage** | **Harness IDP** |
| --------------------------------------------------------------------------------------- | -------------------------- | --------------- |
| User and Group Management UI                                                            | No                         | Yes             |
| Ingestion of Users, User Groups and Roles from different sources (LDAP, AD, SCIM, etc.) | Limited                    | Yes             |
| Single Sign-On                                                                          | Limited                    | Yes             |
| Custom Dashboards for Key Adoption Insights                                             | No                         | Yes             |
| Scheduled executive reports                                                             | No                         | Yes             |
| Alerting based on metrics trends                                                        | No                         | Yes             |
| Project and Org based hierarchy of entities                                             | No                         | Limited         |

### Miscellaneous

| **Miscellaneous**                    | **Self Managed Backstage** | **Harness IDP** |
| ------------------------------------ | -------------------------- | --------------- |
| Customize UI theme colors            | Yes                        | Roadmap         |
| AI assisted onboarding and workflows | No                         | Roadmap         |

### All Backstage customizations and their availability in Harness IDP

| **All Backstage customizations and their availability in Harness IDP** | **Self Managed backstage** | **Harness IDP** | Note there are no interfaces for these customizations, and all of these require you to implement it yourself using code                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------- | -------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add or remove plugins                                                  | Yes                        | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Write your own plugins                                                 | Yes                        | Yes             | Frontend and Proxy backend only. Custom backends should be hosted by customers internally as a separate service or lambda.                                                                                                                                                                                                                                                                                                                                                                |
| Write your own scaffolder/workflow actions                             | Yes                        | No              | Scaffolder Action is a backend functionality and runs in the same environment where the IDP executes. Support for custom scaffolder action allows users to get **access to the system** and **execute malicious code** in our systems. Scaffolder actions are also limited by what they can do, what programming language to use, how to setup RBAC, etc. Harness Pipelines are already configured to support such enterprise-grade requirements with even more customisations available. |
| Custom UI pickers in Scaffolder (Field Extensions)                     | Yes                        | No              | You can use [Dynamic Pickers](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker) as well as other supported [open-source Workflow UI Pickers](https://developer.harness.io/docs/internal-developer-portal/flows/custom-extensions). If you need support for any other UI picker available in open source, please submit a request on [canny](https://ideas.harness.io/).                                                                                   |
| Catalog Dependency graph                                               | Yes                        | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Custom entity providers                                                | Yes                        | Roadmap         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Custom entity kinds                                                    | Limited                    | Roadmap         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Custom catalog processors                                              | Yes                        | Roadmap         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Custom home page                                                       | Yes                        | Partial         | [Homepage Customisations](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization)                                                                                                                                                                                                                                                                                                                                                      |
| Custom side bar                                                        | Yes                        | Yes             | [Sidebar Customisations](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/sidenav)                                                                                                                                                                                                                                                                                                                                                                       |
| Custom colors and themes                                               | Yes                        | Roadmap         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Custom entity page layout                                              | Yes                        | Yes             | [Layout of Catalog Entity Pages](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/catalog)                                                                                                                                                                                                                                                                                                                                                               |
| Custom workflows home page                                             | No                         | Yes             | [Workflows Homepage Customization](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/workflows-page-customization)                                                                                                                                                                                                                                                                                                                                        |
| Search - bring your own index                                          | Yes                        | No              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Search results UI                                                      | Yes                        | No              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Custom permissions policy using Backstage permissions framework        | Yes                        | Limited         | [Role-based access control (RBAC)](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles) , [Governance](https://developer.harness.io/docs/category/governance-2)                                                                                                                                                                                                                                                                                              |

### How does Harness IDP compare against Self managed Backstage in terms of extensibility and flexibility?

In Harness IDP we offer the support for [custom plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) wherein you could build your own [backstage frontend plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin#introduction) and upload the package in IDP or provide the link to their published package on npm registry.

We support the code customers write and build and deploy it to the IDP on their behalf. This solves most of the use cases customers have that could be supported by extensibility. We are yet to receive the support for [dynamic frontend plugins](https://github.com/backstage/backstage/tree/master/beps/0002-dynamic-frontend-plugins) on Backstage, which is just on the proposal phase also it would be supported along with the new backend and frontend system, most plugins we see in the [Backstage Plugins marketplace](https://backstage.io/plugins) are built out of legacy backend system because that's what most adopters of Backstage are running. Today we support almost all the plugins from marketplace required by our customers and are open for customers request to enable any plugin, usually within one week, that's already on backstage marketplace but isn't available in Harness IDP.

Harness IDP doesn't yet support [custom entity provider](https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers) and [custom catalog processors](https://backstage.io/docs/features/software-catalog/external-integrations#custom-processors) but even on Backstage world these are complex code-level customizations which require good knowledge of typescript to implement.

A direct implementation of the custom entity providers and processors would require us to run customer's code on our backend which poses serious security risks. Hence we have worked on providing workarounds to solve the customer use cases that would otherwise require building out custom providers and processor on self managed backstage, for example the custom catalog processors are used to update the entity definitions on the fly (not YAML based), which is done using our [Ingestion API in Harness IDP](https://www.harness.io/blog/introducing-new-catalog-ingestion-apis-to-make-harness-idp-truly-yours)

## Comprehensive Guide: Migrating from Backstage to Harness IDP

Migrating from a self-managed Backstage instance to Harness Internal Developer Portal (IDP) can significantly streamline your developer experience, centralize governance, and unlock advanced capabilities. The migration process will vary in complexity based on the extent of customizations in your current Backstage setup. This guide provides a step-by-step approach to ensure a smooth transition, highlighting key considerations and Harness IDP features that can replace or enhance your existing developer portal.

> **Note:** This guide focuses on the technical migration steps. For a holistic adoption strategy, refer to our [Adoption Playbook](/docs/internal-developer-portal/adoption/adoption-playbook).

---

### Platform Migration

#### **Step 1: Authentication and Authorization**

Harness IDP leverages the robust [Harness Platform authentication and authorization](https://developer.harness.io/docs/platform/authentication/authentication-overview) framework. You can seamlessly integrate your existing identity providers (such as LDAP, SSO, or Azure Entra ID) to ingest users and groups, and synchronize roles. This eliminates the need for custom sign-in resolvers and user/group entity providers previously required in Backstage, centralizing identity management and enhancing security.

#### **Step 2: Connectivity via Harness Delegate**

Unlike Backstage, which operates within your infrastructure, Harness IDP is delivered as a hybrid SaaS offering. To securely connect Harness IDP and its plugins to your internal systems (e.g., source code repositories, infrastructure, services), deploy a [Harness Delegate](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/). The delegate acts as a secure proxy, ensuring seamless and controlled access to internal resources without exposing them directly to the cloud.

#### **Step 3: Role-Based Access Control (RBAC)**

Harness IDP provides a powerful, integrated RBAC system. If you have been using Backstage’s permissions framework, you can transition to [Harness RBAC](https://developer.harness.io/docs/internal-developer-portal/rbac/scopes) to manage access policies at scale. Harness RBAC simplifies the assignment of roles and permissions, supporting granular access control across users, teams, and resources.

#### **Step 4: Branding and Customization**

While full theme customization is not currently supported, Harness IDP offers [Home Page Customizations](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization) to help you personalize the portal’s appearance and reinforce your organization’s brand identity.

---

### Catalog Migration

#### **Step 1: Entity Migration**

Harness IDP provides an [Entity Conversion API](https://apidocs.harness.io/tag/Entities#operation/convert-entity) to automate the transformation of Backstage entity YAMLs into Harness IDP Catalog YAMLs. You can use the [Backstage Locations API](https://backstage.io/docs/features/software-catalog/software-catalog-api/#get-locations) to enumerate all entity YAML files, then convert and import them into Harness using the [Harness Git Experience](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/). This ensures continuity and consistency in your software catalog.

#### **Step 2: Plugin Enablement and Migration**

Harness IDP features a comprehensive plugin marketplace, allowing you to enable and configure Backstage plugins. For custom plugins, refer to our [custom plugins documentation](https://developer.harness.io/docs/category/custom-plugins/). If your plugins require backend services or databases, you will need to self-host these components and connect them to Harness IDP via the [delegate proxy](/docs/internal-developer-portal/plugins/delegate-proxy), ensuring secure communication.

#### **Step 3: Catalog Layout Customization**

With the [Entity Layout Editor](/docs/internal-developer-portal/layout-and-appearance/catalog), you can tailor the user interface of catalog entity pages. Arrange plugins, widgets, and sidebar navigation to create an optimal experience for your teams.

#### **Step 4: Custom Metadata Ingestion**

If you have developed custom catalog processors in Backstage to enrich entity metadata, Harness IDP offers [Catalog Ingestion APIs](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api) to programmatically push additional metadata. This enables you to maintain or enhance your metadata enrichment workflows without modifying entity YAML files.

#### **Step 5: Custom Entity Providers**

For scenarios where entities are created directly in the catalog (bypassing YAML files), Harness IDP’s [Entities API](https://apidocs.harness.io/tag/Entities#operation/create-entity) allows you to create and manage catalog entities programmatically, supporting advanced automation and integration use cases.

---

### Workflow (aka Software Templates) Migration

#### **Step 1: Workflow Definition and Migration**

Harness IDP Workflows extends the Backstage Scaffolder concept, retaining a familiar UI while leveraging [Harness Pipelines](https://developer.harness.io/docs/internal-developer-portal/flows/worflowyaml) as the backend. Use the [Entity Conversion API](https://apidocs.harness.io/tag/Entities#operation/convert-entity) to convert Backstage template YAMLs to Harness IDP Workflow YAMLs, enabling you to recreate and enhance your existing workflows.

#### **Step 2: Migrating Custom Scaffolder Actions**

If you have implemented custom scaffolder actions in Backstage, Harness IDP allows you to replicate this functionality using the built-in “Run” step in pipelines. This step supports execution of any containerized code (e.g., scripts written in Python, Go, shell, etc.), providing flexibility and extensibility. For

#### **Step 3: Custom UI Pickers**

If you have implemented custom UI fields in Backstage, you can leverage [workflow dynamic pickers](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker) to replicate the behavior of those fields. Harness IDP also supports [conditional API requests](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker#conditional-api-requests), further enhancing your custom UI fields.
