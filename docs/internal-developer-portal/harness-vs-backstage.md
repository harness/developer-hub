---
title: Harness IDP vs Backstage
description: Comparison of Harness Internal Developer Portal and Self Managed Backstage including a migration guide
sidebar_position: 3
sidebar_label: Harness IDP vs Self-Managed Backstage
redirect_from:
  - /docs/internal-developer-portal/roadmap/harness-vs-backstage
---

Harness Internal Developer Portal (IDP) extends the popular open source framework [Backstage](https://backstage.io/), a [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/) project. This gives us the best of both worlds - a core powered by Backstage philosophy and supported by a rich ecosystem of plugins, with a plethora of additional capabilities that are designed to make Backstage easier to configure, adopt, maintain, and scale for enterprise customers.  

Thos document explains the advantages that Harness IDP provides over self-managed Backstage, offers a comprehensive comparison of feature sets, and outlines a migration guide for customers that are considering a transition from managing their own Backstage instance to Harness IDP.  


## Harness IDP adds Enterprise Scale, Security and Governance to Backstage

Backstage is a great starting point for organizations that want to build an IDP for their teams. Organizations look at success stories, such as Spotify, and want to provide the same benefits to their teams to help them become more efficient and ship high-quality code faster. 

However, Backstage lacks several capabilities that are critical for enterprise adoption, including security and governance features such as RBAC and audit trails. These gaps, along with the administrative and operational burden of managing Backstage, make it difficult for enterprises to successfully adopt it to a point where they see the advantages.  

Harness IDP improves on the Backstage framework to make it enterprise-friendly and easier to administer, adopt, and scale. Some of the advantages include:

* **Reduced Operational Burden:** Harness IDP alleviates the administrative burden by handling hosting, upgrading, and patching, while providing an intuitive administrative interface. Instead of spending time on managing Backstage infrastructure or writing code to configure the portal, your platform team can focus on delivering value to developers.

* **Enterprise Scale and Security:** After working with platform teams at several enterprises, it's clear that while Backstage is great for teams without stringent requirements for access control or scalability beyond a few hundred developers, its architecture has limitations for enterprises that need a more structured and scalable portal with fine-grained access control. Harness IDP addresses these limitations and provides the ability to organize catalog entities and workflows into a hierarchical stucture representing real world organizations, entity-level granular RBAC, and a scalable Git experience that supports tens of thousands of entities.

* **Enterprise Governance Out-of-the-Box:** Harness IDP supports Open Policy Agent (OPA) based policies, audit trails, and integrates with popular secret managers. 

* **Advanced Workflows:** Harness IDP workflows are powered by Harness pipelines, which offer sophisticated capabilities such as parallel execution, approval gates, and extensive customization options. The workflows frontend is also advanced and offers a host of customizations including dynamic pickers, conditional inputs and ability to specify depedencies between fields.

* **Analytics and Insights:** Harness IDP includes custom dashboards for key adoption insights, scheduled executive reports, and alerting based on metrics trends, capabilities that would require significant development effort in self-managed Backstage.

* **Adoption accelerators:** Customers can choose to create and manage catalog entities through Git, or just through the UI without needing a YAML in Git. Harness IDP also offers a powerful entity management API which unlocks significant automation potential for auto-discovery, auto-population, and building CLIs or Terraform providers.

We provide a seamless migration path for organizations already running Backstage, ensuring a smooth transition without data loss.

The choice ultimately comes down to build versus buy. While self-managed Backstage feels attractive due to its open source nature, Harness IDP delivers enterprise-grade capabilities with significantly lower total cost of ownership, allowing platform teams to focus on strategic initiatives rather than infrastructure maintenance. Our Ebook [What To Consider When Building an IDP using Backstage](https://www.harness.io/resources/what-to-consider-when-building-an-idp-using-backstage) explores this topic in depth for those interested in a deep dive. 


## Detailed Feature Comparison

### Catalog

| **Catalog**                     | **Self Managed Backstage** | **Harness IDP** | Notes                                                                                                              |
| ------------------------------- | -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| Create/Update entities via YAML | Yes                        | Yes             |                                                                                                                    |
| Create/Update entities via UI   | No                         | Yes             | With Harness Git Experience, entities can be updated bidirectionally between UI and YAML.                          |
| Create/Update entities via APIs | No                         | Yes             | [API Docs](https://apidocs.harness.io/tag/Entities)                                                            |
| Customize Entity Page UI        | Yes (via Code)             | Yes (via YAML)  | [Docs](/docs/internal-developer-portal/layout-and-appearance/catalog)                                              |
| Custom Entity Types             | Yes                        | Yes             | [Docs](/docs/internal-developer-portal/layout-and-appearance/catalog#understanding-catalog-entity-kinds-and-types) |
| Custom Data Model               | Limited                    | Roadmap         |                                                                                                                    |
| Automated Discovery             | No                         | Roadmap         |                                                                                                                    |

### Workflows

| **Workflows**                                      | **Self Managed Backstage** | **Harness IDP** | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | -------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Software Templates and Self Service                | Yes                        | Yes             |   [Self-service Workflows Overview](https://developer.harness.io/docs/internal-developer-portal/flows/overview)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Workflow Groups and Customizable UI                | No                         | Yes             | Organize workflows into groups based on use cases. Recommend Golden Paths to developers and make IDP your Self Service Hub                                                                                                                                                                                                                                                                                                                                                                           |
| Custom UI Pickers                                  | Yes                        | Yes             | Implemented through the [Dynamic Workflow picker](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker) framework, providing advanced UI customization capabilities                                                                                                                                                                                                                                                                                                                                                                                |
| Pipeline orchestrator                              | Limited                    | Yes             | Harness IDP integrates the enterprise-grade [Harness pipeline orchestrator](https://developer.harness.io/docs/category/pipelines) as a core component, providing significantly enhanced capabilities compared to the Backstage Scaffolder backend.                                                                                                                                                                                                                                                                                                                                           |
| Custom action/step                                 | Limited                    | Yes             | Scaffolder Actions in Backstage execute in the same environment as the portal itself, creating potential security vulnerabilities. These actions have inherent limitations in functionality, language support, and RBAC implementation. In contrast, Harness Pipelines provide enterprise-grade security, extensive customization options, and comprehensive support for diverse execution requirements. |
| Isolation of infrastructure for executions         | No                         | Yes             | Harness IDP provides dedicated execution infrastructure, isolating workflow executions from the application environment. This prevents infrastructure changes from disrupting ongoing workflow executions, unlike Backstage where Scaffolder tasks share infrastructure with the application itself.                                                                                                                                                                                                                    |
| Granular access control of workflows               | No                         | Yes             |             [Workflows RBAC](https://developer.harness.io/docs/internal-developer-portal/rbac/workflow-rbac)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Native integration with Jira/Slack/ServiceNow/etc. | No                         | Yes             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Long running processes as part of the step         | No                         | Yes             |           Harness Pipelines support long running steps and [customizable timeouts](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps#add-a-step-failure-strategy).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Support for human interaction during execution     | No                         | Yes             |               Several types of manual interactions are supported, including [approvals](https://developer.harness.io/docs/category/approvals) that are triggered manually, through Jira or ServiceNow or via other custom triggers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Define failure Strategy or Conditional executions  | Limited                    | Yes             |                 [Failure strategies](https://developer.harness.io/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps), [Conditional executions](https://developer.harness.io/docs/platform/pipelines/step-skip-condition-settings)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### Scorecards

| **Scorecards**                                | **Self Managed Backstage** | **Harness IDP** | **Notes**                                                                                                             |
| --------------------------------------------- | -------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| Service Scorecards                            | Limited                    | Yes             |                                                                                                                       |
| Custom checks                                 | No                         | Yes             |         [Custom checks](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources#add-custom-checks)                                                                                                              |
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

### Availability of Backstage customizations in Harness IDP

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
| Custom permissions policy using Backstage permissions framework        | Yes                        | Limited         | [Role-based access control (RBAC)](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles) , [Governance](https://developer.harness.io/docs/category/governance-2)                                                                                                                                                                                                                                                                                           |

### Extensibility and Flexibility

Harness IDP maintains compatibility with the [Backstage Plugins marketplace](https://backstage.io/plugins), supporting rapid enablement of additional plugins upon customer request. Our managed plugin deployment approach addresses the majority of extensibility requirements while maintaining system integrity and security.

Our [custom plugins framework](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) enables organizations to develop [custom frontend plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin#introduction) that can be deployed via package upload or npm registry integration.

For advanced customizations, Harness IDP provides a comprehensive, secure [Ingestion API](https://www.harness.io/blog/introducing-new-catalog-ingestion-apis-to-make-harness-idp-truly-yours) which enables dynamic entity definition updates without compromising platform security. This is a strategic alternative to Backstage's [custom entity providers](https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers) and [custom catalog processors](https://backstage.io/docs/features/software-catalog/external-integrations#custom-processors), which require complex TypeScript implementations. 

---

## Comprehensive Guide: Migrating from Backstage to Harness IDP

Migrating from a self-managed Backstage instance to Harness Internal Developer Portal (IDP) can significantly streamline your developer experience, centralize governance, and unlock advanced capabilities. The migration process will vary in complexity based on the extent of customizations in your current Backstage setup. This guide provides a step-by-step approach to ensure a smooth transition, highlighting key considerations and Harness IDP features that can replace or enhance your existing developer portal.

> **Note:** This guide focuses on the technical migration steps. For a holistic adoption strategy, refer to our [Adoption Playbook](/docs/internal-developer-portal/adoption/adoption-playbook).


### Platform Migration

#### **Step 1: Authentication and Authorization**

Harness IDP leverages the robust [Harness Platform authentication and authorization](https://developer.harness.io/docs/platform/authentication/authentication-overview) framework. You can seamlessly integrate your existing identity providers (such as LDAP, SSO, or Azure Entra ID) to ingest users and groups, and synchronize roles. This eliminates the need for custom sign-in resolvers and user/group entity providers previously required in Backstage, centralizing identity management and enhancing security.

#### **Step 2: Connectivity via Harness Delegate**

Unlike Backstage, which operates within your infrastructure, Harness IDP is delivered as a hybrid SaaS offering. To securely connect Harness IDP and its plugins to your internal systems (e.g., source code repositories, infrastructure, services), deploy a [Harness Delegate](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/). The delegate acts as a secure proxy, ensuring seamless and controlled access to internal resources without exposing them directly to the cloud.

#### **Step 3: Role-Based Access Control (RBAC)**

Harness IDP provides a powerful, integrated RBAC system. If you have been using Backstage’s permissions framework, you can transition to [Harness RBAC](https://developer.harness.io/docs/internal-developer-portal/rbac/scopes) to manage access policies at scale. Harness RBAC simplifies the assignment of roles and permissions, supporting granular access control across users, teams, and resources.

#### **Step 4: Branding and Customization**

While full theme customization is not currently supported, Harness IDP offers [Home Page Customizations](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization) to help you personalize the portal’s appearance and reinforce your organization’s brand identity.


### Catalog Migration

#### **Step 1: Entity Migration**

Harness IDP provides an [Entity Conversion API](https://apidocs.harness.io/tag/Entities#operation/convert-entity) to automate the transformation of Backstage entity YAMLs into Harness IDP Catalog YAMLs. You can use the [Backstage Locations API](https://backstage.io/docs/features/software-catalog/software-catalog-api/#get-locations) to enumerate all entity YAML files, then convert and import them into Harness using the [Harness Git Experience](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/). This ensures continuity and consistency in your software catalog.

#### **Step 2: Plugin Enablement and Migration**

Harness IDP features a comprehensive plugin marketplace that enables seamless integration of Backstage plugins into your environment. For organizations with custom plugin requirements, our [custom plugins documentation](https://developer.harness.io/docs/category/custom-plugins/) provides detailed implementation guidance. In cases where plugins require backend services or database connectivity, you can leverage the [delegate proxy](/docs/internal-developer-portal/plugins/delegate-proxy) architecture to establish secure communication channels between Harness IDP and your self-hosted backend components.

#### **Step 3: Catalog Layout Customization**

With the [Entity Layout Editor](/docs/internal-developer-portal/layout-and-appearance/catalog), you can tailor the user interface of catalog entity pages. Arrange plugins, widgets, and sidebar navigation to create an optimal experience for your teams.

#### **Step 4: Custom Metadata Ingestion**

If you have developed custom catalog processors in Backstage to enrich entity metadata, Harness IDP offers [Catalog Ingestion APIs](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api) to programmatically push additional metadata. This enables you to maintain or enhance your metadata enrichment workflows without modifying entity YAML files.

#### **Step 5: Custom Entity Providers**

For scenarios where entities are created directly in the catalog (bypassing YAML files), Harness IDP’s [Entities API](https://apidocs.harness.io/tag/Entities#operation/create-entity) allows you to create and manage catalog entities programmatically, supporting advanced automation and integration use cases.


### Workflow (aka Software Templates) Migration

#### **Step 1: Workflow Definition and Migration**

Harness IDP Workflows extends the Backstage Scaffolder concept, retaining a familiar UI while leveraging [Harness Pipelines](https://developer.harness.io/docs/internal-developer-portal/flows/worflowyaml) as the backend. Use the [Entity Conversion API](https://apidocs.harness.io/tag/Entities#operation/convert-entity) to convert Backstage template YAMLs to Harness IDP Workflow YAMLs, enabling you to recreate and enhance your existing workflows.

#### **Step 2: Migrating Custom Scaffolder Actions**

If you have implemented custom scaffolder actions in Backstage, Harness IDP allows you to replicate this functionality using the built-in “Run” step in Harness IDP pipelines. This step supports execution of any containerized code (e.g., scripts written in Python, Go, shell, etc.), providing flexibility and extensibility while maintaining proper isolation and security controls.

#### **Step 3: Custom UI Pickers**

If you have implemented custom UI fields in Backstage, you can leverage [workflow dynamic pickers](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker) to replicate the behavior of those fields. Harness IDP also supports [conditional API requests](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker#conditional-api-requests), further enhancing your custom UI fields.
