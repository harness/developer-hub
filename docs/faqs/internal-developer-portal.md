---
title: Internal Developer Portal FAQs
description: This article addresses some frequently asked questions about Harness Internal Developer Portal.
sidebar_position: 11
---

### How does Harness IDP compare against Self managed Backstage in terms of extensibility and flexibility?

In Harness IDP we offer the support for [custom plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) wherein you could build your own [backstage frontend plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin#introduction) and upload the package in IDP or provide the link to their published package on npm registry. 

We support the code customers write and build and deploy it to the IDP on their behalf. This solves most of the use cases customers have that could be supported by extensibility. We are yet to receive the support for [dynamic frontend plugins](https://github.com/backstage/backstage/tree/master/beps/0002-dynamic-frontend-plugins) on Backstage, which is just on the proposal phase also it would be supported along with the new backend and frontend system, most plugins we see in the [Backstage Plugins marketplace](https://backstage.io/plugins) are built out of legacy backend system because that's what most adopters of Backstage are running. Today we support almost all the plugins from marketplace required by our customers and are open for customers request to enable any plugin, usually within one week, that's already on backstage marketplace but isn't available in Harness IDP.

Harness IDP doesn't yet support [custom entity provider](https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers) and [custom catalog processors](https://backstage.io/docs/features/software-catalog/external-integrations#custom-processors) but even on Backstage world these are complex code-level customizations which require good knowledge of typescript to implement.

### Can we create a resource group containing specific workflows and specific catalogue entries?

No we can't create resource group out of components in the Software Catalog because these entities live in the Backstage system and our [platform RBAC](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles) does not apply to those.


### How is Harness IDP different from self-managed Backstage?**
Harness IDP is built on top of the open-source Backstage framework but adds enterprise-grade features such as RBAC, audit trails, OPA-based governance, and native integrations. It removes the operational burden of hosting, upgrading, and maintaining Backstage by providing it as a managed SaaS offering.


### Can I use my existing Backstage entities and templates in Harness IDP?**
Yes. Harness provides an **Entity Conversion API** to convert Backstage entity and template YAMLs into the format required by Harness IDP, allowing a smooth and consistent migration of catalog data and workflows.


### What RBAC features does Harness IDP offer that Backstage lacks?**
Harness IDP supports fine-grained **role-based access control (RBAC)** at project, org, and account levels. You can define access at the entity and workflow level, unlike Backstage which lacks built-in RBAC capabilities.


### Does Harness IDP support custom plugins like Backstage?**
Yes. Harness IDP supports **frontend plugin development** and installation via package upload or npm registry. However, **custom backend plugins** are not natively supported within Harness IDP and should be self-hosted with secure delegate-based access if required.


### How does Harness IDP handle workflow execution compared to Backstage?**
Harness IDP uses **Harness Pipelines** for executing workflows, which support features like approval steps, parallel execution, conditional logic, long-running processes, and secure infrastructure isolation—capabilities that are limited or absent in Backstage's Scaffolder backend.


### Can I create and manage entities without using Git in Harness IDP?**
Yes. Harness IDP supports both **Git-based** and **UI-based** entity management. You can choose to manage entities purely through the UI without needing YAML files in Git, simplifying onboarding and maintenance.


### What governance capabilities are built into Harness IDP?**
Harness IDP offers built-in **Open Policy Agent (OPA)** based policies, **audit trails**, and **integration with secret managers** (like AWS Secrets Manager, HashiCorp Vault, GCP, etc.), providing enterprise-level governance out-of-the-box.

### How does Harness IDP simplify the adoption and scaling of an IDP across the enterprise?**
Harness IDP eliminates the need to manage infrastructure, plugins, and upgrades. It offers **hierarchical organization support**, **automated user and group ingestion**, and **dashboards** with executive reporting, making it easier to scale across teams.


### What analytics capabilities does Harness IDP provide?**
Harness IDP includes **custom dashboards**, **scheduled executive reports**, and **alerting** based on trends—none of which are available out-of-the-box in self-managed Backstage.

### Can I migrate workflows with custom logic and UI fields from Backstage?**
Yes. Harness IDP supports dynamic form pickers and conditional UI inputs via **Workflow Dynamic Pickers**, and custom logic can be embedded using **"Run" steps** in pipelines, supporting scripting in various languages inside secure containers.

### What happens to my existing catalog-info.yaml files during the upgrade to IDP 2.0?
When you upgrade to IDP 2.0, all your entities are automatically migrated as Inline Entities, and they will no longer be linked to the catalog-info.yaml files. These YAMLs can be archived for reference or deleted. You can later use the Git Experience to convert them into Remote Entities stored in Git.


### Can I still use IDP 1.0 APIs after upgrading to IDP 2.0?
IDP 1.0 APIs will temporarily continue to work, but they are scheduled for deprecation by the end of October 2025. You are encouraged to transition to the newer Harness-native APIs as soon as possible for long-term support and feature compatibility.

### How can I test IDP 2.0 before enabling it in production?
If you want to test IDP 2.0 safely, you can request access to a test account or enable the feature flag in a staging environment first. Contact Harness Support to set this up.

### Will hidden or private workflows remain hidden after the upgrade?
No. Hidden tags are no longer supported in IDP 2.0. All migrated workflows become Account-level and visible to all users by default. You will need to move sensitive workflows to a specific Project scope and apply RBAC for restricted execution access.

### Can I define multiple entities in a single YAML file in IDP 2.0?
No. Unlike IDP 1.0, IDP 2.0 enforces a single-entity-per-YAML rule for clarity, consistency, and compatibility with the rest of the Harness platform. Each entity must have its own YAML file.

### What happens to my existing Backstage YAML files after upgrading to IDP 2.0?
Once you upgrade to IDP 2.0, your existing Backstage-style YAML files will be disconnected from the migrated entities. These YAMLs are considered deprecated and are no longer valid due to changes in structure and scope. You can retain them for archival purposes, but new or updated entities must follow the Harness-native YAML structure. Use the Git Experience to regenerate YAMLs in the new format if needed.

### How does IDP 2.0 help avoid Git rate limits faced in IDP 1.0?
IDP 2.0 introduces per-entity Git connectors and webhook-based Git sync, eliminating the need for all updates to go through a single Git connector. This solves the rate-limit issue faced in large catalogs using IDP 1.0. Real-time syncing ensures updates from UI/API are pushed to Git immediately without periodic polling.

### Can I use relative file paths for my API entity definitions in IDP 2.0?
Not yet. In IDP 2.0, API entity definitions must use absolute URLs (e.g., https://github.com/.../openapi.yaml). Relative file paths (e.g., ./openapi.yaml) are not supported as of now but are planned for a future release. Be sure to update your entity specs accordingly to avoid registration errors.

### Can I use Harness account-level variables inside my IDP YAML descriptors?
Yes. IDP 1.0 supports using Harness account-level built-in and custom variables inside YAML files. These can be referenced in fields like annotations or spec values using <+account.identifier> and <+variable.account.projectIdentifier>, enabling dynamic generation of links and metadata tied to your Harness project structure.


### How can I show relationships like dependencies or provided APIs in the catalog graph?
To display relationships between components in the catalog relationship graph, use fields like:
dependsOn: Lists components or resources this entity depends on.
providesApis: Lists APIs this component exposes.
These fields should use reference notation like Component:ng-manager or api:internal/streetlights. Once added, the relationships will be visualized in the Harness IDP UI automatically.

### How does the System Model in IDP 1.0 help in managing dependencies between services?
The IDP 1.0 System Model, built on the Backstage framework, allows you to define clear relationships like dependsOn, providesApis, and ownerOf in your catalog-info.yaml. This structure helps teams visually track service-to-service dependencies, understand how components interact, and identify potential impacts during changes or incidents. It's particularly useful for microservices and distributed architectures by offering a central, organized view of your software landscape.

### What is the difference between a Component and a System in IDP 1.0?
In IDP 1.0, a Component is a specific unit of software such as a service, website, or library. It's the smallest deployable or manageable entity. A System, on the other hand, is a collection of related components and resources that work together to deliver a broader functionality. You can think of a System as a building and the Components as the rooms or services inside it.

### What types of relationships can be defined in IDP 1.0 catalog-info.yaml, and why are they useful?
IDP 1.0 supports various relationship types in the catalog-info.yaml to define how entities are connected:
dependsOn: Declares a dependency on another component or resource.
providesApis: Indicates the APIs exposed by the component.
ownedBy: Assigns a responsible Group of user (not user group or any Rbac) who owns the entity
partOf: Connects an entity to a larger system or domain.
These relationships automatically populate the service dependency graph in the IDP UI, making architecture easier to understand, navigate, and maintain.

### What role do Domains play in organizing services in IDP 1.0?
Domains in IDP 1.0 serve as logical groupings of related systems that share a business goal, technology stack, or domain model. For example, a Domain like data-analytics-district can contain systems and components related to analytics workflows. By grouping related systems under a Domain, teams can organize services at scale, improve discoverability, and establish clear ownership and documentation boundaries.

### What are the core entities in Harness IDP 2.0, and how do they help model software?
In IDP 2.0, Harness introduces a Harness-native data model that revolves around three core entities:
Component: A deployable unit such as a service, website, or data pipeline.
API: Defines the interface a component exposes (e.g., OpenAPI, GraphQL).
Resource: Represents infrastructure dependencies like S3 buckets or databases.
These entities help accurately represent how your systems are structured, how they communicate, and what infrastructure they depend on—making it easier to manage dependencies, understand ownership, and automate operations.

### What kinds of relationships can I define in IDP 2.0 catalog entities, and what do they represent?
IDP 2.0 supports rich relationships to express how entities interact:

**ownedBy / ownerOf:** Assigns a responsible Group of user (not user group or any Rbac) who owns the entity
**providesApi / apiProvidedBy:** Indicate that a component exposes specific APIs.
**consumesApi / apiConsumedBy:** Show that a component depends on other APIs.
**dependsOn / dependencyOf:** Express software or infrastructure dependencies.
subcomponentOf, memberOf, childOf, etc.: Help define hierarchy or structure.
These relationships power the visual dependency graph in IDP and improve traceability, discoverability, and operational clarity.

### What are best practices to use Lambda or custom backend in complex workflows?
For advanced processing:
Use lightweight proxy backends or Lambda functions to shape the API response
Then route the response via Backend Proxy
This is ideal for filtering, transformation, or conditional enrichment
